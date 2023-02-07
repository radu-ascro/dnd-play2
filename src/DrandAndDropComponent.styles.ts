import { Icon } from '@runeffective/evo-design-system';
import styled, { css, keyframes } from 'styled-components';

import { evoColor } from './utils';

import {
  CROSSHAIR_SIZE,
  DOT_SIZE,
  DROP_INITIAL_SIZE,
  DROP_SIZE,
} from './constants';
import { EDragAndDropState } from './DragAndDropComponent';

export const DragAndDropWrapper = styled.div`
  width: fit-content;
`;

const dimensionAnimation = keyframes`
  0% {
    width: ${DROP_INITIAL_SIZE}px;
    height: ${DROP_INITIAL_SIZE}px;
  }
  100% {
    width: ${DROP_SIZE}px;
    height: ${DROP_SIZE}px;
  }
`;

const shakeRightAnimation = keyframes`
30%, 70% {
  transform: rotate(-12deg);
  left: -6px;
}

50% {
  transform: rotate(12deg);
  left: 6px;
}
`;

const shakeLeftAnimation = keyframes`
30%, 70% {
  transform: rotate(12deg);
  left: 6px;
}

50% {
  transform: rotate(-12deg);
  left: -6px;
}
`;

export const PinAssetMarkerWrapper = styled.div<{
  dragAndDropState: EDragAndDropState;
  direction: string;
  lastDirection: string;
  shake: boolean;
}>`
  width: ${DROP_INITIAL_SIZE}px;
  height: ${DROP_INITIAL_SIZE}px;
  margin-bottom: 8px;
  animation: ${({ dragAndDropState }) =>
    dragAndDropState === EDragAndDropState.DROPPED
      ? css`
          ${dimensionAnimation} 0s 0.8s forwards
        `
      : 'none'};
  position: relative;
  left: ${({ direction }) =>
    direction === '' ? '0' : direction === 'right' ? '15px' : '-15px'};
  transform: ${({ direction }) =>
    direction === ''
      ? 'none'
      : direction === 'right'
      ? 'rotate(30deg)'
      : 'rotate(-30deg)'};
  ${({ shake, lastDirection }) =>
    shake === true
      ? lastDirection === 'right'
        ? css`
            animation: ${shakeRightAnimation} 0.6s 0.2s;
          `
        : css`
            animation: ${shakeLeftAnimation} 0.6s 0.2s;
          `
      : ''};
  transition: transform 1s, left 1s;

  [aria-label='asset-marker'] {
    ${({ direction }) =>
      direction === ''
        ? ''
        : direction === 'right'
        ? 'rotate: -30deg; translate: 6px 14px;'
        : 'rotate: 30deg; translate: 25px 1px;'};
    transition: rotate 1s, translate 1s;
  }
`;

export const DroppedDotWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const DroppedDot = styled.div`
  margin-top: 4px;
  width: ${DOT_SIZE}px;
  height: ${DOT_SIZE}px;
  border-radius: ${DOT_SIZE}px;
  background-color: ${evoColor('Brand/primary')};
  opacity: 0.6;
  border: 1px solid ${evoColor('Background/surface-main')};
`;

export const Crosshair = styled.div<{
  dragAndDropState: EDragAndDropState;
}>`
  background: red;
  opacity: 0.6;
  border: 1px solid green;
  width: ${CROSSHAIR_SIZE}px;
  height: ${CROSSHAIR_SIZE}px;
  border-radius: ${CROSSHAIR_SIZE}px;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
`;

export const ButtonIcon = styled(Icon)`
  color: blue;
`;

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
import { MouseSpeedAndAcceleration } from './useMouseSpeedAndAcceleration';

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

const PIN_MAX_ROTATION = 30;
const SHAKE_MAX_ROTATION = 12;

const getPinRotation = (movement: number) =>
  Math.min(PIN_MAX_ROTATION, movement);

const getShakeRotation = (movement: number) =>
  Math.min(SHAKE_MAX_ROTATION, movement);

const getShakeRightAnimation = (movement: number) => keyframes`
30%, 70% {
  transform: rotate(${-getShakeRotation(movement)}deg);
}
50% {
  transform: rotate(${getShakeRotation(movement)}deg);
}
`;

const getShakeLeftAnimation = (movement: number) => keyframes`
30%, 70% {
  transform: rotate(${getShakeRotation(movement)}deg);
}
50% {
  transform: rotate(${-getShakeRotation(movement)}deg);
}
`;

export const PinAssetMarkerWrapper = styled.div<{
  dragAndDropState: EDragAndDropState;
  direction: string;
  lastDirection: string;
  shake: boolean;
  lastMouseMoveData: MouseSpeedAndAcceleration;
  mouseMoveData: MouseSpeedAndAcceleration;
}>`
  position: relative;
  margin-bottom: 8px;
  width: ${DROP_INITIAL_SIZE}px;
  height: ${DROP_INITIAL_SIZE}px;
  animation: ${({ dragAndDropState }) =>
    dragAndDropState === EDragAndDropState.DROPPED
      ? css`
          ${dimensionAnimation} 0s 0.8s forwards
        `
      : 'none'};
  transform-origin: center 110%;
  transform: ${({ direction, mouseMoveData }) =>
    direction === ''
      ? 'none'
      : direction === 'right'
      ? `rotate(${getPinRotation(mouseMoveData.movement)}deg)`
      : `rotate(${-getPinRotation(mouseMoveData.movement)}deg)`};
  ${({ shake, lastDirection, lastMouseMoveData }) =>
    shake === true
      ? lastDirection === 'right'
        ? css`
            animation: ${getShakeRightAnimation(lastMouseMoveData.movement)}
              0.6s 0.2s;
          `
        : css`
            animation: ${getShakeLeftAnimation(lastMouseMoveData.movement)} 0.6s
              0.2s;
          `
      : ''};
  transition: transform 0.2s;
  /*
  TODO find a better way to animate the icon
  Remove for now since it causes animation issues.
    [aria-label='asset-marker'] {
    transform: ${({ direction }) =>
    direction === ''
      ? 'none'
      : direction === 'right'
      ? 'rotate(-30deg) translate(-21px, 9px)'
      : 'rotate(30deg) translate(9px, -21px)'};
    transition: rotate 0.2s, translate 0.2s;
  }*/
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

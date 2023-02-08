import React from 'react';
import styled, { keyframes } from 'styled-components';

import PinWrapper from './Pin';
import { evoColor, hexToRgba } from './utils';

import { DROP_SIZE } from './constants';
import {
  ButtonIcon,
  Crosshair,
  DragAndDropWrapper,
  DroppedDot,
  DroppedDotWrapper,
  PinAssetMarkerWrapper,
} from './DrandAndDropComponent.styles';
import {
  initialMouseSpeedAndAcceleration,
  MouseSpeedAndAcceleration,
} from './useMouseSpeedAndAcceleration';

const shadowStartColor = hexToRgba(evoColor(''), 0);
const shadowEndColor = hexToRgba(evoColor(''), 0.4);

const breatheAnimation = keyframes`
  0% {
    box-shadow: 0 0 5px 10px ${shadowStartColor};
  }
  100% {
    box-shadow: 0 0 20px 14px ${shadowEndColor};
  }
`;

const ValidAnimDiv = styled.div`
  height: ${DROP_SIZE - 10}px;
  width: ${DROP_SIZE - 10}px;
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 50%;
  animation: ${breatheAnimation} 0.8s 0.8s ease-out infinite alternate;
`;

export enum EDragAndDropState {
  VALID = 'valid',
  INVALID = 'invalid',
  DROPPED = 'dropped',
}

interface DragAndDropComponentProps {
  assetMarker: string;
  state: EDragAndDropState;
  direction?: string;
  lastDirection?: string;
  shake?: boolean;
  lastMouseMoveData?: MouseSpeedAndAcceleration;
  mouseMoveData?: MouseSpeedAndAcceleration;
}

export const DragAndDropComponent = ({
  assetMarker,
  state,
  direction = '',
  lastDirection = '',
  shake = false,
  mouseMoveData = initialMouseSpeedAndAcceleration,
  lastMouseMoveData = initialMouseSpeedAndAcceleration,
}: DragAndDropComponentProps) => (
  <DragAndDropWrapper>
    {state === EDragAndDropState.DROPPED && <ValidAnimDiv />}
    <PinAssetMarkerWrapper
      dragAndDropState={state}
      direction={direction}
      lastDirection={lastDirection}
      shake={shake}
      mouseMoveData={mouseMoveData}
      lastMouseMoveData={lastMouseMoveData}
    >
      <PinWrapper marker={assetMarker} fill="white" />
    </PinAssetMarkerWrapper>
    {state === EDragAndDropState.DROPPED ? (
      <DroppedDotWrapper>
        <DroppedDot />
      </DroppedDotWrapper>
    ) : (
      <Crosshair dragAndDropState={state}>
        <ButtonIcon
          iconName={state === EDragAndDropState.VALID ? 'add' : 'times'}
          iconStyle="fal"
        />
      </Crosshair>
    )}
  </DragAndDropWrapper>
);

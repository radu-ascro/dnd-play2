import {
  DragOverlay,
  DragStartEvent,
  UniqueIdentifier,
  useDndMonitor,
  useDraggable,
} from '@dnd-kit/core';
import { useToast } from '@runeffective/evo-design-system';
import * as React from 'react';
import styled from 'styled-components';
import { useMutate } from './useMutate';

const Container = styled.div`
  padding: 2em;
  gap: 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ToastExample = () => {
  const toastHandler = useToast();

  const [showToast, setShowToast] = React.useState(false);

  // @ts-ignore
  const [mutateFn, { error }] = useMutate(200, false);

  React.useEffect(() => {
    // when an error is thrown from a mutation and toastHandler is used as dependencies
    //  the toast will be called again and again...
    if (error) {
      toastHandler.error({
        title: 'Error',
        description: 'This is a toast message',
      });
    }
  }, [error, toastHandler]);

  React.useEffect(() => {
    if (showToast) {
      toastHandler.warn({
        title: 'Warn',
        description: 'This is a toast message',
      });
      // if the state is not reseted the toast will be called again and again...
      setShowToast(false);
    }
  }, [showToast, toastHandler]);

  return (
    <Container>
      <button
        onClick={() => {
          toastHandler.info({
            title: 'Info',
            description: 'This is a toast message',
          });
        }}
      >
        show toast direclty call
      </button>
      <button onClick={() => setShowToast(true)}>
        show toast on useEffect with dependency
      </button>
      {/*@ts-ignore*/}
      <button onClick={() => mutateFn('data')}>
        show toast on mutation error
      </button>
    </Container>
  );
};

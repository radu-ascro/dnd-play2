import { DragMoveEvent } from '@dnd-kit/core';
import { DropAnimation } from '@dnd-kit/core/dist/components/DragOverlay/hooks';
import { CSS } from '@dnd-kit/utilities';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import mojs from '@mojs/core';
import { useCallback, useRef, useState } from 'react';

export const dropAnimation: DropAnimation = {
  duration: 500,
  easing: 'cubic-bezier(0.165, 0.840, 0.440, 1.000)',
  keyframes: ({
    transform,
    active: {
      rect: { width: activeWidth },
    },
    dragOverlay: {
      rect: { width: elWidth },
    },
  }) => {
    const finalTransform = {
      x: transform.initial.x - activeWidth / 2 + elWidth / 2,
      y: transform.initial.y,
      scaleX: 0,
      scaleY: 0,
    };
    return [
      {
        opacity: 1,
        transform: CSS.Transform.toString(transform.initial),
      },
      { opacity: 0, transform: CSS.Transform.toString(finalTransform) },
    ];
  },
};

export const invalidDropAnimation = (coords: IPoint, fillColor = 'blue') => {
  const centreCircle = new mojs.Shape({
    left: 0,
    top: 0,
    shape: 'circle',
    radius: { 18: 0 },
    fill: fillColor,
    easing: 'linear.none',
    duration: 500,
  });

  const burstCircle = new mojs.Burst({
    left: 0,
    top: 0,
    radius: { 0: 30 },
    count: 6,
    children: {
      shape: 'circle',
      radius: { 18: 0 },
      fill: fillColor,
      easing: 'linear.none',
      duration: 750,
    },
  });

  const burstLine = new mojs.Burst({
    left: 0,
    top: 0,
    radius: { 24: 35 },
    opacity: { 1: 0 },
    count: 6,
    children: {
      shape: 'line',
      radius: 6,
      scale: 1,
      stroke: fillColor,
      strokeDasharray: '100%',
      strokeDashoffset: { '-100%': '100%' },
      easing: 'linear.none',
      duration: 500,
      delay: 500,
    },
  });

  const timeline = new mojs.Timeline();

  timeline.add(centreCircle, burstCircle, burstLine);

  centreCircle.tune(coords);
  burstCircle.tune(coords);
  burstLine.tune(coords);
  timeline.replay();
};

export const useDropAnimation = () => {
  const [direction, setDirection] = useState<string>('');
  const [lastDirection, setLastDirection] = useState<string>('');
  const [shake, setShake] = useState<boolean>(false);
  const dragEvent = useRef<Nullable<DragMoveEvent>>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const animateDrop = useCallback(
    (event: DragMoveEvent) => {
      if (dragEvent.current) {
        const { pageX: ePageX } = event.activatorEvent as MouseEvent;
        const { pageX: dPageX } = dragEvent.current
          .activatorEvent as MouseEvent;
        const eventXCords = ePageX + event.delta.x;
        const dEventXCords = dPageX + dragEvent.current.delta.x;

        setShake(false);
        if (dEventXCords - eventXCords > 0) {
          setDirection('right');
        } else if (dEventXCords - eventXCords < 0) {
          setDirection('left');
        } else {
          setLastDirection(direction);
          setDirection('');
        }
      }
      dragEvent.current = event;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        setLastDirection(direction);
        setDirection('');
        setShake(true);
      }, 100);
    },
    [direction]
  );

  const resetDropAnimation = useCallback(() => {
    setDirection('');
    setShake(false);
  }, []);

  return {
    animateDrop,
    direction,
    lastDirection,
    shake,
    resetDropAnimation,
  };
};

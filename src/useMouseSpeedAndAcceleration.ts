import { useCallback, useEffect, useRef, useState } from 'react';

export const initialMouseSpeedAndAcceleration = {
  movementX: 0,
  movementY: 0,
  movement: 0,
  acceleration: 0,
  maxPositiveAcc: 0,
  maxNegativeAcc: 0,
  speed: 0,
  maxSpeed: 0,
};

export const useMouseSpeedAndAcceleration = () => {
  const [enableTrack, setEnableTrack] = useState(false);
  const [prevSpeed, setPrevSpeed] = useState(0);
  const [data, setData] = useState(initialMouseSpeedAndAcceleration);

  const currentEventRef = useRef<MouseEvent | null>(null);
  const prevEventRef = useRef<MouseEvent | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentEvent = currentEventRef.current;
      const prevEvent = prevEventRef.current;
      let { speed } = data;
      if (prevEvent && currentEvent) {
        const movementX = Math.abs(currentEvent.screenX - prevEvent.screenX);
        const movementY = Math.abs(currentEvent.screenY - prevEvent.screenY);
        const movement = Math.sqrt(
          movementX * movementX + movementY * movementY
        );
        // speed=movement/100ms= movement/0.1s= 10*movement/s
        speed = 10 * movement; // current speed

        let { maxSpeed } = data;
        if (speed > data.maxSpeed) {
          maxSpeed = speed;
        }

        const acceleration = 10 * (speed - prevSpeed);
        let maxPositiveAcceleration = data.maxPositiveAcc;
        let maxNegativeAcceleration = data.maxNegativeAcc;
        if (acceleration > 0) {
          if (acceleration > data.maxPositiveAcc) {
            maxPositiveAcceleration = data.acceleration;
          }
        } else if (acceleration < data.maxNegativeAcc) {
          maxNegativeAcceleration = data.acceleration;
        }

        setData({
          movementX,
          movementY,
          movement,
          acceleration: Math.round(acceleration),
          maxPositiveAcc: Math.round(maxPositiveAcceleration),
          maxNegativeAcc: Math.round(maxNegativeAcceleration),
          speed: Math.round(speed),
          maxSpeed: Math.round(maxSpeed),
        });
      }

      prevEventRef.current = currentEvent;
      setPrevSpeed(speed);
    }, 100);
    return () => {
      clearInterval(interval);
    };
  }, [data, prevSpeed]);

  const onmousemove = useCallback((e: MouseEvent) => {
    currentEventRef.current = e;
  }, []);

  useEffect(() => {
    if (enableTrack) {
      window.addEventListener('mousemove', onmousemove);
    }
    return () => {
      if (enableTrack) {
        window.removeEventListener('mousemove', onmousemove);
      }
    };
  }, [enableTrack, onmousemove]);

  return {
    setEnableTrack,
    ...data,
  };
};

export type MouseSpeedAndAcceleration = Omit<
  ReturnType<typeof useMouseSpeedAndAcceleration>,
  'setEnableTrack'
>;

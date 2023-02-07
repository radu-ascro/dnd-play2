import { Modifier } from '@dnd-kit/core';
import { getColor } from '@runeffective/evo-design-system';
import { CROSSHAIR_SIZE } from './constants';

export const parseHexToRgb = (hex: string) => {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(
    hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b)
  );
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

export const hexToRgba = (hex: string, alpha: number) => {
  const color = parseHexToRgb(hex);
  if (color) {
    return `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`;
  }
  return 'rgba(0,0,0,0)';
};

export const evoColor = (color: string) => {
  if (!color) {
    return getColor('brand', 'primary')({});
  }
  const [scheme, type] = color.split('/');
  return getColor(scheme.toLowerCase(), type)({});
};

const hasViewportRelativeCoordinates = (
  event: Event
): event is Event & Pick<PointerEvent, 'clientX' | 'clientY'> =>
  'clientX' in event && 'clientY' in event;

interface IPoint {
  x: number;
  y: number;
}

function getEventCoordinates(event: Event): IPoint | null {
  if (hasViewportRelativeCoordinates(event)) {
    return {
      x: event.clientX,
      y: event.clientY,
    };
  }
  return null;
}

export const snapCenterToCrosshair: Modifier = ({
  activatorEvent,
  draggingNodeRect,
  transform,
}) => {
  if (draggingNodeRect && activatorEvent) {
    const activatorCoordinates = getEventCoordinates(activatorEvent);

    if (!activatorCoordinates) {
      return transform;
    }

    const offsetX = activatorCoordinates.x - draggingNodeRect.left;
    const offsetY = activatorCoordinates.y - draggingNodeRect.top;

    return {
      ...transform,
      x: transform.x + offsetX - draggingNodeRect.width / 2,
      y: transform.y + offsetY - draggingNodeRect.height + CROSSHAIR_SIZE / 2,
    };
  }

  return transform;
};

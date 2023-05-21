export * from './timer';
export * from './emitter';
export * from './parser';

interface Direction {
  x: null | string;
  y: null | string;
}

const directions = {
  x: new Set(['left', 'center', 'right']),
  y: new Set(['top', 'bottom']),
};

/**
  * Sequential ID generator
  */
export const Id = (i => () => i++)(0);

/**
  * Splits space/tab separated string into array and cleans empty string items.
  */
export const split = (value: unknown): string[] => {
  if (typeof value !== 'string') {
    return [];
  }

  return value.split(/\s+/gi).filter(Boolean);
};

/**
  * Cleanes and transforms string of format "x y" into object {x, y}.
  * Possible combinations:
  *   x - left, center, right
  *   y - top, bottom
  */
export const listToDirection = (value: string | string[]): Direction => {
  if (typeof value === 'string') {
    value = split(value);
  }

  let x = null;
  let y = null;

  value.forEach(v => {
    if (directions.y.has(v)) {
      y = v;
    }
    if (directions.x.has(v)) {
      x = v;
    }
  });

  return { x, y };
};

const floatRegexp = '[-+]?[0-9]*.?[0-9]+';

export type ValueType = {
  type: string;
  value: number | string;
}

const types = [
  {
    name: 'px',
    regexp: new RegExp(`^${floatRegexp}px$`),
  },
  {
    name: '%',
    regexp: new RegExp(`^${floatRegexp}%$`),
  },
  /**
   * Fallback option
   * If no suffix specified, assigning "px"
   */
  {
    name: 'px',
    regexp: new RegExp(`^${floatRegexp}$`),
  },
];

const getType = (value: string): ValueType => {
  if (value === 'auto') {
    return {
      type: value,
      value: 0,
    };
  }

  for (let i = 0; i < types.length; i++) {
    const type = types[i];
    if (type.regexp.test(value)) {
      return {
        type: type.name,
        value: parseFloat(value),
      };
    }
  }

  return {
    type: '',
    value,
  };
};

export const parse = (value: number | string) => {
  switch (typeof value) {
    case 'number':
      return { type: 'px', value };
    case 'string':
      return getType(value);
    default:
      return { type: '', value };
  }
};

export default parse;

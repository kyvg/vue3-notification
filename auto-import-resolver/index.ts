import { name as packageName } from '../package.json';
import type { ComponentResolverFunction } from 'unplugin-vue-components';
import { COMPONENT_NAME } from '../src/constants';

const autoImportResolver = (name = COMPONENT_NAME): ComponentResolverFunction => {
  return (componentName) => {
    if (name === componentName) {
      return {
        from: packageName,
        as: name,
        name: COMPONENT_NAME,
      };
    }
  };
};

export default autoImportResolver;

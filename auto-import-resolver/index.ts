import { name as packageName } from '../package.json';
import { COMPONENT_NAME } from '../src/constants';

const autoImportResolver = (name = COMPONENT_NAME) => {
	return (componentName: string) => {
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

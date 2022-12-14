import get from 'lodash/get';
import isPlainObject from 'lodash/isPlainObject';

const notExist = {};

/**
 * interpolate key references
 * using @{key} to reference to other key
 * @param resources
 * @returns
 */
function interpolateTranslations(resources: Record<string, unknown>) {
  if (resources['__interpolated']) return;
  Object.defineProperty(resources, '__interpolated', {
    configurable: false,
    enumerable: false,
    value: true,
  });

  function interpolate(parent: Record<string, unknown>, moduleData: Record<string, unknown>) {
    Object.entries(parent).forEach(([key, value]) => {
      if (isPlainObject(value)) {
        interpolate(value as Record<string, unknown>, moduleData);
      } else if (typeof value === 'string') {
        if (value.indexOf('@{') === -1) {
          return;
        }
        const interpolatedValue = value.replace(/@\{([^}]+)\}/g, (_, substitution) => {
          const referencedText = get(moduleData, substitution, notExist) as string;
          if (referencedText === notExist) {
            throw new Error(`The key "${substitution}" does not exist`);
          }
          return referencedText;
        });
        parent[key] = interpolatedValue;
      }
    });
  }

  Object.values(resources).forEach((namespaceData) => {
    Object.values(namespaceData as Record<string, unknown>).forEach((moduleData) => {
      interpolate(moduleData as Record<string, unknown>, moduleData as Record<string, unknown>);
    });
  });
}

export { interpolateTranslations };

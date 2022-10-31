module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    customExportConditions: [
      'node',
      'node-addons',
    ],
  },
  transform: {
    '^.+\\.vue$': '@vue/vue3-jest',
  },
};

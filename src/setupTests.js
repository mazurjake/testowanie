import 'regenerator-runtime/runtime';
export const flushPromises = () => new Promise(setImmediate);

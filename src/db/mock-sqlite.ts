export const openDatabaseSync = () => ({
  execAsync: async () => {},
  runAsync: async () => ({ lastInsertRowId: 0, changes: 0 }),
  getAllAsync: async () => [],
  getFirstAsync: async () => null,
  prepareAsync: async () => ({
    executeAsync: async () => ({ getAllAsync: async () => [] }),
    finalizeAsync: async () => {},
  }),
  withTransactionAsync: async (cb: any) => await cb(),
});

export const addDatabaseChangeListener = () => ({
  remove: () => {},
});

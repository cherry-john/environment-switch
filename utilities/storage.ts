export const projectStorage = storage.defineItem<Project[]>(
  "sync:projectStore",
  {
    defaultValue: [],
    version: 1,
  },
);

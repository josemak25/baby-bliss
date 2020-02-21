const useCombinedReducers = (combinedReducers: any) => {
  // Global State
  const state = Object.keys(combinedReducers).reduce(
    (acc, key) => ({ ...acc, [key]: combinedReducers[key][0] }),
    {}
  );

  // Global Dispatch Function
  const dispatch = (action: any) =>
    Object.keys(combinedReducers)
      .map(key => combinedReducers[key][1])
      .forEach(fn => fn(action));

  return [state, dispatch];
};

export default useCombinedReducers;

import { configureStore } from "@reduxjs/toolkit";
import globalSlice from "@slices/global";

export const createStore = (preloadedState) => {
  return configureStore({
    reducer: {
      [globalSlice.name]: globalSlice.reducer,
    },
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat
        // todoService.middleware,
        // pokemonService.middleware
        (),
    devTools: __DEV__ && __CLIENT__ && !__TEST__,
  });
};

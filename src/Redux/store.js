import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import saldoReducer from './slice/saldoSlice';
import userReducer from "./slice/userSlice";

const persistUserConfig = {
  key: "user",
  storage,
};

const persistConfig = {
  key: 'root',
  storage,
};

const persistedUserReducer = persistReducer(persistUserConfig, userReducer);
const persistedReducer = persistReducer(persistConfig, saldoReducer);

export const store = configureStore({
  reducer: {
    saldo: persistedReducer,
    user: persistedUserReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
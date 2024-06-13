// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import saldoReducer from './slice/saldoSlice';
import notificationReducer from './slice/snackBarSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedSaldoReducer = persistReducer(persistConfig, saldoReducer);

export const store = configureStore({
  reducer: {
    saldo: persistedSaldoReducer,
    notification: notificationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);

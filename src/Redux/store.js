import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import saldoReducer from './slice/saldoSlice';
import userReducer from "./slice/userSlice";
import notificationReducer from './slice/snackBarSlice';
import transferReducer from './slice/transferSlice';
import fixedTermReducer from './slice/fixedTermSlice';

const persistUserConfig = {
  key: "user",
  storage,
};

const persistConfig = {
  key: 'root',
  storage,
};

const persistFixedTermConfig = {
  key: 'fixedTerm',
  storage,
};

const persistedUserReducer = persistReducer(persistUserConfig, userReducer);
const persistedSaldoReducer = persistReducer(persistConfig, saldoReducer);
const persistedFixedTermReducer = persistReducer(persistFixedTermConfig, fixedTermReducer);

export const store = configureStore({
  reducer: {
    saldo: persistedSaldoReducer,
    user: persistedUserReducer,
    notification: notificationReducer,
    transfer: transferReducer,
    fixedTerm: persistedFixedTermReducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);

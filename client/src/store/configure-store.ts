import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { accountSlice } from './account-slice';
import { usersSlice } from './users-slice';
import { groupsSlice } from './groups-slice';
import { shiftsSlice } from './shifts-slice';

export const store = configureStore({
  reducer: {
    account: accountSlice.reducer,
    users: usersSlice.reducer,
    shifts: shiftsSlice.reducer,
    groups: groupsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

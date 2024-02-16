import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import agent from '../api/agent';
import { RootState } from './configure-store';
import { MetaData, UserShiftsParams, UserShift } from '@/models';
import { addDays, startOfWeek } from 'date-fns';

interface UserShiftsState {
  shiftsLoaded: boolean;
  status: string;
  shiftParams: UserShiftsParams;
  metaData: MetaData | null;
}

const shiftsAdapter = createEntityAdapter<UserShift>();

function getAxiosParams(siteId: string | null, shiftParams: UserShiftsParams) {
  const params = new URLSearchParams();
  params.append('weekStart', shiftParams.weekStart);
  params.append('weekEnd', shiftParams.weekEnd);
  if (shiftParams.searchTerm)
    params.append('searchTerm', shiftParams.searchTerm);
  if (shiftParams.groupId) params.append('groupId', shiftParams.groupId);
  if (shiftParams.siteId) {
    params.append('siteId', shiftParams.siteId);
  } else if (siteId) {
    params.append('siteId', siteId);
  }
  if (shiftParams.userId) params.append('userId', shiftParams.userId);
  return params;
}

export const fetchShiftsAsync = createAsyncThunk<
  UserShift[],
  string,
  { state: RootState }
>('users/fetchShiftsAsync', async (_, thunkAPI) => {
  const params = getAxiosParams(
    thunkAPI.getState().account.selectedSite?.id || null,
    thunkAPI.getState().shifts.shiftParams
  );
  try {
    const response = await agent.Users.getUserShifts(params);
    thunkAPI.dispatch(setMetaData(response.metaData));
    return response.items;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data });
  }
});

function initParams() {
  const weekStartDate = startOfWeek(Date.now(), { weekStartsOn: 1 });
  return {
    weekStart: weekStartDate.toISOString(),
    weekEnd: addDays(weekStartDate, 7).toISOString(),
    searchTerm: null,
    groupId: null,
    siteId: null,
    userId: null,
  };
}

export const shiftsSlice = createSlice({
  name: 'shifts',
  initialState: shiftsAdapter.getInitialState<UserShiftsState>({
    shiftsLoaded: false,
    status: 'idle',
    shiftParams: initParams(),
    metaData: null,
  }),
  reducers: {
    setShiftParams: (state, action) => {
      state.shiftsLoaded = false;
      state.shiftParams = {
        ...state.shiftParams,
        ...action.payload,
      };
    },
    resetShiftParams: (state) => {
      state.shiftsLoaded = false;
      state.shiftParams = initParams();
    },
    setShiftsLoaded: (state, action) => {
      state.shiftsLoaded = action.payload;
    },
    setMetaData: (state, action) => {
      state.metaData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchShiftsAsync.pending, (state) => {
      state.status = 'pendingFetchShifts';
    });
    builder.addCase(fetchShiftsAsync.fulfilled, (state, action) => {
      shiftsAdapter.setAll(state, action.payload);
      state.status = 'idle';
      state.shiftsLoaded = true;
    });
    builder.addCase(fetchShiftsAsync.rejected, (state, action) => {
      console.log(action.payload);
      state.status = 'idle';
    });
  },
});

export const shiftSelectors = shiftsAdapter.getSelectors(
  (state: RootState) => state.shifts
);

export const {
  setShiftsLoaded,
  setMetaData,
  setShiftParams,
  resetShiftParams,
} = shiftsSlice.actions;

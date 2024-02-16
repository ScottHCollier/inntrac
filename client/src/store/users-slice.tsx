import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import agent from '../api/agent';
import { RootState } from './configure-store';
import { User, UserParams, MetaData } from '@/models';

interface UsersState {
  usersLoaded: boolean;
  status: string;
  userParams: UserParams;
  metaData: MetaData | null;
}

const usersAdapter = createEntityAdapter<User>();

function getAxiosParams(siteId: string | null, userParams: UserParams) {
  const params = new URLSearchParams();
  if (userParams.searchTerm) params.append('searchTerm', userParams.searchTerm);
  if (userParams.groupId) params.append('groupId', userParams.groupId);
  if (userParams.siteId) {
    params.append('siteId', userParams.siteId);
  } else if (siteId) {
    params.append('siteId', siteId);
  }
  if (userParams.userId) params.append('userId', userParams.userId);
  return params;
}

export const fetchUsersAsync = createAsyncThunk<
  User[],
  string,
  { state: RootState }
>('users/fetchUsersAsync', async (_, thunkAPI) => {
  const params = getAxiosParams(
    thunkAPI.getState().account.selectedSite?.id || null,
    thunkAPI.getState().users.userParams
  );
  try {
    const response = await agent.Users.getUsers(params);
    thunkAPI.dispatch(setMetaData(response.metaData));
    return response;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data });
  }
});

function initParams() {
  return {
    searchTerm: null,
    groupId: null,
    siteId: null,
    userId: null,
  };
}

export const usersSlice = createSlice({
  name: 'users',
  initialState: usersAdapter.getInitialState<UsersState>({
    usersLoaded: false,
    status: 'idle',
    userParams: initParams(),
    metaData: null,
  }),
  reducers: {
    setUserParams: (state, action) => {
      state.usersLoaded = false;
      state.userParams = {
        ...state.userParams,
        ...action.payload,
      };
    },
    resetUserParams: (state) => {
      state.usersLoaded = false;
      state.userParams = initParams();
    },
    setUsersLoaded: (state, action) => {
      state.usersLoaded = action.payload;
    },
    setMetaData: (state, action) => {
      state.metaData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsersAsync.pending, (state) => {
      state.status = 'pendingFetchUsers';
    });
    builder.addCase(fetchUsersAsync.fulfilled, (state, action) => {
      usersAdapter.setAll(state, action.payload);
      state.status = 'idle';
      state.usersLoaded = true;
    });
    builder.addCase(fetchUsersAsync.rejected, (state, action) => {
      console.log(action.payload);
      state.status = 'idle';
    });
  },
});

export const userSelectors = usersAdapter.getSelectors(
  (state: RootState) => state.users
);

export const { setUsersLoaded, setMetaData, setUserParams, resetUserParams } =
  usersSlice.actions;

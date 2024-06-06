import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import agent from '../api/agent';
import { RootState } from './configure-store';
import { Group } from '@/models';

interface GroupsState {
  groupsLoaded: boolean;
  status: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}

const groupsAdapter = createEntityAdapter<Group>();

export const fetchGroupsAsync = createAsyncThunk<Group[]>(
  'groups/fetchGroupsAsync',
  async (_, thunkAPI) => {
    try {
      return await agent.Groups.getGroups();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const groupsSlice = createSlice({
  name: 'groups',
  initialState: groupsAdapter.getInitialState<GroupsState>({
    groupsLoaded: false,
    status: 'idle',
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGroupsAsync.pending, (state) => {
      state.status = 'pendingFetchGroups';
    });
    builder.addCase(fetchGroupsAsync.fulfilled, (state, action) => {
      groupsAdapter.setAll(state, action.payload);
      state.status = 'idle';
      state.groupsLoaded = true;
    });
    builder.addCase(fetchGroupsAsync.rejected, (state, action) => {
      console.log(action.payload);
      state.status = 'idle';
    });
  },
});

export const groupsSelectors = groupsAdapter.getSelectors(
  (state: RootState) => state.groups
);

import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import agent from '../api/agent';
import { RootState } from './configure-store';
import { Site } from '@/models';

interface SitesState {
  sitesLoaded: boolean;
  status: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}

const sitesAdapter = createEntityAdapter<Site>();

export const fetchSitesAsync = createAsyncThunk<Site[]>(
  'sites/fetchSitesAsync',
  async (_, thunkAPI) => {
    try {
      return await agent.Sites.getSites();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const sitesSlice = createSlice({
  name: 'sites',
  initialState: sitesAdapter.getInitialState<SitesState>({
    sitesLoaded: false,
    status: 'idle',
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSitesAsync.pending, (state) => {
      state.status = 'pendingFetchSites';
    });
    builder.addCase(fetchSitesAsync.fulfilled, (state, action) => {
      sitesAdapter.setAll(state, action.payload);
      state.status = 'idle';
      state.sitesLoaded = true;
    });
    builder.addCase(fetchSitesAsync.rejected, (state, action) => {
      console.log(action.payload);
      state.status = 'idle';
    });
  },
});

export const sitesSelectors = sitesAdapter.getSelectors(
  (state: RootState) => state.sites
);

// export const {} = sitesSlice.actions;

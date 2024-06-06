import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { User } from '@/models';
import { FieldValues } from 'react-hook-form';
import agent from '../api/agent';
import { router } from '../router/routes';
import { toast } from '../components/ui/use-toast';
import { RegisterAccount } from '../models/user';

interface Session {
  id: string;
  token: string;
}

interface AccountState {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  session: Session | null;
  user: User | null;
}

const initialState: AccountState = {
  session: null,
  user: null,
};

export const signInUser = createAsyncThunk<Session, FieldValues>(
  'account/signInUser',
  async (data, thunkAPI) => {
    try {
      const session = await agent.Account.login(data);
      localStorage.setItem('session', JSON.stringify(session));
      return session;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const registerUser = createAsyncThunk<RegisterAccount, FieldValues>(
  'account/registerUser',
  async (data, thunkAPI) => {
    try {
      const res = await agent.Account.register(data);
      return res;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const setPassword = createAsyncThunk<Session, FieldValues>(
  'account/setPassword',
  async (data, thunkAPI) => {
    try {
      const session = await agent.Account.setPassword(data);
      localStorage.setItem('session', JSON.stringify(session));
      return session;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const fetchCurrentUser = createAsyncThunk<User>(
  'account/fetchCurrentUser',
  async (_, thunkAPI) => {
    thunkAPI.dispatch(setSession(JSON.parse(localStorage.getItem('session')!)));
    try {
      const account = await agent.Account.currentUser();
      localStorage.setItem('user', JSON.stringify(account));
      return account;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  },
  {
    condition: () => {
      if (!localStorage.getItem('session')) return false;
    },
  }
);

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    signOut: (state) => {
      state.user = null;
      localStorage.removeItem('session');
      localStorage.removeItem('user');
      router.navigate('/');
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setSession: (state, action) => {
      state.session = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCurrentUser.rejected, (state) => {
      state.user = null;
      localStorage.removeItem('user');
      toast({
        title: 'Error',
        description: 'Session expired. Please log in again',
      });
      router.navigate('/');
    });
    builder.addMatcher(isAnyOf(fetchCurrentUser.fulfilled), (state, action) => {
      state.user = action.payload;
    });
    builder.addMatcher(
      isAnyOf(signInUser.fulfilled, setPassword.fulfilled),
      (state, action) => {
        state.session = action.payload;
      }
    );
    builder.addMatcher(
      isAnyOf(signInUser.rejected, setPassword.rejected),
      (_state, action) => {
        throw action.payload;
      }
    );
  },
});

export const { signOut, setUser, setSession } = accountSlice.actions;

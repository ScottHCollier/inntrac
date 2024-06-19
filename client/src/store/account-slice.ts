import {
  PayloadAction,
  createAsyncThunk,
  createSlice,
  isAnyOf,
} from '@reduxjs/toolkit';
import {
  IUser,
  IRegisterAccount,
  ILogin,
  ISession,
  ISetPassword,
} from '@/models';
import agent from '@/api/agent';
import { router } from '@/router/routes';
import { toast } from '@/components/ui/use-toast';
import { ICustomError, defaultApiError } from '@/api/error-handlers';

interface AccountState {
  session: ISession | null;
  user: IUser | null;
  error: ICustomError | null;
}

const initialState: AccountState = {
  session: null,
  user: null,
  error: null,
};

export const signInUser = createAsyncThunk<ISession, ILogin>(
  'account/signInUser',
  async (data, thunkAPI) => {
    try {
      const session = await agent.Account.login(data);
      localStorage.setItem('session', JSON.stringify(session));
      return session;
    } catch (err: unknown) {
      const error = defaultApiError(err);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// First value is what is returned from the method, second value is the expected body
export const registerUser = createAsyncThunk<IUser, IRegisterAccount>(
  'account/registerUser',
  async (data, thunkAPI) => {
    try {
      const user = await agent.Account.register(data);
      return user;
    } catch (err: unknown) {
      const error = defaultApiError(err);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const setPassword = createAsyncThunk<ISession, ISetPassword>(
  'account/setPassword',
  async (data, thunkAPI) => {
    try {
      const session = await agent.Account.setPassword(data);
      localStorage.setItem('session', JSON.stringify(session));
      return session;
    } catch (err: unknown) {
      const error = defaultApiError(err);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const fetchCurrentUser = createAsyncThunk<IUser>(
  'account/fetchCurrentUser',
  async (_, thunkAPI) => {
    thunkAPI.dispatch(setSession(JSON.parse(localStorage.getItem('session')!)));
    try {
      const account = await agent.Account.currentUser();
      localStorage.setItem('user', JSON.stringify(account));
      return account;
    } catch (err: unknown) {
      const error = defaultApiError(err);
      return thunkAPI.rejectWithValue(error);
    }
  },
  {
    condition: () => {
      if (!localStorage.getItem('session')) return false;
    },
  }
);

export const updateNotifications = createAsyncThunk<IUser>(
  'account/updateNotifications',
  async (_, thunkAPI) => {
    try {
      const currentState = thunkAPI.getState() as { account: AccountState };
      const user = currentState.account.user;
      if (!user) {
        throw new Error('User not found in state.');
      }

      const notifications = await agent.Account.notifications();

      const updatedUser = {
        ...user,
        notifications,
      };

      localStorage.setItem('user', JSON.stringify(updatedUser));
      return updatedUser;
    } catch (err: unknown) {
      const error = defaultApiError(err);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    signOut: (state) => {
      state.user = null;
      state.session = null;
      state.error = null;
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
    builder.addMatcher(
      isAnyOf(fetchCurrentUser.fulfilled, updateNotifications.fulfilled),
      (state, action) => {
        state.user = action.payload;
      }
    );
    builder.addMatcher(
      isAnyOf(signInUser.fulfilled, setPassword.fulfilled),
      (state, action) => {
        state.session = action.payload;
        state.error = null;
      }
    );
    builder.addMatcher(
      isAnyOf(
        signInUser.rejected,
        setPassword.rejected,
        updateNotifications.rejected
      ),
      (state, action: PayloadAction<unknown>) => {
        if (
          action.payload &&
          typeof action.payload === 'object' &&
          'message' in action.payload
        ) {
          state.error = action.payload as ICustomError;
          toast({
            title: 'Error',
            description: state.error.message,
          });
        } else {
          state.error = {
            message: 'An unknown error occurred',
            statusCode: 500,
          };
          toast({
            title: 'Error',
            description: state.error.message,
          });
        }
      }
    );
  },
});

export const { signOut, setUser, setSession } = accountSlice.actions;

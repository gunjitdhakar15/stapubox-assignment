import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  phone: '',
  otpSessionId: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setPhone: (state, action) => {
      state.phone = action.payload;
    },
    setOtpSessionId: (state, action) => {
      state.otpSessionId = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearError: state => {
      state.error = null;
    },
    logout: () => initialState,
  },
});

export const {
  setPhone,
  setOtpSessionId,
  setToken,
  setLoading,
  setError,
  clearError,
  logout,
} = authSlice.actions;
export default authSlice.reducer;

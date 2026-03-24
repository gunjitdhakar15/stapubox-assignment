import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  phone: '',
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

export const {setPhone, setToken, setLoading, setError, clearError, logout} =
  authSlice.actions;
export default authSlice.reducer;

import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  name: '',
  address: {
    line1: '',
    line2: '',
    pincode: '',
  },
  playingStatus: '',
  sport: '',
  feedback: '',
  hasExistingProfile: false,
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateBasicInfo: (state, action) => {
      const {name, line1, line2, pincode} = action.payload;
      if (name !== undefined) {
        state.name = name;
      }
      if (line1 !== undefined) {
        state.address.line1 = line1;
      }
      if (line2 !== undefined) {
        state.address.line2 = line2;
      }
      if (pincode !== undefined) {
        state.address.pincode = pincode;
      }
    },
    updateSportsInfo: (state, action) => {
      const {playingStatus, sport} = action.payload;
      if (playingStatus !== undefined) {
        state.playingStatus = playingStatus;
      }
      if (sport !== undefined) {
        state.sport = sport;
      }
    },
    updateFeedback: (state, action) => {
      state.feedback = action.payload;
    },
    setFormData: (state, action) => {
      const data = action.payload;
      state.name = data.name || '';
      state.address = {
        line1: data.address?.line1 || '',
        line2: data.address?.line2 || '',
        pincode: data.address?.pincode || '',
      };
      state.playingStatus = data.playingStatus || '';
      state.sport = data.sport || '';
      state.feedback = data.feedback || '';
      state.hasExistingProfile = true;
    },
    setHasExistingProfile: (state, action) => {
      state.hasExistingProfile = action.payload;
    },
    clearForm: () => initialState,
  },
});

export const {
  updateBasicInfo,
  updateSportsInfo,
  updateFeedback,
  setFormData,
  setHasExistingProfile,
  clearForm,
} = formSlice.actions;
export default formSlice.reducer;

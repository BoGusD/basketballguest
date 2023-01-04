import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: '',
  pw: '',
  email: '',
  userImg: '',
  userName: '',

  islogin: false,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    IsLogin: (state, action) => {
      state.id = action.payload.id;
      state.pw = action.payload.pw;
      state.email = action.payload.email;
      state.userImg = action.payload.userImg;
      state.userName = action.payload.userName;
      state.islogin = true;
    },
  },
});

export const { IsLogin } = loginSlice.actions;
export default loginSlice.reducer;

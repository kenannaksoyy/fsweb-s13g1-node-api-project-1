import { createSlice } from "@reduxjs/toolkit";
const usersSlice = createSlice({
    name: "users",
    initialState: {
      users:[]
    },
    reducers: {
      update: (state, action) => 
      {
        state.users = action.payload;
      }
    }
  });
  export const { update } = usersSlice.actions;
  export const selectUsers = (state) => {
    return state.users.users;
    };
  export default usersSlice.reducer;
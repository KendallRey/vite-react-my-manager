import { IGithubFollowerSchema } from "@/model/follower/follower";
import { clearAction, setAction } from "@/redux/helper/action";
import { createSlice } from "@reduxjs/toolkit";

type IUserSliceState = {
  followers?: IGithubFollowerSchema[];
  followings?: IGithubFollowerSchema[];
}

const INITIAL_STATE: IUserSliceState = {};
const userSlice = createSlice({
  name: 'user-slice',
  initialState: INITIAL_STATE,
  reducers: ({
    setUserFollowers: setAction<IUserSliceState, IGithubFollowerSchema[]>('followers'),
    clearUserFollowers: clearAction('followers', INITIAL_STATE.followers),
    setUserFollowings: setAction<IUserSliceState, IGithubFollowerSchema[]>('followings'),
    clearUserFollowings: clearAction('followings', INITIAL_STATE.followings),
  })
})

export const {
  setUserFollowers,
  setUserFollowings,
  clearUserFollowers,
  clearUserFollowings,
} = userSlice.actions;
export default userSlice.reducer;
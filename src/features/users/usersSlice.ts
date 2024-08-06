import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import {
  IUser,
  IUserState,
  FetchStatusEnum,
  IExtendedUser,
} from "../../app/types";
import { RootState } from "../../app/store";

export const usersAdapter = createEntityAdapter<IExtendedUser>();

const initialState: IUserState = usersAdapter.getInitialState({
  status: FetchStatusEnum.IDLE,
  errorMessage: "",
});

const randomHexColor = () => {
  let color = (Math.random() * 0xfffff * 1000000).toString(16);
  return "#" + color.slice(0, 6);
};

export const fetchUsers = createAsyncThunk<
  IExtendedUser[],
  void,
  { rejectValue: string }
>("users/fetchUsers", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const users: IUser[] = await response.json();

    return users.map((user) => ({
      id: user.id,
      name: user.name,
      avatar_color: randomHexColor(),
    }));
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = FetchStatusEnum.PENDING;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        usersAdapter.addMany(state, action.payload);
        state.status = FetchStatusEnum.IDLE;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = FetchStatusEnum.REJECTED;
        state.errorMessage = action.payload as string;
      });
  },
});

export const {} = usersSlice.actions;

export const {
  selectAll: selectAllUsers,
  selectIds: selectUsersIds,
  selectById: selectUserById,
} = usersAdapter.getSelectors((state: RootState) => state.users);

export default usersSlice.reducer;

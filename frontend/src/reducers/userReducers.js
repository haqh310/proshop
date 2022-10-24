import { createSlice } from "@reduxjs/toolkit";

// ======== LOGIN USER REDUCER ========
const userInfo = localStorage.getItem("userInfo");
const userInfoFromStorage =
  userInfo && userInfo !== "undefined"
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

const initialStateLogin = {
  userInfo: userInfoFromStorage,
  error: "",
};

export const loginReducers = createSlice({
  name: "login",
  initialState: initialStateLogin,
  reducers: {
    loginRequest: (state, action) => {
      return { loading: true };
    },
    loginSuccess: (state, action) => {
      return { loading: false, userInfo: action.payload };
    },
    loginFail: (state, action) => {
      return { loading: false, error: action.payload };
    },
    logoutUser: (state, action) => {
      return {};
    },
  },
});

// ======== REGISTER USER REDUCER ========
const initialStateRegister = {
  userInfo: null,
  error: "",
};

export const registerReducers = createSlice({
  name: "register",
  initialState: initialStateRegister,
  reducers: {
    registerRequest: (state, action) => {
      return { loading: true };
    },
    registerSuccess: (state, action) => {
      return { loading: false, userInfo: action.payload };
    },
    registerFail: (state, action) => {
      return { loading: false, error: action.payload };
    },
  },
});

// ======== DETAIL USER PROFILE REDUCER ========
const initialStateUser = {
  user: {},
  error: "",
};

export const userDetailReducers = createSlice({
  name: "userDetail",
  initialState: initialStateUser,
  reducers: {
    detailRequest: (state, action) => {
      return { loading: true };
    },
    detailSuccess: (state, action) => {
      return { loading: false, user: action.payload };
    },
    detailFail: (state, action) => {
      return { loading: false, error: action.payload };
    },
    detailReset: (state, action) => {
      return { user: {} };
    },
  },
});

// ======== UPDATE USER PROFILE REDUCER ========
export const userUpdateReducers = createSlice({
  name: "userUpdate",
  initialState: {},
  reducers: {
    updateRequest: (state, action) => {
      return { loading: true };
    },
    updateSuccess: (state, action) => {
      return { loading: false, success: true, userInfo: action.payload };
    },
    updateFail: (state, action) => {
      return { loading: false, error: action.payload };
    },
    updateReset: (state, action) => {
      return {};
    },
  },
});

// ======== USER LIST REDUCERS ========
const initialStateUserList = {
  users: [],
};

export const userListReducers = createSlice({
  name: "userList",
  initialState: initialStateUserList,
  reducers: {
    userListRequest: (state, action) => {
      return { loading: true };
    },
    userListSuccess: (state, action) => {
      return { loading: false, users: action.payload };
    },
    userListFail: (state, action) => {
      return { loading: false, error: action.payload };
    },
    userListReset: (state, action) => {
      return initialStateUserList;
    },
  },
});

// ======== DELETE USER REDUCERS ========
export const userDeleteReducers = createSlice({
  name: "userDelete",
  initialState: {},
  reducers: {
    userDeleteRequest: (state, action) => {
      return { loading: true };
    },
    userDeleteSuccess: (state, action) => {
      return { loading: false, success: true };
    },
    userDeleteFail: (state, action) => {
      return { loading: false, error: action.payload };
    },
  },
});

// ======== UPDATE USER BY ID REDUCERS ========
export const userUpdateIdReducers = createSlice({
  name: "upddate_by_id",
  initialState: {},
  reducers: {
    updateByIdRequest: (state, action) => {
      return {
        loading: true,
      };
    },
    updateByIdSuccess: (state, action) => {
      return {
        loading: false,
        success: true,
      };
    },
    updateByIdFail: (state, action) => {
      return {
        loading: false,
        error: action.payload,
      };
    },
    updateByIdReset: (state, action) => {
      return {};
    },
  },
});

// ======== EXPORT ACTIONS REDUCERS ========
export const { loginRequest, loginSuccess, loginFail, logoutUser } =
  loginReducers.actions;
export const { registerRequest, registerSuccess, registerFail } =
  registerReducers.actions;
export const { detailRequest, detailSuccess, detailFail, detailReset } =
  userDetailReducers.actions;
export const { updateRequest, updateSuccess, updateFail, updateReset } =
  userUpdateReducers.actions;
export const { userListRequest, userListSuccess, userListFail, userListReset } =
  userListReducers.actions;
export const { userDeleteRequest, userDeleteSuccess, userDeleteFail } =
  userDeleteReducers.actions;
export const {
  updateByIdRequest,
  updateByIdSuccess,
  updateByIdFail,
  updateByIdReset,
} = userUpdateIdReducers.actions;

const userReducers = {
  loginReducers,
  registerReducers,
  userDetailReducers,
  userUpdateReducers,
  userListReducers,
  userDeleteReducers,
  userUpdateIdReducers,
};

export default userReducers;

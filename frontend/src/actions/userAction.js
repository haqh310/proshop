import axios from "axios";

import {
  loginRequest,
  loginSuccess,
  loginFail,
  logoutUser,

  registerRequest,
  registerSuccess,
  registerFail,

  detailRequest,
  detailSuccess,
  detailFail,
  detailReset,

  updateRequest,
  updateSuccess,
  updateFail,
  updateReset,

  userListRequest,
  userListSuccess,
  userListFail,

  userDeleteRequest,
  userDeleteSuccess,
  userDeleteFail,

  updateByIdRequest,
  updateByIdSuccess,
  updateByIdFail,
  updateByIdReset,
} from "../reducers/userReducers";

import { orderMyListReset } from "../reducers/orderReducers"

// ======== LOGIN ACTIONS ========
export const login = (email, password) => async (dispatch, getState) => {
  let action = null;
  try {
    action = loginRequest();
    dispatch(action);

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/users/login/",
      { username: email, password: password },
      config
    );
    action = loginSuccess(data);
    dispatch(action);

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    action = loginFail(
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    );
    dispatch(action);
  }
};

// ======== LOGOUT ACTIONS ========
export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");

  let action = logoutUser();
  dispatch(action);

  action = resetUserDetail()
  dispatch(action)

  action = orderMyListReset()
  dispatch(action)
};

// ======== REGISTER ACTIONS ========
export const register = (name, email, password) => async (dispatch) => {
  let action = null;
  try {
    action = registerRequest();
    dispatch(action);

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/users/register/",
      { name, email, password },
      config
    );
    action = registerSuccess(data);
    dispatch(action);

    action = loginSuccess(data);
    dispatch(action);
  } catch (error) {
    action = registerFail(
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    );
    dispatch(action);
  }
};

// ======== USER PROFILE ACTIONS ========
export const getUserProfile = (id) => async (dispatch, getState) => {
  let action = null;
  try {
    action = detailRequest();
    dispatch(action);

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/users/${id}/`, config);
    action = detailSuccess(data);
    dispatch(action);
  } catch (error) {
    action = detailFail(
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    );
    dispatch(action);
  }
};

// ======== RESET USER DETAIL ACTIONS ========
export const resetUserDetail = () => (dispatch) => {
  const action = detailReset()
  dispatch(action)
}

// ======== UPDATE USER PROFILE ACTIONS ========
export const updateUserProfile = (user) => async (dispatch, getState) => {
  let action = null;
  try {
    action = updateRequest();
    dispatch(action);

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(
      `/api/users/profile/update/`,
      user,
      config
    );
    action = updateSuccess(data);
    dispatch(action);

    action = loginSuccess(data);
    dispatch(action);

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    action = updateFail(
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    );
    dispatch(action);
  }
};

// ======== RESET USER UPDATE ACTIONS ========
export const resetUserUpdate = () => (dispatch) => {
  const action = updateReset()
  dispatch(action)
}

// ======== LIST USER ACTIONS ========
export const listUsers = () => async (dispatch, getState) => {
  let action = null;
  try {
    action = userListRequest();
    dispatch(action);

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(
      `/api/users/`,
      config
    );
    action = userListSuccess(data);
    dispatch(action);
  } catch (error) {
    action = userListFail(
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    );
    dispatch(action);
  }
};

// ======== DELETE USER ACTIONS ========
export const deleteUser = (pk) => async(dispatch, getState) => {
  let action = null;
  try {
    action = userDeleteRequest();
    dispatch(action);

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.delete(
      `/api/users/delete/${pk}`,
      config
    );
    action = userDeleteSuccess(data);
    dispatch(action);

  } catch (error) {
    action = userDeleteFail(
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    );
    dispatch(action);
  }
}

// ======== UPDATE USER BY ID ACTIONS ========
export const updateUserById = (user, pk) => async(dispatch, getState) => {
  let action = null;
  try {
    action = updateByIdRequest();
    dispatch(action);

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(
      `/api/users/update/${pk}`,
      user,
      config
    );
    action = updateByIdSuccess();
    dispatch(action);

    action = detailSuccess(data)
    dispatch(action);
  } catch (error) {
    
    action = updateByIdFail(
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    );
    dispatch(action);
  }
}

// ======== UPDATE USER ID RESET ACTIONS ========
export const resetUserById = () => (dispatch) => {
  const action = updateByIdReset()
  dispatch(action)
}
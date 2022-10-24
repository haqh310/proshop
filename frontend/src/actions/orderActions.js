import axios from "axios";

import {
  createRequest,
  createSuccess,
  createFail,
  createReset,
  orderDetailRequest,
  orderDetailSuccess,
  orderDetailFail,
  orderPayRequest,
  orderPaySuccess,
  orderPayFail,
  orderPayReset,
  orderMyListRequest,
  orderMyListSuccess,
  orderMyListFail,
  orderListRequest,
  orderListSuccess,
  orderListFail,
  orderDeliverRequest,
  orderDeliverSuccess,
  orderDeliverFail,
  orderDeliverReset,
} from "../reducers/orderReducers";
import { clearItems } from "../reducers/cardReducers";

// ======== CREATE ORDER ACTIONS ========
export const createOrder = (order) => async (dispatch, getState) => {
  let action = null;
  try {
    action = createRequest();
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

    const { data } = await axios.post("/api/orders/add/", order, config);
    action = createSuccess(data);
    dispatch(action);

    action = clearItems();
    dispatch(action);

    localStorage.removeItem("cartItems");
  } catch (error) {
    action = createFail(
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    );
    dispatch(action);
  }
};

// ======== RESET ORDER CREATE ACTIONS ========
export const resetOrderCreate = () => (dispatch) => {
  const action = createReset();
  dispatch(action);
};

export const getOrderDetail = (id) => async (dispatch, getState) => {
  let action = null;
  try {
    action = orderDetailRequest();
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

    const { data } = await axios.get(`/api/orders/${id}/`, config);
    action = orderDetailSuccess(data);
    dispatch(action);
  } catch (error) {
    action = orderDetailFail(
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    );
    dispatch(action);
  }
};

// ======== PAY ORDER ACTIONS ========
export const payOrder = (id, paymentResult) => async (dispatch, getState) => {
  let action = null;
  try {
    action = orderPayRequest();
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
      `/api/orders/${id}/pay/`,
      paymentResult,
      config
    );
    action = orderPaySuccess(data);
    dispatch(action);
  } catch (error) {
    action = orderPayFail(
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    );
    dispatch(action);
  }
};

// ======== PAY ORDER RESET ACTIONS ========
export const payOrderReset = () => (dispatch) => {
  const action = orderPayReset();
  dispatch(action);
};

// ======== LIST MY ORDER ACTIONS ========
export const listMyOrder = () => async (dispatch, getState) => {
  let action = null;
  try {
    action = orderMyListRequest();
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

    const { data } = await axios.get(`/api/orders/myorders/`, config);
    action = orderMyListSuccess(data);
    dispatch(action);
  } catch (error) {
    action = orderMyListFail(
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    );
    dispatch(action);
  }
};

// ======== LIST ORDER ACTIONS ========
export const listOrder = () => async (dispatch, getState) => {
  let action = null;
  try {
    action = orderListRequest();
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

    const { data } = await axios.get(`/api/orders/`, config);
    action = orderListSuccess(data);
    dispatch(action);
  } catch (error) {
    action = orderListFail(
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    );
    dispatch(action);
  }
};

// ======== DELIVER ORDER ACTIONS ========
export const deliverOrder =
  (order) => async (dispatch, getState) => {
    let action = null;
    try {
      action = orderDeliverRequest();
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
        `/api/orders/${order._id}/deliver/`,
        {},
        config
      );
      action = orderDeliverSuccess(data);
      dispatch(action);
    } catch (error) {
      action = orderDeliverFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
      dispatch(action);
    }
  };

// ======== DELIVER ORDER RESET ACTIONS ========
export const deliverOrderReset = () => (dispatch) => {
  const action = orderDeliverReset();
  dispatch(action);
};

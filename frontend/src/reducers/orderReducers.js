import { createSlice } from "@reduxjs/toolkit";

// ======== ORDER CREATE REDUCERS ========
export const orderCreateReducers = createSlice({
  name: "orderCreate",
  initialState: {},
  reducers: {
    createRequest: (state, action) => {
      return { loading: true };
    },
    createSuccess: (state, action) => {
      return {
        loading: false,
        success: true,
        order: action.payload,
      };
    },
    createFail: (state, action) => {
      return {
        loading: false,
        error: action.payload,
      };
    },
    createReset: (state, action) => {
      return {};
    },
  },
});

// ======== ORDER DETAIL REDUCERS ========
const initialStateOrderDetail = {
  orderItems: [],
  shippingAddress: {},
};

export const orderDetailReducers = createSlice({
  name: "orderDetail",
  initialState: initialStateOrderDetail,
  reducers: {
    orderDetailRequest: (state, action) => {
      return {
        ...state,
        loading: true,
      };
    },
    orderDetailSuccess: (state, action) => {
      return {
        loading: false,
        order: action.payload,
      };
    },
    orderDetailFail: (state, action) => {
      return {
        loading: false,
        error: action.payload,
      };
    },
  },
});

// ======== ORDER PAY REDUCERS ========
const initialStateOrderPay = {
  success: false,
};

export const orderPayReducers = createSlice({
  name: "orderPay",
  initialState: initialStateOrderPay,
  reducers: {
    orderPayRequest: (state, action) => {
      return {
        loading: true,
      };
    },
    orderPaySuccess: (state, action) => {
      return {
        loading: false,
        success: true,
      };
    },
    orderPayFail: (state, action) => {
      return {
        loading: false,
        error: action.payload,
      };
    },
    orderPayReset: (state, action) => {
      return initialStateOrderPay;
    },
  },
});

// ======== MY LIST ORDER REDUCERS ========
const initialStateMyOrders = {
  orders: [],
};

export const orderMyListReducers = createSlice({
  name: "myOrder",
  initialState: initialStateMyOrders,
  reducers: {
    orderMyListRequest: (state, action) => {
      return {
        loading: true,
      };
    },
    orderMyListSuccess: (state, action) => {
      return {
        loading: false,
        orders: action.payload,
      };
    },
    orderMyListFail: (state, action) => {
      return {
        loading: false,
        error: action.payload,
      };
    },
    orderMyListReset: (state, action) => {
      return initialStateMyOrders;
    },
  },
});

// ======== LIST ORDER REDUCERS ========
const initialStateOrders = {
  orders: [],
  error: "",
};

export const orderListReducers = createSlice({
  name: "listOrder",
  initialState: initialStateOrders,
  reducers: {
    orderListRequest: (state, action) => {
      return {
        loading: true,
      };
    },
    orderListSuccess: (state, action) => {
      return {
        loading: false,
        orders: action.payload,
      };
    },
    orderListFail: (state, action) => {
      return {
        loading: false,
        error: action.payload,
      };
    },
  },
});

// ======== ORDER DELIVERED REDUCERS ========
export const orderDeliverReducers = createSlice({
  name: "orderDeliver",
  initialState: {},
  reducers: {
    orderDeliverRequest: (state, action) => {
      return {
        loading: true,
      };
    },
    orderDeliverSuccess: (state, action) => {
      return {
        loading: false,
        success: true,
      };
    },
    orderDeliverFail: (state, action) => {
      return {
        loading: false,
        error: action.payload,
      };
    },
    orderDeliverReset: (state, action) => {
      return {};
    },
  },
});

// ======== EXPORT ACTIONS REDUCERS ========
export const { createRequest, createSuccess, createFail, createReset } =
  orderCreateReducers.actions;
export const { orderDetailRequest, orderDetailSuccess, orderDetailFail } =
  orderDetailReducers.actions;
export const { orderPayRequest, orderPaySuccess, orderPayFail, orderPayReset } =
  orderPayReducers.actions;
export const {
  orderMyListRequest,
  orderMyListSuccess,
  orderMyListFail,
  orderMyListReset,
} = orderMyListReducers.actions;
export const { orderListRequest, orderListSuccess, orderListFail } =
  orderListReducers.actions;
export const {
  orderDeliverRequest,
  orderDeliverSuccess,
  orderDeliverFail,
  orderDeliverReset,
} = orderDeliverReducers.actions;

const ordderReducers = {
  orderCreateReducers,
  orderDetailReducers,
  orderPayReducers,
  orderMyListReducers,
  orderListReducers,
  orderDeliverReducers,
};

export default ordderReducers;

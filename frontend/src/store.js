import { configureStore } from "@reduxjs/toolkit";

import cardReducers from "./reducers/cardReducers";
import {
  productListReducers,
  productDetailReducers,
  productDeleteReducers,
  productCreateReducers,
  productUpdateReducers,
  productReviewCreateReducers,
  productTopReducers,
} from "./reducers/productReducers";
import {
  loginReducers,
  registerReducers,
  userDetailReducers,
  userUpdateReducers,
  userListReducers,
  userDeleteReducers,
  userUpdateIdReducers,
} from "./reducers/userReducers";
import {
  orderCreateReducers,
  orderDetailReducers,
  orderPayReducers,
  orderMyListReducers,
  orderListReducers,
  orderDeliverReducers,
} from "./reducers/orderReducers";

const store = configureStore({
  reducer: {
    productList: productListReducers.reducer,
    productTop: productTopReducers.reducer,
    productDetail: productDetailReducers.reducer,
    cart: cardReducers.reducer,

    userLogin: loginReducers.reducer,
    userRegister: registerReducers.reducer,
    userDetail: userDetailReducers.reducer,
    userUpdateProfile: userUpdateReducers.reducer,

    userList: userListReducers.reducer,
    userDelete: userDeleteReducers.reducer,
    userUpdateById: userUpdateIdReducers.reducer,

    productDelete: productDeleteReducers.reducer,
    productCreate: productCreateReducers.reducer,
    productUpdate: productUpdateReducers.reducer,

    productReviewCreate: productReviewCreateReducers.reducer,

    orderList: orderListReducers.reducer,
    orderCreate: orderCreateReducers.reducer,
    orderDetail: orderDetailReducers.reducer,
    orderPay: orderPayReducers.reducer,
    orderDeliver: orderDeliverReducers.reducer,
    orderMyList: orderMyListReducers.reducer,
  },
});

export default store;

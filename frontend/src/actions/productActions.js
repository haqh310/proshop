import axios from "axios";

import {
  listRequest,
  listSuccess,
  listFail,
  detailRequest,
  detailSuccess,
  detailFail,
  productDeleteRequest,
  productDeleteSuccess,
  productDeleteFail,
  productCreateRequest,
  productCreateSuccess,
  productCreateFail,
  productCreateReset,
  productUpdateRequest,
  productUpdateSuccess,
  productUpdateFail,
  productUpdateReset,
  reviewCreateRequest,
  reviewCreateSuccess,
  reviewCreateFail,
  reviewCreateReset,
  productTopRequest,
  productTopSuccess,
  productTopFail,
} from "../reducers/productReducers";

// ======== LIST PRODUCT ACTIONS ========
export const listProducts = (keyword = '') => async (dispatch) => {
  let action = null;
  try {
    action = listRequest();
    dispatch(action);

    const { data } = await axios.get(`/api/products${keyword}`);
    action = listSuccess(data);
    dispatch(action);
  } catch (error) {
    action = listFail(
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    );
    dispatch(action);
  }
};

// ======== DETAIL PRODUCT ACTIONS ========
export const detailProduct = (id) => async (dispatch) => {
  let action = null;
  try {
    action = detailRequest();
    dispatch(action);

    const { data } = await axios.get(`/api/products/${id}/`);
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

// ======== DELETE PRODUCT ACTIONS ========
export const deleteProduct = (id) => async (dispatch, getState) => {
  let action = null;
  try {
    action = productDeleteRequest();
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
    const { data } = await axios.delete(`/api/products/delete/${id}`, config);
    action = productDeleteSuccess(data);
    dispatch(action);
  } catch (error) {
    action = productDeleteFail(
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    );
    dispatch(action);
  }
};

// ======== CREATE PRODUCT ACTIONS ========
export const createProduct = () => async (dispatch, getState) => {
  let action = null;
  try {
    action = productCreateRequest();
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
    const { data } = await axios.post(`/api/products/create/`, {}, config);
    action = productCreateSuccess(data);
    dispatch(action);
  } catch (error) {
    action = productCreateFail(
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    );
    dispatch(action);
  }
};

// ======== RESET CREATE PRODUCT ACTIONS ========
export const resetProductCreate = () => (dispatch) => {
  const action = productCreateReset()
  dispatch(action)
}

// ======== UPDATE PRODUCT ACTIONS ========
export const updateProduct = (product) => async (dispatch, getState) => {
  let action = null;
  try {
    action = productUpdateRequest();
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
    const { data } = await axios.put(`/api/products/update/${product._id}`, product, config);
    action = productUpdateSuccess(data);
    dispatch(action);
  } catch (error) {
    action = productUpdateFail(
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    );
    dispatch(action);
  }
};

// ======== RESET UPDATE PRODUCT ACTIONS ========
export const resetProductUpdate = () => (dispatch) => {
  const action = productUpdateReset()
  dispatch(action)
}

// ======== CREATE PRODUCT REVIEW ACTIONS ========
export const createProductReview = (id, review) => async (dispatch, getState) => {
  let action = null;
  try {
    action = reviewCreateRequest();
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
    const { data } = await axios.post(`/api/products/${id}/reviews/`, review, config);
    action = reviewCreateSuccess(data);
    dispatch(action);
  } catch (error) {
    action = reviewCreateFail(
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    );
    dispatch(action);
  }
};

// ======== RESET CREATE PRODUCT REVIEW ACTIONS ========
export const resetCreateProductReview = () => (dispatch) => {
  const action = reviewCreateReset()
  dispatch(action)
}

// ======== LIST TOP PRODUCT ACTIONS ========
export const listTopProducts = () => async (dispatch) => {
  let action = null;
  try {
    action = productTopRequest();
    dispatch(action);

    const { data } = await axios.get('/api/products/top');
    action = productTopSuccess(data);
    dispatch(action);
  } catch (error) {
    action = productTopFail(
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    );
    dispatch(action);
  }
};
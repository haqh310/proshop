import { createSlice } from "@reduxjs/toolkit";

// ======== LIST PRODUCT REDUCER ========
const initialStateList = {
  products: [],
  error: "",
};

export const productListReducers = createSlice({
  name: "productList",
  initialState: initialStateList,
  reducers: {
    listRequest: (state, action) => {
      return { loading: true, products: [] };
    },

    listSuccess: (state, action) => {
      return { 
        loading: false, 
        products: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages,
       };
    },

    listFail: (state, action) => {
      return { loading: false, error: action.payload };
    },
  },
});

// ======== DETAIL PRODUCT REDUCER ========
const initialStateDetail = {
  product: { reviews: [] },
  error: "",
};

export const productDetailReducers = createSlice({
  name: "productDetail",
  initialState: initialStateDetail,
  reducers: {
    detailRequest: (state, action) => {
      return { loading: true, ...state };
    },
    detailSuccess: (state, action) => {
      return { loading: false, product: action.payload };
    },
    detailFail: (state, action) => {
      return { loading: false, error: action.payload };
    },
  },
});

// ======== PRODUCT DELETE REDUCERS ========
export const productDeleteReducers = createSlice({
  name: "productDelete",
  initialState: {},
  reducers: {
    productDeleteRequest: (state, action) => {
      return {
        loading: true,
      };
    },
    productDeleteSuccess: (state, action) => {
      return {
        loading: false,
        success: true,
      };
    },
    productDeleteFail: (state, action) => {
      return {
        loading: false,
        error: action.payload,
      };
    },
  },
});

// ======== PRODUCT CREATE REDUCERS ========
export const productCreateReducers = createSlice({
  name: "productCreate",
  initialState: {},
  reducers: {
    productCreateRequest: (state, action) => {
      return {
        loading: true,
      };
    },
    productCreateSuccess: (state, action) => {
      return {
        loading: false,
        success: true,
        product: action.payload,
      };
    },
    productCreateFail: (state, action) => {
      return {
        loading: false,
        error: action.payload,
      };
    },
    productCreateReset: (state, action) => {
        return {}
    }
  },
});

// ======== PRODUCT CREATE REDUCERS ========
export const productUpdateReducers = createSlice({
    name: 'productUpdate',
    initialState: {},
    reducers: {
        productUpdateRequest: (state, action) => {
            return {
              loading: true,
            };
          },
          productUpdateSuccess: (state, action) => {
            return {
              loading: false,
              success: true,
              product: action.payload,
            };
          },
          productUpdateFail: (state, action) => {
            return {
              loading: false,
              error: action.payload,
            };
          },
          productUpdateReset: (state, action) => {
              return {}
          }
    }
})

// ======== REVIEW CREATE REDUCERS ========
export const productReviewCreateReducers = createSlice({
  name: "reviewCreate",
  initialState: {},
  reducers: {
    reviewCreateRequest: (state, action) => {
      return {
        loading: true,
      };
    },
    reviewCreateSuccess: (state, action) => {
      return {
        loading: false,
        success: true,
      };
    },
    reviewCreateFail: (state, action) => {
      return {
        loading: false,
        error: action.payload,
      };
    },
    reviewCreateReset: (state, action) => {
      return {};
    },
  },
});

// ======== PRODUCT TOP REDUCERS ========
export const productTopReducers = createSlice({
  name: "productTop",
  initialState: {products: []},
  reducers: {
    productTopRequest: (state, action) => {
      return {
        loading: true,
        products: []
      };
    },
    productTopSuccess: (state, action) => {
      return {
        loading: false,
        products: action.payload,
      };
    },
    productTopFail: (state, action) => {
      return {
        loading: false,
        error: action.payload,
      };
    },
  },
});

// ======== EXPORT ACTIONS REDUCERS ========
export const { listRequest, listSuccess, listFail } =
  productListReducers.actions;
export const { detailRequest, detailSuccess, detailFail } =
  productDetailReducers.actions;
export const { productDeleteRequest, productDeleteSuccess, productDeleteFail } =
  productDeleteReducers.actions;
export const { productCreateRequest, productCreateSuccess, productCreateFail, productCreateReset } =
  productCreateReducers.actions;
export const { productUpdateRequest, productUpdateSuccess, productUpdateFail, productUpdateReset } =
  productUpdateReducers.actions;
export const {
    reviewCreateRequest,
    reviewCreateSuccess,
    reviewCreateFail,
    reviewCreateReset,
  } = productReviewCreateReducers.actions;
export const { productTopRequest, productTopSuccess, productTopFail } =
  productTopReducers.actions;
  
const productReducers = {
  productListReducers,
  productDetailReducers,
  productDeleteReducers,
  productCreateReducers,
  productUpdateReducers,
  productReviewCreateReducers,
  productTopReducers,
};
export default productReducers;

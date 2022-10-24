import axios from "axios"

import { addItem, removeItem, saveAddress, paymentMethod } from '../reducers/cardReducers'

// ======== ADD PRDOUCT TO CART ACTIONS ========
export const addToCart = (id, quantity) => async(dispatch, getState) => {
    const { data } = await axios.get(`/api/products/${id}`)

    const action = addItem({
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        quantity
    })
    dispatch(action)

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

// ======== REMOVE PRDOUCT FROM CART ACTIONS ========
export const removeFromCart = (id) => (dispatch, getState) => {
    const action = removeItem({id: id})
    dispatch(action)

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))    
}

// ======== SAVE SIPPING ADDRESS ACTIONS ========
export const saveShippingAddress = (data) => (dispatch) => {
    const action = saveAddress(data)
    dispatch(action)

    localStorage.setItem('shippingAddress', JSON.stringify(data))    
}

// ======== SAVE PAYMENT METHOD ACTIONS ========
export const savePaymentMethod = (data) => (dispatch) => {
    const action = paymentMethod(data)
    dispatch(action)

    localStorage.setItem('paymentMethod', JSON.stringify(data))
}
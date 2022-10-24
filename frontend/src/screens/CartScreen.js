import React, { useEffect } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Image, ListGroup, Row, Form, Button, Card } from 'react-bootstrap';

import { addToCart, removeFromCart } from '../actions/cartActions'
import Message from '../components/Message';

function CartScreen() {
  const { id } = useParams()
  const search = useLocation().search
  const quantity = new URLSearchParams(search).get('quantity');
  
  const dispatch = useDispatch()

  const cart = useSelector(state => state.cart)
  const { cartItems } = cart

  useEffect(() => {
    if (id && quantity) {
      dispatch(addToCart(id, quantity))
    }
  }, [dispatch, id, quantity])

  const removeCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {
          cartItems.length === 0 ? (
            <Message variant='info'>
              Your cart is emty <Link to='/'>Go Back</Link>
            </Message>
          ) : (
            <ListGroup variant='flush'>
              {cartItems.map(item => (
                <ListGroup.Item key={item.product}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} className="w-100"/>
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>
                      ${item.price}
                    </Col>
                    <Col md={3}>
                      <Form.Select 
                        value={item.quantity}
                        onChange={e => dispatch(addToCart(item.product, e.target.value))}>
                          {
                            [...Array(item.countInStock).keys()].map(x => (
                              <option key={x + 1} value={ x + 1}>
                                {x + 1}
                              </option>
                            ))
                          }
                      </Form.Select>
                    </Col>
                    <Col md={1}>
                      <Button
                        type='button'
                        variant='light'
                        onClick={() => removeCartHandler(item.product) }>
                          <i className='fa fa-trash'></i>
                        </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )
        }
      </Col>
      <Col md={4} className='mt-4'>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Subtotal ({cartItems.reduce((acc, item) => acc += item.quantity, 0)}) items</h2>
              ${cartItems.reduce((sum, item) => sum += item.quantity * item.price, 0).toFixed(2)}
            </ListGroup.Item>

            <ListGroup.Item>
              <Link to={'/shipping'}>
              <Button 
                type='button'
                className='btn-block w-100'
                disabled={cartItems.length === 0 }>
                  Proceed To Checkout
                </Button>
                </Link>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}

export default CartScreen
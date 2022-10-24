import React, { useEffect, useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { register } from "../actions/userAction";


function RegisterScreen() {
    const [name, setName] = useState('')
    const [email ,setEmail] = useState('')
    const [password ,setPassword] = useState('')
    const [confirmPassword ,setConfirmPassword] = useState('')
    const [message ,setMessage] = useState('')

    const search = useLocation().search
    const redirect = search ? new URLSearchParams(search).get('email') :  '/'

    const userRegister = useSelector(state => state.userRegister)
    const { error, loading, userInfo } = userRegister

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [navigate, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            setMessage("Message do not match.")
        } else {
            dispatch(register(name, email, password))
        }
    }
  return (
    <FormContainer>
        <h1>Sign Up</h1>
        {message &&  <Message variant={'danger'}>{message}</Message>}
        {error && <Message variant={'danger'}>{error}</Message>}
        {loading && <Loader/>}

        <Form onSubmit={submitHandler}>
            <Form.Group controlId="name" className="mb-3">
                <Form.Label>Name:</Form.Label>
                <Form.Control 
                    required
                    type="text"
                    placeholder="Enter Name..."
                    value={name}
                    onChange={e => setName(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="email" className="mb-3">
                <Form.Label>Email Address:</Form.Label>
                <Form.Control
                    required 
                    type="email"
                    placeholder="Enter Email..."
                    value={email}
                    onChange={e => setEmail(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="password" className="mb-3">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                    required 
                    type="password"
                    placeholder="Enter Password..."
                    value={password}
                    onChange={e => setPassword(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="confirm_password" className="mb-3">
                <Form.Label>Confirm Password:</Form.Label>
                <Form.Control 
                    required
                    type="password"
                    placeholder="Enter Confirm Password..."
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}>
                </Form.Control>
            </Form.Group>

            <Button
                type="submit"
                variant="primary"
                className="mt-3">
                    Register
            </Button>
        </Form>

        <Row className="py-3">
            <Col>
                Have an account ? <Link to={redirect ? `/login?redirect=${redirect}` : '/register'}>Sign In</Link>
            </Col>
        </Row>
    </FormContainer>
  )
}

export default RegisterScreen
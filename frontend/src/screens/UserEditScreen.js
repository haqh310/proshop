import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

import { getUserProfile, updateUserById, resetUserById } from "../actions/userAction";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import Message from "../components/Message";


function UserEditScreen() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const userDetail = useSelector((state) => state.userDetail);
  const { error, loading, user } = userDetail;

  const userUpdateById = useSelector(state => state.userUpdateById)
  const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = userUpdateById

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (successUpdate) {
        dispatch(resetUserById())
        navigate('/admin/users')
    }

    if (!user || user.id !== Number(id)) {
      dispatch(getUserProfile(id));
    } else {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [dispatch, navigate, user, id, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateUserById(
        {
          name,
          email,
          isAdmin,
        },
        id
      )
    );
  };
  return (
    <div>
      <Link to="/admin/users" className="btn btn-light my-3">
        Go back
      </Link>

      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name" className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="email" className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="isadmin" className="mb-3">
              <Form.Check
                type="checkbox"
                label="Is Admin"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </div>
  );
}

export default UserEditScreen;

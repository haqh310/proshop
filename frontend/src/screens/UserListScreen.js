import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Table } from "react-bootstrap";

import { listUsers, deleteUser } from "../actions/userAction";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import ModalCustom from "../components/ModalCustom";

function UserListScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate, userInfo, successDelete]);

  const [modalShow, setModalShow] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [userIdDelete, setUserIdDelete] = useState(null);
  const showModalHandler = (id, name) => {
    setUserIdDelete(id);
    setModalContent(`Are you want delete user: ${name}???`);
    setModalShow(true);
  };

  const deleteUserConfirm = (status) => {
    if (status) {
      dispatch(deleteUser(userIdDelete));
    }
    setModalShow(false);
  };
  return (
    <div>
      <h1>Users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant={"danger"}>{error}</Message>
      ) : (
        <div>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>ADMIN</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user._id}>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      {user.isAdmin ? (
                        <i className="fas fa-check text-success"></i>
                      ) : (
                        <i className="fas fa-times text-danger"></i>
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`/admin/user/${user._id}/edit`}>
                        <Button variant="light" className="btn-sm">
                          <i className="fas fa-edit"></i>
                        </Button>
                      </LinkContainer>
                      <Button
                        variant="danger"
                        className="btn-sm"
                        onClick={() => showModalHandler(user._id, user.name)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center text-danger">
                    User is empty.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
          <ModalCustom
            show={modalShow}
            handleClose={deleteUserConfirm}
            title={"Delete User"}
            content={modalContent}
          ></ModalCustom>
        </div>
      )}
    </div>
  );
}

export default UserListScreen;

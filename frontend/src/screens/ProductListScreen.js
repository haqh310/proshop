import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Row, Table, Col, Image } from "react-bootstrap";

import {
  listProducts,
  deleteProduct,
  createProduct,
  resetProductCreate,
} from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { LinkContainer } from "react-router-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import ModalCustom from "../components/ModalCustom";
import Paginate from "../components/Paginate";

function ProductListScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;
  console.log(loading);
  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const keyword = location.search;
  useEffect(() => {
    dispatch(resetProductCreate());
    if (!userInfo.isAdmin) {
      navigate("/login");
    }
    if (successCreate) {
      navigate(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts(keyword));
    }
  }, [
    dispatch,
    navigate,
    userInfo,
    createdProduct,
    successDelete,
    successCreate,
    keyword,
  ]);

  const [modalShow, setModalShow] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [productIdDelete, setProductIdDelete] = useState(null);

  const showModalHandler = (id, name) => {
    setProductIdDelete(id);
    setModalContent(`Are you want delete product: ${name}???`);
    setModalShow(true);
  };

  const deleteProductConfirm = (status) => {
    if (status) {
      dispatch(deleteProduct(productIdDelete));
    }
    setModalShow(false);
  };

  const createProductHandler = () => {
    dispatch(createProduct());
  };
  return (
    <div>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-right d-flex justify-content-end">
          <Button className="my-3" onClick={createProductHandler}>
            <i className="fas fa-plus"></i> Create Product
          </Button>
        </Col>
      </Row>
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant={"danger"}>{errorCreate}</Message>}

      {loadingDelete && <Loader />}
      {errorDelete && <Message variant={"danger"}>{errorDelete}</Message>}

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
                <th>IMAGE</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((product) => (
                  <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td className="col-md-1 py-2">
                      <Image src={product.image} className="w-100"></Image>
                    </td>
                    <td>${product.price}</td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>
                    <td>
                      <LinkContainer to={`/admin/product/${product._id}/edit`}>
                        <Button variant="light" className="btn-sm">
                          <i className="fas fa-edit"></i>
                        </Button>
                      </LinkContainer>
                      <Button
                        variant="danger"
                        className="btn-sm"
                        onClick={() =>
                          showModalHandler(product._id, product.name)
                        }
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center text-danger">
                    Product is empty.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
          <Paginate page={page} pages={pages} isAdmin={true} />

          {/* Modal Delete */}
          <ModalCustom
            show={modalShow}
            handleClose={deleteProductConfirm}
            title={"Delete Product"}
            content={modalContent}
          ></ModalCustom>
        </div>
      )}
    </div>
  );
}

export default ProductListScreen;

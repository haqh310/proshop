import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import FormContainer from "../components/FormContainer";
import {
  resetProductUpdate,
  detailProduct,
  updateProduct,
} from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

function ProductEditScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  const productDetail = useSelector((state) => state.productDetail);
  const { error, loading, product } = productDetail;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    error: errorUpdate,
    loading: loadingUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch(resetProductUpdate());
      navigate("/admin/products");
    } else {
      if (!product.name || product._id !== Number(id)) {
        dispatch(detailProduct(id));
      } else {
        setName(product.name);
        setPrice(product.price);
        const fileName = product.image.split("/")[2];
        setImage(fileName);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
      }
    }
  }, [dispatch, navigate, product, successUpdate, id]);

  const uploadFileHandler = async (e) => {
    const imageFile = e.target.files[0];
    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("product_id", id);
    setUploading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      await axios.post("/api/products/upload/", formData, config);
      setImage(imageFile.name);
      setUploading(false);
    } catch (error) {
      setUploading(false);
    }
  };
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateProduct({
        _id: id,
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
      })
    );
  };
  return (
    <div>
      <Link to={"/admin/products"} className="btn btn-light">
        Go back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
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

            <Form.Group controlId="price" className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Row className="mb-3">
              <Form.Label>Image</Form.Label>
              <Col className="col-3 ">
                <Form.Group>
                  <Form.Control
                    type="file"
                    id="image-file"
                    onChange={uploadFileHandler}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col className="col-9 px-0">
                <Form.Group>
                  <Form.Control
                    type="text"
                    id="image-text"
                    value={image}
                    readOnly
                  ></Form.Control>
                </Form.Group>
              </Col>
              {uploading && <Loader />}
            </Row>
            <Form.Group controlId="brand" className="mb-3">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="countinstock" className="mb-3">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Stock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="category" className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="description" className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
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

export default ProductEditScreen;

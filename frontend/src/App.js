import { Container } from "react-bootstrap";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderListScreen from "./screens/OrderListScreen";

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Container>
          <Routes>
            {/* PRODUCTS */}
            <Route path="/" element={<HomeScreen/>}/>
            <Route path="/product/:id" element={<ProductScreen/>}/>
            {/* CART && SHIPPING */}
            <Route path="/cart/:id" element={<CartScreen/>}/>
            <Route path="/cart" element={<CartScreen/>}/>
            <Route path="/shipping" element={<ShippingScreen/>}/>
            <Route path="/payment" element={<PaymentScreen/>}/>
            <Route path="/placeorder" element={<PlaceOrderScreen/>}/>
            <Route path="/order/:id" element={<OrderScreen/>}/>
            {/* USER */}
            <Route path="/login" element={<LoginScreen/>}/>
            <Route path="/register" element={<RegisterScreen/>}/>
            <Route path="/profile" element={<ProfileScreen/>}/>
            {/* ADMIN */}
            <Route path="/admin/users" element={<UserListScreen/>}/>
            <Route path="admin/user/:id/edit" element={<UserEditScreen/>}/>
            <Route path="admin/products" element={<ProductListScreen/>}/>
            <Route path="admin/product/:id/edit" element={<ProductEditScreen/>}/>
            <Route path="admin/orders" element={<OrderListScreen/>}/>
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;

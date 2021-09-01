import React, { useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/Home";
import Header from "./components/nav/Header";
import RegisterComplete from "./pages/auth/RegisterComplete";
import ForgotPassword from "./pages/auth/ForgotPassword";
import History from "./pages/user/History";
import UserRoute from "./components/routes/UserRoute";
import AdminRoute from "./components/routes/AdminRoute";
import Password from "./pages/user/Password";
import Wishlist from "./pages/user/Wishlist";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CategoryCreate from "./pages/admin/category/CategoryCreate";
import CategoryUpdate from "./pages/admin/category/CategoryUpdate";
import SubCreate from "./pages/admin/sub/SubCreate";
import SubUpdate from "./pages/admin/sub/SubUpdate";
import ProductCreate from "./pages/admin/product/ProductCreate";
import AllProducts from "./pages/admin/product/AllProducts";
import ProductUpdate from "./pages/admin/product/ProductUpdate";
import Product from "../src/pages/Product";
import CategoryHome from "../src/pages/category/CategoryHome";
import SubHome from "../src/pages/sub/SubHome";
import Shop from "./pages/Shop";
import Cart from "../src/pages/Cart";
import SideDrawer from "../src/components/drawer/SideDrawer";
import Checkout from "./pages/Checkout";
import CreateCouponPage from "../src/pages/admin/coupon/CreateCouponPage";
import Payment from './pages/Payment';
import { auth } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { currentUser } from "./functions/auth";
import { Footer } from "./components/footer/Footer";
import { AllBrands } from "./pages/brands/AllBrands";
import { isAuthenticated, logout } from "./functions/setLoginInfo";



const App = () => {
  const user = isAuthenticated();

  // to check auth state
  useEffect(() => {
      if(user) {
         currentUser(localStorage.getItem('token'));
      } else {
        logout(() => { });
      }
    return () => {
      
    }
  }, []);

  return (
    <>
      <Header />
      <ToastContainer />
      <SideDrawer />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/register/complete" component={RegisterComplete} />
        <Route exact path="/forgot/password" component={ForgotPassword} />
        <UserRoute exact path="/user/history" component={History} />
        <UserRoute exact path="/user/password" component={Password} />
        <UserRoute exact path="/user/wishlist" component={Wishlist} />
        <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
        <AdminRoute exact path="/admin/category" component={CategoryCreate} />
        <AdminRoute exact path="/admin/category/:slug" component={CategoryUpdate} />
        <AdminRoute exact path="/admin/sub" component={SubCreate} />
        <AdminRoute exact path="/admin/sub/:slug" component={SubUpdate} />
        <AdminRoute exact path="/admin/product" component={ProductCreate} />
        <AdminRoute exact path="/admin/products" component={AllProducts} />
        <AdminRoute exact path="/admin/product/:slug" component={ProductUpdate} />
        <Route exact path="/product/:slug" component={Product} />
        <Route exact path="/all-brands" component={AllBrands} />
        <Route exact path="/category/:slug" component={CategoryHome} />
        <Route exact path="/sub/:slug" component={SubHome} />
        <Route exact path="/shop" component={Shop} />
        <Route exact path="/cart" component={Cart} />
        <UserRoute exact path="/checkout" component={Checkout} />
        <AdminRoute exact path="/admin/coupon" component={CreateCouponPage} />
        <UserRoute exact path="/payment" component={Payment} />
      </Switch>
      <Footer />
    </>
  );
};

export default App;
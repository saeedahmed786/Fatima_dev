import React, { useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/Home";
import Header from "./components/nav/Header";
import RegisterComplete from "./pages/auth/RegisterComplete";
import ForgotPassword, { SendResetPasswordLink } from "./pages/auth/sendResetPasswordLink";
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
import { currentUser } from "./functions/auth";
import { Footer } from "./components/footer/Footer";
import { AllBrands } from "./pages/brands/AllBrands";
import { isAuthenticated, logout } from "./functions/setLoginInfo";
import BrandCreate from "./pages/admin/brands/BrandCreate";
import BrandUpdate from "./pages/admin/brands/BrandUpdate";
import BrandShop from "./pages/BrandShop";
import { CustomerServices } from "./pages/CustomerServices";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { Delivery } from "./pages/Delivery";
import { ReturnsOrExchanges } from "./pages/ReturnsOrExchanges";
import { UpdatePassword } from "./pages/auth/UpdatePassword";
import { NavFilters } from "./pages/NavFilters";
import { MobileBottomNav } from "./components/nav/mobileBottomNav";



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
    <div className = 'app'>
      <Header />
      <ToastContainer />
      <SideDrawer />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/register/complete" component={RegisterComplete} />
        <Route exact path="/forgot/password" component={SendResetPasswordLink} />
        <Route exact path="/update/password/:token" component={UpdatePassword} />
        <UserRoute exact path="/user/history" component={History} />
        <UserRoute exact path="/user/password" component={Password} />
        <UserRoute exact path="/user/wishlist" component={Wishlist} />
        <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
        <AdminRoute exact path="/admin/brand" component={BrandCreate} />
        <AdminRoute exact path="/admin/brand/:slug" component={BrandUpdate} />
        <AdminRoute exact path="/admin/category" component={CategoryCreate} />
        <AdminRoute exact path="/admin/category/:slug" component={CategoryUpdate} />
        <AdminRoute exact path="/admin/sub" component={SubCreate} />
        <AdminRoute exact path="/admin/sub/:slug" component={SubUpdate} />
        <AdminRoute exact path="/admin/product" component={ProductCreate} />
        <AdminRoute exact path="/admin/products" component={AllProducts} />
        <AdminRoute exact path="/admin/product/:slug" component={ProductUpdate} />
        <Route exact path="/product/:slug" component={Product} />
        <Route exact path="/category/:slug" component={CategoryHome} />
        <Route exact path="/sub/:slug" component={SubHome} />
        <Route exact path="/shop" component={Shop} />
        <Route exact path="/category" component={NavFilters} />
        <Route exact path="/brand/:slug" component={BrandShop} />
        <Route exact path="/cart" component={Cart} />
        <UserRoute exact path="/checkout" component={Checkout} />
        <AdminRoute exact path="/admin/coupon" component={CreateCouponPage} />
        <UserRoute exact path="/payment" component={Payment} />
        <Route exact path="/customer-services" component={CustomerServices} />
        <Route exact path="/privacy-policy" component={PrivacyPolicy} />
        <Route exact path="/delivery" component={Delivery} />
        <Route exact path="/returns/exchanges" component={ReturnsOrExchanges} />
      </Switch>
      <Footer />
      <MobileBottomNav/>
    </div>
  );
};

export default App;
// import React from "react";
// import { Link } from "react-router-dom";

// const AdminNav = () => (
//   <nav>
//     <ul className="nav flex-column">
//       <li className="nav-item">
//         <br/>
//         <Link to="/admin/dashboard" className="nav-link"> <br/><br/>
//           Dashboard
//         </Link>
//       </li>

//       <li className="nav-item">
//         <Link to="/admin/product" className="nav-link">
//           Product
//         </Link>
//       </li>

//       <li className="nav-item">
//         <Link to="/admin/products" className="nav-link">
//           Products
//         </Link>
//       </li>

//       <li className="nav-item">
//         <Link to="/admin/category" className="nav-link">
//           Category
//         </Link>
//       </li>

//       <li className="nav-item">
//         <Link to="/admin/sub" className="nav-link">
//           Sub Category
//         </Link>
//       </li>

//       <li className="nav-item">
//         <Link to="/admin/coupon" className="nav-link">
//           Coupon
//         </Link>
//       </li>

//       <li className="nav-item">
//         <Link to="/user/password" className="nav-link">
//           Password
//         </Link>
//       </li>
//     </ul>
//   </nav>
// );

// export default AdminNav;
import React from "react";
import { Link } from "react-router-dom";

const AdminNav = () => (
  <nav>
    <br/>
    <ul className="colo">
      <li className="nav-item">
        <Link to="/admin/dashboard" className="nav-link Link ex3 ">
          Dashboard
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/admin/product" className="nav-link Link ex3">
          Product
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/admin/products" className="nav-link Link ex3">
          Products
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/admin/category" className="nav-link Link ex3">
          Category
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/admin/sub" className="nav-link Link ex3">
          Sub Category
        </Link>
      </li>

      <li className="nav-item ">
        <Link to="/admin/coupon" className="nav-link Link ex3">
          Coupon
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/admin/password" className="nav-link Link ex3">
          Password
        </Link>
      </li>
    </ul>
  </nav>
);

export default AdminNav;
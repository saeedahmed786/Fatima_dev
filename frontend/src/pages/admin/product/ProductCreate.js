import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { createProduct } from "../../../functions/product";
import ProductCreateForm from "../../../components/forms/ProductCreateForm";
import { getCategories, getCategorySubs } from "../../../functions/category";
import FileUpload from "../../../components/forms/FileUpload";
import {LoadingOutlined } from "@ant-design/icons";

const initialState = {
  title: "",
  description: "",
  price: "",
  categories: [],
  category: "",
  subs: [],
  shipping: "",
  quantity: "",
  images: [],
  colors: ["Black", "Brown", "Silver", "White", "Blue"],
  // brands: [
  // "BOSS","DKNY","Nikolia",
  // "AIGNER","ICEBERG","Chloe",
  // "NANA","MSGM","ALONDRA",
  // "ELISABETTA FRANCHI","JUNONA",
  // "KENZO","GIVENCHY",
  // "FENDI","SPERANZA",
  // "RALPH LAUREN","NEIL BARRETT",
  // "EMPORIO ARMANI","EMILIO PUCCI",
  // "CAMBRASS","KARL","MOSCHINO",
  // "BALMAIN","ALVIERO MARTINI","MARCELLO BURLON",
  // "MONNALISA","PASITO A PASITTO","BIKKIMBERG",
  // "ROBERTO CAVALLI","HUCKLEBONES","JOHN RICHMOUND",
  // "SIMONETTA","IL GUFO","SOPHIE LA GIRAFE",
  // "RASPBERRY PLUM","GRACI","CALVINKLEIN JEANS",
  // "LARANJINHA","BUGATTI","THEOPHILE & PATACHOU",
  // "TARTINE ET CHOCOLAT","THE MARC JACOBS"],
  color: "",
  brand: "",
};


const ProductCreate = () => {
  const [values, setValues] = useState(initialState);
  const [subOptions, setSubOptions] = useState([]);
  const [showSub, setShowSub] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => setValues({ ...values, categories: c.data }));

  const handleSubmit = (e) => {
    e.preventDefault();
    createProduct(values, localStorage.getItem('token'))
      .then((res) => {
        console.log(res);
        window.alert(`"${res.data.title}" is created`);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        // if (err.response.status === 400) toast.error(err.response.data);
        toast.error(err.response.data.err);
      });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    // console.log(e.target.name, " ----- ", e.target.value);
  };

  const handleCatagoryChange = (e) => {
    e.preventDefault();
    console.log("CLICKED CATEGORY", e.target.value);
    setValues({ ...values, subs: [], category: e.target.value });
    getCategorySubs(e.target.value).then((res) => {
      console.log("SUB OPTIONS ON CATGORY CLICK", res);
      setSubOptions(res.data);
    });
    setShowSub(true);
  };

  console.log(values);
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col-md-10">
          {loading ? <LoadingOutlined className="text-danger h1"/> : <h4>Product create</h4>}
          <hr />

          {JSON.stringify(values.images)}

          <div className="p-3">
          <FileUpload 
            values={values} 
            setValues={setValues} 
            setLoading={setLoading}/>
          </div>

          <ProductCreateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            setValues={setValues}
            values={values}
            handleCatagoryChange={handleCatagoryChange}
            subOptions={subOptions}
            showSub={showSub}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;
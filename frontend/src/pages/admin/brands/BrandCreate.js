import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import LocalSearch from "../../../components/forms/LocalSearch";
import { createBrand, getBrand, getBrands, removeBrand } from "../../../functions/brand";
import SkeletonImage from "antd/lib/skeleton/Image";
import axios from "axios";
import FileUpload from "../../../components/forms/FileUpload";
import { urlencoded } from "body-parser";

const BrandCreate = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [brands, setBrands] = useState([]);
  const [values, setValues] = useState([]);
  const [file, setFile] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [publicId, setPublicId] = useState('');
  // step 1
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    loadBrands();
  }, []);

  const loadBrands = () =>
    getBrands().then((c) => setBrands(c.data));

    const handleFileChange = async (e) => {
      // setFile(e.target.files[0]);
      setLoading(true);
      let data = new FormData();
      data.append('file', e.target.files[0]);
      await axios
      .post(
          `${process.env.REACT_APP_API}/uploadimages`,
           data,
          {
            headers: {
              authorization : 'Bearer ' + localStorage.getItem('token')
            },
          }
        ).then(res => {
             if(res.status === 200) {
                 setLoading(false);
                 setImageUrl(res.data.url);
                 setPublicId(res.data.public_id);
             } else {
                setLoading(false);
                toast.error('file upload fail');
             }
        })
    }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name);
    setLoading(true);
    createBrand( name, imageUrl, publicId, localStorage.getItem('token'))
      .then(res => {
        console.log(res)
        setLoading(false);
        setName("");
        toast.success(`Brand created successfully`);
        loadBrands();
      })
      
  };
  console.log(values);

  const handleRemove = async (slug) => {
    // let answer = window.confirm("Delete?");
    // console.log(answer, slug);
    if (window.confirm("Delete?")) {
      setLoading(true);
      removeBrand(slug, localStorage.getItem('token'))
        .then((res) => {
          setLoading(false);
          toast.error(`${res.data.name} deleted`);
          loadBrands();
        })
        .catch((err) => {
          if (err.response.status === 400) {
            setLoading(false);
            toast.error(err.response.data);
          }
        });
    }
  };

  // step 4
  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          {loading ? (
            <h4 className="text-danger">Loading..</h4>
          ) : (
            <h4>Create brand</h4>
          )}
       
       <form onSubmit={handleSubmit} className = 'product-forms'>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setName(e.target.value)}
            value={name}
            autoFocus
            required
          />
          <br />
        </div>
        <div className="form-group">
          <label>Select Brand Logo:</label>
          <input
            type="file"
            name = "file"
            className="form-control"
            onChange={handleFileChange}
            autoFocus
            // required
          />
          <br />
          <button className="btn btn-outline-primary" type = 'submit'>Save</button>
        </div>
      </form>
            <br/>
          {/* step 2 and step 3 */}
          <LocalSearch keyword={keyword} setKeyword={setKeyword} />

          {/* step 5 */}
          {brands.length > 0 && brands.filter(searched(keyword)).map((c) => (
            <div className="lists" key={c._id}>
              <span className = 'name'>
              {c.name}
              </span>
              <span
                onClick={() => handleRemove(c.slug)}
                className = "float-end"
              >
                <DeleteOutlined className="text-danger" />
              </span>
              <Link to={`/admin/brand/${c.slug}`}>
                <span className="float-end">
                  <EditOutlined className="text-warning" />
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandCreate;
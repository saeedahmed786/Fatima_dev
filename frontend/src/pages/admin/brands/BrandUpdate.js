import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { getBrand, updateBrand } from "../../../functions/brand";
import axios from "axios";

const BrandUpdate = ({ history, match }) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [publicId, setPublicId] = useState('');

  useEffect(() => {
    loadBrand();
  }, []);


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

  const loadBrand = () =>
    getBrand(match.params.slug).then((c) => {
      setName(c.data.brand.name);
      setImageUrl(c.data.brand.image);
      setPublicId(c.data.brand.public_id);
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(name);
    setLoading(true);
    updateBrand(match.params.slug, name, imageUrl, publicId, localStorage.getItem('token'))
      .then((res) => {
        console.log(res)
        setLoading(false);
        setName("");
        toast.success(`"${res.data.name}" is updated`);
        history.push("/admin/brand");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        toast.error(err);
      });
  };

  // const BrandForm = () => (
  //   <form onSubmit={handleSubmit}>
  //     <div className="form-group">
  //       <label>Name</label>
  //       <input
  //         type="text"
  //         className="form-control"
  //         onChange={(e) => setName(e.target.value)}
  //         value={name}
  //         autoFocus
  //         required
  //       />
  //       <br />
  //       <button className="btn btn-outline-primary">Save</button>
  //     </div>
  //   </form>
  // );
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
            <h4>Update Brand</h4>
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
              <label>Select Brand Logo</label>
              <input
                type="file"
                name = 'file'
                className="form-control"
                onChange={handleFileChange}
                autoFocus
              />
              <br />
              <button className="btn btn-outline-primary" type = 'submit'>Save</button>
            </div>
          </form>
        
          <hr />
        </div>
      </div>
    </div>
  );
};

export default BrandUpdate;
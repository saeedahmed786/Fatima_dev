import React from "react";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { useSelector } from "react-redux";
import { Avatar, Badge } from "antd";



const FileUpload = ({ values, setValues, setLoading }) => {
  const { user } = useSelector((state) => ({ ...state }));

  const fileUploadAndResize = (e) => {
    console.log(e.target.files);
    // resize
    let files = e.target.files; // 3
    let allUploadedFiles = values && values.images;

    if (files) {
      setLoading(true);
      let data = new FormData();
      for(let file of files) {
      data.append('file', file);
      }
      axios
            .post(
                `${process.env.REACT_APP_API}/uploadimages`,
                 data,
                {
                  headers: {
                    authorization : 'Bearer ' + localStorage.getItem('token')
                  },
                }
              )
              .then((res) => {
                // console.log("IMAGE UPLOAD RES DATA", res);
                setLoading(false);
                allUploadedFiles.push(res.data);

                setValues({ ...values, images: allUploadedFiles });
              })
              .catch((err) => {
                setLoading(false);
                console.log("CLOUDINARY UPLOAD ERR", err);
              });


      // for (let i = 0; i < files.length; i++) {
      //   Resizer.imageFileResizer(
      //     files[i],
      //     720,
      //     720,
      //     "JPEG",
      //     100,
      //     0,
      //     (uri) => {
      //       // console.log(uri);
      //       axios
      //         .post(
      //           `${process.env.REACT_APP_API}/uploadimages`,
      //           { image: uri },
      //           {
      //             headers: {
      //               authorization : 'Bearer ' + localStorage.getItem('token')
      //             },
      //           }
      //         )
      //         .then((res) => {
      //           console.log("IMAGE UPLOAD RES DATA", res);
      //           setLoading(false);
      //           allUploadedFiles.push(res.data);

      //           setValues({ ...values, images: allUploadedFiles });
      //         })
      //         .catch((err) => {
      //           setLoading(false);
      //           console.log("CLOUDINARY UPLOAD ERR", err);
      //         });
      //     },
      //     "base64"
      //   );
      // }
    }
    // send back to server to upload to cloudinary
    // set url to images[] in the parent component state - ProductCreate
  };

  const handleImageRemove = (public_id) => {
    setLoading(true);
    // console.log("remove image", public_id);
    axios
      .post(
        `${process.env.REACT_APP_API}/removeimage`,
        { public_id },
        {
          headers: {
            authorization : 'Bearer ' + localStorage.getItem('token')
          },
        }
      )
      .then((res) => {
        setLoading(false);
        const { images } = values;
        let filteredImages = images.filter((item) => {
          return item.public_id !== public_id;
        });
        setValues({ ...values, images: filteredImages });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <>
      <div className="row">
        {values.images &&
          values.images.map((image) => (
            <Badge
              count="X"
              key={image.public_id}
              onClick={() => handleImageRemove(image.public_id)}
              style={{ cursor: "pointer" }}
            >
              <Avatar
                src={image.url}
                size={100}
                shape="square"
                className="ml-3"
              />
            </Badge>
          ))}
      </div>
      <div className="row" style = {{width: '40%'}}>
        <label className="mt-3 p-2" style = {{border: '3px solid #ae853b', borderRadius: '8px', color: '#ae853b'}}>
          Choose File
          <input
            type="file"
            multiple
            hidden
            accept="images/*"
            onChange={fileUploadAndResize}
          />
        </label>
      </div>
    </>
  );
};

export default FileUpload;
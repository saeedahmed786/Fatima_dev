import React, { useState, useEffect } from "react";
import {
  getProductsByCount,
  fetchProductsByFilter,
} from "../functions/product";
import { getCategories } from "../functions/category";
import { getSubs } from "../functions/sub";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../components/cards/ProductCard";
import { Menu, Slider, Checkbox, Radio } from "antd";
import img from '../images/Brands/Layer 13@1X.png'
import {

  CloseOutlined,
  DownSquareOutlined,
  PlusOutlined,
  StarOutlined,
} from "@ant-design/icons";
import Star from "../components/forms/Star";
import { SecondNav } from "../components/nav/SecondNav";

const { SubMenu, ItemGroup } = Menu;

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([0, 0]);
  const [ok, setOk] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);
  const [star, setStar] = useState("");
  const [subs, setSubs] = useState([]);
  const [sub, setSub] = useState("");
  const [boyShow, setBoyShow] = useState(false);
  const [accessoriesShow, setAccessoriesShow] = useState(false);
  const [brandsShow, setBrandsShow] = useState(false);
  const [sizesShow, setSizesShow] = useState(false);
  const [priceRangeShow, setPriceRangeShow] = useState(false);
  const [brands, setBrands] = useState([
    "BOSS",
    "FENDI",
    "KENZO",
    "BALMAIN",
    "MSGM",
  ]);
  const [brand, setBrand] = useState("");
  const [colors, setColors] = useState([
    "Black",
    "Brown",
    "Silver",
    "White",
    "Blue",
  ]);
  const [color, setColor] = useState("");
  const [shipping, setShipping] = useState("");

  let dispatch = useDispatch();
  let { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  useEffect(() => {
    loadAllProducts();
    // fetch categories
    getCategories().then((res) => setCategories(res.data));
    // fetch subcategories
    getSubs().then((res) => setSubs(res.data));
  }, []);

  const fetchProducts = (arg) => {
    fetchProductsByFilter(arg).then((res) => {
      setProducts(res.data);
    });
  };

  // 1. load products by default on page load
  const loadAllProducts = () => {
    getProductsByCount(12).then((p) => {
      setProducts(p.data);
      setLoading(false);
    });
  };

  // 2. load products on user search input
  useEffect(() => {
    const delayed = setTimeout(() => {
      fetchProducts({ query: text });
      if (!text) {
        loadAllProducts();
      }
    }, 300);
    return () => clearTimeout(delayed);
  }, [text]);

  // 3. load products based on price range
  useEffect(() => {
    console.log("ok to request");
    fetchProducts({ price });
  }, [ok]);

  const handleSlider = (value) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });

    // reset
    setCategoryIds([]);
    setPrice(value);
    setStar("");
    setSub("");
    setBrand("");
    setColor("");
    setShipping("");
    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  // 4. load products based on category
  // show categories in a list of checkbox
  const showCategories = () =>
    categories.map((c) => (
      <div key={c._id}>
        <Checkbox
          onChange={handleCheck}
          className="pb-2 pl-4 pr-4"
          value={c._id}
          name="category"
          checked={categoryIds.includes(c._id)}
        >
          {c.name}
        </Checkbox>
        <br />
      </div>
    ));

  console.log(products);

  // handle check for categories
  const handleCheck = (e) => {
    // reset
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setStar("");
    setSub("");
    setBrand("");
    setColor("");
    setShipping("");
    // console.log(e.target.value);
    let inTheState = [...categoryIds];
    let justChecked = e.target.value;
    let foundInTheState = inTheState.indexOf(justChecked); // index or -1

    // indexOf method ?? if not found returns -1 else return index [1,2,3,4,5]
    if (foundInTheState === -1) {
      inTheState.push(justChecked);
    } else {
      // if found pull out one item from index
      inTheState.splice(foundInTheState, 1);
    }

    setCategoryIds(inTheState);
    // console.log(inTheState);
    fetchProducts({ category: inTheState });
  };

  // 5. show products by star rating
  const handleStarClick = (num) => {
    // console.log(num);
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar(num);
    setSub("");
    setBrand("");
    setColor("");
    setShipping("");
    fetchProducts({ stars: num });
  };

  const showStars = () => (
    <div className="pr-4 pl-4 pb-2">
      <Star starClick={handleStarClick} numberOfStars={5} />
      <Star starClick={handleStarClick} numberOfStars={4} />
      <Star starClick={handleStarClick} numberOfStars={3} />
      <Star starClick={handleStarClick} numberOfStars={2} />
      <Star starClick={handleStarClick} numberOfStars={1} />
    </div>
  );

  // 6. show products by sub category
  const showSubs = () =>
    subs.map((s) => (
      <Radio
        key={s._id}
        checked={s === subs}
        onChange={() => handleSub(s)}
        className="pb-2 pl-4 pr-4"
        style={{ cursor: "pointer" }}
      >
        {s.name}
      </Radio>
    ));

  const handleSub = (sub) => {
    // console.log("SUB", sub);
    setSub(sub);
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setBrand("");
    setColor("");
    setShipping("");
    fetchProducts({ sub });
  };

  // 7. show products based on brand name
  const showBrands = () =>
    brands.map((b) => (
      <Radio
        value={b}
        name={b}
        checked={b === brand}
        onChange={handleBrand}
        className="pb-1 pl-4 pr-4"
      >
        {b}
      </Radio>
    ));

  const handleBrand = (e) => {
    setSub("");
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setColor("");
    setBrand(e.target.value);
    setShipping("");
    fetchProducts({ brand: e.target.value });
  };

  // 8. show products based on color
  const showColors = () =>
    colors.map((c) => (
      <Radio
        value={c}
        name={c}
        checked={c === color}
        onChange={handleColor}
        className="pb-1 pl-4 pr-4"
      >
        {c}
      </Radio>
    ));

  const handleColor = (e) => {
    setSub("");
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setBrand("");
    setColor(e.target.value);
    setShipping("");
    fetchProducts({ color: e.target.value });
  };

  // 9. show products based on shipping yes/no
  const showShipping = () => (
    <>
      <Checkbox
        className="pb-2 pl-4 pr-4"
        onChange={handleShippingchange}
        value="Yes"
        checked={shipping === "Yes"}
      >
        Yes
      </Checkbox>

      <Checkbox
        className="pb-2 pl-4 pr-4"
        onChange={handleShippingchange}
        value="No"
        checked={shipping === "No"}
      >
        No
      </Checkbox>
    </>
  );

  const handleShippingchange = (e) => {
    setSub("");
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setBrand("");
    setColor("");
    setShipping(e.target.value);
    fetchProducts({ shipping: e.target.value });
  };

  return (
    <div className="container-fluid shop">
       <div className = 'text-center mt-5'>
         {/* <img src = {img} /> */}
         <SecondNav logo = {img} />
       </div>
      <div className="row">
        <div className="font-home col-md-3 col-sm-2 pt-2 d-none d-sm-block">
          <br />
          <h4 className="colo"> التصنيفات</h4>
          <div>
            <div className='row'>
              <div className='col-md-8'>
                <p className = 'mb-0 pb-0'><span>Sales </span></p>
              </div>
              <div className='col-md-4' style = {{textAlign: 'right'}}>
                 <Checkbox/>
              </div>
              <div className='col-md-12'>
                 <hr/>
              </div>
              <div className='col-md-8'>
                <p className = 'mb-0 pb-0'><span>New Arrive </span></p>
              </div>
              <div className='col-md-4' style = {{textAlign: 'right'}}>
                 <Checkbox/>
              </div>
              <div className='col-md-12'>
                 <hr/>
              </div>
              <div className='col-md-8'>
                <p className = 'mb-0 pb-0'><span>Most Popular </span></p>
              </div>
              <div className='col-md-4' style = {{textAlign: 'right'}}>
                 <Checkbox/>
              </div>
              <div className='col-md-12'>
                 <hr/>
              </div>
              <div className='col-md-8'>
                <p className = 'mb-0 pb-0'><span>Boys </span></p>
              </div>
              <div className='col-md-4' style = {{textAlign: 'right'}}>
                 {
                    boyShow ? 
                       <CloseOutlined onClick = {() => setBoyShow(false)} /> 
                        :
                       <PlusOutlined onClick = {() => setBoyShow(true)} />
                 }     
              </div>
              <div className='col-md-12'>
                 <hr/>
              </div>
              {
                 boyShow && 
                 <>
                 <div className='col-md-12 sub'>
                    <p><span><Checkbox /></span> <span className = 'sub-text'>Jackets</span></p>
                 </div>
                 <div className='col-md-12 sub'>
                    <p><span><Checkbox /></span> <span className = 'sub-text'>Suits</span></p>
                 </div>
                 <div className='col-md-12 sub'>
                    <p><span><Checkbox /></span> <span className = 'sub-text'>Tousers</span></p>
                 </div>
                 <div className='col-md-12 sub'>
                    <p><span><Checkbox /></span> <span className = 'sub-text'>Jeans</span></p>
                 </div>
                 <div className='col-md-12 sub'>
                    <p><span><Checkbox /></span> <span className = 'sub-text'>Shirts</span></p>
                 </div>
                 </>
              }
              <div className='col-md-8'>
                <p className = 'mb-0 pb-0'><span>Accessories </span></p>
              </div>
              <div className='col-md-4' style = {{textAlign: 'right'}}>
                 {
                    accessoriesShow ? 
                       <CloseOutlined onClick = {() => setAccessoriesShow(false)} /> 
                        :
                       <PlusOutlined onClick = {() => setAccessoriesShow(true)} />
                 }     
              </div>
              <div className='col-md-12'>
                 <hr/>
              </div>
              {
                 accessoriesShow && 
                 <>
                 <div className='col-md-12 sub'>
                    <p><span><Checkbox /></span> <span className = 'sub-text'>Jackets</span></p>
                 </div>
                 <div className='col-md-12 sub'>
                    <p><span><Checkbox /></span> <span className = 'sub-text'>Suits</span></p>
                 </div>
                 <div className='col-md-12 sub'>
                    <p><span><Checkbox /></span> <span className = 'sub-text'>Tousers</span></p>
                 </div>
                 <div className='col-md-12 sub'>
                    <p><span><Checkbox /></span> <span className = 'sub-text'>Jeans</span></p>
                 </div>
                 <div className='col-md-12 sub'>
                    <p><span><Checkbox /></span> <span className = 'sub-text'>Shirts</span></p>
                 </div>
                 </>
              }
              <div className='col-md-8'>
                <p className = 'mb-0 pb-0'><span>Brands </span></p>
              </div>
              <div className='col-md-4' style = {{textAlign: 'right'}}>
                 {
                    brandsShow ? 
                       <CloseOutlined onClick = {() => setBrandsShow(false)} /> 
                        :
                       <PlusOutlined onClick = {() => setBrandsShow(true)} />
                 }     
              </div>
              <div className='col-md-12'>
                 <hr/>
              </div>
              {
                 brandsShow && 
                 <>
                 <div className='col-md-12 sub'>
                    <p><span><Checkbox /></span> <span className = 'sub-text'>Jackets</span></p>
                 </div>
                 <div className='col-md-12 sub'>
                    <p><span><Checkbox /></span> <span className = 'sub-text'>Suits</span></p>
                 </div>
                 <div className='col-md-12 sub'>
                    <p><span><Checkbox /></span> <span className = 'sub-text'>Tousers</span></p>
                 </div>
                 <div className='col-md-12 sub'>
                    <p><span><Checkbox /></span> <span className = 'sub-text'>Jeans</span></p>
                 </div>
                 <div className='col-md-12 sub'>
                    <p><span><Checkbox /></span> <span className = 'sub-text'>Shirts</span></p>
                 </div>
                 </>
              }
              <div className='col-md-8'>
                <p className = 'mb-0 pb-0'><span>Price Range </span></p>
              </div>
              <div className='col-md-4' style = {{textAlign: 'right'}}>
                 {
                    priceRangeShow ? 
                       <CloseOutlined onClick = {() => setPriceRangeShow(false)} /> 
                        :
                       <PlusOutlined onClick = {() => setPriceRangeShow(true)} />
                 }     
              </div>
              <div className='col-md-12'>
                 <hr/>
              </div>
              {
                 priceRangeShow && 
                 <>
                      <Slider range defaultValue={[20, 50]} />
                 </>
              }
              <div className='col-md-8'>
                <p className = 'mb-0 pb-0'><span>Sizes </span></p>
              </div>
              <div className='col-md-4' style = {{textAlign: 'right'}}>
                 {
                    sizesShow ? 
                       <CloseOutlined onClick = {() => setSizesShow(false)} /> 
                        :
                       <PlusOutlined onClick = {() => setSizesShow(true)} />
                 }     
              </div>
              <div className='col-md-12'>
                 <hr/>
              </div>
              {
                 sizesShow && 
                 <>
                 <div className='col-md-12 sub'>
                    <p><span><Checkbox /></span> <span className = 'sub-text'>0-3 Months</span></p>
                 </div>
                 <div className='col-md-12 sub'>
                    <p><span><Checkbox /></span> <span className = 'sub-text'>4-12 Months</span></p>
                 </div>
                 <div className='col-md-12 sub'>
                    <p><span><Checkbox /></span> <span className = 'sub-text'>1-3 Years</span></p>
                 </div>
                 <div className='col-md-12 sub'>
                    <p><span><Checkbox /></span> <span className = 'sub-text'>4-7 Years</span></p>
                 </div>
                 <div className='col-md-12 sub'>
                    <p><span><Checkbox /></span> <span className = 'sub-text'>8-10 Years</span></p>
                 </div>
                 </>
              }
            </div>
          </div>
        </div>

        <div className="col-md-9 col-sm-9 pt-2" style = {{paddingLeft: '28px'}}>
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4 className="text-danger"></h4>
          )}

          {products.length < 1 && <p>No products found</p>}

          <div className="row pb-5">
            {products.map((p) => (
              <div key={p._id} className="col-md-4 col-lg-3 col-sm-6 mt-3">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
const Brand = require("../models/brand");
const Product = require("../models/product");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    // const Brand = await new Brand({ name, slug: slugify(name) }).save();
    // res.json(Brand);
    console.log(req.body.publicId);
    console.log(req.body.imageUrl);
    const brand =  new Brand({ 
      name: req.body.brand, 
      slug: slugify(req.body.brand), 
      image: req.body.imageUrl, 
      public_id: req.body.publicId 
    });
     const saveBrand = await brand.save();
      if(saveBrand) {
            res.status(200).json({successMessage: 'Brand created'});
         }
         else {
            res.json(error);
         }
  } catch (err) {
    // console.log(err);
    res.status(400).send("Create brand failed")
  }
};

exports.list = async (req, res) => {
  let brands = await Brand.find({}).exec();
  if(brands) {
    res.json(brands);
  }
}

exports.read = async (req, res) => {
  let brand = await Brand.findOne({ slug: req.params.slug }).exec();
  // res.json(Brand);
  // const products = await Product.find({ Brand }).populate("brand").exec();

  res.json({
    brand
    // products,
  });
};

exports.update = async (req, res) => {
  const { name, imageUrl, publicId } = req.body;
  try { 
          const updated = await Brand.findOneAndUpdate(
            { slug: req.params.slug },
            { name, slug: slugify(name), image: imageUrl, public_id: publicId},
            { new: true }
          );
          res.json(updated);
  } catch (err) {
    res.status(400).send("Brand update failed");
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Brand.findOneAndDelete({ slug: req.params.slug });
    res.json(deleted);
  } catch (err) {
    res.status(400).send("Brand delete failed");
  }
};


exports.searchBrands = async(req, res) => {
  const searchText = new RegExp(req.body.query, 'i');
  Brand.find({name: searchText})
  .select("_id name slug")
  .then(brand => {
    res.status(200).json(brand);
  }).catch(err => {
    console.log(err);
    res.status(400).json({errorMessage: 'No Search Results'});
  })
}
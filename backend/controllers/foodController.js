const fs = require("fs");
const Food = require("../models/food.model");

exports.addFood = async (req, res) => {
  let image_filename = `${req.file.filename}`;
  const food = new Food({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
  });
  try {
    await food.save();
    res.status(200).json({
        "success": true,
        "message": "Added Successfully 😋"
    });
  } catch (error) {
    res.status(500).json({
        "success": true,
        "message": `Failed to create food due to ${error}`
    });
  }
};

exports.listFood = async (req, res) => {
  try {
    const food = await Food.find({});

    res.status(200).json({
      "success": true,
      "message": "Fetched All foods successfully",
      "data":food,    
    });
  } catch (error) {
    res.status(500).json({
      "success": false,
      "message": `Failed to fetch all foods due to : ${error}`
    });
  }
}

exports.removeFood = async (req, res) => {
  try {
    const food = await Food.findById(req.body.id);
    fs.unlink(`uploads/${food.image}`,()=>{})

    await Food.findByIdAndDelete(req.body.id);

    res.status(200).json({
      "success": true,
      "message": "Food Removed"
    });
  } catch (error) {
    res.status(500).json({
      "success": false,
      "message": `Failed to remove food from database`
    });
  }
}
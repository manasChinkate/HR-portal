const MenuModel = require("../models/ModuleMenu");

const handleCreateMenu = async (req, res) => {
  try {
    const { data } = req.body;

    const createdMenu = await MenuModel.create(data);

    if (!createdMenu) {
      return res.status(401).json({ Message: "Error creating Menu" });
    }

    return res
      .status(201)
      .json({ data: createdMenu, message: "Menu Created Successflly" });
  } catch (error) {
    res.status(500).json("Error Creating Menu ");
    console.log("error");
  }
};

const handleGetMenu = async (req, res) => {
  const menuData = await MenuModel.find();

  if (menuData.length === 0) {
    return res.status(404).json({ message: "No Menus found." });
  }

  res.status(200).json({
    data: menuData,
    message: "Menus fetched successfully",
  });
};

module.exports = { handleCreateMenu, handleGetMenu };

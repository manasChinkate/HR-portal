const MenuModel = require("../models/ModuleMenu");

const handleCreateMenu = async (req, res) => {
  try {
    const data = req.body;
    console.log("MenuData", data);

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
  const menuData = await MenuModel.find().populate("parentId", "menuName");

  if (menuData.length === 0) {
    return res.status(200).json({ data: [], message: "No Menus found." });
  }

  res.status(200).json({
    data: menuData,
    message: "Menus fetched successfully",
  });
};

const handleDeleteMenu = async (req, res) => {
  const { id } = req.params;
  try {
    const menuData = await MenuModel.findByIdAndDelete(id);

    if (!menuData) {
      return res.status(404).json({ message: "Menu not found" });
    }

    res.status(200).json({ message: "Menu deleted successfully" });
  } catch (error) {
    console.error("Error deleting menu:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { handleCreateMenu, handleGetMenu, handleDeleteMenu };

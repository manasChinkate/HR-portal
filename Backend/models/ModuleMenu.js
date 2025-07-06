const { default: mongoose } = require("mongoose");

const MenuSchema = new mongoose.Schema(
  {
    menuName: String,
    link: String,
    logo: String,
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: ModuleMenu,
    },
  },
  { collection: "Menu" }
);

const MenuModel = mongoose.model("Menu", MenuSchema);
module.exports = MenuModel;

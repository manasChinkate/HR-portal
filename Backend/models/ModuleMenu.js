const { default: mongoose } = require("mongoose");

const MenuSchema = new mongoose.Schema(
  {
    menuName: String,
    path: String,
    logo: String,
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Menu",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "Menu" }
);

const MenuModel = mongoose.model("Menu", MenuSchema);
module.exports = MenuModel;

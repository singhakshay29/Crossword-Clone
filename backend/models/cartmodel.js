const mongoose = require("mongoose");

const ItemSchema = mongoose.Schema(
  {
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
    },
    imgUrl:{
        type:String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, 'Quantity can not be less then 1.']
    },
    price: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true,
    }
  },
  {
    timeStamps: true
  }
);

const cartSchema = mongoose.Schema({
    items:[ItemSchema],
    subTotal: {
        default: 0,
        type: Number
    }
},
{
    timestamps: true
}
)

module.exports = mongoose.model("Cart", cartSchema);

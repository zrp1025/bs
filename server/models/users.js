let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let usersSchema = new Schema({
  userId: String,
  userPwd: String,
  userName: String,
  isAdmin: Boolean,
  orderList: [
    {
      orderId: String,
      orderTotal: Number,
      addressInfo: {
        addressId: String,
        userName: String,
        streetName: String,
        postCode: Number,
        tel: Number,
        isDefault: Boolean
      },
      goodsList: [
				{
					productId: String,
					productName: String,
		      salePrice: String,
					productImage: String,
		      productNum: String,
		      checked: Number,
					img: String

				}
			],
      orderStatus: String
    }
  ],
  cartList: [
    {
      productName: String,
      productId: String,
      salePrice: String,
      productNum: String,
      checked: Number,
      productImage: String
    }
  ],
  addressList: [
    {
      addressId: String,
      userName: String,
      streetName: String,
      postCode: Number,
      tel: Number,
      isDefault: Boolean
    }
  ]
});
module.exports = mongoose.model("User", usersSchema);

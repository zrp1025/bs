var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var User = require("./../models/users");

//连接MongoDB数据库
mongoose.connect("mongodb://127.0.0.1:27017/mydb");
mongoose.connection.on("connected", () => {
  console.log("连接成功");
});
mongoose.connection.on("error", () => {
  console.log("连接失败");
});
mongoose.connection.on("disconnected", () => {
  console.log("断开连接");
});

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});

router.get("/cartlist", (req, res, next) => {
  let name = req.cookies.token.substring(13);
  User.findOne({ userName: name }, (err, doc) => {
    if (!doc) {
      res.json({
        status: "1",
        msg: err.message,
        result: ""
      });
    } else {
      res.json({
        status: "0",
        msg: "",
        result: doc.cartList
      });
    }
  });
});
//登录
router.get("/login", (req, res, next) => {
  let user = req.param("user"),
    pass = req.param("pass"),
    data = Date.parse(new Date());
  User.findOne(
    { userName: user, userPwd: pass, isAdmin: false },
    (err, doc) => {
      if (!doc) {
        res.json({
          status: "1",
          msg: "登录失败",
          result: ""
        });
      } else {
        res.cookie("token", data + doc.userName, {
          path: "/",
          maxAge: 60 * 60 * 1000
        });
        res.json({
          status: "0",
          msg: "登录成功",
          result: doc.userName,
          data: data
        });
      }
    }
  );
});
//管理员登录
router.get("/adminlogin", (req, res, next) => {
  let user = req.param("user"),
    pass = req.param("pass"),
    data = "admin" + Date.parse(new Date());
  User.findOne({ userName: user, userPwd: pass, isAdmin: true }, (err, doc) => {
    if (!doc) {
      res.json({
        status: "1",
        msg: "登录失败",
        result: ""
      });
    } else {
      res.cookie("token", data + doc.userName, {
        path: "/",
        maxAge: 60 * 60 * 1000
      });
      res.json({
        status: "0",
        msg: "登录成功",
        result: doc.userName,
        data: data
      });
    }
  });
});
//登出
router.get("/logout", (req, res, next) => {
  res.cookie("token", "", {
    path: "/",
    maxAge: -1
  });
  res.json({
    status: "0",
    msg: "退出成功",
    result: "退出成功"
  });
});

//验证登录
router.get("/checklogin", (req, res, next) => {
  if (req.cookies.token) {
    res.json({
      status: "0",
      msg: "登录成功",
      result: req.cookies.token.slice(13) || ""
    });
  } else {
    res.json({
      status: "1",
      msg: "未登录",
      result: ""
    });
  }
});
//验证管理员
router.get("/checkadmin", (req, res, next) => {
  if (
    typeof(req.cookies.token) != "undefined" &&
    req.cookies.token.slice(0, 5) === "admin"
  ) {
    res.json({
      status: "0",
      msg: "是管理员且登录成功"
      // result: req.cookies.token.slice(13) || ""
    });
  } else {
    res.json({
      status: "1",
      msg: "未登录",
      result: ""
    });
  }
});

//注册
router.post("/signin", (req, res, next) => {
  let Name = req.body.userName,
    Pwd = req.body.userPwd,
    Timestamp = new Date().getTime();
  userId = parseInt(Math.random() * 1000000000) + Timestamp;
  let arr = [{ userId: userId, userName: Name, userPwd: Pwd, isAdmin: false }];
  User.findOne({ userName: Name }, (err, doc) => {
    if (doc) {
      res.json({
        status: "1",
        msg: "用户名已经存在",
        result: ""
      });
    } else {
      User.insertMany(arr, (err, doc) => {
        if (!doc) {
          res.json({
            status: "1",
            msg: "失败",
            result: ""
          });
        } else {
          res.json({
            status: "0",
            msg: "成功",
            result: Name
          });
        }
      });
    }
  });
});

//加入购物车
router.post("/addcart", (req, res, next) => {
  let name = req.cookies.token.slice(13),
    bookmsg = req.body.bookmessage;
  if (!parseInt(bookmsg.price)) {
    bookmsg.price = bookmsg.price.slice(3);
  }
  let product = {
    productId: bookmsg.isbn10,
    productName: bookmsg.title,
    salePrice: bookmsg.price,
    productImage: bookmsg.images.large,
    productNum: 1,
    checked: 1
  };
  User.findOne({ userName: name }, (err, doc) => {
    if (!doc) {
      res.json({
        status: "1",
        msg: "未登录加入购物车失败",
        result: ""
      });
    } else {
      isIn = false;
      doc.cartList.forEach(item => {
        if (item.productId == product.productId) {
          isIn = true;
          item.productNum++;
          item.checked = 1;
          doc.save((err1, doc1) => {
            if (err1) {
              res.json({
                status: "1",
                msg: err1.message
              });
            } else {
              res.json({
                status: "0",
                msg: "已存在，且加入成功",
                result: bookmsg.title
              });
            }
          });
        }
      });
      if (!isIn) {
        doc.cartList.push(product);
        doc.save((err2, doc2) => {
          if (err2) {
            res.json({
              status: "1",
              msg: err2.message,
              result: ""
            });
          } else {
            res.json({
              status: "0",
              msg: "不存在但是加入成功",
              result: "suc"
            });
          }
        });
      }
    }
  });
});

//是否选中
router.post("/checked", (req, res, next) => {
  let name = req.cookies.token.substring(13);
  productId = req.body.productId;
  User.findOne({ userName: name }, (err, doc) => {
    if (!doc) {
      res.json({
        status: "1",
        msg: "选中错误",
        result: ""
      });
    } else {
      doc.cartList.forEach(item => {
        if (productId == item.productId) {
          if (item.checked == 0) {
            item.checked = "1";
          } else {
            item.checked = "0";
          }
        }
      });
      doc.save((err2, doc2) => {
        if (err2) {
          res.json({
            status: "1",
            msg: err2.message,
            result: ""
          });
        } else {
          res.json({
            status: "0",
            msg: "选中成功",
            result: "suc"
          });
        }
      });
    }
  });
});

//删除书籍
router.post("/deletebook", (req, res, next) => {
  let name = req.cookies.token.substring(13);
  productId = req.body.productId;
  User.findOne({ userName: name }, (err, doc) => {
    if (!doc) {
      res.json({
        status: "1",
        msg: "删除失败",
        result: ""
      });
    } else {
      doc.cartList.forEach((item, index) => {
        // var i='';
        if (productId == item.productId) {
          doc.cartList.splice(index, 1);
        }
      });
      doc.save((err2, doc2) => {
        if (err2) {
          res.json({
            status: "1",
            msg: err2.message,
            result: ""
          });
        } else {
          res.json({
            status: "0",
            msg: "删除成功",
            result: "suc"
          });
        }
      });
    }
  });
});

//查询地址
router.get("/address", (req, res, next) => {
  let name = req.cookies.token.substring(13);
  User.findOne({ userName: name }, (err, doc) => {
    if (!doc) {
      res.json({
        status: "1",
        msg: "请求地址失败",
        result: ""
      });
    } else {
      res.json({
        status: "0",
        msg: "请求地址成功",
        result: doc.addressList,
        cart: doc.cartList
      });
    }
  });
});
router.post("/addAddress", (req, res, next) => {
  let name = req.cookies.token.substring(13);
  let data = req.body.data;
  User.findOne({ userName: name }, (err, doc) => {
    if (!doc) {
      res.json({
        status: "1",
        msg: "添加地址失败",
        result: ""
      });
    } else {
      doc.addressList.push(data);
      doc.save((err2, doc2) => {
        if (err2) {
          res.json({
            status: "1",
            msg: err2.message,
            result: ""
          });
        } else {
          res.json({
            status: "0",
            msg: "添加地址成功",
            result: "suc"
          });
        }
      });
    }
  });
});
//删除地址
router.post("/deleteAddress", (req, res, next) => {
  let name = req.cookies.token.substring(13);
  let index = req.body.index;
  User.findOne({ userName: name }, (err, doc) => {
    if (!doc) {
      res.json({
        status: "1",
        msg: "删除地址失败",
        result: ""
      });
    } else {
      doc.addressList.splice(index, 1);
      doc.save((err2, doc2) => {
        if (err2) {
          res.json({
            status: "1",
            msg: err2.message,
            result: ""
          });
        } else {
          res.json({
            status: "0",
            msg: "删除地址成功",
            result: "suc"
          });
        }
      });
    }
  });
});

//查询所有信息
router.get("/all", (req, res, next) => {
  User.find((err, doc) => {
    if (!doc) {
      res.json({
        status: "1",
        msg: "查询失败",
        result: ""
      });
    } else {
      res.json({
        status: "0",
        msg: "查询成功",
        result: doc
      });
    }
  });
});
//结账
router.post("/pay", (req, res, next) => {
  let name = req.cookies.token.substring(13);
  let data = req.body.data;
  User.findOne({ userName: name }, (err, doc) => {
    if (!doc) {
      res.json({
        status: "1",
        msg: "支付失败",
        result: ""
      });
    } else {
      for (var i = 0; i < doc.cartList.length; i++) {
        if (doc.cartList[i].checked === 1) {
          doc.cartList.splice(i, 1);
        }
      }
      doc.orderList.push(data);
      doc.save((err2, doc2) => {
        if (err2) {
          res.json({
            status: "1",
            msg: err2.message,
            result: ""
          });
        } else {
          res.json({
            status: "0",
            msg: "支付成功",
            result: "suc"
          });
        }
      });
    }
  });
});

module.exports = router;

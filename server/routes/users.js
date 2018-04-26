var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var User = require('./../models/users')

//连接MongoDB数据库
mongoose.connect('mongodb://127.0.0.1:27017/mydb');
mongoose.connection.on("connected",()=>{
    console.log('连接成功');
});
mongoose.connection.on("error",()=>{
    console.log('连接失败');
});
mongoose.connection.on('disconnected',()=>{
    console.log('断开连接');
});


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/cart',(req,res,next)=>{
	let userId = '100000077';
	User.findOne({userId:userId},(err,doc)=>{
		if (err) {
			res.json({
				status:'1',
				msg:err.message,
				result:''
			})
		}else{
			res.json({
				status:'0',
				msg:'',
				result:doc.cartList
			})

		}
	});
});
//登录
router.get('/login',(req,res,next)=>{
  let user = req.param('user'),
      pass = req.param('pass'),
      data = Date.parse(new Date());
    User.findOne({userName:user,userPwd:pass},(err,doc)=>{
  		if (!doc) {
          res.json({
            status:'1',
            msg:'登录失败',
            result:''
          })
  		}else{
        res.cookie("token",data+doc.userName,{
          path:'/',
          maxAge:60*60*1000
        });
  			res.json({
  				status:'0',
  				msg:'登录成功',
  				result:doc.userName,
          data:data
  			})
  		}
  	});
});
//登出
router.get('/logout',(req,res,next)=>{
  res.cookie("token","",{
    path:'/',
    maxAge:-1
  });
  res.json({
    status:'0',
    msg:'退出成功',
    result:'退出成功'
  })
});

//验证登录
router.get('/checklogin',(req,res,next)=>{
  if(req.cookies.token){
    res.json({
      status:"0",
      msg:'登录成功',
      result:req.cookies.token.slice(13) || ''
    });
  }else{
    res.json({
      status:"1",
      msg:'未登录',
      result:''
    });
  }
})

//注册
router.post('/signin',(req,res,next)=>{
  let Name = req.body.userName,
      Pwd  = req.body.userPwd;
  let arr = [{userId:100000003,userName:Name,userPwd:Pwd}]
  User.findOne({userName:Name},(err,doc)=>{
    if (doc) {
        res.json({
          status:'1',
          msg:'用户名已经存在',
          result:''
        })
    }else{
      User.insertMany(arr,(err,doc)=>{
        if (!doc) {
          res.json({
            status:'1',
            msg:'失败',
            result:''
          });
        }else{
          res.json({
            status:'0',
            msg:'成功',
            result:Name
          });
        }
      });
    }
  })
})


//加入购物车
router.post('/addcart',(req,res,next)=>{
  let name = req.cookies.token.slice(13),
      bookmsg = req.body.bookmessage;
  let product = {
    productId : bookmsg.isbn10,
    productName : bookmsg.title,
    salePrice : bookmsg.price,
    productImage : bookmsg.images.large,
    productNum:1,
    checked:1
  };
  User.findOne({userName:name},(err,doc)=>{
    if (!doc) {
      res.json({
        status:'1',
        msg:'未登录加入购物车失败',
        result:''
      });
    }else{

      isIn=false;
      doc.cartList.forEach((item)=>{
        if(item.productId==product.productId){
          isIn=true;
          item.productNum++;
          doc.save((err1,doc1)=>{
            if (err1) {
              res.json({
                  status:"1",
                  msg:err1.message
              })
            }else{
              res.json({
                  status:"0",
                  msg:'已存在，且加入成功',
                  result:bookmsg.title
              })
            }
          })
        }
      });
      if (!isIn) {
        doc.cartList.push(product);
        doc.save((err2,doc2)=>{
          if (err2) {
            res.json({
              status:'1',
              msg:err2.message,
              result:''
            })
          }else{
            res.json({
              status:'0',
              msg:'不存在但是加入成功',
              result:'suc'
            })
          }
        })
      }
    }
  })
})

module.exports = router;

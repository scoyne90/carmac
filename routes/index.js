var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('localhost:27017/SmartPhones');
var Cart = require('../routes/cart');
var Schema = mongoose.Schema;
var nodemailer = require('nodemailer');
var app = express();

var userDataSchema = new Schema({
  ID: String,
  Name: String,
  Brand: String,
  Price: String,
  Release: String,
  Creator: String,
  Details: String,
  Image: String
});

var userDataSchemaSum = new Schema({
  ID: String,
  Name: String,
  Brand: String,
  Price: String,
  Image: String
});

var userDataSamsung = new Schema({
  ID: String,
  Name: String,
  Brand: String,
  Price: String,
  Image: String
});

var userDataApple = new Schema({
  ID: String,
  Name: String,
  Brand: String,
  Price: String,
  Image: String
});

var userDataHaweii = new Schema({
  ID: String,
  Name: String,
  Brand: String,
  Price: String,
  Image: String
});

var userDataHtc = new Schema({
  ID: String,
  Name: String,
  Brand: String,
  Price: String,
  Image: String
});

var userDataXiaomi = new Schema({
  ID: String,
  Name: String,
  Brand: String,
  Price: String,
  Image: String
});
var UserData = mongoose.model('productdetails', userDataSchema);
var SumUserData = mongoose.model('sumproducts', userDataSchemaSum);
var UsrDtaSamsung = mongoose.model('samsungs', userDataSamsung);
var UsrDtaApple = mongoose.model('apples', userDataApple);
var UsrDtaHaweii = mongoose.model('haweiis', userDataHaweii);
var UsrDtaHtc = mongoose.model('htcs', userDataHtc);
var UsrDtaXiaomi = mongoose.model('xiaomis', userDataXiaomi);


var RecivedUrl = "";
router.get('/*', function(req, res, next) {
  RecivedUrl = req.url;


  // router.get('/', function(req, res, next) {
  //   res.render('homepage');
  // });
  //
  // router.get('/categories', function(req, res, next) {
  //   res.render('categories');
  // });


if(RecivedUrl.localeCompare('/') == 0) {
  res.render('homepage', {title: "CARMAC - Home"});
  }

else if(RecivedUrl.localeCompare('/about') == 0) {
  res.render('about', {title: "about"});
  }

else if(RecivedUrl.localeCompare('/categories') == 0) {
  res.render('categories', {title: "Categories"});
  }

else if (RecivedUrl.includes('/index')) {
  SumUserData.find()
    .then(function(doc) {
      console.log("Got as far as here, array length is: " + doc.length);
      res.render('index', {title: "Products List", items: doc});
    });
}

else if (RecivedUrl.includes('/samsung')) {
  UsrDtaSamsung.find()
    .then(function(doc1) {
      console.log("Got as far as here, array length is: " + doc1.length);
      res.render('samsung', {title: "CARMAC - Samsung", items1: doc1});
    });
}

else if (RecivedUrl.includes('/apple')) {
  UsrDtaApple.find()
    .then(function(doc2) {
      console.log("Got as far as here, array length is: " + doc2.length);
      res.render('apple', {title: "CARMAC - Apple", items2: doc2});
    });
}

else if (RecivedUrl.includes('/haweii')) {
  UsrDtaHaweii.find()
    .then(function(doc3) {
      console.log("Got as far as here, array length is: " + doc3.length);
      res.render('haweii', {title: "CARMAC - Huawei", items3: doc3});
    });
}

else if (RecivedUrl.includes('/htc')) {
  UsrDtaHtc.find()
    .then(function(doc4) {
      console.log("Got as far as here, array length is: " + doc4.length);
      res.render('htc', {title: "CARMAC - HTC", items4: doc4});
    });
}

else if (RecivedUrl.includes('/xiaomi')) {
  UsrDtaXiaomi.find()
    .then(function(doc5) {
      console.log("Got as far as here, array length is: " + doc5.length);
      res.render('xiaomi', {title: "CARMAC - Xiaomi", items5: doc5});
    });
}


else if (RecivedUrl.includes('/Products_')) {
  console.log("YO im here");
  var tempVar = RecivedUrl.split('_');
  var theID = tempVar[tempVar.length - 1];
  console.log(theID);
  UserData.find()
    .then(function(fullProd){
      for(var ii = 0; ii < fullProd.length; ii++) {
        console.log(fullProd[ii].ID);
        if(fullProd[ii].ID == theID){
          thePdct = fullProd[ii];
        }
      }
    res.render('product', {title: "Product", Fullitems: thePdct});
  });
  }
});

router.get('/add-to-cart/:id', function(req, res, next) {
  var productID = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {items: {}
  });
  Product.findById(productId, function(err, product) {
    if (err) {
      return res.redirect('/');
    }
    cart.add(product, product.id);
    req.session.cart = cart;
    console.log(req.session.cart);
    res.redirect('/');
  });
});

var nodemailer = require("nodemailer");
var smtpTransport = nodemailer.createTransport({
service: "Gmail",
auth: {
    user: "subhrajyoti@gmai.com",
    pass: "***********"
}
});

// var smtpTransport = nodemailer.createTransport("SMTP",{
//     service: "Gmail",
//     auth: {
//         user: "gmail.user@gmail.com",
//         pass: "userpass"
//     }
// });

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    res.sendfile('./views/About');
});

app.get('/send', function (req, res) {

    var mailOptions = {
        to: req.query.to,
        subject: 'Contact Form Message',
        from: "Contact Form Request" + "<" + req.query.from + '>',
        html:  "From: " + req.query.name + "<br>" +
               "User's email: " + req.query.user + "<br>" +     "Message: " + req.query.text
    }

    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function (err, response) {
        if (err) {
            console.log(err);
            res.end("error");
        } else {
            console.log("Message sent: " + response.message);
            res.end("sent");
        }
    });

});

app.listen(8080, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Listening on port on 8080");
    }
});

module.exports = router;

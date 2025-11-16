const express = require('express')
const router = new express.Router()
const controller = require('../controller/productController')
const usercontroller = require('../controller/userController')
const { isAuth } = require('../middleware/authentication')
const orderController = require('../controller/ordercontroller')
const { authorization } = require('../middleware/authorization')
const userdb = require('../models/userShema')
const upload = require("../multerconfig/storageconfig")

//  product routes
router.get('/products', controller.getProducts)
router.get('/product/:id', controller.singleProduct)
router.post('/add/product',isAuth,authorization("admin"), controller.postProduct)
router.put('/update/product/:id',isAuth, authorization("admin"), controller.updateProduct)
router.delete('/delete/product/:id',isAuth,  authorization("admin"), controller.deleteProduct)

// user routes
router.post("/user/register",upload.single("user_profile"),usercontroller.registerUser)
router.post("/user/login", usercontroller.loginUser)
router.get("/user/logout", isAuth, usercontroller.logoutUser)
router.get("/user/details",isAuth, usercontroller.getUsers)
router.delete('/delete/user/:id',isAuth, authorization("admin"), usercontroller.deleteUser)
router.get("/validuser",isAuth,async(req,res)=>{
    try {
        const ValidUserOne = await userdb.findOne({_id:req.userId});
        res.status(201).json({status:201,ValidUserOne});
    } catch (error) {
        res.status(401).json({status:401,error});
    }
});

// order routes 
router.post("/order", isAuth, orderController.postOrder)
router.get("/order/:id", isAuth, orderController.myOrder)


module.exports = router;

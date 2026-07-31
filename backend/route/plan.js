const express = require('express');
const router = express.Router();
const {createPlan,getPlans,getPlansByProduct} = require('../controller/plan');
const authMiddleware = require('../middleware/authController');

router.post('/addPlan',authMiddleware, createPlan);
router.get('/getPlans',authMiddleware, getPlans);
// GET PLANS BY PRODUCT
router.get("/product/:productId",getPlansByProduct);

module.exports = router;

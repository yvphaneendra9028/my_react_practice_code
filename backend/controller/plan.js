const Plan = require('../model/plan');
const Product = require('../model/product');

const createPlan = async (req, res) => {
    try {
        console.log("Plan:", Plan);
console.log("findOne:", typeof Plan.findOne);
console.log("find:", typeof Plan.find);
console.log("create:", typeof Plan.create);
        const {
            productId,
            planName,
            planCode,
            description,
            eligibility,
            coverageAmount,
            basePremium,
            premiumFrequency,
            status
        } = req.body;

        // -----------------------------------
        // 1. Validate required fields
        // -----------------------------------
        if (
            !productId ||
            !planName ||
            !planCode ||
            coverageAmount === undefined ||
            basePremium === undefined ||
            !premiumFrequency
        ) {
            return res.status(400).json({
                success: false,
                message: "Required fields are missing"
            });
        }

        // -----------------------------------
        // 2. Validate eligibility object
        // -----------------------------------
        if (!eligibility) {
            return res.status(400).json({
                success: false,
                message: "Eligibility details are required"
            });
        }

        const {
            minAge,
            maxAge,
            maxMembers
        } = eligibility;

        if (
            minAge === undefined ||
            maxAge === undefined ||
            maxMembers === undefined
        ) {
            return res.status(400).json({
                success: false,
                message: "Complete eligibility details are required"
            });
        }

        // -----------------------------------
        // 3. Validate eligibility values
        // -----------------------------------
        if (
            minAge < 0 ||
            maxAge < 0 ||
            maxMembers <= 0
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid eligibility values"
            });
        }

        if (minAge >= maxAge) {
            return res.status(400).json({
                success: false,
                message: "Minimum age must be less than maximum age"
            });
        }

        // -----------------------------------
        // 4. Validate coverage and premium
        // -----------------------------------
        if (coverageAmount <= 0) {
            return res.status(400).json({
                success: false,
                message: "Coverage amount must be greater than 0"
            });
        }

        if (basePremium <= 0) {
            return res.status(400).json({
                success: false,
                message: "Base premium must be greater than 0"
            });
        }

        // -----------------------------------
        // 5. Check whether Product exists
        // -----------------------------------
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        // -----------------------------------
        // 6. Format Plan Code
        // -----------------------------------
        const formattedPlanCode = planCode
            .trim()
            .toUpperCase();

        // -----------------------------------
        // 7. Check duplicate Plan Code
        // -----------------------------------
        const existingPlan = await Plan.findOne({
            planCode: formattedPlanCode
        });

        if (existingPlan) {
            return res.status(409).json({
                success: false,
                message: "Plan code already exists"
            });
        }

        // -----------------------------------
        // 8. Create Plan
        // -----------------------------------
        const plan = await Plan.create({
            productId,

            planName: planName.trim(),

            planCode: formattedPlanCode,

            description: description
                ? description.trim()
                : "",

            eligibility: {
                minAge,
                maxAge,
                maxMembers
            },

            coverageAmount,

            basePremium,

            premiumFrequency,

            status: status || "ACTIVE"
        });

        // -----------------------------------
        // 9. Send success response
        // -----------------------------------
        return res.status(201).json({
            success: true,
            message: "Plan created successfully",
            plan
        });

       
    } catch (error) {

        console.error("Create Plan Error:", error);

        // Handle duplicate MongoDB unique error
        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: "Plan code already exists"
            });
        }

        return res.status(500).json({
            success: false,
            message: "Failed to create plan",
            error: error.message
        });
    }
};

// GET ALL PLANS
const getPlans = async (req, res) => {
    try {
        const plans = await Plan.find()
            .populate("productId", "name code type")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: plans.length,
            plans
        });

    } catch (error) {
        console.error("Get Plans Error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch plans",
            error: error.message
        });
    }
};


// GET PLANS BY PRODUCT
const getPlansByProduct = async (req, res) => {
    try {
        const { productId } = req.params;

        // Check product
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        // Get plans belonging to product
        const plans = await Plan.find({
            productId
        }).sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            product,
            count: plans.length,
            plans
        });

    } catch (error) {
        console.error("Get Plans By Product Error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch product plans",
            error: error.message
        });
    }
};


// GET SINGLE PLAN
const getPlanById = async (req, res) => {
    try {
        const { id } = req.params;

        const plan = await Plan.findById(id)
            .populate("productId", "name code type");

        if (!plan) {
            return res.status(404).json({
                success: false,
                message: "Plan not found"
            });
        }

        return res.status(200).json({
            success: true,
            plan
        });

    } catch (error) {
        console.error("Get Plan Error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch plan",
            error: error.message
        });
    }
};


// UPDATE PLAN
const updatePlan = async (req, res) => {
    try {
        const { id } = req.params;

        const updatedPlan = await Plan.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedPlan) {
            return res.status(404).json({
                success: false,
                message: "Plan not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Plan updated successfully",
            plan: updatedPlan
        });

    } catch (error) {
        console.error("Update Plan Error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to update plan",
            error: error.message
        });
    }
};


// DELETE PLAN
const deletePlan = async (req, res) => {
    try {
        const { id } = req.params;

        const plan = await Plan.findByIdAndDelete(id);

        if (!plan) {
            return res.status(404).json({
                success: false,
                message: "Plan not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Plan deleted successfully"
        });

    } catch (error) {
        console.error("Delete Plan Error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to delete plan",
            error: error.message
        });
    }
};


module.exports = {
    createPlan,
    getPlans,
    getPlansByProduct,
    getPlanById,
    updatePlan,
    deletePlan
};
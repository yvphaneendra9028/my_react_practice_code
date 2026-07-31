const mongoose = require("mongoose");

const planSchema = new mongoose.Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },

        planName: {
            type: String,
            required: true,
            trim: true
        },

        planCode: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            uppercase: true
        },

        description: {
            type: String
        },

        eligibility: {
            minAge: {
                type: Number,
                required: true
            },

            maxAge: {
                type: Number,
                required: true
            },

            maxMembers: {
                type: Number
            }
        },

        coverageAmount: {
            type: Number,
            required: true
        },

        basePremium: {
            type: Number,
            required: true
        },

        premiumFrequency: {
            type: String,
            enum: ["MONTHLY", "QUARTERLY", "YEARLY"],
            required: true
        },

        status: {
            type: String,
            enum: ["ACTIVE", "INACTIVE"],
            default: "ACTIVE"
        }
    },
    {
        timestamps: true
    }
);

const Plan = mongoose.model("Plan", planSchema);

module.exports = Plan;
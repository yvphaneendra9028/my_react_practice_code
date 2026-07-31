import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProduct,addPlan } from "../services/userService";
import { toast } from "react-toastify";


function Plan() {
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [loadingProducts, setLoadingProducts] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        productId: "",
        planName: "",
        planCode: "",
        description: "",

        minAge: "",
        maxAge: "",
        maxMembers: "",

        coverageAmount: "",
        basePremium: "",

        premiumFrequency: "YEARLY",
        status: "ACTIVE"
    });

    // Get Products
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoadingProducts(true);
                setError("");

                const response = await getProduct();

                if (response.data.success) {
                    setProducts(response.data.data);
                }

            } catch (error) {
                console.error("Fetch Products Error:", error);

                setError(
                    error.response?.data?.message ||
                    "Failed to load products"
                );
            } finally {
                setLoadingProducts(false);
            }
        };

        fetchProducts();
    }, []);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // Submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        // Basic validation
        if (!formData.productId) {
            setError("Please select a product");
            return;
        }

        if (Number(formData.minAge) >= Number(formData.maxAge)) {
            setError("Minimum age must be less than maximum age");
            return;
        }

        try {
            setSaving(true);

            const payload = {
                productId: formData.productId,

                planName: formData.planName.trim(),
                planCode: formData.planCode.trim().toUpperCase(),
                description: formData.description.trim(),

                eligibility: {
                    minAge: Number(formData.minAge),
                    maxAge: Number(formData.maxAge),
                    maxMembers: Number(formData.maxMembers)
                },

                coverageAmount: Number(formData.coverageAmount),
                basePremium: Number(formData.basePremium),

                premiumFrequency: formData.premiumFrequency,
                status: formData.status
            };

            const response = await addPlan(payload);

            if (response.data.success) {
                toast.success("Plan created successfully");

                //navigate("/plans");
            }
             setFormData({
        productId: "",
        planName: "",
        planCode: "",
        description: "",
        eligibility: {
            minAge: "",
            maxAge: "",
            maxMembers: ""
        },
        coverageAmount: "",
        basePremium: "",
        premiumFrequency: "YEARLY",
        status: "ACTIVE"
    });


        } catch (error) {
            console.error("Create Plan Error:", error);

            setError(
                error.response?.data?.message ||
                "Failed to create plan"
            );
        } finally {
            setSaving(false);
        }
    };

    return (
        <><br></br> <br></br> <br></br><br></br> <br></br>
        <div className="add-plan-page card">

            <div className="add-plan-card">

                <div className="add-plan-header">
                    <h2>Add Insurance Plan</h2>
                </div>

                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>

                    {/* Product */}

                    <div className="form-group">

                        <label>
                            Product <span>*</span>
                        </label>

                        <select
                            name="productId"
                            value={formData.productId}
                            onChange={handleChange}
                            required
                        >
                            <option value="">
                                {loadingProducts
                                    ? "Loading products..."
                                    : "Select Product"}
                            </option>

                            {products.map((product) => (
                                <option
                                    key={product._id}
                                    value={product._id}
                                >
                                    {product.productName}
                                </option>
                            ))}
                        </select>

                    </div>


                    {/* Plan Name */}

                    <div className="form-group">

                        <label>
                            Plan Name <span>*</span>
                        </label>

                        <input
                            type="text"
                            name="planName"
                            value={formData.planName}
                            onChange={handleChange}
                            placeholder="Family Floater Plan"
                            required
                        />

                    </div>


                    {/* Plan Code */}

                    <div className="form-group">

                        <label>
                            Plan Code <span>*</span>
                        </label>

                        <input
                            type="text"
                            name="planCode"
                            value={formData.planCode}
                            onChange={handleChange}
                            placeholder="HEALTH-FAMILY-001"
                            required
                        />

                    </div>


                    {/* Description */}

                    <div className="form-group">

                        <label>
                            Description
                        </label>

                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Health insurance for family"
                            rows="3"
                        />

                    </div>


                    {/* Eligibility */}

                    <div className="section">

                        <h3>Eligibility</h3>

                        <div className="three-column">

                            <div className="form-group">

                                <label>
                                    Minimum Age <span>*</span>
                                </label>

                                <input
                                    type="number"
                                    name="minAge"
                                    value={formData.minAge}
                                    onChange={handleChange}
                                    min="0"
                                    placeholder="18"
                                    required
                                />

                            </div>


                            <div className="form-group">

                                <label>
                                    Maximum Age <span>*</span>
                                </label>

                                <input
                                    type="number"
                                    name="maxAge"
                                    value={formData.maxAge}
                                    onChange={handleChange}
                                    min="0"
                                    placeholder="65"
                                    required
                                />

                            </div>


                            <div className="form-group">

                                <label>
                                    Maximum Members <span>*</span>
                                </label>

                                <input
                                    type="number"
                                    name="maxMembers"
                                    value={formData.maxMembers}
                                    onChange={handleChange}
                                    min="1"
                                    placeholder="6"
                                    required
                                />

                            </div>

                        </div>

                    </div>


                    {/* Coverage */}

                    <div className="section">

                        <h3>Coverage</h3>

                        <div className="two-column">

                            <div className="form-group">

                                <label>
                                    Coverage Amount <span>*</span>
                                </label>

                                <input
                                    type="number"
                                    name="coverageAmount"
                                    value={formData.coverageAmount}
                                    onChange={handleChange}
                                    min="0"
                                    placeholder="1000000"
                                    required
                                />

                            </div>


                            <div className="form-group">

                                <label>
                                    Base Premium <span>*</span>
                                </label>

                                <input
                                    type="number"
                                    name="basePremium"
                                    value={formData.basePremium}
                                    onChange={handleChange}
                                    min="0"
                                    placeholder="15000"
                                    required
                                />

                            </div>

                        </div>

                    </div>


                    {/* Premium Frequency */}

                    <div className="form-group">

                        <label>
                            Premium Frequency <span>*</span>
                        </label>

                        <select
                            name="premiumFrequency"
                            value={formData.premiumFrequency}
                            onChange={handleChange}
                        >
                            <option value="MONTHLY">
                                Monthly
                            </option>

                            <option value="QUARTERLY">
                                Quarterly
                            </option>

                            <option value="YEARLY">
                                Yearly
                            </option>
                        </select>

                    </div>


                    {/* Status */}

                    <div className="form-group">

                        <label>
                            Status
                        </label>

                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                        >
                            <option value="ACTIVE">
                                Active
                            </option>

                            <option value="INACTIVE">
                                Inactive
                            </option>
                        </select>

                    </div>


                    {/* Actions */}

                    <div className="form-actions">

                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={() => navigate("/plans")}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="save-btn"
                            disabled={saving}
                        >
                            {saving
                                ? "Saving..."
                                : "Save Plan"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
        </>
    );
}

export default Plan;
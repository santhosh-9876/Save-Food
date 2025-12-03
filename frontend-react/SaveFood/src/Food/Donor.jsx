import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import axiosInstance from "../Api/axiosInstance";
import AOS from "aos";
import "aos/dist/aos.css";

const API_URL = "/food/donor/";

const textFieldSx = {
  "& .MuiOutlinedInput-root": {
    "& fieldset": { borderColor: "black" },
    "&:hover fieldset": { borderColor: "black" },
    "&.Mui-focused fieldset": { borderColor: "green" },
  },
  "& .MuiOutlinedInput-input": {
    color: "black",
    fontWeight: "500",
    fontSize: "1rem",
  },
  "& .MuiInputLabel-root": {
    color: "black",
    fontWeight: "500",
    fontSize: "0.95rem",
  },
  "& .Mui-focused": {
    color: "black !important",
  },
};


const Donor = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    food_type: 1,
    title: "",
    description: "",
    Quantity: "",
    expiry_hours: "",
    Address: "",
    District: "",
    pincode: "",
    phone: "",
    people_can_feed: "",
  });

  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const token = localStorage.getItem("access_token");

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
      offset: 100,
    });
  }, []);

  // handle field changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone" || name === "pincode") {
      const onlyDigits = value.replace(/\D/g, "");
      setFormData((prev) => ({ ...prev, [name]: onlyDigits }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";

    if (!formData.Quantity || Number(formData.Quantity) <= 0) {
      newErrors.Quantity = "Quantity must be greater than 0";
    }

    if (!formData.expiry_hours) {
      newErrors.expiry_hours = "Expiry hours required";
    } else {
      const exp = Number(formData.expiry_hours);
      if (exp < 1 || exp > 5) {
        newErrors.expiry_hours = "Expiry must be between 1 and 5 hours";
      }
    }

    if (!formData.Address.trim()) newErrors.Address = "Address is required";
    if (!formData.District.trim()) newErrors.District = "District is required";

    if (!formData.pincode) {
      newErrors.pincode = "Pincode is required";
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = "Pincode must be 6 digits (numbers only)";
    }

    if (!formData.phone) {
      newErrors.phone = "Phone is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone must be 10 digits (numbers only)";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    setSubmitSuccess("");

    // Check if user is logged in first
    if (!token) {
      alert("Please login to share food! Click the Login button in the navigation bar.");
      return;
    }

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    // Prepare data - ensure numeric fields are numbers
    const submitData = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      Quantity: Number(formData.Quantity),
      food_type: Number(formData.food_type),
      expiry_hours: Number(formData.expiry_hours),
      Address: formData.Address.trim(),
      District: formData.District.trim(),
      pincode: formData.pincode.trim(),
      phone: formData.phone.trim(),
    };

    // Only include people_can_feed if it has a value
    if (formData.people_can_feed && formData.people_can_feed.trim() !== "") {
      submitData.people_can_feed = Number(formData.people_can_feed);
    }

    console.log("Submitting donation data:", submitData);

    try {
      const response = await axiosInstance.post(API_URL, submitData);
      console.log("Donation created successfully:", response.data);

      setFormData({
        food_type: 1,
        title: "",
        description: "",
        Quantity: "",
        expiry_hours: "",
        Address: "",
        District: "",
        pincode: "",
        phone: "",
        people_can_feed: "",
      });
      setErrors({});

      setSubmitSuccess("Food donation added successfully! ✅");
      
      // Scroll to top to show success message
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error("Error creating donation:", err.response || err);

      if (err.response?.status === 401) {
        setSubmitError("You must be logged in to add a donation.");
        alert("Please login to add food donation.");
      } else if (err.response?.data) {
        // Handle specific field errors from backend
        const backendErrors = err.response.data;
        
        if (typeof backendErrors === 'object' && !backendErrors.message) {
          // Set field-specific errors
          const fieldErrors = {};
          Object.keys(backendErrors).forEach(key => {
            if (Array.isArray(backendErrors[key])) {
              fieldErrors[key] = backendErrors[key][0];
            } else {
              fieldErrors[key] = backendErrors[key];
            }
          });
          setErrors(fieldErrors);
          setSubmitError("Please fix the errors in the form.");
        } else {
          // Generic error message from backend
          setSubmitError(backendErrors.message || backendErrors.error || "Something went wrong while creating donation.");
        }
      } else if (err.message) {
        if (err.message === "Network Error") {
          setSubmitError("Cannot connect to server. Please check your internet connection and try again.");
        } else {
          setSubmitError(`Error: ${err.message}`);
        }
      } else {
        setSubmitError("Something went wrong while creating donation. Please check your connection and try again.");
      }
      
      // Scroll to top to show error message
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-5 mt-5">
      <Box sx={{ maxWidth: 1200, margin: "auto" }}>
        <Box sx={{ textAlign: "center", mb: 4 }} data-aos="fade-down">
          <h2 className="text-4xl font-bold text-green-800 mb-2">
            🤝 Share Food & Make a Difference
          </h2>
          <p className="text-gray-600 text-lg">
            Turn your surplus into someone's meal - Every share counts!
          </p>
        </Box>

        {/* FORM CARD */}
        <Card
          data-aos="fade-up"
          data-aos-delay="200"
          sx={{
            maxWidth: 1100,
            margin: "auto",
            bgcolor: "#ffffff",
            borderRadius: 4,
            boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
            border: "1px solid #e0e0e0",
            mb: 5,
          }}
        >
          <Box
            sx={{
              background: "linear-gradient(135deg, #08775bff 0%, #06553f 100%)",
              color: "white",
              p: 3,
              borderRadius: "16px 16px 0 0",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <AddCircleOutlineIcon sx={{ fontSize: 32 }} />
              <h3 className="text-2xl font-bold">Share Your Food</h3>
            </Box>
          </Box>

          <CardContent sx={{ p: 4 }}>

          {submitError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {submitError}
            </Alert>
          )}

          {submitSuccess && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {submitSuccess}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            {/* 2-column responsive layout */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                gap: 2,
              }}
            >
              {/* Row 1: Title | Quantity */}
              <Box data-aos="fade-right" data-aos-delay="300">
                <TextField
                  name="title"
                  label="Food Title"
                  variant="outlined"
                  fullWidth
                  value={formData.title}
                  onChange={handleChange}
                  required
                  error={!!errors.title}
                  helperText={errors.title}
                  sx={textFieldSx}
                />
              </Box>

              <Box data-aos="fade-left" data-aos-delay="300">
                <TextField
                  name="Quantity"
                  label="Quantity"
                  type="number"
                  variant="outlined"
                  fullWidth
                  value={formData.Quantity}
                  onChange={handleChange}
                  required
                  slotProps={{ htmlInput: { min: 1 } }}
                  error={!!errors.Quantity}
                  helperText={errors.Quantity}
                  sx={textFieldSx}
                />
              </Box>

              {/* Row 2: Description full width */}
              <Box sx={{ gridColumn: { xs: "1", sm: "1 / -1" } }} data-aos="fade-up" data-aos-delay="350">
                <TextField
                  name="description"
                  label="Description"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={2}
                  value={formData.description}
                  onChange={handleChange}
                  required
                  error={!!errors.description}
                  helperText={errors.description}
                  sx={textFieldSx}
                />
              </Box>

              {/* Row 3: Expiry | Veg / Non-Veg */}
              <Box data-aos="fade-right" data-aos-delay="400">
                <TextField
                  name="expiry_hours"
                  label="Expire Hours (1–5)"
                  type="number"
                  variant="outlined"
                  fullWidth
                  value={formData.expiry_hours}
                  onChange={handleChange}
                  required
                  slotProps={{ htmlInput: { min: 1, max: 5 } }}
                  error={!!errors.expiry_hours}
                  helperText={
                    errors.expiry_hours ||
                    "Expiry auto calculated from created time"
                  }
                  sx={textFieldSx}
                />
              </Box>

              <Box data-aos="fade-left" data-aos-delay="400">
                <FormControl fullWidth sx={textFieldSx}>
                  <InputLabel>Food Type</InputLabel>
                  <Select
                    name="food_type"
                    value={formData.food_type}
                    label="Food Type"
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        food_type: Number(e.target.value),
                      }))
                    }
                    sx={{ color: "black" }}
                  >
                    <MenuItem value={1}>Veg 🥗</MenuItem>
                    <MenuItem value={2}>Non-Veg 🍗</MenuItem>
                  </Select>
                </FormControl>
              </Box>


              {/* Row 4: People can feed | Phone */}
              <Box data-aos="fade-right" data-aos-delay="450">
                <TextField
                  name="people_can_feed"
                  label="People Can Feed (optional)"
                  type="number"
                  variant="outlined"
                  fullWidth
                  value={formData.people_can_feed}
                  onChange={handleChange}
                  helperText="Optional"
                  sx={textFieldSx}
                />
              </Box>

              <Box data-aos="fade-left" data-aos-delay="450">
                <TextField
                  name="phone"
                  label="Phone"
                  variant="outlined"
                  fullWidth
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  slotProps={{
                    htmlInput: {
                      maxLength: 10,
                      inputMode: "numeric",
                      pattern: "[0-9]*",
                    },
                  }}
                  error={!!errors.phone}
                  helperText={errors.phone}
                  sx={textFieldSx}
                />
              </Box>

              {/* Row 5: Address full width */}
              <Box sx={{ gridColumn: { xs: "1", sm: "1 / -1" } }} data-aos="fade-up" data-aos-delay="500">
                <TextField
                  name="Address"
                  label="Address"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={2}
                  value={formData.Address}
                  onChange={handleChange}
                  required
                  error={!!errors.Address}
                  helperText={errors.Address}
                  sx={textFieldSx}
                />
              </Box>

              {/* Row 6: District | Pincode */}
              <Box data-aos="fade-right" data-aos-delay="550">
                <TextField
                  name="District"
                  label="District"
                  variant="outlined"
                  fullWidth
                  value={formData.District}
                  onChange={handleChange}
                  required
                  error={!!errors.District}
                  helperText={errors.District}
                  sx={textFieldSx}
                />
              </Box>

              <Box data-aos="fade-left" data-aos-delay="550">
                <TextField
                  name="pincode"
                  label="Pincode"
                  variant="outlined"
                  fullWidth
                  value={formData.pincode}
                  onChange={handleChange}
                  required
                  slotProps={{
                    htmlInput: {
                      maxLength: 6,
                      inputMode: "numeric",
                      pattern: "[0-9]*",
                    },
                  }}
                  error={!!errors.pincode}
                  helperText={errors.pincode}
                  sx={textFieldSx}
                />
              </Box>

              {/* Submit button - centered */}
              <Box
                data-aos="zoom-in"
                data-aos-delay="600"
                sx={{
                  gridColumn: { xs: "1", sm: "1 / -1" },
                  display: "flex",
                  justifyContent: "center",
                  mt: 1,
                }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isSubmitting}
                  startIcon={isSubmitting ? null : <RestaurantIcon />}
                  sx={{
                    width: { xs: "100%", sm: "280px" },
                    borderRadius: 3,
                    py: 1.5,
                    background: token 
                      ? "linear-gradient(135deg, #08775bff 0%, #06553f 100%)"
                      : "linear-gradient(135deg, #9e9e9e 0%, #757575 100%)",
                    "&:hover": {
                      background: token
                        ? "linear-gradient(135deg, #06553f 0%, #044030 100%)"
                        : "linear-gradient(135deg, #757575 0%, #616161 100%)",
                      transform: "translateY(-2px)",
                      boxShadow: token 
                        ? "0 6px 20px rgba(8, 119, 91, 0.4)"
                        : "0 6px 20px rgba(0, 0, 0, 0.2)",
                    },
                    fontWeight: "bold",
                    fontSize: "1.1rem",
                    transition: "all 0.3s ease",
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <CircularProgress size={22} sx={{ mr: 1, color: "white" }} />
                      Submitting...
                    </>
                  ) : token ? (
                    "Share Food"
                  ) : (
                    "Login to Share Food"
                  )}
                </Button>
              </Box>
            </Box>
          </form>
          </CardContent>
        </Card>
      </Box> 
    </div>
  );
};

export default Donor;

import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axiosInstance from "../Api/axiosInstance";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Typography,
  Chip,
  MenuItem,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import PersonIcon from "@mui/icons-material/Person";

const Claim = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const foodItem = location.state?.food;

  const [formData, setFormData] = useState({
    food: foodItem?.id || "",
    claimer_name: "",
    claimer_phone: "",
    claimer_address: "",
    quantity_claimed: foodItem?.Quantity || "",
    notes: "",
    claim_reason: "",
    organization_type: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!foodItem) {
      navigate("/available-food/");
    }
  }, [foodItem, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // Validate quantity
    const quantity = Number(formData.quantity_claimed);
    if (!quantity || quantity <= 0) {
      setError("Please enter a valid quantity");
      setLoading(false);
      return;
    }
    if (quantity > foodItem.Quantity) {
      setError(`Quantity cannot exceed available amount (${foodItem.Quantity})`);
      setLoading(false);
      return;
    }

    try {
      // Combine claim reason and organization type into notes
      const notesText = `Reason: ${formData.claim_reason}\nOrganization/Purpose: ${formData.organization_type}`;
      const submitData = {
        food: formData.food,
        claimer_name: formData.claimer_name.trim(),
        claimer_phone: formData.claimer_phone.trim(),
        claimer_address: formData.claimer_address.trim(),
        quantity_claimed: Number(formData.quantity_claimed),
        notes: notesText,
      };

      console.log("Submitting claim data:", submitData);

      const response = await axiosInstance.post("/food/claims/", submitData);
      setSuccess(response.data.message || "Claim submitted successfully!");
      
      setTimeout(() => {
        navigate("/available-food/");
      }, 2000);
    } catch (err) {
      console.error("Claim error:", err.response?.data);
      const errorMsg = err.response?.data?.error || 
                       err.response?.data?.quantity_claimed?.[0] ||
                       err.response?.data?.non_field_errors?.[0] ||
                       (typeof err.response?.data === 'string' ? err.response.data : null) ||
                       "Failed to submit claim. Please try again.";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  if (!foodItem) {
    return null;
  }

  return (
   <Box sx={{ minHeight: "100vh", backgroundColor: "#f5f5f5", py: 4, px: 2, marginTop: "4c0px" }}>
      <Box sx={{ maxWidth: 1200, margin: "auto", px: 2 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/available-food/")}
          sx={{ mb: 3, color: "#08674f" }}
        >
          Back to Available Food
        </Button>

        <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold", color: "#08674f" }}>
          Claim Food Donation
        </Typography>

        {/* ===== RESPONSIVE CSS GRID: 1 column on xs/sm, side-by-side from md up ===== */}
        <Box
          sx={{
            display: "grid",
            gap: 3,
            // gridTemplateColumns: 1 column on small, fixed card width + flexible form on md+
            gridTemplateColumns: { xs: "1fr", md: "420px 1fr" },
            alignItems: "start",
          }}
        >
          {/* Left: Food Details */}
          <Card sx={{ borderRadius: 3, boxShadow: 3, height: 'fit-content' }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                Food Details
              </Typography>

              <Box sx={{ mb: 2 }}>
                <Chip
                  icon={
                    <Box
                      sx={{
                        width: 16,
                        height: 16,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: Number(foodItem.food_type) === 1 ? "2px solid #2e7d32" : "2px solid #c62828",
                        borderRadius: "2px",
                      }}
                    >
                      <Box
                        sx={{
                          
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          backgroundColor: Number(foodItem.food_type) === 1 ? "#4caf50" : "#f44336",
                        }}
                      />
                    </Box>
                  }
                  label={Number(foodItem.food_type) === 1 ? "VEG" : "NON-VEG"}
                  size="small"
                  sx={{
                    backgroundColor: Number(foodItem.food_type) === 1 ? "#e8f5e9" : "#ffebee",
                    color: Number(foodItem.food_type) === 1 ? "#2e7d32" : "#c62828",
                    fontWeight: "700",
                  }}
                />
              </Box>

              <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
                {foodItem.title}
              </Typography>

              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {foodItem.description}
              </Typography>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <RestaurantIcon sx={{ fontSize: 20, color: "#08674f" }} />
                  <Typography variant="body2">
                    <strong>Available Quantity:</strong> {foodItem.Quantity ?? "—"}
                  </Typography>
                </Box>

                {foodItem.people_can_feed && (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <PersonIcon sx={{ fontSize: 20, color: "#08674f" }} />
                    <Typography variant="body2">
                      <strong>Can Feed:</strong> {foodItem.people_can_feed} people
                    </Typography>
                  </Box>
                )}

                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <LocationOnIcon sx={{ fontSize: 20, color: "#08674f" }} />
                  <Typography variant="body2">
                    <strong>Location:</strong> {foodItem.District ?? "—"}, {foodItem.pincode ?? "—"}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <PhoneIcon sx={{ fontSize: 20, color: "#08674f" }} />
                  <Typography variant="body2">
                    <strong>Contact:</strong> {foodItem.phone ?? "—"}
                  </Typography>
                </Box>
              </Box>

              {foodItem.hours_until_expiry !== null && foodItem.hours_until_expiry !== undefined && (
                <Box sx={{ mt: 2, p: 2, backgroundColor: "#fff3e0", borderRadius: 2 }}>
                  <Typography variant="body2" color="error" sx={{ fontWeight: "600" }}>
                    ⏰ Expires in: {Number(foodItem.hours_until_expiry).toFixed(1)} hours
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>

          {/* Right: Claim Form (fills remaining space) */}
          <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: "bold" }}>
                Your Information
              </Typography>

              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}

              {success && (
                <Alert severity="success" sx={{ mb: 2 }}>
                  {success}
                </Alert>
              )}

              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Your Name"
                  name="claimer_name"
                  value={formData.claimer_name}
                  onChange={handleChange}
                  required
                  sx={{
                    mb: 2,
                    "& .MuiOutlinedInput-root": {
                      "&:hover fieldset": { borderColor: "#08674f" },
                      "&.Mui-focused fieldset": { borderColor: "#08674f" },
                    },
                    "& .MuiInputLabel-root.Mui-focused": { color: "#08674f" },
                  }}
                />

                <TextField
                  fullWidth
                  label="Phone Number"
                  name="claimer_phone"
                  value={formData.claimer_phone}
                  onChange={handleChange}
                  required
                  inputProps={{ maxLength: 10 }}
                  sx={{
                    mb: 2,
                    "& .MuiOutlinedInput-root": {
                      "&:hover fieldset": { borderColor: "#08674f" },
                      "&.Mui-focused fieldset": { borderColor: "#08674f" },
                    },
                    "& .MuiInputLabel-root.Mui-focused": { color: "#08674f" },
                  }}
                />

                <TextField
                  fullWidth
                  label="Quantity to Claim"
                  name="quantity_claimed"
                  type="number"
                  value={formData.quantity_claimed}
                  required
                  disabled
                  helperText={`Available: ${foodItem.Quantity}`}
                  sx={{
                    mb: 2,
                    "& .MuiOutlinedInput-root": {
                      "&:hover fieldset": { borderColor: "#08674f" },
                      "&.Mui-focused fieldset": { borderColor: "#08674f" },
                    },
                    "& .MuiInputLabel-root.Mui-focused": { color: "#08674f" },
                  }}
                />

                <TextField
                  fullWidth
                  label="Your Address"
                  name="claimer_address"
                  value={formData.claimer_address}
                  onChange={handleChange}
                  required
                  multiline
                  rows={3}
                  sx={{
                    mb: 2,
                    "& .MuiOutlinedInput-root": {
                      "&:hover fieldset": { borderColor: "#08674f" },
                      "&.Mui-focused fieldset": { borderColor: "#08674f" },
                    },
                    "& .MuiInputLabel-root.Mui-focused": { color: "#08674f" },
                  }}
                />

                <TextField
                  fullWidth
                  select
                  label="Why are you claiming this food?"
                  name="claim_reason"
                  value={formData.claim_reason}
                  onChange={handleChange}
                  required
                  sx={{
                    mb: 2,
                    "& .MuiOutlinedInput-root": {
                      "&:hover fieldset": { borderColor: "#08674f" },
                      "&.Mui-focused fieldset": { borderColor: "#08674f" },
                    },
                    "& .MuiInputLabel-root.Mui-focused": { color: "#08674f" },
                  }}
                >
                  <MenuItem value="" disabled>
                    <em>Select a reason</em>
                  </MenuItem>
                  <MenuItem value="For homeless/needy people">🏠 For homeless/needy people</MenuItem>
                  <MenuItem value="For orphanage">👶 For orphanage</MenuItem>
                  <MenuItem value="For old age home">👴 For old age home</MenuItem>
                  <MenuItem value="For community feeding program">🤝 For community feeding program</MenuItem>
                  <MenuItem value="For disaster relief">🆘 For disaster relief</MenuItem>
                  <MenuItem value="Personal need">👤 Personal need</MenuItem>
                  <MenuItem value="Other charitable purpose">❤️ Other charitable purpose</MenuItem>
                </TextField>

                <TextField
                  fullWidth
                  label="Organization/Purpose Details"
                  name="organization_type"
                  value={formData.organization_type}
                  onChange={handleChange}
                  required
                  multiline
                  rows={3}
                  placeholder="Please provide details about your organization or how you'll use this food..."
                  helperText="e.g., NGO name, number of people you're serving, etc."
                  sx={{
                    mb: 3,
                    "& .MuiOutlinedInput-root": {
                      "&:hover fieldset": { borderColor: "#08674f" },
                      "&.Mui-focused fieldset": { borderColor: "#08674f" },
                    },
                    "& .MuiInputLabel-root.Mui-focused": { color: "#08674f" },
                  }}
                />

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={loading}
                  startIcon={loading ? <CircularProgress size={20} /> : <RestaurantIcon />}
                  sx={{
                    backgroundColor: "#08674f",
                    "&:hover": { backgroundColor: "#06553f" },
                    py: 1.5,
                    fontSize: "1rem",
                    fontWeight: "600",
                  }}
                >
                  {loading ? "Submitting..." : "Submit Claim"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default Claim;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Card,
  CardContent,
  Avatar,
  Typography,
  Button,
  Grid,
  Divider,
  Chip,
  TextField,
  IconButton,
  CircularProgress,
  Alert,
  Tabs,
  Tab,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import axiosInstance from "../Api/axiosInstance";
import AOS from "aos";
import "aos/dist/aos.css";

const MyProfile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
  });
  const [donations, setDonations] = useState([]);
  const [claims, setClaims] = useState([]);
  const [receivedClaims, setReceivedClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  const [updateLoading, setUpdateLoading] = useState(false);

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-in-out",
    });

    // Check if user is logged in
    const token = localStorage.getItem("access_token");
    if (!token) {
      navigate("/");
      return;
    }

    // Get user data from localStorage
    const username = localStorage.getItem("username") || "User";
    const email = localStorage.getItem("email") || "user@example.com";

    setUserData({
      username: username,
      email: email,
      firstName: "",
      lastName: "",
    });

    // Fetch donations and claims
    fetchUserData();
  }, [navigate]);

  const fetchUserData = async () => {
    setLoading(true);
    setError("");
    try {
      const currentUsername = localStorage.getItem("username");
      
      // Fetch all donations and filter by current user
      const donationsResponse = await axiosInstance.get("/food/donor/");
      const allDonations = donationsResponse.data || [];
      const userDonations = allDonations.filter(
        (donation) => donation.donor_username === currentUsername
      );
      setDonations(userDonations);

      // Fetch user's claims
      const claimsResponse = await axiosInstance.get("/food/claims/?my_claims=true");
      setClaims(claimsResponse.data || []);

      // Fetch all claims and filter for claims on user's donations
      const allClaimsResponse = await axiosInstance.get("/food/claims/");
      const allClaims = allClaimsResponse.data || [];
      const claimsOnMyDonations = allClaims.filter(claim => {
        const donation = userDonations.find(d => d.id === claim.food);
        return donation !== undefined;
      });
      setReceivedClaims(claimsOnMyDonations);
    } catch (err) {
      console.error("Error fetching user data:", err);
      setError("Failed to load your activity data");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateClaimStatus = async (claimId, newStatus) => {
    setUpdateLoading(true);
    try {
      await axiosInstance.put(`/food/claims/${claimId}/`, { status: newStatus });
      // Refresh data
      await fetchUserData();
      setError("");
    } catch (err) {
      console.error("Error updating claim status:", err);
      setError("Failed to update status");
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset to original data
    const username = localStorage.getItem("username") || "User";
    const email = localStorage.getItem("email") || "user@example.com";
    setUserData({
      username: username,
      email: email,
      firstName: "",
      lastName: "",
    });
  };

  const handleSave = () => {
    // Save updated data to localStorage
    localStorage.setItem("username", userData.username);
    if (userData.email) {
      localStorage.setItem("email", userData.email);
    }
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const getInitials = () => {
    return userData.username.charAt(0).toUpperCase();
  };

  return (
    <div style={{ marginTop: "100px", minHeight: "80vh", backgroundColor: "#f5f5f5" }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={3}>
          {/* Profile Card */}
          <Grid item xs={12} md={4}>
            <Card
              data-aos="fade-right"
              sx={{
                borderRadius: 3,
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                textAlign: "center",
                p: 3,
              }}
            >
              <Avatar
                sx={{
                  width: 120,
                  height: 120,
                  margin: "0 auto 20px",
                  background: "linear-gradient(135deg, #08775bff 0%, #06553f 100%)",
                  fontSize: "3rem",
                  fontWeight: "bold",
                }}
              >
                {getInitials()}
              </Avatar>

              <Typography variant="h5" fontWeight="700" gutterBottom>
                {userData.username}
              </Typography>

              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {userData.email}
              </Typography>

              <Chip
                label="Active Member"
                color="success"
                size="small"
                sx={{ mb: 3 }}
              />

              <Divider sx={{ my: 2 }} />

              <Box sx={{ textAlign: "left", mt: 3 }}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Member Since
                </Typography>
                <Typography variant="body1" fontWeight="600" sx={{ mb: 2 }}>
                  {new Date().toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                </Typography>
              </Box>
            </Card>
          </Grid>

          {/* Profile Details Card */}
          <Grid item xs={12} md={8}>
            <Card
              data-aos="fade-left"
              sx={{
                borderRadius: 3,
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                p: 3,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 3,
                }}
              >
                <Typography variant="h5" fontWeight="700">
                  Profile Information
                </Typography>
                {!isEditing ? (
                  <Button
                    variant="outlined"
                    startIcon={<EditIcon />}
                    onClick={handleEdit}
                    sx={{
                      borderColor: "#08775bff",
                      color: "#08775bff",
                      "&:hover": {
                        borderColor: "#06553f",
                        backgroundColor: "rgba(8, 119, 91, 0.04)",
                      },
                    }}
                  >
                    Edit Profile
                  </Button>
                ) : (
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <IconButton
                      color="success"
                      onClick={handleSave}
                      sx={{
                        backgroundColor: "#08775bff",
                        color: "white",
                        "&:hover": { backgroundColor: "#06553f" },
                      }}
                    >
                      <SaveIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={handleCancel}
                      sx={{
                        backgroundColor: "#f44336",
                        color: "white",
                        "&:hover": { backgroundColor: "#d32f2f" },
                      }}
                    >
                      <CancelIcon />
                    </IconButton>
                  </Box>
                )}
              </Box>

              <Divider sx={{ mb: 3 }} />

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <PersonIcon sx={{ mr: 1, color: "#08775bff" }} />
                    <Typography variant="subtitle2" color="text.secondary">
                      Username
                    </Typography>
                  </Box>
                  {isEditing ? (
                    <TextField
                      fullWidth
                      name="username"
                      value={userData.username}
                      onChange={handleChange}
                      size="small"
                    />
                  ) : (
                    <Typography variant="body1" fontWeight="600">
                      {userData.username}
                    </Typography>
                  )}
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <EmailIcon sx={{ mr: 1, color: "#08775bff" }} />
                    <Typography variant="subtitle2" color="text.secondary">
                      Email
                    </Typography>
                  </Box>
                  {isEditing ? (
                    <TextField
                      fullWidth
                      name="email"
                      type="email"
                      value={userData.email}
                      onChange={handleChange}
                      size="small"
                    />
                  ) : (
                    <Typography variant="body1" fontWeight="600">
                      {userData.email}
                    </Typography>
                  )}
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <PersonIcon sx={{ mr: 1, color: "#08775bff" }} />
                    <Typography variant="subtitle2" color="text.secondary">
                      First Name
                    </Typography>
                  </Box>
                  {isEditing ? (
                    <TextField
                      fullWidth
                      name="firstName"
                      value={userData.firstName}
                      onChange={handleChange}
                      size="small"
                      placeholder="Enter first name"
                    />
                  ) : (
                    <Typography variant="body1" fontWeight="600">
                      {userData.firstName || "Not set"}
                    </Typography>
                  )}
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <PersonIcon sx={{ mr: 1, color: "#08775bff" }} />
                    <Typography variant="subtitle2" color="text.secondary">
                      Last Name
                    </Typography>
                  </Box>
                  {isEditing ? (
                    <TextField
                      fullWidth
                      name="lastName"
                      value={userData.lastName}
                      onChange={handleChange}
                      size="small"
                      placeholder="Enter last name"
                    />
                  ) : (
                    <Typography variant="body1" fontWeight="600">
                      {userData.lastName || "Not set"}
                    </Typography>
                  )}
                </Grid>
              </Grid>
            </Card>

            {/* Activity Stats Card */}
            <Card
              data-aos="fade-up"
              data-aos-delay="200"
              sx={{
                borderRadius: 3,
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                p: 3,
                mt: 3,
              }}
            >
              <Typography variant="h5" fontWeight="700" sx={{ mb: 3 }}>
                My Activity
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Box
                    sx={{
                      textAlign: "center",
                      p: 2,
                      backgroundColor: "#e8f5e9",
                      borderRadius: 2,
                    }}
                  >
                    <RestaurantIcon
                      sx={{ fontSize: 40, color: "#08775bff", mb: 1 }}
                    />
                    <Typography variant="h4" fontWeight="700" color="#08775bff">
                      {loading ? <CircularProgress size={30} /> : donations.length}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Food Donations
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Box
                    sx={{
                      textAlign: "center",
                      p: 2,
                      backgroundColor: "#e8f5e9",
                      borderRadius: 2,
                    }}
                  >
                    <VolunteerActivismIcon
                      sx={{ fontSize: 40, color: "#08775bff", mb: 1 }}
                    />
                    <Typography variant="h4" fontWeight="700" color="#08775bff">
                      {loading ? <CircularProgress size={30} /> : claims.length}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Food Claims
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Card>
          </Grid>

          {/* Donations and Claims Details */}
          <Grid item xs={12}>
            <Card
              data-aos="fade-up"
              data-aos-delay="300"
              sx={{
                borderRadius: 3,
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                p: 3,
              }}
            >
              <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
                <Tabs
                  value={activeTab}
                  onChange={(e, newValue) => setActiveTab(newValue)}
                  sx={{
                    "& .MuiTab-root": { fontWeight: 600 },
                    "& .Mui-selected": { color: "#08775bff" },
                    "& .MuiTabs-indicator": { backgroundColor: "#08775bff" },
                  }}
                >
                  <Tab label={`My Donations (${donations.length})`} />
                  <Tab label={`My Claims (${claims.length})`} />
                  <Tab label={`Received Claims (${receivedClaims.length})`} />
                </Tabs>
              </Box>

              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}

              {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
                  <CircularProgress />
                </Box>
              ) : (
                <>
                  {/* Donations Tab */}
                  {activeTab === 0 && (
                    <Box>
                      {donations.length === 0 ? (
                        <Box sx={{ textAlign: "center", py: 4 }}>
                          <RestaurantIcon sx={{ fontSize: 60, color: "#ccc", mb: 2 }} />
                          <Typography variant="h6" color="text.secondary">
                            No donations yet
                          </Typography>
                          <Button
                            variant="contained"
                            onClick={() => navigate("/donor/")}
                            sx={{
                              mt: 2,
                              backgroundColor: "#08775bff",
                              "&:hover": { backgroundColor: "#06553f" },
                            }}
                          >
                            Make Your First Donation
                          </Button>
                        </Box>
                      ) : (
                        <Grid container spacing={2}>
                          {donations.map((donation, index) => (
                            <Grid item xs={12} md={6} key={donation.id}>
                              <Card
                                data-aos="zoom-in"
                                data-aos-delay={index * 100}
                                sx={{
                                  borderRadius: 2,
                                  border: "1px solid #e0e0e0",
                                  "&:hover": { boxShadow: 3 },
                                }}
                              >
                                <CardContent>
                                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                                    <Typography variant="h6" fontWeight="700">
                                      {donation.title}
                                    </Typography>
                                    <Chip
                                      label={Number(donation.food_type) === 1 ? "VEG" : "NON-VEG"}
                                      size="small"
                                      sx={{
                                        backgroundColor: Number(donation.food_type) === 1 ? "#e8f5e9" : "#ffebee",
                                        color: Number(donation.food_type) === 1 ? "#2e7d32" : "#c62828",
                                        fontWeight: "700",
                                      }}
                                    />
                                  </Box>

                                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                    {donation.description}
                                  </Typography>

                                  <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                      <RestaurantIcon sx={{ fontSize: 18, color: "#08775bff" }} />
                                      <Typography variant="body2">
                                        Quantity: {donation.Quantity}
                                      </Typography>
                                    </Box>

                                    {donation.people_can_feed && (
                                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                        <PersonIcon sx={{ fontSize: 18, color: "#08775bff" }} />
                                        <Typography variant="body2">
                                          Can Feed: {donation.people_can_feed} people
                                        </Typography>
                                      </Box>
                                    )}

                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                      <LocationOnIcon sx={{ fontSize: 18, color: "#08775bff" }} />
                                      <Typography variant="body2">
                                        {donation.District}, {donation.pincode}
                                      </Typography>
                                    </Box>

                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                      <PhoneIcon sx={{ fontSize: 18, color: "#08775bff" }} />
                                      <Typography variant="body2">{donation.phone}</Typography>
                                    </Box>
                                  </Box>

                                  <Divider sx={{ my: 2 }} />

                                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <Typography variant="caption" color="text.secondary">
                                      Created: {donation.created_at}
                                    </Typography>
                                    <Chip
                                      label={donation.donation_status}
                                      size="small"
                                      color={donation.donation_status?.includes("Active") ? "success" : "error"}
                                    />
                                  </Box>
                                </CardContent>
                              </Card>
                            </Grid>
                          ))}
                        </Grid>
                      )}
                    </Box>
                  )}

                  {/* Claims Tab */}
                  {activeTab === 1 && (
                    <Box>
                      {claims.length === 0 ? (
                        <Box sx={{ textAlign: "center", py: 4 }}>
                          <VolunteerActivismIcon sx={{ fontSize: 60, color: "#ccc", mb: 2 }} />
                          <Typography variant="h6" color="text.secondary">
                            No claims yet
                          </Typography>
                          <Button
                            variant="contained"
                            onClick={() => navigate("/available-food/")}
                            sx={{
                              mt: 2,
                              backgroundColor: "#08775bff",
                              "&:hover": { backgroundColor: "#06553f" },
                            }}
                          >
                            Browse Available Food
                          </Button>
                        </Box>
                      ) : (
                        <Grid container spacing={2}>
                          {claims.map((claim, index) => (
                            <Grid item xs={12} md={6} key={claim.id}>
                              <Card
                                data-aos="zoom-in"
                                data-aos-delay={index * 100}
                                sx={{
                                  borderRadius: 2,
                                  border: "1px solid #e0e0e0",
                                  "&:hover": { boxShadow: 3 },
                                }}
                              >
                                <CardContent>
                                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                                    <Typography variant="h6" fontWeight="700">
                                      {claim.food_title}
                                    </Typography>
                                    <Chip
                                      label={claim.status.toUpperCase()}
                                      size="small"
                                      color={
                                        claim.status === "approved" || claim.status === "completed"
                                          ? "success"
                                          : claim.status === "pending"
                                          ? "warning"
                                          : "error"
                                      }
                                    />
                                  </Box>

                                  <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mb: 2 }}>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                      <RestaurantIcon sx={{ fontSize: 18, color: "#08775bff" }} />
                                      <Typography variant="body2">
                                        Quantity Claimed: {claim.quantity_claimed}
                                      </Typography>
                                    </Box>

                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                      <PersonIcon sx={{ fontSize: 18, color: "#08775bff" }} />
                                      <Typography variant="body2">
                                        Name: {claim.claimer_name}
                                      </Typography>
                                    </Box>

                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                      <PhoneIcon sx={{ fontSize: 18, color: "#08775bff" }} />
                                      <Typography variant="body2">
                                        Phone: {claim.claimer_phone}
                                      </Typography>
                                    </Box>

                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                      <LocationOnIcon sx={{ fontSize: 18, color: "#08775bff" }} />
                                      <Typography variant="body2">
                                        Address: {claim.claimer_address}
                                      </Typography>
                                    </Box>
                                  </Box>

                                  {claim.notes && (
                                    <Box sx={{ mb: 2, p: 1.5, backgroundColor: "#f5f5f5", borderRadius: 1 }}>
                                      <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                                        Notes:
                                      </Typography>
                                      <Typography variant="body2" sx={{ whiteSpace: "pre-line", mt: 0.5 }}>
                                        {claim.notes}
                                      </Typography>
                                    </Box>
                                  )}

                                  {claim.status !== "completed" && (
                                    <Button
                                      variant="contained"
                                      fullWidth
                                      size="small"
                                      disabled={updateLoading}
                                      onClick={() => handleUpdateClaimStatus(claim.id, "completed")}
                                      sx={{
                                        mb: 2,
                                        backgroundColor: "#08775bff",
                                        "&:hover": { backgroundColor: "#06553f" },
                                      }}
                                    >
                                      {updateLoading ? "Updating..." : "Mark as Received"}
                                    </Button>
                                  )}

                                  <Divider sx={{ my: 2 }} />

                                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <Typography variant="caption" color="text.secondary">
                                      Claimed: {claim.claimed_at}
                                    </Typography>
                                  </Box>
                                </CardContent>
                              </Card>
                            </Grid>
                          ))}
                        </Grid>
                      )}
                    </Box>
                  )}

                  {/* Received Claims Tab - Claims on my donations */}
                  {activeTab === 2 && (
                    <Box>
                      {receivedClaims.length === 0 ? (
                        <Box sx={{ textAlign: "center", py: 4 }}>
                          <VolunteerActivismIcon sx={{ fontSize: 60, color: "#ccc", mb: 2 }} />
                          <Typography variant="h6" color="text.secondary">
                            No one has claimed your donations yet
                          </Typography>
                        </Box>
                      ) : (
                        <Grid container spacing={2}>
                          {receivedClaims.map((claim, index) => (
                            <Grid item xs={12} md={6} key={claim.id}>
                              <Card
                                data-aos="zoom-in"
                                data-aos-delay={index * 100}
                                sx={{
                                  borderRadius: 2,
                                  border: "1px solid #e0e0e0",
                                  "&:hover": { boxShadow: 3 },
                                }}
                              >
                                <CardContent>
                                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                                    <Typography variant="h6" fontWeight="700">
                                      {claim.food_title}
                                    </Typography>
                                    <Chip
                                      label={claim.status.toUpperCase()}
                                      size="small"
                                      color={
                                        claim.status === "approved" || claim.status === "completed"
                                          ? "success"
                                          : claim.status === "pending"
                                          ? "warning"
                                          : "error"
                                      }
                                    />
                                  </Box>

                                  <Typography variant="subtitle2" color="primary" sx={{ mb: 2, fontWeight: 600 }}>
                                    Claimed by: {claim.claimer_username}
                                  </Typography>

                                  <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mb: 2 }}>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                      <RestaurantIcon sx={{ fontSize: 18, color: "#08775bff" }} />
                                      <Typography variant="body2">
                                        Quantity: {claim.quantity_claimed}
                                      </Typography>
                                    </Box>

                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                      <PersonIcon sx={{ fontSize: 18, color: "#08775bff" }} />
                                      <Typography variant="body2">
                                        Name: {claim.claimer_name}
                                      </Typography>
                                    </Box>

                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                      <PhoneIcon sx={{ fontSize: 18, color: "#08775bff" }} />
                                      <Typography variant="body2">
                                        Phone: {claim.claimer_phone}
                                      </Typography>
                                    </Box>

                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                      <LocationOnIcon sx={{ fontSize: 18, color: "#08775bff" }} />
                                      <Typography variant="body2">
                                        Address: {claim.claimer_address}
                                      </Typography>
                                    </Box>
                                  </Box>

                                  {claim.notes && (
                                    <Box sx={{ mb: 2, p: 1.5, backgroundColor: "#f5f5f5", borderRadius: 1 }}>
                                      <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                                        Notes:
                                      </Typography>
                                      <Typography variant="body2" sx={{ whiteSpace: "pre-line", mt: 0.5 }}>
                                        {claim.notes}
                                      </Typography>
                                    </Box>
                                  )}

                                  {claim.status === "pending" && (
                                    <Button
                                      variant="contained"
                                      fullWidth
                                      size="small"
                                      disabled={updateLoading}
                                      onClick={() => handleUpdateClaimStatus(claim.id, "approved")}
                                      sx={{
                                        mb: 2,
                                        backgroundColor: "#4caf50",
                                        "&:hover": { backgroundColor: "#388e3c" },
                                      }}
                                    >
                                      {updateLoading ? "Confirming..." : "Confirm Pickup"}
                                    </Button>
                                  )}

                                  {claim.status === "approved" && (
                                    <Button
                                      variant="contained"
                                      fullWidth
                                      size="small"
                                      disabled={updateLoading}
                                      onClick={() => handleUpdateClaimStatus(claim.id, "completed")}
                                      sx={{
                                        mb: 2,
                                        backgroundColor: "#08775bff",
                                        "&:hover": { backgroundColor: "#06553f" },
                                      }}
                                    >
                                      {updateLoading ? "Updating..." : "Mark as Delivered"}
                                    </Button>
                                  )}

                                  <Divider sx={{ my: 2 }} />

                                  <Typography variant="caption" color="text.secondary">
                                    Claimed: {claim.claimed_at}
                                  </Typography>
                                </CardContent>
                              </Card>
                            </Grid>
                          ))}
                        </Grid>
                      )}
                    </Box>
                  )}
                </>
              )}
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default MyProfile;

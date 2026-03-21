import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../CustomHook/useFetch";
import axiosInstance from "../Api/axiosInstance";
import {
  Card,
  CardContent,
  CircularProgress,
  Alert,
  Chip,
  Box,
  TextField,
  InputAdornment,
  Grid,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import AOS from "aos";
import "aos/dist/aos.css";

const API_URL = "/food/donor/";

const parseCustomDate = (dateString) => {
  // Parse "02-12-2025 10:46 PM" format
  if (!dateString) return null;
  
  const [datePart, timePart, period] = dateString.split(" ");
  const [day, month, year] = datePart.split("-");
  const [hours, minutes] = timePart.split(":");
  
  let hour = parseInt(hours);
  if (period === "PM" && hour !== 12) hour += 12;
  if (period === "AM" && hour === 12) hour = 0;
  
  return new Date(year, month - 1, day, hour, parseInt(minutes));
};

const getTimeAgo = (dateString) => {
  const now = new Date();
  const createdDate = parseCustomDate(dateString);
  if (!createdDate) return "Unknown";
  
  const diffInMs = now - createdDate;
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInMinutes < 1) return "Just now";
  if (diffInMinutes < 60)
    return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
  if (diffInHours < 24)
    return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
  return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
};

const AvailableFood = () => {
  const navigate = useNavigate();
  const { Products: foods, error: fetchError, isLoading } = useFetch(API_URL);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [foodTypeFilter, setFoodTypeFilter] = useState("all");
  const currentUsername = localStorage.getItem("username");
  const [claimedFoodIds, setClaimedFoodIds] = useState([]);

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  // Fetch user's claims to check which foods they've already claimed
  useEffect(() => {
    const fetchUserClaims = async () => {
      try {
        const response = await axiosInstance.get("/food/claims/?my_claims=true");
        const claims = response.data || [];
        // Extract food IDs from claims
        const foodIds = claims.map(claim => claim.food);
        setClaimedFoodIds(foodIds);
      } catch (err) {
        console.error("Error fetching user claims:", err);
      }
    };

    const token = localStorage.getItem("access_token");
    if (token) {
      fetchUserClaims();
    }
  }, []);

  // Live time tracking - updates every 30 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 30000); // Update every 30 seconds

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (Array.isArray(foods)) {
      const now = currentTime;
      
      const activeAndFiltered = foods.filter((food) => {
        const expiryDate = parseCustomDate(food.expiry_at);
        const isNotExpired = expiryDate && expiryDate > now;
        
        const matchesSearch =
          food.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          food.District.toLowerCase().includes(searchTerm.toLowerCase()) ||
          food.description.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesFoodType =
          foodTypeFilter === "all" ||
          (foodTypeFilter === "veg" && Number(food.food_type) === 1) ||
          (foodTypeFilter === "nonveg" && Number(food.food_type) === 2);
        
        return isNotExpired && matchesSearch && matchesFoodType;
      });
      
      setFilteredFoods(activeAndFiltered);
    }
  }, [foods, searchTerm, currentTime, foodTypeFilter]);

  const handleClaim = (food) => {
    navigate("/claim/", { state: { food } });
  };

  const getTimeRemaining = (expiryDateString) => {
    const now = new Date();
    const expiry = parseCustomDate(expiryDateString);
    if (!expiry) return "Unknown";
    
    const diffInMs = expiry - now;
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInMinutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));

    if (diffInHours > 0) {
      return `${diffInHours}h ${diffInMinutes}m remaining`;
    } else if (diffInMinutes > 0) {
      return `${diffInMinutes}m remaining`;
    }
    return "Expired";
  };

  return (
    <div className="p-5 mt-5">
      <Box sx={{ maxWidth: 1200, margin: "auto" }}>
        <h2 className="text-center mb-4 text-3xl font-bold text-green-800" data-aos="fade-down">
          🍽️ Available Food
        </h2>

        <Box sx={{ mb: 4 }}>
          <TextField
            fullWidth
            placeholder="Search by food name, district, or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            data-aos="fade-up"
            data-aos-delay="100"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              },
            }}
            sx={{
              backgroundColor: "white",
              borderRadius: 2,
              mb: 3,
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#08674f" },
                "&:hover fieldset": { borderColor: "#08674f" },
                "&.Mui-focused fieldset": { borderColor: "#08674f" },
              },
            }}
          />
          
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }} data-aos="fade-up" data-aos-delay="200">
            <Button
              variant={foodTypeFilter === "all" ? "contained" : "outlined"}
              onClick={() => setFoodTypeFilter("all")}
              sx={{
                backgroundColor: foodTypeFilter === "all" ? "#08775bff" : "transparent",
                color: foodTypeFilter === "all" ? "white" : "#08775bff",
                borderColor: "#08775bff",
                "&:hover": {
                  backgroundColor: foodTypeFilter === "all" ? "#06553f" : "rgba(8, 119, 91, 0.04)",
                  borderColor: "#06553f",
                },
                fontWeight: "600",
                px: 3,
              }}
            >
              All
            </Button>
            <Button
              variant={foodTypeFilter === "veg" ? "contained" : "outlined"}
              onClick={() => setFoodTypeFilter("veg")}
              startIcon={
                <Box
                  sx={{
                    width: 16,
                    height: 16,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: foodTypeFilter === "veg" ? "2px solid white" : "2px solid #4caf50",
                    borderRadius: "2px",
                  }}
                >
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      backgroundColor: foodTypeFilter === "veg" ? "white" : "#4caf50",
                    }}
                  />
                </Box>
              }
              sx={{
                backgroundColor: foodTypeFilter === "veg" ? "#4caf50" : "transparent",
                color: foodTypeFilter === "veg" ? "white" : "#4caf50",
                borderColor: "#4caf50",
                "&:hover": {
                  backgroundColor: foodTypeFilter === "veg" ? "#388e3c" : "rgba(76, 175, 80, 0.04)",
                  borderColor: "#388e3c",
                },
                fontWeight: "600",
                px: 3,
              }}
            >
              Veg
            </Button>
            <Button
              variant={foodTypeFilter === "nonveg" ? "contained" : "outlined"}
              onClick={() => setFoodTypeFilter("nonveg")}
              startIcon={
                <Box
                  sx={{
                    width: 16,
                    height: 16,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: foodTypeFilter === "nonveg" ? "2px solid white" : "2px solid #f44336",
                    borderRadius: "2px",
                  }}
                >
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      backgroundColor: foodTypeFilter === "nonveg" ? "white" : "#f44336",
                    }}
                  />
                </Box>
              }
              sx={{
                backgroundColor: foodTypeFilter === "nonveg" ? "#f44336" : "transparent",
                color: foodTypeFilter === "nonveg" ? "white" : "#f44336",
                borderColor: "#f44336",
                "&:hover": {
                  backgroundColor: foodTypeFilter === "nonveg" ? "#d32f2f" : "rgba(244, 67, 54, 0.04)",
                  borderColor: "#d32f2f",
                },
                fontWeight: "600",
                px: 3,
              }}
            >
              Non-Veg
            </Button>
          </Box>
        </Box>

        {isLoading && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress />
          </Box>
        )}

        {fetchError && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {fetchError}
          </Alert>
        )}

        {!isLoading && !fetchError && filteredFoods.length === 0 && (
          <Alert severity="info" sx={{ mt: 2 }}>
            {searchTerm
              ? "No food donations found matching your search."
              : "No food donations available at the moment."}
          </Alert>
        )}

        <Grid container spacing={3}>
          {!isLoading &&
            !fetchError &&
            filteredFoods.map((food, index) => (
              <Grid item xs={12} sm={6} md={4} key={food.id} sx={{ display: "flex", justifyContent: "center" }}>
                <Card
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                  sx={{
                    width: "350px",
                    height: "420px",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: 3,
                    boxShadow: 3,
                    transition: "transform 0.2s, box-shadow 0.2s",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: 6,
                    },
                  }}
                >
                  <CardContent sx={{ 
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                  }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 2,
                      }}
                    >
                      <Chip
                        icon={
                          <Box
                            sx={{
                              width: 16,
                              height: 16,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              border: Number(food.food_type) === 1 ? "2px solid #2e7d32" : "2px solid #c62828",
                              borderRadius: "2px",
                              position: "relative",
                            }}
                          >
                            <Box
                              sx={{
                                width: 8,
                                height: 8,
                                borderRadius: "50%",
                                backgroundColor: Number(food.food_type) === 1 ? "#4caf50" : "#f44336",
                              }}
                            />
                          </Box>
                        }
                        label={Number(food.food_type) === 1 ? "VEG" : "NON-VEG"}
                        size="small"
                        sx={{
                          backgroundColor: Number(food.food_type) === 1 ? "#e8f5e9" : "#ffebee",
                          color: Number(food.food_type) === 1 ? "#2e7d32" : "#c62828",
                          fontWeight: "700",
                          fontSize: "0.7rem",
                          letterSpacing: "0.5px",
                          border: Number(food.food_type) === 1 ? "1.5px solid #4caf50" : "1.5px solid #f44336",
                          "& .MuiChip-icon": {
                            marginLeft: "8px",
                          },
                        }}
                      />
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 0.5,
                          color: "text.secondary",
                          fontSize: "0.75rem",
                        }}
                      >
                        <AccessTimeIcon sx={{ fontSize: 14 }} />
                        {getTimeAgo(food.created_at)}
                      </Box>
                    </Box>

                    <h3 
                      className="text-xl font-bold mb-2 text-gray-800"
                      style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                      title={food.title}
                    >
                      {food.title}
                    </h3>

                    <p 
                      className="text-sm text-gray-600 mb-3"
                      style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        minHeight: "40px",
                        maxHeight: "40px",
                      }}
                      title={food.description}
                    >
                      {food.description}
                    </p>

                    <Box sx={{ mb: 2 }}>
                      <Chip
                        label={`Quantity: ${food.Quantity}`}
                        size="small"
                        sx={{ mr: 1, mb: 1 }}
                      />
                      {food.people_can_feed && (
                        <Chip
                          label={`Feeds: ${food.people_can_feed} people`}
                          size="small"
                          color="primary"
                          variant="outlined"
                          sx={{ mb: 1 }}
                        />
                      )}
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mb: 1,
                        color: "text.secondary",
                        fontSize: "0.875rem",
                      }}
                    >
                      <LocationOnIcon sx={{ fontSize: 18, flexShrink: 0 }} />
                      <span
                        style={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                        title={`${food.District}, ${food.pincode}`}
                      >
                        {food.District}, {food.pincode}
                      </span>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mb: 2,
                        color: "text.secondary",
                        fontSize: "0.875rem",
                      }}
                    >
                      <PhoneIcon sx={{ fontSize: 18, flexShrink: 0 }} />
                      <span>{food.phone}</span>
                    </Box>

                    <Box
                      sx={{
                        pt: 2,
                        borderTop: "1px solid #e0e0e0",
                        mt: "auto",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          mb: 2,
                        }}
                      >
                        <Box sx={{ fontSize: "0.75rem", color: "text.secondary" }}>
                          <div>
                            <strong>Posted:</strong> {getTimeAgo(food.created_at)}
                          </div>
                          <div className="mt-1">
                            <strong>Expires in:</strong>{" "}
                            <span
                              style={{
                                color: "#d32f2f",
                                fontWeight: "600",
                              }}
                            >
                              {getTimeRemaining(food.expiry_at)}
                            </span>
                          </div>
                        </Box>
                      </Box>

                      {food.donor_username === currentUsername ? (
                        <Chip
                          label="Your Donation"
                          color="success"
                          sx={{
                            width: "100%",
                            height: "40px",
                            fontSize: "0.95rem",
                            fontWeight: "600",
                          }}
                        />
                      ) : claimedFoodIds.includes(food.id) ? (
                        <Chip
                          label="Already Claimed"
                          color="warning"
                          sx={{
                            width: "100%",
                            height: "40px",
                            fontSize: "0.95rem",
                            fontWeight: "600",
                          }}
                        />
                      ) : (
                        <Button
                          variant="contained"
                          fullWidth
                          startIcon={<RestaurantIcon />}
                          onClick={() => handleClaim(food)}
                          sx={{
                            backgroundColor: "#08674f",
                            "&:hover": {
                              backgroundColor: "#06553f",
                            },
                            textTransform: "none",
                            fontWeight: "600",
                            py: 1,
                          }}
                        >
                          Claim This Food
                        </Button>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Box>
    </div>
  );
};

export default AvailableFood;
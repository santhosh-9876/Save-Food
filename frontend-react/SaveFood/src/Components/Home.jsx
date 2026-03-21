 import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useFetch from "../CustomHook/useFetch";
import {
  Card,
  CardContent,
  CircularProgress,
  Alert,
  Chip,
  Box,
  Button,
  Grid,
  Container,
} from "@mui/material";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AOS from "aos";
import "aos/dist/aos.css";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";

const API_URL = "/food/donor/";

const parseCustomDate = (dateString) => {
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
  if (diffInMinutes < 1) return "Just now";
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  if (diffInHours < 24) return `${diffInHours}h ago`;
  return `${Math.floor(diffInHours / 24)}d ago`;
};

const Home = () => {
  const navigate = useNavigate();
  const { Products: foods, error: fetchError, isLoading } = useFetch(API_URL);
  const [activeFoods, setActiveFoods] = useState([]);
  const [foodTypeFilter, setFoodTypeFilter] = useState("all");
  const token = localStorage.getItem("access_token");
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  useEffect(() => {
    if (Array.isArray(foods)) {
      const now = new Date();
      let filtered = foods.filter((food) => {
        const expiryDate = parseCustomDate(food.expiry_at);
        return expiryDate && expiryDate > now;
      });

      if (foodTypeFilter === "veg") {
        filtered = filtered.filter((food) => Number(food.food_type) === 1);
      } else if (foodTypeFilter === "nonveg") {
        filtered = filtered.filter((food) => Number(food.food_type) === 2);
      }

      setActiveFoods(filtered.slice(0, 6));
    }
  }, [foods, foodTypeFilter]);

  return (
    <div style={{ marginTop: "100px", minHeight: "80vh" }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: 6, mt: 5 }}>
          <h1 className="text-5xl font-bold text-green-800 mb-3" data-aos="fade-up">
            Save Food, Reduce Waste
          </h1>
          <p className="text-xl text-gray-600 mb-2" data-aos="fade-up" data-aos-delay="100">
            A platform for donors to share surplus food with people and
            organizations in need, helping reduce food waste and fight hunger.
          </p>
          <p className="text-lg text-gray-500 mb-4 max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="200">
            Join our community in making a difference. Every meal shared is a step towards 
            a sustainable future where no food goes to waste and no one goes hungry.
          </p>
          
          <Box sx={{ display: "flex", justifyContent: "center", gap: 4, mb: 4, flexWrap: "wrap" }}>
            <Box sx={{ textAlign: "center" }} data-aos="fade-up" data-aos-delay="100">
              <h3 className="text-3xl font-bold text-green-700">1000+</h3>
              <p className="text-sm text-gray-600">Meals Shared</p>
            </Box>
            <Box sx={{ textAlign: "center" }} data-aos="fade-up" data-aos-delay="200">
              <h3 className="text-3xl font-bold text-green-700">500+</h3>
              <p className="text-sm text-gray-600">Active Donors</p>
            </Box>
            <Box sx={{ textAlign: "center" }} data-aos="fade-up" data-aos-delay="300">
              <h3 className="text-3xl font-bold text-green-700">50+</h3>
              <p className="text-sm text-gray-600">Communities Served</p>
            </Box>
            <Box sx={{ textAlign: "center" }} data-aos="fade-up" data-aos-delay="400">
              <h3 className="text-3xl font-bold text-green-700">2000+</h3>
              <p className="text-sm text-gray-600">People Fed</p>
            </Box>
            <Box sx={{ textAlign: "center" }} data-aos="fade-up" data-aos-delay="500">
              <h3 className="text-3xl font-bold text-green-700">95%</h3>
              <p className="text-sm text-gray-600">Waste Reduced</p>
            </Box>
          </Box>

          <Box sx={{ mt: 4, mb: 4, textAlign: "center" }} data-aos="fade-up" data-aos-delay="300">
            <p className="text-md text-gray-600 max-w-2xl mx-auto">
              Every donation counts! Together, we're building a sustainable future where 
              surplus food reaches those who need it most, reducing waste and creating 
              positive environmental impact.
            </p>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center", gap: 3, mb: 4, flexWrap: "wrap" }}>
            <Box sx={{ textAlign: "center", maxWidth: "200px" }} data-aos="fade-up" data-aos-delay="100">
              <span className="text-3xl mb-2 block">🌱</span>
              <p className="text-sm font-semibold text-gray-700 mb-1">Eco-Friendly</p>
              <p className="text-xs text-gray-600">Reduce carbon footprint</p>
            </Box>
            <Box sx={{ textAlign: "center", maxWidth: "200px" }} data-aos="fade-up" data-aos-delay="200">
              <span className="text-3xl mb-2 block">🤝</span>
              <p className="text-sm font-semibold text-gray-700 mb-1">Community Driven</p>
              <p className="text-xs text-gray-600">Connect with local donors</p>
            </Box>
            <Box sx={{ textAlign: "center", maxWidth: "200px" }} data-aos="fade-up" data-aos-delay="300">
              <span className="text-3xl mb-2 block">⚡</span>
              <p className="text-sm font-semibold text-gray-700 mb-1">Quick & Easy</p>
              <p className="text-xs text-gray-600">Share food in minutes</p>
            </Box>
            <Box sx={{ textAlign: "center", maxWidth: "200px" }} data-aos="fade-up" data-aos-delay="400">
              <span className="text-3xl mb-2 block">💚</span>
              <p className="text-sm font-semibold text-gray-700 mb-1">Make Impact</p>
              <p className="text-xs text-gray-600">Help fight hunger today</p>
            </Box>
          </Box>

          {token ? (
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowForwardIcon />}
              onClick={() => navigate("/available-food/")}
              sx={{
                backgroundColor: "#08775bff",
                "&:hover": { backgroundColor: "#06553f" },
                fontWeight: "600",
                px: 4,
                py: 1.5,
                fontSize: "1.1rem",
                borderRadius: 3,
                boxShadow: "0 4px 14px rgba(8, 119, 91, 0.3)",
              }}
            >
              View All Available Food
            </Button>
          ) : (
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowForwardIcon />}
              onClick={() => setLoginModalOpen(true)}
              sx={{
                backgroundColor: "#08775bff",
                "&:hover": { backgroundColor: "#06553f" },
                fontWeight: "600",
                px: 4,
                py: 1.5,
                fontSize: "1.1rem",
                borderRadius: 3,
                boxShadow: "0 4px 14px rgba(8, 119, 91, 0.3)",
              }}
            >
              Login to View Available Food
            </Button>
          )}
        </Box>

        <Box sx={{ mb: 4 }} data-aos="fade-up">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
             Recently Available Food
          </h2>
          <Box sx={{ display: "flex", justifyContent: "flex-start", gap: 2, mt: 3 }}>
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

        {!isLoading && !fetchError && activeFoods.length === 0 && (
          <Alert severity="info" sx={{ mt: 2 }}>
            No food available at the moment. Check back soon!
          </Alert>
        )}

        <Grid container spacing={3}>
          {!isLoading &&
            !fetchError &&
            activeFoods.map((food, index) => (
              <Grid item xs={12} sm={6} md={4} key={food.id} sx={{ display: "flex", justifyContent: "center" }}>
                <Card
                  data-aos="zoom-in"
                  data-aos-delay={index * 150}
                  data-aos-duration="800"
                  sx={{
                    width: "350px",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: 4,
                    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                    border: "1px solid #e0e0e0",
                    transition: "all 0.3s ease",
                    overflow: "hidden",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 12px 40px rgba(8, 119, 91, 0.15)",
                      borderColor: "#08775bff",
                    },
                  }}
                >
                  <Box
                    sx={{
                      background:
                        Number(food.food_type) === 1
                          ? "linear-gradient(135deg, #4caf50 0%, #66bb6a 100%)"
                          : "linear-gradient(135deg, #f44336 0%, #ef5350 100%)",
                      p: 1.5,
                      color: "white",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
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
                              border: "2px solid white",
                              borderRadius: "2px",
                              position: "relative",
                            }}
                          >
                            <Box
                              sx={{
                                width: 8,
                                height: 8,
                                borderRadius: "50%",
                                backgroundColor: "white",
                              }}
                            />
                          </Box>
                        }
                        label={Number(food.food_type) === 1 ? "VEG" : "NON-VEG"}
                        size="small"
                        sx={{
                          backgroundColor: "rgba(255,255,255,0.25)",
                          color: "white",
                          fontWeight: "700",
                          fontSize: "0.7rem",
                          letterSpacing: "0.5px",
                          backdropFilter: "blur(10px)",
                          border: "1.5px solid rgba(255,255,255,0.4)",
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
                          fontSize: "0.7rem",
                          backgroundColor: "rgba(255,255,255,0.2)",
                          px: 1,
                          py: 0.3,
                          borderRadius: 2,
                        }}
                      >
                        <AccessTimeIcon sx={{ fontSize: 12 }} />
                        {getTimeAgo(food.created_at)}
                      </Box>
                    </Box>
                  </Box>

                  <CardContent sx={{ flexGrow: 1, p: 2 }}>
                    <h3 
                      className="text-lg font-bold mb-1 text-gray-800"
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
                      className="text-sm text-gray-600 mb-2"
                      style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        minHeight: "40px",
                      }}
                      title={food.description}
                    >
                      {food.description}
                    </p>

                    <Box
                      sx={{
                        display: "flex",
                        gap: 1,
                        mb: 2,
                        flexWrap: "wrap",
                      }}
                    >
                      <Chip
                        label={`Qty: ${food.Quantity}`}
                        size="small"
                        variant="outlined"
                        sx={{
                          borderColor: "#08775bff",
                          color: "#08775bff",
                          fontWeight: "600",
                          height: "24px",
                        }}
                      />
                      {food.people_can_feed && (
                        <Chip
                          label={`Feeds ${food.people_can_feed}`}
                          size="small"
                          variant="outlined"
                          color="primary"
                          sx={{ height: "24px" }}
                        />
                      )}
                    </Box>

                    <Box
                      sx={{
                        borderTop: "1px solid #e0e0e0",
                        pt: 1.5,
                        mt: "auto",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          mb: 1,
                          fontSize: "0.8rem",
                          color: "text.secondary",
                        }}
                      >
                        <LocationOnIcon
                          sx={{ fontSize: 16, color: "#08775bff" }}
                        />
                        <span className="font-medium">{food.District}</span>
                      </Box>

                   
                    </Box>
                  </CardContent>

                  <Box
                    sx={{
                      p: 1.5,
                      backgroundColor: "#f5f5f5",
                      borderTop: "1px solid #e0e0e0",
                    }}
                  >
                    <Button
                      fullWidth
                      variant="contained"
                      size="small"
                      startIcon={<RestaurantIcon />}
                      onClick={() => token ? navigate("/available-food/") : setLoginModalOpen(true)}
                      sx={{
                        backgroundColor: "#08775bff",
                        "&:hover": {
                          backgroundColor: "#06553f",
                        },
                        fontWeight: "600",
                        textTransform: "none",
                        py: 0.5,
                      }}
                    >
                      {token ? "View Details" : "Login to View"}
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
        </Grid>

        
       
      </Container>

      <LoginModal 
        open={loginModalOpen} 
        onClose={() => setLoginModalOpen(false)}
        onSwitchToRegister={() => {
          setLoginModalOpen(false);
          setRegisterModalOpen(true);
        }}
      />
      
      <RegisterModal 
        open={registerModalOpen} 
        onClose={() => setRegisterModalOpen(false)}
        onSwitchToLogin={() => {
          setRegisterModalOpen(false);
          setLoginModalOpen(true);
        }}
      />
    </div>
  );
};

export default Home;
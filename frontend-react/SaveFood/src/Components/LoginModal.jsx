import { useState } from "react";
import axiosInstance from "../Api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { Modal, Box, TextField, Button, Typography, Alert, IconButton, CircularProgress } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LoginIcon from "@mui/icons-material/Login";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: 450 },
  bgcolor: "background.paper",
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
  animation: "fadeInScale 0.3s ease-out",
  "@keyframes fadeInScale": {
    "0%": {
      opacity: 0,
      transform: "translate(-50%, -50%) scale(0.9)",
    },
    "100%": {
      opacity: 1,
      transform: "translate(-50%, -50%) scale(1)",
    },
  },
};

const LoginModal = ({ open, onClose, onSwitchToRegister }) => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccessMessage("");

    if (isLoading) return;
    setIsLoading(true);

    try {
      const response = await axiosInstance.post(
        "/user/login/",
        data
      );

      const res = response.data;

      if (res.non_field_errors) {
        setError(res.non_field_errors[0]);
        return;
      }

      const accessToken = res.access;
      const refreshToken = res.refresh;
      const username = res.username;

      if (!accessToken) {
        setError("Access token missing from backend");
        return;
      }

      localStorage.setItem("access_token", accessToken);
      
      if (refreshToken) {
        localStorage.setItem("refresh_token", refreshToken);
      }
      
      if (username) {
        localStorage.setItem("username", username);
      }

      setSuccessMessage("Login Successfully!");

      setTimeout(() => {
        onClose();
        window.location.reload();
      }, 500);

    } catch (error) {
      if (error.response && error.response.data) {
        const errorData = error.response.data;
        const firstField = Object.keys(errorData)[0];
        const value = errorData[firstField];
        const message = Array.isArray(value) ? value[0] : value;
        setError(message || "Login failed");
      } else {
        setError("Something went wrong");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="login-modal-title"
      slotProps={{
        backdrop: {
          sx: {
            animation: "fadeIn 0.3s ease-out",
            "@keyframes fadeIn": {
              "0%": { opacity: 0 },
              "100%": { opacity: 1 },
            },
          },
        },
      }}
    >
      <Box sx={modalStyle}>
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "grey.500",
          }}
        >
          <CloseIcon />
        </IconButton>

        <Box sx={{ 
          textAlign: "center", 
          mb: 3,
          animation: "fadeInDown 0.5s ease-out",
          "@keyframes fadeInDown": {
            "0%": {
              opacity: 0,
              transform: "translateY(-20px)",
            },
            "100%": {
              opacity: 1,
              transform: "translateY(0)",
            },
          },
        }}>
          <Box
            sx={{
              width: 60,
              height: 60,
              margin: "0 auto 12px",
              background: "linear-gradient(135deg, #08775bff 0%, #06553f 100%)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 8px 20px rgba(8, 119, 91, 0.3)",
            }}
          >
            <LoginIcon sx={{ fontSize: 28, color: "white" }} />
          </Box>
          <Typography variant="h5" fontWeight="700" color="#2c3e50">
            Welcome Back
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Login to continue to SaveFood
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {successMessage && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {successMessage}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Box sx={{
            animation: "fadeInUp 0.6s ease-out",
            "@keyframes fadeInUp": {
              "0%": {
                opacity: 0,
                transform: "translateY(20px)",
              },
              "100%": {
                opacity: 1,
                transform: "translateY(0)",
              },
            },
          }}>
            <TextField
              fullWidth
              label="Username"
              name="username"
              value={data.username}
              onChange={handleChange}
              required
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={data.password}
              onChange={handleChange}
              required
              sx={{ mb: 3 }}
            />
          </Box>

          <Box sx={{ position: "relative" }}>
            <style>
              {`
                @keyframes dotPulse {
                  0%, 80%, 100% { opacity: 0.3; transform: scale(0.8); }
                  40% { opacity: 1; transform: scale(1); }
                }
                @keyframes spinnerRotate {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
                }
              `}
            </style>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isLoading}
              sx={{
                background: isLoading 
                  ? "linear-gradient(135deg, #06553f 0%, #044030 100%)"
                  : "linear-gradient(135deg, #08775bff 0%, #06553f 100%)",
                py: 1.5,
                fontWeight: "700",
                position: "relative",
                "&:hover": {
                  background: "linear-gradient(135deg, #06553f 0%, #044030 100%)",
                },
                "&:disabled": {
                  background: "linear-gradient(135deg, #06553f 0%, #044030 100%)",
                  color: "white",
                },
              }}
            >
              {isLoading && (
                <Box 
                  sx={{ 
                    position: "absolute",
                    left: "20px",
                    width: "28px",
                    height: "28px",
                  }}
                >
                  {/* Rotating Circle with 6 Pulsing Dots */}
                  <Box sx={{
                    position: "relative",
                    width: "28px",
                    height: "28px",
                    animation: "spinnerRotate 1.5s linear infinite",
                  }}>
                    {/* Dot 1 - Top (0°) */}
                    <Box sx={{ 
                      position: "absolute",
                      top: "0",
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: "5px", 
                      height: "5px", 
                      borderRadius: "50%", 
                      backgroundColor: "white",
                      animation: "dotPulse 1.8s infinite ease-in-out",
                      animationDelay: "0s",
                    }} />
                    
                    {/* Dot 2 - Top Right (60°) */}
                    <Box sx={{ 
                      position: "absolute",
                      top: "15%",
                      right: "4%",
                      width: "5px", 
                      height: "5px", 
                      borderRadius: "50%", 
                      backgroundColor: "white",
                      animation: "dotPulse 1.8s infinite ease-in-out",
                      animationDelay: "0.15s",
                    }} />
                    
                    {/* Dot 3 - Bottom Right (120°) */}
                    <Box sx={{ 
                      position: "absolute",
                      bottom: "15%",
                      right: "4%",
                      width: "5px", 
                      height: "5px", 
                      borderRadius: "50%", 
                      backgroundColor: "white",
                      animation: "dotPulse 1.8s infinite ease-in-out",
                      animationDelay: "0.3s",
                    }} />
                    
                    {/* Dot 4 - Bottom (180°) */}
                    <Box sx={{ 
                      position: "absolute",
                      bottom: "0",
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: "5px", 
                      height: "5px", 
                      borderRadius: "50%", 
                      backgroundColor: "white",
                      animation: "dotPulse 1.8s infinite ease-in-out",
                      animationDelay: "0.45s",
                    }} />
                    
                    {/* Dot 5 - Bottom Left (240°) */}
                    <Box sx={{ 
                      position: "absolute",
                      bottom: "15%",
                      left: "4%",
                      width: "5px", 
                      height: "5px", 
                      borderRadius: "50%", 
                      backgroundColor: "white",
                      animation: "dotPulse 1.8s infinite ease-in-out",
                      animationDelay: "0.6s",
                    }} />
                    
                    {/* Dot 6 - Top Left (300°) */}
                    <Box sx={{ 
                      position: "absolute",
                      top: "15%",
                      left: "4%",
                      width: "5px", 
                      height: "5px", 
                      borderRadius: "50%", 
                      backgroundColor: "white",
                      animation: "dotPulse 1.8s infinite ease-in-out",
                      animationDelay: "0.75s",
                    }} />
                  </Box>
                </Box>
              )}
              {!isLoading && <LoginIcon sx={{ mr: 1 }} />}
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </Box>

          <Typography
            variant="body2"
            align="center"
            sx={{ mt: 2, color: "text.secondary" }}
          >
            Don't have an account?{" "}
            <span
              onClick={() => {
                onClose();
                if (onSwitchToRegister) {
                  onSwitchToRegister();
                }
              }}
              style={{
                color: "#08775bff",
                fontWeight: "600",
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              Register here
            </span>
          </Typography>
        </form>
      </Box>
    </Modal>
  );
};

export default LoginModal;

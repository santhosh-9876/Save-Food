import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Modal, Box, TextField, Button, Typography, Alert, IconButton, CircularProgress } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: 500 },
  bgcolor: "background.paper",
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
  maxHeight: "90vh",
  overflowY: "auto",
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

const RegisterModal = ({ open, onClose, onSwitchToLogin }) => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
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

    if (isLoading) return;

    if (data.password !== data.confirm_password) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/user/register/",
        data
      );

      const res = response.data;

      if (res.username) {
        setError(res.username[0]);
        return;
      }

      if (res.email) {
        setError(res.email[0]);
        return;
      }

      if (res.non_field_errors) {
        setError(res.non_field_errors[0]);
        return;
      }

      setSuccessMessage("Registration Successfully!");

      setData({
        username: "",
        email: "",
        password: "",
        confirm_password: "",
      });

      setTimeout(() => {
        onClose();
        if (onSwitchToLogin) {
          onSwitchToLogin();
        }
      }, 1500);

    } catch (err) {
      if (err.response && err.response.data) {
        const errorData = err.response.data;
        const field = Object.keys(errorData)[0];
        const message = Array.isArray(errorData[field])
          ? errorData[field][0]
          : errorData[field];
        setError(message);
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
      aria-labelledby="register-modal-title"
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
            <PersonAddIcon sx={{ fontSize: 28, color: "white" }} />
          </Box>
          <Typography variant="h5" fontWeight="700" color="#2c3e50">
            Create Account
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Join SaveFood and start making a difference
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
              label="Email"
              name="email"
              type="email"
              value={data.email}
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
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Confirm Password"
              name="confirm_password"
              type="password"
              value={data.confirm_password}
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
              {!isLoading && <PersonAddIcon sx={{ mr: 1 }} />}
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
          </Box>

          <Typography
            variant="body2"
            align="center"
            sx={{ mt: 2, color: "text.secondary" }}
          >
            Already have an account?{" "}
            <span
              onClick={() => {
                onClose();
                if (onSwitchToLogin) {
                  onSwitchToLogin();
                }
              }}
              style={{
                color: "#08775bff",
                fontWeight: "600",
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              Login here
            </span>
          </Typography>
        </form>
      </Box>
    </Modal>
  );
};

export default RegisterModal;

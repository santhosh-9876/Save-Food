import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Drawer, List, ListItem, ListItemButton, ListItemText, Divider, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CompostIcon from "@mui/icons-material/Compost";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";

const MyNavbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");
  const username = localStorage.getItem("username");
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showBrand, setShowBrand] = useState(true);

  console.log("Navbar - Token:", token);
  console.log("Navbar - Username:", username);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login", { replace: true });
    window.location.reload();
  };

  const formattedName = username
    ? username.charAt(0).toUpperCase() + username.slice(1)
    : "User";

  const firstLetter = username ? username.charAt(0).toUpperCase() : "U";

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary shadow fixed-top">
      <Container>

        {/* Left side Brand - Toggle on Click */}
        <div 
          className="d-flex align-items-center gap-2" 
          style={{ cursor: "pointer" }} 
          onClick={() => setShowBrand(!showBrand)}
        >
          <CompostIcon style={{ fontSize: 40, color: "#08775bff" }} />
          {showBrand && (
            <h1 style={{ 
              fontSize: "28px", 
              margin: 0,
              letterSpacing: "-0.5px",
              display: "flex",
              alignItems: "center"
            }}>
              <span style={{
                fontFamily: "'Righteous', 'Impact', sans-serif",
                fontWeight: "400",
                color: "#08775bff",
                letterSpacing: "0px"
              }}>Bite</span>
              <span style={{
                fontFamily: "'Poppins', 'Segoe UI', sans-serif",
                fontWeight: "300",
                color: "#08775bff",
                fontSize: "28px",
                marginLeft: "2px",
                letterSpacing: "0.5px"
              }}>Share</span>
            </h1>
          )}
        </div>

        <div 
          className="d-lg-none" 
          style={{ cursor: "pointer" }}
          onClick={() => {
            setDrawerOpen(true);
            setShowBrand(true);
          }}
        >
          <span style={{ 
            display: "flex", 
            flexDirection: "column", 
            gap: "4px",
            width: "24px"
          }}>
            <span style={{ 
              width: "100%", 
              height: "3px", 
              backgroundColor: "#08775bff", 
              borderRadius: "2px",
              transition: "all 0.3s ease"
            }}></span>
            <span style={{ 
              width: "100%", 
              height: "3px", 
              backgroundColor: "#08775bff", 
              borderRadius: "2px",
              transition: "all 0.3s ease"
            }}></span>
            <span style={{ 
              width: "100%", 
              height: "3px", 
              backgroundColor: "#08775bff", 
              borderRadius: "2px",
              transition: "all 0.3s ease"
            }}></span>
          </span>
        </div>
        {/* Desktop Menu */}
        <div className="d-none d-lg-flex ms-auto align-items-center gap-2">

            {/* Home - Always visible */}
            <Nav.Link
              as={NavLink}
              to="/"
              className="px-3 py-2 rounded"
              style={({ isActive }) => ({
                color: isActive ? "white" : "#0a0a0aff",
                backgroundColor: isActive ? "#08775bff" : "transparent",
              })}
            >
              Home
            </Nav.Link>

            {/* Donor - Always visible */}
            <Nav.Link
              as={NavLink}
              to="donor/"
              className="px-3 py-2 rounded"
              style={({ isActive }) => ({
                color: isActive ? "white" : "#0a0a0aff",
                backgroundColor: isActive ? "#08775bff" : "transparent",
              })}
            >
              Donor
            </Nav.Link>

            {/* Available Food, My Profile - Only for logged-in users */}
            {token && (
              <>
                <Nav.Link
                  as={NavLink}
                  to="available-food/"
                  className="px-3 py-2 rounded"
                  style={({ isActive }) => ({
                    color: isActive ? "white" : "#0a0a0aff",
                    backgroundColor: isActive ? "#08775bff" : "transparent",
                  })}
                >
                  Available Food
                </Nav.Link>

                <Nav.Link
                  as={NavLink}
                  to="my-profile/"
                  className="px-3 py-2 rounded"
                  style={({ isActive }) => ({
                    color: isActive ? "white" : "#0a0a0aff",
                    backgroundColor: isActive ? "#08775bff" : "transparent",
                  })}
                >
                  My Profile
                </Nav.Link>
              </>
            )}

            {/* Login + Register when logged OUT */}
            {!token && (
              <>
                <Nav.Link
                  onClick={() => setLoginModalOpen(true)}
                  className="px-3 py-2 rounded"
                  style={{ color: "#0a0a0aff", backgroundColor: "transparent", cursor: "pointer" }}
                >
                  Login
                </Nav.Link>

                <Nav.Link
                  onClick={() => setRegisterModalOpen(true)}
                  className="px-3 py-2 rounded"
                  style={{ color: "#0a0a0aff", backgroundColor: "transparent", cursor: "pointer" }}
                >
                  Register
                </Nav.Link>
              </>
            )}

            {/* Logout when logged IN */}
            {token && (
              <Nav.Link
                onClick={handleLogout}
                className="px-3 py-2 rounded"
                style={{ color: "#0a0a0aff", backgroundColor: "transparent", cursor: "pointer" }}
              >
                Logout
              </Nav.Link>
            )}

            {/* User Avatar at the END - Click to go to profile */}
            {token && username && (
              <div
                className="d-flex justify-content-center align-items-center rounded-circle ms-2"
                style={{
                  width: "42px",
                  height: "42px",
                  background: "linear-gradient(135deg, #08775bff 0%, #06553f 100%)",
                  color: "white",
                  fontWeight: "700",
                  fontSize: "18px",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  border: "3px solid #e8f5e9",
                  boxShadow: "0 2px 8px rgba(8, 119, 91, 0.3)",
                  transition: "all 0.3s ease",
                }}
                onClick={() => navigate("/my-profile/")}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.1)";
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(8, 119, 91, 0.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "0 2px 8px rgba(8, 119, 91, 0.3)";
                }}
                title={`${formattedName} - View Profile`}
              >
                {firstLetter}
              </div>
            )}

        </div>

      </Container>

      {/* Mobile Drawer/Offcanvas */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        slotProps={{
          paper: {
            sx: {
              width: 280,
              backgroundColor: "#ffffff",
            },
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          {/* User Avatar at Top - Only show when logged in */}
          {token && username && (
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <div
                  style={{
                    width: "50px",
                    height: "50px",
                    background: "linear-gradient(135deg, #08775bff 0%, #06553f 100%)",
                    color: "white",
                    fontWeight: "700",
                    fontSize: "20px",
                    textTransform: "uppercase",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "3px solid #e8f5e9",
                    boxShadow: "0 2px 8px rgba(8, 119, 91, 0.3)",
                  }}
                >
                  {firstLetter}
                </div>
                <Box>
                  <p style={{ margin: 0, fontWeight: "700", color: "#08775bff", fontSize: "16px" }}>{formattedName}</p>
                  <p style={{ margin: 0, fontSize: "12px", color: "#666" }}>View Profile</p>
                </Box>
              </Box>
              <IconButton onClick={() => setDrawerOpen(false)}>
                <CloseIcon />
              </IconButton>
            </Box>
          )}

          {/* Close button only when logged out */}
          {!token && (
            <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
              <IconButton onClick={() => setDrawerOpen(false)}>
                <CloseIcon />
              </IconButton>
            </Box>
          )}

          <Divider sx={{ mb: 2 }} />

          <List>
            <ListItem disablePadding>
              <ListItemButton 
                component={NavLink} 
                to="/"
                onClick={() => setDrawerOpen(false)}
                sx={{ borderRadius: 2, mb: 1 }}
              >
                <ListItemText primary="Home" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton 
                component={NavLink} 
                to="/donor/"
                onClick={() => setDrawerOpen(false)}
                sx={{ borderRadius: 2, mb: 1 }}
              >
                <ListItemText primary="Donor" />
              </ListItemButton>
            </ListItem>

            {token && (
              <>
                <ListItem disablePadding>
                  <ListItemButton 
                    component={NavLink} 
                    to="/available-food/"
                    onClick={() => setDrawerOpen(false)}
                    sx={{ borderRadius: 2, mb: 1 }}
                  >
                    <ListItemText primary="Available Food" />
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                  <ListItemButton 
                    component={NavLink} 
                    to="/my-profile/"
                    onClick={() => setDrawerOpen(false)}
                    sx={{ borderRadius: 2, mb: 1 }}
                  >
                    <ListItemText primary="My Profile" />
                  </ListItemButton>
                </ListItem>

                <Divider sx={{ my: 2 }} />

                <ListItem disablePadding>
                  <ListItemButton 
                    onClick={() => {
                      setDrawerOpen(false);
                      handleLogout();
                    }}
                    sx={{ borderRadius: 2, color: "#f44336" }}
                  >
                    <ListItemText primary="Logout" />
                  </ListItemButton>
                </ListItem>
              </>
            )}

            {!token && (
              <>
                <Divider sx={{ my: 2 }} />

                <ListItem disablePadding>
                  <ListItemButton 
                    onClick={() => {
                      setDrawerOpen(false);
                      setLoginModalOpen(true);
                    }}
                    sx={{ borderRadius: 2, mb: 1, backgroundColor: "#08775bff", color: "white", "&:hover": { backgroundColor: "#06553f" } }}
                  >
                    <ListItemText primary="Login" />
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                  <ListItemButton 
                    onClick={() => {
                      setDrawerOpen(false);
                      setRegisterModalOpen(true);
                    }}
                    sx={{ borderRadius: 2, borderColor: "#08775bff", border: "2px solid", color: "#08775bff" }}
                  >
                    <ListItemText primary="Register" />
                  </ListItemButton>
                </ListItem>
              </>
            )}
          </List>
        </Box>
      </Drawer>
      
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
    </Navbar>
  );
};

export default MyNavbar;

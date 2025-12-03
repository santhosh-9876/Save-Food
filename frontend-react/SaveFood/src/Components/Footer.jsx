import { Box, Container, Grid, Typography, Link, IconButton } from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn, Email, Phone, LocationOn } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#1a1a1a",
        color: "white",
        pt: { xs: 4, md: 6 },
        pb: 3,
        mt: 8,
      }}
    >
      <Container maxWidth="lg">
        {/* Desktop/Tablet View */}
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          <Grid container spacing={4}>
            {/* About Section */}
            <Grid item xs={12} sm={6} md={3} data-aos="fade-up" data-aos-delay="0">
              <Box sx={{ mb: 2, fontSize: "24px", display: "flex", alignItems: "center" }}>
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
                  fontSize: "24px",
                  marginLeft: "2px",
                  letterSpacing: "0.5px"
                }}>Share</span>
              </Box>
              <Typography variant="body2" sx={{ mb: 2, color: "#b0b0b0" }}>
                Connecting food donors with those in need. Together, we're reducing waste and fighting hunger.
              </Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
                <IconButton size="small" sx={{ color: "#08775bff", "&:hover": { color: "#06553f" } }}>
                  <Facebook />
                </IconButton>
                <IconButton size="small" sx={{ color: "#08775bff", "&:hover": { color: "#06553f" } }}>
                  <Twitter />
                </IconButton>
                <IconButton size="small" sx={{ color: "#08775bff", "&:hover": { color: "#06553f" } }}>
                  <Instagram />
                </IconButton>
                <IconButton size="small" sx={{ color: "#08775bff", "&:hover": { color: "#06553f" } }}>
                  <LinkedIn />
                </IconButton>
              </Box>
            </Grid>

            {/* Quick Links */}
            <Grid item xs={12} sm={6} md={3} data-aos="fade-up" data-aos-delay="100">
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                Quick Links
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Link href="/" underline="hover" sx={{ color: "#b0b0b0", "&:hover": { color: "#08775bff" } }}>
                  Home
                </Link>
                <Link href="/available-food" underline="hover" sx={{ color: "#b0b0b0", "&:hover": { color: "#08775bff" } }}>
                  Available Food
                </Link>
                <Link href="/donor" underline="hover" sx={{ color: "#b0b0b0", "&:hover": { color: "#08775bff" } }}>
                  Donate Food
                </Link>
                <Link href="/about" underline="hover" sx={{ color: "#b0b0b0", "&:hover": { color: "#08775bff" } }}>
                  About Us
                </Link>
              </Box>
            </Grid>

            {/* Support */}
            <Grid item xs={12} sm={6} md={3} data-aos="fade-up" data-aos-delay="200">
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                Support
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Link href="#" underline="hover" sx={{ color: "#b0b0b0", "&:hover": { color: "#08775bff" } }}>
                  Help Center
                </Link>
                <Link href="#" underline="hover" sx={{ color: "#b0b0b0", "&:hover": { color: "#08775bff" } }}>
                  FAQs
                </Link>
                <Link href="#" underline="hover" sx={{ color: "#b0b0b0", "&:hover": { color: "#08775bff" } }}>
                  Privacy Policy
                </Link>
                <Link href="#" underline="hover" sx={{ color: "#b0b0b0", "&:hover": { color: "#08775bff" } }}>
                  Terms of Service
                </Link>
              </Box>
            </Grid>

            {/* Contact Info */}
            <Grid item xs={12} sm={6} md={3} data-aos="fade-up" data-aos-delay="300">
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                Contact Us
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Email sx={{ fontSize: 18, color: "#08775bff" }} />
                  <Typography variant="body2" sx={{ color: "#b0b0b0" }}>
                    info@savefood.com
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Phone sx={{ fontSize: 18, color: "#08775bff" }} />
                  <Typography variant="body2" sx={{ color: "#b0b0b0" }}>
                    +1 (555) 123-4567
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <LocationOn sx={{ fontSize: 18, color: "#08775bff" }} />
                  <Typography variant="body2" sx={{ color: "#b0b0b0" }}>
                    123 Food Street, City
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Mobile View - Compact Design */}
        <Box sx={{ display: { xs: "block", sm: "none" } }}>
          {/* Brand and Social */}
          <Box sx={{ textAlign: "center", mb: 3 }} data-aos="fade-down">
            <Box sx={{ mb: 1, fontSize: "26px", display: "flex", justifyContent: "center", alignItems: "center" }}>
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
                fontSize: "26px",
                marginLeft: "2px",
                letterSpacing: "0.5px"
              }}>Share</span>
            </Box>
            <Typography variant="body2" sx={{ mb: 2, color: "#b0b0b0", px: 2 }}>
              Share food, save lives 🍽️
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
              <IconButton size="small" sx={{ color: "#08775bff", "&:hover": { color: "#06553f" } }}>
                <Facebook fontSize="small" />
              </IconButton>
              <IconButton size="small" sx={{ color: "#08775bff", "&:hover": { color: "#06553f" } }}>
                <Twitter fontSize="small" />
              </IconButton>
              <IconButton size="small" sx={{ color: "#08775bff", "&:hover": { color: "#06553f" } }}>
                <Instagram fontSize="small" />
              </IconButton>
              <IconButton size="small" sx={{ color: "#08775bff", "&:hover": { color: "#06553f" } }}>
                <LinkedIn fontSize="small" />
              </IconButton>
            </Box>
          </Box>

          {/* Quick Actions */}
          <Box 
            data-aos="fade-up" 
            data-aos-delay="100"
            sx={{ 
              display: "flex", 
              justifyContent: "space-around", 
              mb: 3,
              px: 2,
              flexWrap: "wrap",
              gap: 1
            }}>
            <Link href="/" underline="none" sx={{ 
              color: "#b0b0b0", 
              fontSize: "14px",
              "&:hover": { color: "#08775bff" } 
            }}>
              Home
            </Link>
            <Link href="/donor" underline="none" sx={{ 
              color: "#b0b0b0", 
              fontSize: "14px",
              "&:hover": { color: "#08775bff" } 
            }}>
              Donate
            </Link>
            <Link href="/available-food" underline="none" sx={{ 
              color: "#b0b0b0", 
              fontSize: "14px",
              "&:hover": { color: "#08775bff" } 
            }}>
              Find Food
            </Link>
            <Link href="#" underline="none" sx={{ 
              color: "#b0b0b0", 
              fontSize: "14px",
              "&:hover": { color: "#08775bff" } 
            }}>
              Help
            </Link>
          </Box>

          {/* Contact - Compact */}
          <Box 
            data-aos="fade-up" 
            data-aos-delay="200"
            sx={{ 
              backgroundColor: "#252525", 
              borderRadius: 2, 
              p: 2, 
              mb: 3,
              mx: 2
            }}>
            <Typography variant="body2" sx={{ fontWeight: "bold", mb: 1.5, color: "#08775bff", textAlign: "center" }}>
              Get in Touch
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1, alignItems: "center" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Email sx={{ fontSize: 16, color: "#08775bff" }} />
                <Typography variant="body2" sx={{ color: "#b0b0b0", fontSize: "13px" }}>
                  info@savefood.com
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Phone sx={{ fontSize: 16, color: "#08775bff" }} />
                <Typography variant="body2" sx={{ color: "#b0b0b0", fontSize: "13px" }}>
                  +1 (555) 123-4567
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Bottom Bar */}
        <Box
          data-aos="fade-up"
          data-aos-delay="400"
          sx={{
            borderTop: "1px solid #333",
            mt: { xs: 2, sm: 4 },
            pt: { xs: 2, sm: 3 },
            textAlign: "center",
          }}
        >
          <Typography variant="body2" sx={{ color: "#b0b0b0", fontSize: { xs: "12px", sm: "14px" } }}>
            © {new Date().getFullYear()} BiteShare by Escobar. All rights reserved.
          </Typography>
          <Typography variant="body2" sx={{ color: "#666", fontSize: { xs: "11px", sm: "13px" }, mt: 0.5, display: { xs: "block", sm: "none" } }}>
            Made with ❤️
          </Typography>
          <Typography variant="body2" sx={{ color: "#666", fontSize: "13px", mt: 0.5, display: { xs: "none", sm: "block" } }}>
            Made with ❤️ for a better world.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;

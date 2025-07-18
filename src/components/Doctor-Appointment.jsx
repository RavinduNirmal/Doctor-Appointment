import React, { useState, useEffect } from "react";
import { 
  AppBar, Toolbar, Typography, Container, Grid, Button, Box, Card, CardContent, 
  CardMedia, IconButton, Drawer, List, ListItem, ListItemText, TextField, 
  TextareaAutosize, Divider, Dialog, DialogTitle, DialogContent, DialogActions,
  MenuItem, Select, InputLabel, FormControl
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import emailjs from "@emailjs/browser";
import { message } from "antd";

// Placeholder images (replace with actual doctor-related images)
import doctorImage from "../assets/images/close-up-health-worker.jpg";
import backgroundImage from "../assets/images/background.jpg";
import serviceImage1 from "../assets/images/doctor-checking-medical-condition-patient.jpg";
import serviceImage2 from "../assets/images/middle-age-hispanic-man-wearing-doctor-uniform-auscultating-heart-clinic.jpg";
import serviceImage3 from "../assets/images/doctor-doing-their-work-pediatrics-office.jpg";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Avatar } from '@mui/material';


const theme = createTheme({
  palette: {
    primary: { main: "#1976d2" },
    secondary: { main: "#ff4081" },
    background: { default: "#f5f5f5" },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
    h1: { fontWeight: 700 },
    h3: { fontWeight: 600 },
  },
});

const DoctorPortfolio = () => {
  const [sticky, setSticky] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    message: "",
  });
  const [appointmentData, setAppointmentData] = useState({
    patient_name: "",
    patient_email: "",
    appointment_date: "",
    appointment_time: "",
    reason: "",
  });
  const [formError, setFormError] = useState("");
  const [openAppointmentDialog, setOpenAppointmentDialog] = useState(false);

  const menuLinks = [
    { name: "HOME", link: "#home" },
    { name: "ABOUT", link: "#about" },
    { name: "SERVICES", link: "#services" },
    { name: "APPOINTMENTS", link: "#appointments" },
    { name: "CONTACT", link: "#contact" },
  ];

  const services = [
    { img: serviceImage1, name: "General Checkup", description: "Comprehensive health assessments" },
    { img: serviceImage2, name: "Cardiology", description: "Heart health and diagnostics" },
    { img: serviceImage3, name: "Pediatrics", description: "Care for children and adolescents" },
  ];

  const contactInfo = [
    { logo: <EmailIcon />, text: "dr.john@gmail.com" },
    { logo: <PhoneIcon />, text: "+94 71 6468713" },
    { logo: <LocationOnIcon />, text: "123 Health St, Medical City,Anuradhapura" },
  ];

  const info = [
    { text: "Years Experience", count: "15" },
    { text: "Patients Treated", count: "5000+" },
    { text: "Specializations", count: "3" },
  ];

    const testimonials = [
    { 
      name: "Sarah Johnson", 
      text: " Dr. John provided exceptional care during my treatment. His expertise and compassion made all the difference.",
      role: "Patient",
      photo: serviceImage1
    },
    { 
      name: "Michael Chen", 
      text: " I was impressed by Dr. John's thoroughness and ability to explain complex medical terms understandable way.",
      role: "Patient",
      photo: serviceImage1
    },
    { 
      name: "Emily Davis", 
      text: " The best doctor I've ever had! Dr. John truly cares about his patients and goes above and beyond.",
      role: "Patient",
      photo: serviceImage1
    },
  ];

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setSticky(window.scrollY > 0);
    });
    return () => window.removeEventListener("scroll", () => {});
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAppointmentChange = (e) => {
    const { name, value } = e.target;
    setAppointmentData({ ...appointmentData, [name]: value });
  };

  const sendEmail = (e) => {
    e.preventDefault();
    if (!formData.user_name || !formData.user_email || !formData.message) {
      setFormError("Please fill in all fields.");
      return;
    }

    emailjs
      .send("service_ld1zli4", "template_tcy63cd", {
        to_name: "Dr. John",
        from_name: formData.user_name,
        message: formData.message,
        user_email: formData.user_email,
      }, "6A8AXjF5y3avwWTKN")
      .then(
        () => {
          message.success("Your message has been sent successfully!");
          setFormData({ user_name: "", user_email: "", message: "" });
          setFormError("");
        },
        () => {
          message.error("An error occurred. Please try again later.");
        }
      );
  };

  const bookAppointment = (e) => {
    e.preventDefault();
    if (
      !appointmentData.patient_name ||
      !appointmentData.patient_email ||
      !appointmentData.appointment_date ||
      !appointmentData.appointment_time ||
      !appointmentData.reason
    ) {
      setFormError("Please fill in all appointment fields.");
      return;
    }

    emailjs
      .send("service_ld1zli4", "template_tcy63cd", {
        to_name: "Dr. John",
        from_name: appointmentData.patient_name,
        message: `Appointment Request: ${appointmentData.reason}\nDate: ${appointmentData.appointment_date}\nTime: ${appointmentData.appointment_time}`,
        user_email: appointmentData.patient_email,
      }, "6A8AXjF5y3avwWTKN")
      .then(
        () => {
          message.success("Appointment booked successfully!");
          setAppointmentData({
            patient_name: "",
            patient_email: "",
            appointment_date: "",
            appointment_time: "",
            reason: "",
          });
          setFormError("");
          setOpenAppointmentDialog(false);
        },
        () => {
          message.error("An error occurred. Please try again later.");
        }
      );
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
        {/* Navbar */}
        <AppBar
          position={sticky ? "fixed" : "static"}
          color={sticky ? "primary" : "primary"}
          elevation={sticky ? 4 : 0}
        >
          <Toolbar>
            <Typography
              variant="h4"
              sx={{
                flexGrow: 1,
                fontWeight: "bold",
                color: theme.palette.secondary.main,
              }}
            >
              Dr. <span style={{ color: "#fff" }}>John</span>
            </Typography>
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              {menuLinks.map((menu, i) => (
                <Button key={i} color="inherit" href={menu.link} sx={{ mx: 1 }}>
                  {menu.name}
                </Button>
              ))}
            </Box>
            <IconButton
              color="inherit"
              sx={{ display: { xs: "block", md: "none" } }}
              onClick={() => setOpenMenu(true)}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          anchor="right"
          open={openMenu}
          onClose={() => setOpenMenu(false)}
        >
          <List sx={{ width: 250 }}>
            {menuLinks.map((menu, i) => (
              <ListItem button key={i} onClick={() => setOpenMenu(false)}>
                <ListItemText
                  primary={menu.name}
                  onClick={() => (window.location.href = menu.link)}
                />
              </ListItem>
            ))}
          </List>
        </Drawer>

        {/* Hero Section */}
        <Box
          id="home"
          sx={{
            minHeight: "70vh",
            py: { xs: 6, md: 6 },
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            position: "relative",
          }}
        >
          <Container>
            <Grid
              container
              spacing={4}
              alignItems="center"
              justifyContent="center"
            >
              {/* Content Section */}
              <Grid item xs={12} md={6}>
                <Typography
                  variant="h3"
                  color="primary"
                  gutterBottom
                  textAlign={{ xs: "center", md: "left" }}
                  sx={{ fontWeight: 500 }}
                >
                  Welcome to My{" "}
                  <span style={{ color: theme.palette.secondary.main }}>
                    Practice
                  </span>
                </Typography>
                <Typography
                  variant="h6"
                  color="text.secondary"
                  textAlign={{ xs: "center", md: "left" }}
                >
                  Dr. John Smith, MD
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ my: 2 }}
                  textAlign={{ xs: "center", md: "left" }}
                >
                  Board-Certified Physician
                </Typography>
                <Box textAlign={{ xs: "center", md: "left" }}>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    href="#appointments"
                    sx={{ mt: 2 }}
                  >
                    Book Appointment
                  </Button>
                </Box>
              </Grid>

              {/* Image Section */}
              <Grid
                item
                xs={12}
                md={6}
                sx={{
                  display: "flex",
                  justifyContent: { xs: "center", md: "center" },
                  ml: { md: 10 },
                }}
              >
                <CardMedia
                  component="img"
                  image={doctorImage}
                  alt="Dr. John"
                  sx={{
                    borderRadius: 4,
                    width: "100%",
                    maxWidth: 400,
                    mx: "auto",
                    boxShadow: 3,
                  }}
                />
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* About Section */}
        <Box id="about" sx={{ py: { xs: 8, md: 12 }, bgcolor: "white" }}>
          <Container>
            <Typography
              variant="h3"
              align="center"
              gutterBottom
              sx={{ color: "primary.main" }}
            >
              About{" "}
              <Box component="span" sx={{ color: "gray" }}>
                Me
              </Box>
            </Typography>

            <Typography
              variant="body1"
              align="center"
              color="text.secondary"
              sx={{ mb: 6 }}
            >
              My Professional Journey
            </Typography>

            <Grid container justifyContent="center">
              <Grid
                item
                xs={12}
                md={8}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    mb: 3,
                    color: "text.primary",
                    lineHeight: 1.8,
                    textAlign: "justify",
                    fontSize: {
                      xs: 16, // for mobile
                      sm: 18, // for tablets
                      md: 18, // for medium screens
                      lg: 20, // for large screens
                      xl: 23, // for extra large screens
                    },
                    px: {
                      xs: 2, // horizontal padding for mobile
                      sm: 3, // slightly more for tablets
                      md: 0, // no padding on medium and above (since Grid is already centered)
                    },
                  }}
                >
                  Dr. John Smith is a dedicated physician with over 15 years of
                  experience in providing high-quality medical care.
                  Specializing in internal medicine, cardiology, and pediatrics,
                  he is committed to improving patient outcomes through
                  compassionate and evidence-based practices.
                </Typography>

                {/* Stats */}
                <Grid
                  container
                  spacing={3}
                  justifyContent="center"
                  sx={{
                    mb: 4,
                    mt: {
                      md: 2, // for medium screens
                      lg: 2, // for large screens
                      xl: 2,
                    },
                  }}
                >
                  {info.map((item, i) => (
                    <Grid
                      item
                      xs={6}
                      sm={4}
                      key={i}
                      sx={{ textAlign: "center" }}
                    >
                      <Typography
                        variant="h4"
                        color="primary"
                        sx={{ fontWeight: 600 }}
                      >
                        {item.count}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          fontSize: {
                            xs: 12, // for mobile
                            sm: 14, // for tablets
                            md: 16, // for medium screens
                            lg: 19, // for large screens
                            xl: 20, // for extra large screens
                          },
                        }}
                      >
                        {item.text}
                      </Typography>
                    </Grid>
                  ))}
                </Grid>

                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  href="#testimonials"
                  download
                >
                  Check Testimonial
                </Button>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Services Section */}
        <Box id="services" sx={{ py: 10, bgcolor: "background.default" }}>
          <Container>
            <Typography
              variant="h3"
              align="center"
              gutterBottom
              sx={{ color: "gray" }}
            >
              My{" "}
              <span style={{ color: theme.palette.primary.main }}>
                Services
              </span>
            </Typography>
            <Typography
              variant="body1"
              align="center"
              color="textSecondary"
              sx={{ mb: 4 }}
            >
              Comprehensive Medical Care
            </Typography>
            <Swiper
              slidesPerView={1}
              spaceBetween={20}
              breakpoints={{
                768: { slidesPerView: 3 },
                500: { slidesPerView: 2 },
              }}
              loop={true}
              autoplay={{ delay: 3000 }}
              pagination={{ clickable: true }}
              modules={[Pagination, Autoplay]}
            >
              {services.map((service, i) => (
                <SwiperSlide key={i}>
                  <Card sx={{ m: 2, bgcolor: "white" }}>
                    <CardMedia
                      component="img"
                      image={service.img}
                      alt={service.name}
                      sx={{ height: 200 }}
                    />
                    <CardContent>
                      <Typography variant="h6">{service.name}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        {service.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </SwiperSlide>
              ))}
            </Swiper>
          </Container>
        </Box>

        {/* Appointment Booking Section */}
        <Box id="appointments" sx={{ py: 10, bgcolor: "white" }}>
          <Container>
            <Typography
              variant="h3"
              align="center"
              gutterBottom
              sx={{ color: theme.palette.primary.main }}
            >
              Book an <span style={{ color: "gray" }}>Appointment</span>
            </Typography>
            <Typography
              variant="body1"
              align="center"
              color="textSecondary"
              sx={{ mb: 4 }}
            >
              Schedule Your Visit
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button
                variant="contained"
                color="secondary"
                startIcon={<CalendarTodayIcon />}
                onClick={() => setOpenAppointmentDialog(true)}
              >
                Schedule Now
              </Button>
            </Box>
          </Container>
          <Dialog
            open={openAppointmentDialog}
            onClose={() => setOpenAppointmentDialog(false)}
          >
            <DialogTitle>Book an Appointment</DialogTitle>
            <DialogContent>
              <Box
                component="form"
                sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}
              >
                <TextField
                  label="Your Name"
                  name="patient_name"
                  value={appointmentData.patient_name}
                  onChange={handleAppointmentChange}
                  fullWidth
                />
                <TextField
                  label="Your Email"
                  name="patient_email"
                  type="email"
                  value={appointmentData.patient_email}
                  onChange={handleAppointmentChange}
                  fullWidth
                />
                <TextField
                  label="Appointment Date"
                  name="appointment_date"
                  type="date"
                  value={appointmentData.appointment_date}
                  onChange={handleAppointmentChange}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                />
                <FormControl fullWidth>
                  <InputLabel>Appointment Time</InputLabel>
                  <Select
                    name="appointment_time"
                    value={appointmentData.appointment_time}
                    onChange={handleAppointmentChange}
                    label="Appointment Time"
                  >
                    <MenuItem value="09:00 AM">09:00 AM</MenuItem>
                    <MenuItem value="11:00 AM">11:00 AM</MenuItem>
                    <MenuItem value="02:00 PM">02:00 PM</MenuItem>
                    <MenuItem value="04:00 PM">04:00 PM</MenuItem>
                  </Select>
                </FormControl>
                <TextareaAutosize
                  minRows={4}
                  placeholder="Reason for Appointment"
                  name="reason"
                  value={appointmentData.reason}
                  onChange={handleAppointmentChange}
                  style={{ width: "100%", padding: 8 }}
                />
                {formError && (
                  <Typography color="error">{formError}</Typography>
                )}
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenAppointmentDialog(false)}>
                Cancel
              </Button>
              <Button
                onClick={bookAppointment}
                color="primary"
                variant="contained"
              >
                Book
              </Button>
            </DialogActions>
          </Dialog>
        </Box>

        {/* Contact Section */}
        <Box
          id="contact"
          sx={{ py: { xs: 8, md: 12 }, bgcolor: "background.default" }}
        >
          <Container maxWidth="md">
            {/* Heading */}
            <Typography
              variant="h3"
              align="center"
              gutterBottom
              sx={{ color: "gray" }}
            >
              Contact{" "}
              <Box component="span" sx={{ color: "primary.main" }}>
                Me
              </Box>
            </Typography>

            <Typography
              variant="body1"
              align="center"
              color="text.secondary"
              sx={{ mb: 6 }}
            >
              Get in Touch
            </Typography>

            {/* Layout Grid */}
            <Grid
              container
              spacing={6}
              justifyContent="center"
              sx={{
                borderRadius: { xs: 3, sm: 0 },
                bgcolor: { xs: "none", sm: "background.paper" },
                boxShadow: { xs: 0, sm: "none" },
              }}
            >
              {/* Form Section */}
              <Grid item xs={12} md={6}>
                <Box
                  component="form"
                  onSubmit={sendEmail}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 3,
                    p: { xs: 2, sm: 3 },
                    borderRadius: { xs: 3, sm: 0 },
                    bgcolor: { xs: "background.paper", sm: "transparent" },
                    boxShadow: { xs: 3, sm: "none" },
                  }}
                >
                  <TextField
                    label="Your Name"
                    name="user_name"
                    value={formData.user_name}
                    onChange={handleFormChange}
                    fullWidth
                    required
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 3, // adjust for more or less roundness
                      },
                    }}
                  />
                  <TextField
                    label="Your Email"
                    name="user_email"
                    type="email"
                    value={formData.user_email}
                    onChange={handleFormChange}
                    fullWidth
                    required
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 3,
                      },
                    }}
                  />
                  <TextField
                    label="Your Message"
                    name="message"
                    value={formData.message}
                    onChange={handleFormChange}
                    multiline
                    rows={5}
                    fullWidth
                    required
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 3,
                      },
                    }}
                  />
                  {formError && (
                    <Typography color="error">{formError}</Typography>
                  )}
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      sx={{
                        px: 4,
                        py: 1.5,
                        fontWeight: 500,
                      }}
                    >
                      Send Message
                    </Button>
                  </Box>
                </Box>
              </Grid>

              {/* Contact Info Section */}
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 4,
                    justifyContent: "center",
                    height: "100%",
                    px: { xs: 2, sm: 3 },
                  }}
                >
                  {contactInfo.map((contact, i) => (
                    <Box
                      key={i}
                      sx={{ display: "flex", alignItems: "center", gap: 3 }}
                    >
                      <Box
                        sx={{
                          bgcolor: "primary.main",
                          p: 1.5,
                          borderRadius: "50%",
                          color: "white",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {contact.logo}
                      </Box>
                      <Typography variant="body1" color="text.primary">
                        {contact.text}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Testimonial Section */}
        <Box id="testimonials" sx={{ py: 10, bgcolor: "white" }}>
          <Container>
            <Typography
              variant="h3"
              align="center"
              gutterBottom
              sx={{ color: theme.palette.primary.main }}
            >
              Patient <span style={{ color: "gray" }}>Testimonials</span>
            </Typography>
            <Typography
              variant="body1"
              align="center"
              color="textSecondary"
              sx={{ mb: 4 }}
            >
              What My Patients Say
            </Typography>
            <Swiper
              slidesPerView={1}
              spaceBetween={20}
              breakpoints={{
                768: { slidesPerView: 2 },
                500: { slidesPerView: 1 },
              }}
              loop={true}
              autoplay={{ delay: 5000 }}
              pagination={{ clickable: true }}
              modules={[Pagination, Autoplay]}
            >
              {testimonials.map((testimonial, i) => (
                <SwiperSlide key={i}>
                  <Card
                    sx={{ m: 2, bgcolor: "background.paper", boxShadow: 3 }}
                  >
                    <CardContent>
                      {/* Top-left user info row */}
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                          mb: 2,
                        }}
                      >
                        <Avatar
                          src={testimonial.photo}
                          alt={testimonial.name}
                          sx={{ width: 56, height: 56 }}
                        />
                        <Box>
                          <Typography
                            variant="h6"
                            color="primary"
                            sx={{ fontWeight: 600 }}
                          >
                            {testimonial.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {testimonial.role}
                          </Typography>
                        </Box>
                      </Box>

                      {/* Testimonial with large quotation marks */}
                      <Typography
                        variant="body1"
                        sx={{
                          fontStyle: "italic",
                          position: "relative",
                          fontSize: { xs: 16, sm: 18 },
                          px: 2,
                          lineHeight: 1.8,
                          "&::before": {
                            content: '"“"',
                            position: "absolute",
                            left: 0,
                            top: -10,
                            fontSize: "2.5rem",
                            color: "primary.main",
                          },
                          "&::after": {
                            content: '"”"',
                            position: "absolute",
                            right: 0,
                            bottom: -10,
                            fontSize: "2.5rem",
                            color: "primary.main",
                          },
                        }}
                      >
                        {testimonial.text}
                      </Typography>
                    </CardContent>
                  </Card>
                </SwiperSlide>
              ))}
            </Swiper>
          </Container>
        </Box>

        {/* Footer */}
        <Box
          sx={{
            bgcolor: "grey.800",
            py: 2,
            textAlign: "center",
            color: "white",
          }}
        >
          <Typography variant="body2">
            Copyright © 2025 Dr. John Smith. All Rights Reserved.
          </Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default DoctorPortfolio;
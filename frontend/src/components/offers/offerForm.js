import React, { useState } from "react";
import { Button, Grid, Input, Typography } from "@mui/material";
import axios from "axios";
import Navbar from "../navbar/navbar"; // Adjusted import path

import { useNavigate } from "react-router-dom";

const URL = "http://localhost:5000/offer/";

export default function OfferForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [persentage, setPersentage] = useState(0);
  const [promoCode, setPromoCode] = useState("");
  const [startDate, setStartDate] = useState("");
  const [dueDate, setDueDate] = useState("");

  const [errors, setErrors] = useState({
    title: "",
    description: "",
    percentage: "",
    promoCode: "",
    startDate: "",
    dueDate: "",
  });

  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    if (!title) {
      newErrors.title = "Please fill out this field";
      isValid = false;
    } else {
      newErrors.title = "";
    }

    if (!description) {
      newErrors.description = "Please fill out this field";
      isValid = false;
    } else {
      newErrors.description = "";
    }

    if (!persentage) {
      newErrors.percentage = "Please fill out this field";
      isValid = false;
    } else if (persentage < 0 || persentage > 100) {
      newErrors.percentage = "Please fill valid percentage";
      isValid = false;
    }else {
      newErrors.percentage = "";
    }

    if (!promoCode) {
      newErrors.promoCode = "Please fill out this field";
      isValid = false;
    } else {
      newErrors.promoCode = "";
    }

    if (!startDate) {
      newErrors.startDate = "Please fill out this field";
      isValid = false;
    } else {
      newErrors.startDate = "";
    }

    if (!dueDate) {
      newErrors.dueDate = "Please fill out this field";
      isValid = false;
    } else {
      newErrors.dueDate = "";
    }

    setErrors(newErrors);
    return isValid;
  };

  const addOffer = () => {
    if (!validateForm()) {
      return;
    }

    const payload = {
      title: title,
      description: description,
      persentage: persentage,
      promoCode: promoCode,
      startDate: startDate,
      dueDate: dueDate,
    };

    axios
      .post(URL, payload)
      .then((response) => {
        console.log("Offer added successfully:", response.data);
        // Reset form fields
        setTitle("");
        setDescription("");
        setPersentage(0);
        setPromoCode("");
        setStartDate("");
        setDueDate("");
        // Show alert
        alert("Offer Inserted");
        // Redirect to offer management page
        navigate("/offermanagement");
      })
      .catch((error) => {
        console.error("Error adding offer:", error);
      });
  };

  return (
   <Grid>
     <Navbar/>

    <Grid
      container
      spacing={2}
      sx={{
        marginBottom: "30px",
        display: "block",
        margin: "50px",
      }}
    >
      <Grid item xs={12}>
        <Typography component={"h1"} sx={{ color: "black" }}>
          Create a new offer
        </Typography>
      </Grid>

      <Grid item xs={12} sm={6} sx={{ display: "flex" }}>
        <Typography
          component={"label"}
          htmlFor="title"
          sx={{
            color: "Black",
            marginRight: "10px",
            fontSize: "16px",
            width: "150px",
            display: "block",
            marginLeft: "10px",
          }}
        >
          Title
        </Typography>
        <Input
          type="text"
          id="title"
          name="Title"
          sx={{
            width: "400px",
          }}
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />

        {errors.title && (
          <Typography sx={{ color: "red", fontSize: "12px" }}>
            {errors.title}
          </Typography>
        )}
      </Grid>
      <Grid item xs={12} sm={6} sx={{ display: "flex" }}>
        <Typography
          component={"label"}
          htmlFor="description"
          sx={{
            color: "Black",
            marginRight: "10px",
            fontSize: "16px",
            width: "150px",
            display: "block",
            marginLeft: "10px",
          }}
        >
          Description
        </Typography>
        <Input
          type="text"
          id="description"
          name="description"
          sx={{
            width: "400px",
          }}
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        {errors.description && (
          <Typography sx={{ color: "red", fontSize: "12px" }}>
            {errors.description}
          </Typography>
        )}
      </Grid>
      <Grid item xs={12} sm={6} sx={{ display: "flex" }}>
        <Typography
          component={"label"}
          htmlFor="persentage"
          sx={{
            color: "Black",
            marginRight: "10px",
            fontSize: "16px",
            width: "150px",
            display: "block",
            marginLeft: "10px",
          }}
        >
          Persentage
        </Typography>
        <Input
          type="number"
          id="persentage"
          name="persentage"
          sx={{
            width: "400px",
          }}
          value={persentage}
          onChange={(e) => {
            setPersentage(e.target.value);
          }}
        />
        {errors.percentage && (
          <Typography sx={{ color: "red", fontSize: "12px" }}>
            {errors.percentage}
          </Typography>
        )}
      </Grid>
      <Grid item xs={12} sm={6} sx={{ display: "flex" }}>
        <Typography
          component={"label"}
          htmlFor="promoCode"
          sx={{
            color: "Black",
            marginRight: "10px",
            fontSize: "16px",
            width: "150px",
            display: "block",
            marginLeft: "10px",
          }}
        >
          PromoCode
        </Typography>
        <Input
          type="text"
          id="promoCode"
          name="promoCode"
          sx={{
            width: "400px",
          }}
          value={promoCode}
          onChange={(e) => {
            setPromoCode(e.target.value);
          }}
        />
        {errors.promoCode && (
          <Typography sx={{ color: "red", fontSize: "12px" }}>
            {errors.promoCode}
          </Typography>
        )}
      </Grid>
      <Grid item xs={12} sm={6} sx={{ display: "flex" }}>
        <Typography
          component={"label"}
          htmlFor="startDate"
          sx={{
            color: "Black",
            marginRight: "10px",
            fontSize: "16px",
            width: "150px",
            display: "block",
            marginLeft: "10px",
          }}
        >
          Starting Date
        </Typography>
        <Input
          type="date"
          id="startDate"
          name="startDate"
          sx={{
            width: "400px",
          }}
          value={startDate}
          onChange={(e) => {
            setStartDate(e.target.value);
          }}
        />
        {errors.startDate && (
          <Typography sx={{ color: "red", fontSize: "12px" }}>
            {errors.startDate}
          </Typography>
        )}
      </Grid>
      <Grid item xs={12} sm={6} sx={{ display: "flex" }}>
        <Typography
          component={"label"}
          htmlFor="dueDate"
          sx={{
            color: "Black",
            marginRight: "10px",
            fontSize: "16px",
            width: "150px",
            display: "block",
            marginLeft: "10px",
          }}
        >
          Due Date
        </Typography>
        <Input
          type="date"
          id="dueDate"
          name="dueDate"
          sx={{
            width: "400px",
          }}
          value={dueDate}
          onChange={(e) => {
            setDueDate(e.target.value);
          }}
        />
        {errors.dueDate && (
          <Typography sx={{ color: "red", fontSize: "12px" }}>
            {errors.dueDate}
          </Typography>
        )}
      </Grid>

      <Button
        sx={{
          margin: "Auto",
          marginBottom: "20px",
          backgroundColor: "#052659",
          color: "white",
          marginTop: "30px",
          marginLeft: "100px",
          "&:hover": {
            backgroundColor: "#548383",
            color: "black",
          },
        }}
        onClick={addOffer}
      >
        Add Offer
      </Button>
    </Grid>
    </Grid>
  );
}

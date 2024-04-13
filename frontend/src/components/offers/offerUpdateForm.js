import React, { useState, useEffect } from "react";
import { Button, Grid, Input, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate, useParams } from "react-router";

export default function OfferUpdateForm() {
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    persentage: 0,
    promoCode: "",
    startDate: "",
    dueDate: "",
  });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchOffer = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/offer/${id}`);
        
        setInputs({
          title: response.data.offers.title,
          description: response.data.offers.description,
          persentage: response.data.offers.persentage,
          promoCode: response.data.offers.promoCode,
          startDate: response.data.offers.startDate,
          dueDate: response.data.offers.dueDate,
        });
      } catch (error) {
        console.error("Error fetching offer:", error);
      }
    };

    fetchOffer();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/offer/${id}`, inputs);
      alert("Offer updated successfully");
      navigate("/offerManagement");
    } catch (error) {
      console.error("Error updating offer:", error);
    }
  };

  return (
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
          Edit exsisting offer
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
          value={inputs.title}
          onChange={(e) => {
            setInputs({ ...inputs, title: e.target.value });
          }}
        />
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
          value={inputs.description}
          onChange={(e) => {
            setInputs({ ...inputs, description: e.target.value });
          }}
        />
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
          value={inputs.persentage}
          onChange={(e) => {
            setInputs({ ...inputs, persentage: e.target.value });
          }}
        />
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
          value={inputs.promoCode}
          onChange={(e) => {
            setInputs({ ...inputs, promoCode: e.target.value });
          }}
        />
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
          value={inputs.startDate}
          onChange={(e) => {
            setInputs({ ...inputs, startDate: e.target.value });
          }}
        />
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
          value={inputs.dueDate}
          onChange={(e) => {
            setInputs({ ...inputs, dueDate: e.target.value });
          }}
        />
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
        onClick={handleSubmit}
      >
        Save Offer
      </Button>
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
        onClick={
          () => {
            navigate("/offerManagement");
        }}
      >
        Cancel
      </Button>
    </Grid>
  );
}

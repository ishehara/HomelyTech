import React, { useState } from "react";
import { Button, Grid, Input, Typography } from "@mui/material";

export default function OfferForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [persentage, setPersentage] = useState(0);
  const [promoCode, setPromoCode] = useState("");
  const [startDate, setStartDate] = useState("");
  const [dueDate, setDueDate] = useState("");

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
      >
        Add Offer
      </Button>
    </Grid>
  );
}

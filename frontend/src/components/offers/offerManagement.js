import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Box, Button, Grid } from "@mui/material";
import OfferTable from "./offerTable";
import axios from "axios";

const URL = "http://localhost:5000/offer/";

export default function OfferManagement() {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    getOffers();
  }, []);

  const getOffers = () => {
    axios
      .get(URL)
      .then((response) => {
        setOffers(response.data?.offers || []);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteOffer = (id) => {
    axios
      .delete(`${URL}${id}`)
      .then(() => {
        setOffers(offers.filter((offer) => offer.id !== id));
        console.log("Offer deleted successfully");
        alert("Offer deleted successfully");
        getOffers();
      })
      .catch((error) => {
        console.error("Error deleting offer:", error);
      });
  };

  return (
    <Grid>
      <Grid>
        <Button
          sx={{
            marginLeft: "10px",
            marginTop: "10px",
          }}
        >
          <Link to="/offerForm">Create a new offer</Link>
        </Button>
      </Grid>

      <Box
        sx={{
          width: "calc(100% - 100px)",
          margin: "auto",
          marginTop: "100px",
        }}
      >
        <OfferTable rows={offers} onDelete={deleteOffer} />
      </Box>
    </Grid>
  );
}

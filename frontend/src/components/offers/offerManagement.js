import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Box, Button, Grid, Input } from "@mui/material";

import OfferTable from "./offerTable";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import Navbar from "../navbar/navbar"; // Adjusted import path

const URL = "http://localhost:5000/offer/";

export default function OfferManagement() {
  const [offers, setOffers] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");

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

  const sendOffer = (id) => {
    axios
      .post(`${URL}sendMail/${id}`)
      .then(() => {
        console.log("Offer sent successfully");
        alert("Offer sent successfully");
      })
      .catch((error) => {
        console.error("Error sending offer:", error);
      });
  };

  const ComponentsRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => ComponentsRef.current,
    DocumentTitle: "Offer Report",
    onAfterPrint: () => alert("Offer report download completed successfully"),
  });

  const [noResults, setNoResults] = useState(false);

  const handleSearch = () => {
    axios
      .get(URL)
      .then((response) => {
        const filteredOffers = response.data?.offers.filter((offer) =>
          Object.values(offer).some((feild) =>
            feild.toString().toLowerCase().includes(searchQuery.toLowerCase())
          )
        );
        setOffers(filteredOffers);
        setNoResults(filteredOffers.length === 0);
      })
      .catch((error) => {
        console.error("Error searching for offer:", error);
      });
  };

  return (
    <Grid>
      <Navbar/>
    <Grid>
      <Grid alignItems="center" item xs={12} sx={{ display: "flex", margin: "20px" }}>
        <Button
          component={Link}
          to="/offerForm"
          variant="contained"
          sx={{
            marginRight: "10px",
            backgroundColor: "#052659",
            "&:hover": {
              backgroundColor: "#548383",
              color: "black",
            },
          }}
        >
          Create a new offer
        </Button>

        <Button
          variant="contained"
          onClick={handlePrint}
          sx={{
            marginRight: "10px",
            backgroundColor: "#052659",
            "&:hover": {
              backgroundColor: "#548383",
              color: "black",
            },
          }}
        >
          Generate a report
        </Button>

        <Grid
          display= 'flex'
          justifyContent="flex-end"
          alignItems="center"
          sx={{ marginLeft: "auto" }}
          
          
        >
          <Input
            type="text"
            id="search"
            name="search"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ width: "400px", marginRight: "10px" }}
          />
          <Button
            variant="contained"
            onClick={handleSearch}
            sx={{ backgroundColor: "#052659",
            "&:hover": {
              backgroundColor: "#548383",
              color: "black",
            }, }}
          >
            Search
          </Button>
        </Grid>
      </Grid>

      {/* Offer table */}

      {noResults ? (
        <h1>No results found</h1>
      ) : (
        <Box
          sx={{
            width: "calc(100% - 100px)",
            margin: "auto",
            marginTop: "20px",
          }}
        >
          <Grid ref={ComponentsRef}>
            <OfferTable rows={offers} onDelete={deleteOffer} sendMail={sendOffer} />
          </Grid>
        </Box>
      )}
      </Grid>
    </Grid>
  );
}

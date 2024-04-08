import * as React from "react";

import { Link } from "react-router-dom";
import { Box, Button, Grid } from "@mui/material";
import OfferTable from "../offers/offerTable";

function manager() {
  const offers = [
    {
      title: "Offer 1",
      description: "Description 1",
      persentage: "10%",
      promoCode: "PROMO10",
      startDate: "2021-10-01",
      dueDate: "2021-10-31",
    },
    {
      title: "Offer 2",
      description: "Description 2",
      persentage: "20%",
      promoCode: "PROMO20",
      startDate: "2021-11-01",
      dueDate: "2021-11-30",
    },
  ];

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
          width:'calc(100% - 100px)',
          margin:'auto',
          marginTop: '100px',
        }}
      >
        <OfferTable rows={offers} />
      </Box>
    </Grid>
  );
}

export default manager;

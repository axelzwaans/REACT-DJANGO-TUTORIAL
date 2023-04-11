import React, { useState, useEffect } from "react";
import { Grid, Typography, Button, IconButton } from "@mui/material";
import { NavigateBefore, NavigateNext } from "@mui/icons-material";
import { Link } from "react-router-dom";

const pages = {
  JOIN: "pages.join",
  CREATE: "pages.create",
};

function JoinInfo() {
  return (
    <div>
      <Typography variant="body1" align="center">
        Join a room using a code given by your host.
      </Typography>
    </div>
  );
}

function CreateInfo() {
  return (
    <div>
      <Typography variant="body1" align="center">
        Create a room to share music with your friends.
      </Typography>
    </div>
  );
}

function Info() {
  const [page, setPage] = useState(pages.JOIN);

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography variant="h4" component="h4">
          What is House Party?
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography variant="body1">
          {page === pages.JOIN ? JoinInfo() : CreateInfo()}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <IconButton
          onClick={() => {
            page === pages.CREATE ? setPage(pages.JOIN) : setPage(pages.CREATE);
          }}
        >
          {page === pages.CREATE ? (
            <NavigateBefore />
          ) : (
            <NavigateNext />
          )}
        </IconButton>
      </Grid>
      <Grid item xs={12} align="center">
        <Button color="secondary" to="/" component={Link} variant="contained">
          Back
        </Button>
      </Grid>
    </Grid>
  );
}

export default Info;

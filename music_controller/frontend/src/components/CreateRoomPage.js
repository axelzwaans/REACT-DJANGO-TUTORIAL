import React, { useState } from "react";
import {
  Button,
  Grid,
  Typography,
  TextField,
  FormHelperText,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  Collapse,
  Alert
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

function CreateRoomPage(props) {
  const navigate = useNavigate();

  let defaultVotes = 2;
  let guestCanPause = true;

  if (props.update) {
    defaultVotes = props.votesToSkip;
    guestCanPause = props.guestCanPause;
  }

  const [backData, setBackData] = useState({
    guestCanPause: guestCanPause,
    votesToSkip: defaultVotes,
    errorMsg: "",
    successMsg: "",
  });

  const setErrorMessage = (msg) => {
    setBackData((data) => ({
      ...data,
      errorMsg: msg,
    }));
  };

  const setSuccessMessage = (msg) => {
    setBackData((data) => ({
      ...data,
      successMsg: msg,
    }));
  };

  const handleVotesChange = (e) => {
    setBackData((data) => ({
      ...data,
      votesToSkip: e.target.value,
    }));
  };

  const handleGuestCanPauseChange = (e) => {
    setBackData((data) => ({
      ...data,
      guestCanPause: e.target.value == "true" ? true : false,
    }));
  };

  const handleRoomButtonPressed = async () => {
    const feedBack = await fetch("api/create-room", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        votes_to_skip: backData.votesToSkip,
        guest_can_pause: backData.guestCanPause,
      }),
    });
    const JsonFeedBack = await feedBack.json();
    console.log(JsonFeedBack);
    navigate("/room/" + JsonFeedBack.code);
  };

  const handleUpdateButtonPressed = () => {
    const requestOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: props.roomCode,
        votes_to_skip: backData.votesToSkip,
        guest_can_pause: backData.guestCanPause,
      }),
    };
    fetch("/api/update-room", requestOptions).then((response) => {
      if (response.ok) {
        setSuccessMessage("Room updated successfully!");
      } else {
        setErrorMessage("Error updating room...");
      }
    });
  };

  const renderCreateButtons = () => {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Button
            color="primary"
            variant="contained"
            onClick={handleRoomButtonPressed}
          >
            Create A Room
          </Button>
        </Grid>
        <Grid item xs={12} align="center">
          <Button color="secondary" variant="contained" to="/" component={Link}>
            Back
          </Button>
        </Grid>
      </Grid>
    );
  };

  const renderUpdateButtons = () => {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Button
            color="primary"
            variant="contained"
            onClick={handleUpdateButtonPressed}
          >
            Update Room
          </Button>
        </Grid>
      </Grid>
    );
  };

  const title = props.update ? "Update Room" : "Create a Room";

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Collapse in={backData.errorMsg != "" || backData.successMsg != ""}>
          {backData.successMsg != "" ? (
            <Alert
              severity="success"
              onClose={() => {
                setSuccessMessage("");
              }}
            >
              {backData.successMsg}
            </Alert>
          ) : (
            <Alert
              severity="error"
              onClose={() => {
                setErrorMessage("");
              }}
            >
              {backData.errorMsg}
            </Alert>
          )}
        </Collapse>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography component="h4" variant="h4">
          {title}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <FormControl component="fieldset">
          <FormHelperText component="div">
            <div align="center">Guest Control of Playback State</div>
          </FormHelperText>
          <RadioGroup
            row
            value={backData.guestCanPause.toString()}
            onChange={handleGuestCanPauseChange}
          >
            <FormControlLabel
              value="true"
              control={<Radio color="primary" />}
              label="Play/Pause"
              labelPlacement="bottom"
            />
            <FormControlLabel
              value="false"
              control={<Radio color="secondary" />}
              label="No Control"
              labelPlacement="bottom"
            />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={12} align="center">
        <FormControl>
          <TextField
            required={true}
            type="number"
            onChange={handleVotesChange}
            defaultValue={defaultVotes}
            inputProps={{
              min: 1,
              style: { textAlign: "center" },
            }}
          />
          <FormHelperText component="div">
            <div align="center">Votes Required To Skip Song</div>
          </FormHelperText>
        </FormControl>
      </Grid>
      {props.update ? renderUpdateButtons() : renderCreateButtons()}
    </Grid>
  );
}

export default CreateRoomPage;

import React, { useState, useEffect } from "react";
import JoinRoomPage from "./JoinRoomPage";
import CreateRoomPage from "./CreateRoomPage";
import Room from "./Room";
import Info from "./Info";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import { Grid, Typography, ButtonGroup, Button } from "@mui/material";

function HomePage() {
  const [roomCode, setRoomCode] = useState(null);

  useEffect(() => {
    async function autoEnter() {
      fetch("/api/user-in-room")
        .then((response) => response.json())
        .then((data) => {
          setRoomCode(data.code);
        });
    }
    autoEnter();
  }, []);

  const clearRoomCode = () => {
    setRoomCode(null);
  };

  function renderHomePage() {
    if (roomCode) {
      return <Navigate to={`/room/${roomCode}`} replace={true} />;
    } else {
      return (
        <Grid container spacing={3}>
          <Grid item xs={12} align="center">
            <Typography variant="h3" compact="h3">
              House Party
            </Typography>
          </Grid>
          <Grid item xs={12} align="center">
            <ButtonGroup disableElevation variant="contained" color="primary">
              <Button color="primary" to="/join" component={Link}>
                Join a Room
              </Button>
              <Button color="error" to="/info" component={Link}>
                Info
              </Button>
              <Button color="secondary" to="/create" component={Link}>
                Create a Room
              </Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      );
    }
  }

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={renderHomePage()} />
        <Route path="/join" element={<JoinRoomPage />} />
        <Route path="/info" element={<Info />} />
        <Route path="/create" element={<CreateRoomPage />} />
        <Route
            path="/room/:roomCode"
            element={<Room leaveRoomCallback={clearRoomCode} />}
          />
      </Routes>
    </Router>
  );
}

export default HomePage;

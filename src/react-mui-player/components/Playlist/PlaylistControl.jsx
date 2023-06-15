import React, { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import actionCreators from "../../redux/actionCreators";

import {
  ShuffleRounded,
  ShuffleOnRounded,
  QueueMusicRounded as PlaylistIcon,
  RepeatRounded,
  RepeatOnRounded,
  RepeatOneOnRounded,
} from "@mui/icons-material/";
import { Popover, Collapse, Box, ToggleButton } from "@mui/material/";
import styled from "@mui/material/styles/styled";

import Playlist from "./Playlist.jsx";

import { RepeatMode } from "../../redux/types";
import AddToPlaylists from "../AddToPlaylists";
import Favourite from "../Favourite";
import VolumeControl from "../VolumeControl";

const PREFIX = "PlaylistControl";

const classes = {
  button: `${PREFIX}-button`,
};

const RootBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column-reverse",
  alignItems: "center",
}));

const BouttonContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "row",

  [`& .${classes.button}`]: {
    // space buttons horizontally
    margin: `auto ${theme.spacing(1)}`,
    flexGrow: 1, // buttons should grow
  },
}));

function RepeatButton(props) {
  const { value, ...other } = props;

  return (
    <ToggleButton
      value="repeat"
      selected={value !== RepeatMode.NORMAL}
      {...other}>
      {value === RepeatMode.NORMAL ? (
        <RepeatRounded />
      ) : value === RepeatMode.REPEAT_ALL ? (
        <RepeatOnRounded />
      ) : (
        <RepeatOneOnRounded />
      )}
    </ToggleButton>
  );
}

function ShuffleButton(props) {
  const { value, ...other } = props;

  return (
    <ToggleButton value="shuffle" selected={value} {...other}>
      {value ? <ShuffleOnRounded /> : <ShuffleRounded />}
    </ToggleButton>
  );
}

export default function PlaylistControl(props) {
  const sx = props.sx;
  const playlistViewMode = props.playlistViewMode;

  const shuffled = useSelector(
    /** @type {import("../../redux/types").useSelectCb} */
    (state) => state.shuffled
  );
  const repeatMode = useSelector(
    /** @type {import("../../redux/types").useSelectCb} */
    (state) => state.repeatMode
  );
  const [playlistVisible, showPlaylist] = useState(false);
  const [anchorEl, setAnchor] = useState(null);

  const dispatch = useDispatch();
  const onShuffle = (bool) => dispatch(actionCreators.shuffle(bool));
  const onRepeat = () => dispatch(actionCreators.setRepeatMode());

  const handlePopoverClose = () => {
    showPlaylist(false);
    setAnchor(null);
  };

  return (
    <RootBox sx={{ ...sx }}>
      <BouttonContainer>
        <RepeatButton
          value={repeatMode}
          className={classes.button}
          title={
            repeatMode === "NORMAL"
              ? "Repeat All"
              : repeatMode === "REPEAT_ALL"
              ? "Repeat One"
              : "Normal"
          }
          onClick={() => {
            onRepeat();
          }}
        />
        <ShuffleButton
          value={shuffled}
          title={"Shuffle Songs"}
          className={classes.button}
          onClick={() => {
            onShuffle(!shuffled);
          }}
        />
        <ToggleButton
          className={classes.button}
          value="show playlist"
          title="Show Playlist"
          selected={playlistVisible}
          onChange={(e) => {
            setAnchor(
              /** @type {Node} */ (e.target).parentElement.parentElement
                .parentElement.parentElement
            );
            showPlaylist(!playlistVisible);
          }}>
          <PlaylistIcon />
        </ToggleButton>

        <div style={{ display: "flex", alignItems: "center" }}>
          <span
            style={{
              fontSize: 24,
              userSelect: "none",
            }}>
            |
          </span>
        </div>

        <VolumeControl />
        <Favourite />
        <AddToPlaylists />
      </BouttonContainer>

      {playlistViewMode === "popover" ? (
        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handlePopoverClose}
          sx={{ boxShadow: 8 }}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}>
          <Playlist
            sx={{
              width: "400px",
              height: "60vh",
            }}
          />
        </Popover>
      ) : (
        <Collapse collapsedSize={"0"} in={playlistVisible}>
          <Playlist
            sx={{
              height: "60vh",
              width: "90vw",
            }}
          />
        </Collapse>
      )}
    </RootBox>
  );
}

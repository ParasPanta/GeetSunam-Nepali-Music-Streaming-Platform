import React from "react";
import Box from "@mui/material/Box";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import ReactDraggableList from "react-draggable-list";

import ActionCreators from "../../redux/actionCreators";
import PlaylistItemTemplate from "./PlaylistItemTemplate";

export default function Playlist(props) {
  const sx = props.sx;

  const { playlist, currentTrack } = useSelector(
    /** @type {import("../../redux/types.js").useSelectCb} */
    ({ playlist, currentTrack }) => ({
      playlist,
      currentTrack,
    }),
    shallowEqual
  );

  const dispatch = useDispatch();
  const onReorder = (newList) =>
    dispatch(ActionCreators.updatePlaylist(newList));
  const onTrackSelect = (index) => {
    const { ID, favourite } = playlist[index];

    // change and play track immediately
    dispatch(ActionCreators.changeTrack(index));
    dispatch(ActionCreators.play());
    dispatch(ActionCreators.getMusicDetails({ ID, favourite }));
  };

  const draggablelistContainerRef = React.createRef();
  return (
    <div className="child-scroll" style={{ overflowY: "auto" }}>
      <Box
        ref={draggablelistContainerRef}
        sx={{
          margin: (theme) => theme.spacing(),
          // require set container with fix size for draggable list
          width: "10vw",
          height: "10vh",
          ...sx, // should be able to overwrite default width and height
        }}>
        <ReactDraggableList
          list={playlist}
          itemKey="ID"
          template={PlaylistItemTemplate}
          onMoveEnd={onReorder}
          container={() => draggablelistContainerRef.current}
          commonProps={{
            listOfID: playlist.map((element) => element.ID),
            currentTrackID: playlist[currentTrack].ID,
            onTrackSelect: onTrackSelect,
          }}
        />
      </Box>
    </div>
  );
}

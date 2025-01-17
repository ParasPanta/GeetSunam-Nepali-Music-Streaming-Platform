import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { FiPauseCircle, FiPlayCircle } from "react-icons/fi";
import { possibleMediaState } from "../Player/possibleMediaState.types";
import PauseSong from "../Player/PauseSong";
import PlaySong from "../Player/PlaySong";
import ResumeSong from "../Player/ResumeSong";

function ManageSongsPlayback({ song, musicList, artists }) {
  const currentSong = useSelector((state) => state);

  return (
    <React.Fragment>
      {currentSong.trackID === song._id ? (
        <React.Fragment>
          {currentSong.mediaState === possibleMediaState.PLAYING && (
            <PauseSong>
              <FiPauseCircle className="recent-play" />
              <img
                src={song.trackDetails.coverArt}
                alt="thumbnail"
                className="thumbnail-recent"
              />
              <span className="song-name">
                <span>{song.trackDetails.title}</span>
              </span>
              {!artists ? (
                <span className="artists">{song?.artists?.fullname}</span>
              ) : (
                <span className="skip"></span>
              )}
              <span className="released-date">
                {song?.releasedDate || "No Data"}
              </span>
              <span className="recent-genre">
                {song.genre?.name?.toUpperCase()}
              </span>
            </PauseSong>
          )}

          {currentSong.mediaState === possibleMediaState.PAUSED && (
            <ResumeSong>
              <FiPlayCircle className="recent-play" />
              <img
                src={song.trackDetails.coverArt}
                alt="thumbnail"
                className="thumbnail-recent"
              />
              <span className="song-name">
                <span>{song.trackDetails.title}</span>
              </span>
              {!artists ? (
                <span className="artists">{song?.artists?.fullname}</span>
              ) : (
                <span className="skip"></span>
              )}
              <span className="released-date">
                {song?.releasedDate || "No Data"}
              </span>
              <span className="recent-genre">
                {song.genre?.name?.toUpperCase()}
              </span>
            </ResumeSong>
          )}
        </React.Fragment>
      ) : (
        <PlaySong trackDetails={song.trackDetails} musicList={musicList}>
          <FiPlayCircle className="recent-play" />
          <img
            src={song.trackDetails.coverArt}
            alt="thumbnail"
            className="thumbnail-recent"
          />
          <span className="song-name">
            <span>{song.trackDetails.title}</span>
          </span>
          {!artists ? (
            <span className="artists">{song?.artists?.fullname}</span>
          ) : (
            <span className="skip"></span>
          )}
          <span className="released-date">
            {song?.releasedDate || "No Data"}
          </span>
          <span className="recent-genre">
            {song.genre?.name?.toUpperCase()}
          </span>
        </PlaySong>
      )}
    </React.Fragment>
  );
}

export default ManageSongsPlayback;

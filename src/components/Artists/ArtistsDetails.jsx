import { featuredArtists } from "components/Featured/featureArtists.data";
import React from "react";
import { useParams } from "react-router-dom";
import * as FiIcons from "react-icons/fi";
import ArtistsPlayed from "./ArtistsPlayed";
import { musicList } from "assets/data/musicList";

function ArtistsDetails() {
  const { id } = useParams();
  const artistsDetails = featuredArtists[id];
  const data = musicList.filter((value) => value.artistsDetails.id == id);

  return (
    <>
      <div className="playlist-container gradient">
        <section className="playlist">
          <div className="artists-images">
            <img src={artistsDetails.profile} alt="thumbnail" />
          </div>
          <div className="playlist-details">
            <div>Artists</div>
            <div>{artistsDetails.name}</div>
            <div>
              <span>GeetSunam</span>
              <span style={{ fontWeight: "bold" }}>.</span>
              <span>{data.length} songs</span>
            </div>
          </div>
          <div style={{ position: "absolute", right: 20, zIndex: 999 }}>
            <button className="custom-btn" title="Remove from Favourite">
              <FiIcons.FiHeart
                style={{
                  fill: "var(--highlight)",
                  stroke: "var(--highlight)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              />
            </button>
          </div>
        </section>

        <div className="padding">
          <ArtistsPlayed data={data} />
        </div>
      </div>
    </>
  );
}

export default ArtistsDetails;

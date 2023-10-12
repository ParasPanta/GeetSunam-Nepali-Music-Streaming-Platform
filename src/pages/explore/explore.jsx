import { Link } from "react-router-dom";
import { BiPlayCircle } from "react-icons/bi";
import { MdRecommend, MdLibraryMusic } from "react-icons/md";
import { useState } from "react";
import { useQuery } from "react-query";

import CustomBreadcrumbs from "@/components/Breadcrumbs";
import { Featured } from "@/components/Featured";
import RecommendedSlider from "@/components/Slider/RecommendedSlider";
import PlaySong from "@/components/Player/PlaySong";

import { trackDetails } from "@/utils/trackDetails.utils";
import {
  getAllSongsAPI,
  getRecommendedSongs,
} from "@/services/musicApi/getSongs.api";
import getFeaturedSongs from "@/services/musicApi/getFeaturedSongs.api";
import FeaturedSkeleton from "@/components/Loader/Featured";
import {
  SongsSwiperLoader,
  SongTwoRowLoader,
} from "@/components/Loader/LoaderComponents";
import { useTranslation } from "react-i18next";

function Explore() {
  const { t } = useTranslation("translation", { keyPrefix: "explorePage" });

  const {
    data: songsLibrary,
    isLoading: isLoadingLibrary,
    isError: isErrorLibrary,
  } = useQuery("library", getAllSongsAPI, {
    select: (data) => data?.data.songs,
    refetchOnWindowFocus: false,
  });

  const {
    data: featuredData,
    isLoading: isLoadingFeatured,
    isError: isErrorFeatured,
  } = useQuery(["featured"], getFeaturedSongs, {
    select: (data) => data.data.songs,
    refetchOnWindowFocus: false,
  });

  const {
    data: songsRecommended,
    isLoading: isLoadingRecommended,
    isError: isErrorRecommended,
  } = useQuery("recommendation", getRecommendedSongs, {
    select: (data) => data.data,
    refetchOnWindowFocus: false,
  });

  const songs = songsLibrary && trackDetails(songsLibrary);
  const recommendedSongs = songsRecommended && trackDetails(songsRecommended);
  const featuredSongs = featuredData && trackDetails(featuredData);

  const loaderLibrary = isLoadingLibrary || isErrorLibrary;
  const loaderRecommendation = isLoadingRecommended || isErrorRecommended;
  const loaderFeatured = isLoadingFeatured || isErrorFeatured;

  return (
    <div className="content-container">
      <CustomBreadcrumbs link={"/explore"} textName={t("explore")} />

      <div className="main-section">
        {!loaderFeatured ? (
          <Featured data={featuredSongs} />
        ) : (
          <FeaturedSkeleton />
        )}
      </div>

      <div className="main-section">
        <div className="heading">
          <div className="subheading">
            <span>{t("recommendedForYou")}</span>
            <MdRecommend className="heading_icons" />
          </div>
          <Link to={"/recommendation"} className="see-more">
            {t("seeAll")}
          </Link>
        </div>

        <div className="content-section">
          {!loaderRecommendation ? (
            recommendedSongs.length > 0 ? (
              <RecommendedSlider data={recommendedSongs} />
            ) : (
              <p
                style={{
                  color: "rgba(255, 255, 255, 0.8)",
                  marginTop: "-10px",
                  marginBottom: "20px",
                }}>
                No recommendations
              </p>
            )
          ) : (
            <SongsSwiperLoader />
          )}
        </div>
      </div>

      <div className="main-section">
        <div className="heading">
          <div className="subheading">
            <span>{t("library")}</span>
            <MdLibraryMusic className="heading_icons" />
          </div>
        </div>

        <div className="music-section">
          {!loaderLibrary ? (
            songs.map((values) => {
              return (
                <PlaySong trackDetails={values.trackDetails} key={values._id}>
                  <div className="music-container dynamic" key={values._id}>
                    <div className="play-icon-container">
                      <img
                        src={values.coverArt}
                        alt="thumbnail"
                        className="thumbnail-new"
                      />

                      <span className="play-icon">
                        <BiPlayCircle />
                      </span>
                    </div>

                    <div className="song-name innerText" title={values.title}>
                      {values.title}
                    </div>

                    <div className="song-artists">
                      {values.artists.fullname}
                    </div>
                  </div>
                </PlaySong>
              );
            })
          ) : (
            <SongTwoRowLoader />
          )}
        </div>
      </div>
    </div>
  );
}

export default Explore;

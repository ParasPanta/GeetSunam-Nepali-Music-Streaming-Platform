import { SongConfig, FavouriteSongsConfig } from "@/services/api.routes";
import getApiResponse from "@/services/axios";

export const getAllSongsAPI = async () => {
  const result = await getApiResponse({
    url: SongConfig.GET_SONGS,
    method: "get",
  });

  if (result.APIFailed) return null;
  return result.data;
};

export const getPaginatedSongsAPI = async ({ page = 1, limit = 10 }) => {
  const result = await getApiResponse({
    url: SongConfig.GET_SONGS,
    method: "get",
    otherParams: {
      page,
      limit,
    },
  });

  if (result.APIFailed) return null;
  return result.data;
};

export const getNewReleaseSongs = async () => {
  const result = await getApiResponse({
    url: SongConfig.NEW_RELEASES,
    method: "get",
    otherParams: { sort: "-uploadedDate" },
  });

  if (result.APIFailed) return null;
  return result.data;
};

export const getNewReleaseLimitedSongs = async () => {
  const result = await getApiResponse({
    url: SongConfig.NEW_RELEASES,
    method: "get",
    otherParams: {
      sort: "-uploadedDate",
      limit: 10,
    },
  });

  if (result.APIFailed) return null;
  return result.data;
};

export const getRecommendedSongs = async () => {
  const result = await getApiResponse({
    url: SongConfig.RECOMMENDATION,
    method: "get",
    otherParams: {
      limit: 10,
    },
  });

  if (result.APIFailed) return null;
  return result.data;
};

export const getFavouriteSongs = async () => {
  const result = await getApiResponse({
    url: FavouriteSongsConfig.GET_FAVOURITE_SONGS,
    method: "get",
  });

  if (result.APIFailed) return null;
  return result.data;
};

export const getSongsByID = async (id) => {
  const result = await getApiResponse({
    url: SongConfig.GET_SONGS_BY_ID(id),
    method: "get",
  });

  if (result.APIFailed) return null;
  return result.data;
};

export const getRecentlyPlayedSongs = async (id) => {
  const result = await getApiResponse({
    url: SongConfig.GET_SONGS,
    method: "get",
    otherParams: {
      limit: 8,
    },
  });

  if (result.APIFailed) return null;
  return result.data;
};

export const getTrendingSongs = async () => {
  const result = await getApiResponse({
    url: SongConfig.GET_SONGS,
    method: "get",
    otherParams: {
      limit: 8,
    },
  });

  if (result.APIFailed) return null;
  return result.data;
};
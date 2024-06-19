import { createSelector } from "reselect";

const getAlbumImages = (state) => state.AlbumImageReducer;

export const selectAlbumImagesByAlbumId = (albumId) => createSelector(
  [getAlbumImages],
  (albumImages) => albumImages.filter(image => image.album_id === albumId)
);
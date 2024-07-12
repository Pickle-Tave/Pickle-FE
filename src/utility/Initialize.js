import { InitializeAlbumList } from "../actions/AlbumListAction";
import { GetAlbumList } from "../../api/GetAlbumList";
import { InitializeAlbumStatus } from "../actions/AlbumStatusAction";
import { SearchAlbumStatus } from "../../api/SearchAlbumStatus";
import { InitializeLikeList } from "../actions/AlbumLikeAction";
import { SearchAlbumLike } from "../../api/SearchAlbumLike";

export const Initialize = (dropdownValue) => {
    if (dropdownValue === 1) {
        dispatch(InitializeAlbumList());
        dispatch(GetAlbumList(null, 10));
    } else if (dropdownValue === 2) {
        dispatch(InitializeAlbumStatus());
        dispatch(SearchAlbumStatus('PRIVATE', null, 10));
    } else if (dropdownValue === 3) {
        dispatch(InitializeAlbumStatus());
        dispatch(SearchAlbumStatus('PUBLIC', null, 10));
    } else if (dropdownValue === 4) {
        dispatch(InitializeLikeList());
        dispatch(SearchAlbumLike(null, 10));
    }
}
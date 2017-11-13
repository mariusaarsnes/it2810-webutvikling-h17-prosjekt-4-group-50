import {ArtistResponse} from "./artist-response.interface";

export interface UserResponse {
    _id: string;
    username: string;
    date_registered: string;
    favorite_artists: string[];
    favorite_artistsData: ArtistResponse[];
}

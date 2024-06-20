import { SetStateAction } from "react";

export interface RootObject {
    feed: Feed;
}

export interface Feed {
    author:  Author;
    entry:   Entry[];
    icon:    Icon;
    id:      Icon;
    link:    Link[];
    rights:  Icon;
    title:   Icon;
    updated: Icon;
}

export interface Author {
    name: Icon;
    uri:  Icon;
}

export interface Icon {
    label: string;
}

export interface Entry {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [x: string]: any;
    value: SetStateAction<Entry | undefined>;
    timestamp: number;
    category:         Category;
    id:               ID;
    "im:artist":      IMArtist;
    "im:contentType": IMContentType;
    "im:image":       IMImage[];
    "im:name":        Icon;
    "im:price":       IMPrice;
    "im:releaseDate": IMReleaseDate;
    link:             Link;
    rights?:          Icon;
    summary:          Icon;
    title:            Icon;
}

export interface Category {
    attributes?: CategoryAttributes;
}

export interface CategoryAttributes {
    "im:id"?: string;
    label?:   PurpleLabel | undefined;
    scheme?:  string;
    term?:    PurpleLabel;
}

export enum PurpleLabel {
    Music = "Music",
    MusicCommentary = "Music Commentary",
    MusicHistory = "Music History",
    MusicInterviews = "Music Interviews",
}

export interface ID {
    attributes: IDAttributes;
    label:      string;
}

export interface IDAttributes {
    "im:id": string;
}

export interface IMArtist {
    attributes?: IMArtistAttributes;
    label:       string;
}

export interface IMArtistAttributes {
    href: string;
}

export interface IMContentType {
    attributes: IMContentTypeAttributes;
}

export interface IMContentTypeAttributes {
    label: FluffyLabel | undefined;
    term?:  FluffyLabel;
}

export enum FluffyLabel {
    Podcast = "Podcast",
}

export interface IMImage {
    attributes?: IMImageAttributes;
    label:      string;
}

export interface IMImageAttributes {
    height: string;
}

export interface IMPrice {
    attributes?: IMPriceAttributes;
    label:      IMPriceLabel | undefined;
}

export interface IMPriceAttributes {
    amount:   string;
    currency: Currency;
}

export enum Currency {
    Usd = "USD",
}

export enum IMPriceLabel {
    Get = "Get",
}

export interface IMReleaseDate {
    attributes?: Icon;
    label:      Date | string;
}

export interface Link {
    attributes: LinkAttributes;
}

export interface LinkAttributes {
    href:  string;
    rel?:   Rel;
    type?: Type;
}

export enum Rel {
    Alternate = "alternate",
    Self = "self",
}

export enum Type {
    TextHTML = "text/html",
}

export interface EpisodesObject {
    resultCount: number;
    episodeResults: Result[];
   }
   
   export interface Result {
    artistId?:               number;
    artistIds?:              number[];
    artistName?:             string;
    artistViewUrl:           string;
    artworkUrl100?:          string;
    artworkUrl160?:          string;
    artworkUrl30?:           string;
    artworkUrl60:            string;
    artworkUrl600:           string;
    closedCaptioning?:       ClosedCaptioning;
    collectionCensoredName?: Name;
    collectionExplicitness?: string;
    collectionHdPrice?:      number;
    collectionId:            number;
    collectionName:          Name;
    collectionPrice?:        number;
    collectionViewUrl:       string;
    country:                 Country;
    currency?:               string;
    description?:            string;
    episodeContentType?:     EpisodeContentType;
    episodeFileExtension?:   EpisodeFileExtension;
    episodeGuid?:            string;
    episodeUrl?:             string;
    feedUrl:                 string;
    genreIds?:               string[];
    genres:                  Array<GenreClass | string>;
    kind:                    Kind;
    previewUrl?:             string;
    primaryGenreName?:       PrimaryGenreNameEnum;
    releaseDate:             Date;
    shortDescription?:       string;
    trackCensoredName?:      Name;
    trackCount?:             number;
    trackExplicitness?:      string;
    trackId:                 number;
    trackName:               string;
    trackPrice?:             number;
    trackTimeMillis:         number;
    trackViewUrl:            string;
    wrapperType:             WrapperType;
   }
   
   export enum ClosedCaptioning {
    None = "none",
   }
   
   export enum Name {
    SwitchedOnPop = "Switched on Pop",
   }
   
   export enum Country {
    Usa = "USA",
   }
   
   export enum EpisodeContentType {
    Audio = "audio",
   }
   
   export enum EpisodeFileExtension {
    Mp3 = "mp3",
   }
   
   export interface GenreClass {
    id:   string;
    name: PrimaryGenreNameEnum;
   }
   
   export enum PrimaryGenreNameEnum {
    MusicCommentary = "Music Commentary",
   }
   
   export enum Kind {
    Podcast = "podcast",
    PodcastEpisode = "podcast-episode",
   }
   
   export enum WrapperType {
    PodcastEpisode = "podcastEpisode",
    Track = "track",
   }
   
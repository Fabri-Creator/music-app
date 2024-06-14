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
    attributes: CategoryAttributes;
}

export interface CategoryAttributes {
    "im:id": string;
    label:   PurpleLabel;
    scheme:  string;
    term:    PurpleLabel;
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
    label: FluffyLabel;
    term:  FluffyLabel;
}

export enum FluffyLabel {
    Podcast = "Podcast",
}

export interface IMImage {
    attributes: IMImageAttributes;
    label:      string;
}

export interface IMImageAttributes {
    height: string;
}

export interface IMPrice {
    attributes: IMPriceAttributes;
    label:      IMPriceLabel;
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
    attributes: Icon;
    label:      Date;
}

export interface Link {
    attributes: LinkAttributes;
}

export interface LinkAttributes {
    href:  string;
    rel:   Rel;
    type?: Type;
}

export enum Rel {
    Alternate = "alternate",
    Self = "self",
}

export enum Type {
    TextHTML = "text/html",
}

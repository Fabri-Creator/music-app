import { RootObject } from "../../src/types";

const podcastRawData: RootObject = {
    feed: {
        author: {
            name: { label: "iTunes Store" },
            uri: { label: "http://www.apple.com/itunes/" },
        },
        entry: [
            {
                "im:name": { label: "The Joe Budden Podcast" },
                "im:image": [
                    {
                        label: "https://is1-ssl.mzstatic.com/image/thumb/Podcasts113/v4/f2/21/fa/f221fabd-017f-5125-633b-f1fe4f39802a/mza_182995249085044287.jpg/55x55bb.png",
                        attributes: { height: "55" },
                    },
                    {
                        label: "https://is1-ssl.mzstatic.com/image/thumb/Podcasts113/v4/f2/21/fa/f221fabd-017f-5125-633b-f1fe4f39802a/mza_182995249085044287.jpg/60x60bb.png",
                        attributes: { height: "60" },
                    },
                    {
                        label: "https://is1-ssl.mzstatic.com/image/thumb/Podcasts113/v4/f2/21/fa/f221fabd-017f-5125-633b-f1fe4f39802a/mza_182995249085044287.jpg/170x170bb.png",
                        attributes: { height: "170" },
                    },
                ],
                summary: {
                    label: "Tune into Joe Budden and his friends. Follow along the crazy adventures of these very random friends.",
                },
                "im:price": {
                    label: undefined,
                },
                "im:contentType": { attributes: { term: undefined, label: undefined } },
                rights: { label: "© All rights reserved" },
                title: { label: "The Joe Budden Podcast - The Joe Budden Network" },
                link: {
                    attributes: {
                        rel: undefined,
                        type: undefined,
                        href: "https://podcasts.apple.com/us/podcast/the-joe-budden-podcast/id1535809341?uo=2",
                    },
                },
                id: {
                    label: "https://podcasts.apple.com/us/podcast/the-joe-budden-podcast/id1535809341?uo=2",
                    attributes: { "im:id": "1535809341" },
                },
                "im:artist": {
                    label: "The Joe Budden Network",
                    attributes: {
                        href: "https://podcasts.apple.com/us/artist/the-joe-budden-network/1535844019?uo=2",
                    },
                },
                category: {
                    attributes: {
                        "im:id": "1310",
                        term: undefined,
                        scheme: "https://podcasts.apple.com/us/genre/podcasts-music/id1310?uo=2",
                        label: undefined,
                    },
                },
                "im:releaseDate": {
                    label: "2024-06-15T00:00:00-07:00",
                    attributes: { label: "June 15, 2024" },
                },
                value: undefined,
                timestamp: 0
            },
            {
                "im:name": { label: "A History of Rock Music in 500 Songs" },
                "im:image": [
                    {
                        label: "https://is1-ssl.mzstatic.com/image/thumb/Podcasts124/v4/88/18/59/881859a5-f344-c249-f4b9-3d9b62add05a/mza_16428964146354887078.png/55x55bb.png",
                        attributes: { height: "55" },
                    },
                    {
                        label: "https://is1-ssl.mzstatic.com/image/thumb/Podcasts124/v4/88/18/59/881859a5-f344-c249-f4b9-3d9b62add05a/mza_16428964146354887078.png/60x60bb.png",
                        attributes: { height: "60" },
                    },
                    {
                        label: "https://is1-ssl.mzstatic.com/image/thumb/Podcasts124/v4/88/18/59/881859a5-f344-c249-f4b9-3d9b62add05a/mza_16428964146354887078.png/170x170bb.png",
                        attributes: { height: "170" },
                    },
                ],
                summary: {
                    label: "Andrew Hickey presents a history of rock music from 1938 to 1999, looking at five hundred songs that shaped the genre.",
                },
                "im:price": {
                    label: undefined,
                },
                "im:contentType": undefined,
                rights: { label: "© 2021 A History of Rock Music in 500 Songs" },
                title: {
                    label: "A History of Rock Music in 500 Songs - Andrew Hickey",
                },
                link: { attributes: { href: "http://example.com/1" } },
                id: {
                    label: "https://podcasts.apple.com/us/podcast/a-history-of-rock-music-in-500-songs/id1437402802?uo=2",
                    attributes: { "im:id": "1437402802" },
                },
                "im:artist": { label: "Andrew Hickey" },
                category: { attributes: { label: undefined } },
                "im:releaseDate": {
                    label: "2024-05-24T13:58:00-07:00",
                    attributes: { label: "May 24, 2024" },
                },
                value: undefined,
                timestamp: 0
            },
        ],
        updated: { label: "2024-06-21T02:01:25-07:00" },
        rights: { label: "Copyright 2008 Apple Inc." },
        title: { label: "iTunes Store: Top Podcasts in Music" },
        icon: { label: "http://itunes.apple.com/favicon.ico" },
        link: [
            {
                attributes: {
                    rel: undefined,
                    type: undefined,
                    href: "https://podcasts.apple.com/WebObjects/MZStore.woa/wa/viewTop?cc=us&id=179537&popId=3",
                },
            },
            {
                attributes: {
                    rel: undefined,
                    href: "https://mzstoreservices-int.itunes.apple.com/us/rss/toppodcasts/limit=2/genre=1310/json",
                },
            },
        ],
        id: {
            label:
                "https://mzstoreservices-int.itunes.apple.com/us/rss/toppodcasts/limit=2/genre=1310/json",
        },
    },
};
export default podcastRawData;
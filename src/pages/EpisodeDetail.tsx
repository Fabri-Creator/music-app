import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import SideDetail from "../components/SideDetail";
import useEpisodesData from "../hooks/useEpisodesData";
import usePodcasterData from "../hooks/usePodcasterData";
import { Entry, Episode } from "../types";

function EpisodeDetail() {
    const { id, trackId } = useParams<{ id: string; trackId: string }>();
    const [episodesData] = useEpisodesData(id);
    const [podcastDetail, setPodcastDetail] = useState<Entry | null>(null);
    const [podcastData] = usePodcasterData();
    const [episode, setEpisode] = useState<Episode | null>(null);

    useEffect(() => {
        const filteredPodcast = podcastData?.feed.entry?.find(
            (podcast: Entry) => podcast.id.attributes["im:id"] === id
        );
        setPodcastDetail(filteredPodcast || null);
    }, [podcastData, id]);

    useEffect(() => {
        if (episodesData) {
            const filteredEpisode = episodesData.results
                .slice(1)
                .find((ep: Episode) => ep.trackId.toString() === trackId);
            setEpisode(filteredEpisode || null);
        }
    }, [episodesData, trackId]);

    if (!episode) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Header />
            <div className="flex my-4 mx-4 p-4 bg-white">
                <SideDetail podcastDetail={podcastDetail} />

                {episode && episode.episodeUrl && (
                    <div className="flex-1 ml-4 border border-gray-300 shadow rounded-lg">
                        <div className="px-6 py-4">
                            <h4 className="text-lg">{episode.trackName}</h4>
                        </div>
                        <div className="px-6 py-2">
                            <p className="text-sm text-gray-600 text-justify">
                                {episode.description}
                            </p>
                        </div>
                        <div className="w-4/5 flex justify-center items-center mx-auto bg-gray-100 my-4">
                            <audio controls>
                                <source src={episode.episodeUrl} type="audio/mpeg" />
                            </audio>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default EpisodeDetail;

import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import { Card, CardHeader, Image, Divider } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import usePodcast from '../hooks/usePodcast';
import useData from '../hooks/useData';
import { Entry } from '../types';

function EpisodeDetail() {
    const { id, trackId } = useParams<{ id: string, trackId: string }>();
    const [details] = usePodcast(id);
    const [podcastDetail, setPodcastDetail] = useState<Entry | null>(null);
    const [data] = useData();
    const [episode, setEpisode] = useState<any>(null);
    useEffect(() => {
        const filterPodcast = data?.feed.entry?.find((podcast: Entry) => podcast.id.attributes['im:id'] === id);
        setPodcastDetail(filterPodcast || null);
    }, [data, id]);

    useEffect(() => {
        if (details) {

            const filteredEpisode = details.results.slice(1).find((episode: any) => episode.trackId.toString() === trackId);
            setEpisode(filteredEpisode || null);
        }
    }, [details, trackId]);

    if (!episode) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Header />
            <div className="flex my-4 mx-4 p-4 bg-white">
                <Card className="w-1/5 p-4 bg-white shadow border border-gray-300 flex flex-col items-center cursor-pointer mr-10 max-h-[80vh] pb-4">
                    <Image
                        alt={podcastDetail?.['im:name'].label}
                        className="object-cover mb-4"
                        src={podcastDetail ? podcastDetail['im:image'][2].label : ''}
                        width={220}
                        height={220}
                    />
                    <Divider className="my-4" />
                    <CardHeader className="pb-0 pt-2 px-3 flex-col items-center">
                        <h4 className="font-bold text-md text-center">{podcastDetail?.['im:name'].label}</h4>
                        <h6 className="text-md text-center text-gray-400">{`by ${podcastDetail?.['im:artist'].label}`}</h6>
                        <Divider className="my-4" />
                        <p className="text-sm text-gray-500 px-2">{podcastDetail?.summary.label}</p>
                    </CardHeader>
                </Card>
                {episode && episode.episodeUrl && (
                    <div className="flex-1 ml-4 border border-gray-300 shadow rounded-lg">
                        <div className="px-6 py-4">
                            <h4 className="text-lg">{episode?.trackName}</h4>
                        </div>
                        <div className="px-6 py-2">
                            <p className="text-sm text-gray-600">{episode?.description}</p>
                        </div>
                        <audio controls className="w-4/5 mx-auto bg-gray-100 my-4">
                            <source src={episode?.episodeUrl} type="audio/mpeg" />
                            Your browser does not support the audio element.
                        </audio>
                    </div>
                )}
            </div>
        </div>
    );
}

export default EpisodeDetail;

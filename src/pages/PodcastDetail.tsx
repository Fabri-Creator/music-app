import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import SideDetail from '../components/SideDetail';
import useEpisodesData from '../hooks/useEpisodesData';
import usePodcasterData from '../hooks/usePodcasterData';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react';
import { Entry, Result } from '../types';
import formatDate from '../utils/formatDate';
import millisToMinutesAndSeconds from '../utils/millisToMinutesAndSeconds';

function PodcastDetail() {
    const { id } = useParams<{ id: string }>();
    const [episodesData, isLoading, hasError] = useEpisodesData(id);
    const [data] = usePodcasterData();

    const [podcastDetail, setPodcastDetail] = useState<Entry | null>(null);

    useEffect(() => {
        const filteredPodcast = data?.feed.entry?.find((podcast: Entry) => podcast.id.attributes['im:id'] === id);
        setPodcastDetail(filteredPodcast || null);
    }, [data, id]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (hasError || !episodesData) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-center">
                    <p>Error loading data. Press Podcaster logo</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Header />
            <div className="flex my-4 mx-4 p-4 bg-white">
                <SideDetail podcastDetail={podcastDetail} />

                <div className="flex-1">
                    <div className="p-4 bg-white shadow border border-gray-300 mb-4 rounded-lg">
                        <h4>{`Episodes: ${episodesData.resultCount - 1}`}</h4>
                    </div>

                    <Table aria-label="Episode List">
                        <TableHeader>
                            <TableColumn className="border-b border-gray-300">Title</TableColumn>
                            <TableColumn className="border-b border-gray-300 text-left">Date</TableColumn>
                            <TableColumn className="border-b border-gray-300 text-left">Duration</TableColumn>
                        </TableHeader>
                        <TableBody>
                            {episodesData.results.slice(1).map((episode: Result) => (
                                <TableRow key={episode.trackId}>
                                    <TableCell className="border-b border-gray-300">
                                        <Link to={`/episode/${id}/${episode.trackId}`}>
                                            {episode.trackName}
                                        </Link>
                                    </TableCell>
                                    <TableCell className="border-b border-gray-300 text-left">{formatDate(episode.releaseDate.toString())}</TableCell>
                                    <TableCell className="border-b border-gray-300 text-left">{millisToMinutesAndSeconds(Number(episode.trackTimeMillis))}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                </div>
            </div>
        </div>
    );
}

export default PodcastDetail;

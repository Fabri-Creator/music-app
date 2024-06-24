// src/components/CustomTable.tsx
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react';
import { Link } from 'react-router-dom';
import formatDate from '../utils/formatDate';
import millisToMinutesAndSeconds from '../utils/millisToMinutesAndSeconds';
import { Episode } from "../types";


interface TableProps {
    episodes: Episode[];
    podcastId: string | undefined;
}

const CustomTable: React.FC<TableProps> = ({ episodes, podcastId }) => {
    if (!episodes || !podcastId) {
        return <div>No podcast available</div>;
    }
    console.log("Episodes", episodes)
    return (
        <Table aria-label="Episode List">
            <TableHeader>
                <TableColumn className="border-b border-gray-300">Title</TableColumn>
                <TableColumn className="border-b border-gray-300 text-left">Date</TableColumn>
                <TableColumn className="border-b border-gray-300 text-left">Duration</TableColumn>
            </TableHeader>
            <TableBody>
                {episodes.map((episode) => (
                    <TableRow key={episode.trackId}>
                        <TableCell className="border-b border-gray-300">
                            <Link to={`/episode/${podcastId}/${episode.trackId}`}>
                                {episode.trackName}
                            </Link>
                        </TableCell>
                        <TableCell className="border-b border-gray-300 text-left">{formatDate(episode.releaseDate.toString())}</TableCell>
                        <TableCell className="border-b border-gray-300 text-left">{millisToMinutesAndSeconds(Number(episode.trackTimeMillis))}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default CustomTable;

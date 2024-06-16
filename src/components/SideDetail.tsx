import React from "react";
import { Link } from "react-router-dom";

import { Card, CardHeader, Image, Divider } from "@nextui-org/react";
import { Entry } from "../types";

interface PodcastCardProps {
    podcastDetail: Entry | null;
}

const PodcastCard: React.FC<PodcastCardProps> = ({ podcastDetail }) => {
    return (
        <Card className="w-1/5 p-4 bg-white shadow border border-gray-300 flex flex-col items-center cursor-pointer mr-10 pb-4 h-auto">
            <Link to={`/podcast/${podcastDetail?.id.attributes["im:id"]}`}>
                <Image
                    alt={podcastDetail?.["im:name"].label}
                    className="object-cover mb-4"
                    src={podcastDetail ? podcastDetail["im:image"][2].label : ""}
                    width={220}
                    height={220}
                />
            </Link>

            <Divider className="my-4" />
            <CardHeader className="pb-0 pt-2 px-3 flex-col items-center">
                <Link to={`/podcast/${podcastDetail?.id.attributes["im:id"]}`}>
                    <h4 className="font-bold text-md text-center">
                        {podcastDetail?.["im:name"].label}
                    </h4>
                </Link>
                <Link to={`/podcast/${podcastDetail?.id.attributes["im:id"]}`}>
                    <h6 className="text-md text-center text-gray-400">{`by ${podcastDetail?.["im:artist"].label}`}</h6>
                </Link>
                <Divider className="my-4" />
                <div className="relative w-full px-2">
                    <p className="text-justify text-sm text-gray-500">
                        {podcastDetail?.summary.label}
                    </p>
                </div>
            </CardHeader>
        </Card>
    );
};

export default PodcastCard;

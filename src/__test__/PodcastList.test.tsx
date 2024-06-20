/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import PodcastList from "../components/PodcastList";
import usePodcasterData from "../hooks/usePodcasterData";
import { RootObject } from "../types"; // Asegúrate de importar los tipos correctamente

const mockPodcastData: RootObject = {
    feed: {
        author: {
            name: { label: "Author Name" },
            uri: { label: "http://example.com" }
        },
        entry: [
            {
                title: { label: "Podcast One" },
                "im:artist": { label: "Artist One" },
                category: {
                    attributes: undefined
                },
                id: {
                    label:
                        "https://podcasts.apple.com/us/podcast/the-joe-budden-podcast/id1535809341?uo=2",
                    attributes: { "im:id": "1535809341" },
                },
                "im:contentType": {
                    attributes: { label: undefined }
                },
                "im:image": [
                    { label: "image1" },
                    { label: "image2", attributes: undefined }
                ],
                "im:name": { label: "Podcast One" },
                "im:price": { label: undefined },
                "im:releaseDate": { label: "2023-01-01" },
                link: {
                    attributes: {
                        href: "http://example.com/1",
                    }
                },
                rights: { label: "Rights One" },
                summary: { label: "Summary One" },
                value: {} as any, // Ajustado para cumplir con los tipos
                timestamp: Date.now()
            },
            {
                title: { label: "Podcast Two" },
                "im:artist": { label: "Artist Two" },
                category: { attributes: { label: undefined } },
                id: {
                    label:
                        "https://podcasts.apple.com/us/podcast/the-joe-budden-podcast/id1535809341?uo=2",
                    attributes: { "im:id": "5555" },
                },
                "im:contentType": { attributes: { label: undefined } },
                "im:image": [
                    { label: "image3", attributes: undefined },
                    { label: "image4", attributes: undefined }
                ],
                "im:name": { label: "Podcast Two" },
                "im:price": { label: undefined },
                "im:releaseDate": { label: "2023-02-01" },
                link: {
                    attributes: {
                        href: "http://example.com/2",
                    }
                },
                rights: { label: "Rights Two" },
                summary: { label: "Summary Two" },
                value: {} as any, // Ajustado para cumplir con los tipos
                timestamp: Date.now()
            }
        ],
        icon: { label: "icon" },
        id: { label: "id" },
        link: [{ attributes: { href: "http://example.com" } }],
        rights: { label: "rights" },
        title: { label: "title" },
        updated: { label: "updated" }
    }
};

describe("PodcastList", () => {
    // Mock the return value of usePodcasterData
    const usePodcasterDataSpy = vi.spyOn(usePodcasterData, 'usePodcasterData');

    usePodcasterDataSpy.mockReturnValue({
        podcastData: mockPodcastData,
        isLoading: false,
        hasError: false
    });

    it("renders the podcasts correctly", () => {
        render(<PodcastList />);

        expect(screen.getByText(/Podcast One/i)).toBeInTheDocument();
        expect(screen.getByText(/Artist One/i)).toBeInTheDocument();
        expect(screen.getByText(/Podcast Two/i)).toBeInTheDocument();
        expect(screen.getByText(/Artist Two/i)).toBeInTheDocument();
    });

    it("filters podcasts based on search text", () => {
        render(<PodcastList />);
        const searchInput = screen.getByPlaceholderText(/Search podcasts/i);

        // Initially both podcasts should be in the document
        expect(screen.getByText(/Podcast One/i)).toBeInTheDocument();
        expect(screen.getByText(/Podcast Two/i)).toBeInTheDocument();

        // Filter for "Podcast One"
        fireEvent.change(searchInput, { target: { value: "Podcast One" } });
        expect(screen.getByText(/Podcast One/i)).toBeInTheDocument();
        expect(screen.queryByText(/Podcast Two/i)).toBeNull(); // Podcast Two should not be in the document

        // Clear filter
        fireEvent.change(searchInput, { target: { value: "" } });
        expect(screen.getByText(/Podcast One/i)).toBeInTheDocument();
        expect(screen.getByText(/Podcast Two/i)).toBeInTheDocument();
    });

    it("shows loading indicator when data is being fetched", () => {
        usePodcasterDataSpy.mockReturnValueOnce({
            podcastData: null,
            isLoading: true,
            hasError: false
        });
        render(<PodcastList />);
        expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    });

    it("shows error message when there is an error fetching data", () => {
        usePodcasterDataSpy.mockReturnValueOnce({
            podcastData: null,
            isLoading: false,
            hasError: true
        });
        render(<PodcastList />);
        expect(screen.getByText(/Error loading data/i)).toBeInTheDocument();
    });
});

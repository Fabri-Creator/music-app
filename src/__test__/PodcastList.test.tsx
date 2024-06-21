/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeAll, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import PodcastList from "../components/PodcastList";
import mockPodcastData from "../__mocks__/mockPodcastData";

// Use vi.hoisted to create mock objects
const mocks = vi.hoisted(() => ({
    usePodcasterData: vi.fn(),
}));

beforeAll(() => {
    vi.doMock('../hooks/usePodcasterData', () => ({
        usePodcasterData: mocks.usePodcasterData,
    }));
});

describe("PodcastList", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("renders the podcasts correctly", async () => {
        mocks.usePodcasterData.mockReturnValue([mockPodcastData, false, false]);

        render(<PodcastList />);

        waitFor(() => expect(screen.getByText(/The Joe Budden Podcast - The Joe Budden Network/i)).toBeInTheDocument());
        waitFor(() => expect(screen.getByText(/A History of Rock Music in 500 Songs/i)).toBeInTheDocument());
    });

    it("filters podcasts based on search text", async () => {
        mocks.usePodcasterData.mockReturnValue([mockPodcastData, false, false]);
        render(<PodcastList />);

        waitFor(() => screen.getByText(/The Joe Budden Podcast - The Joe Budden Network/i));
        waitFor(() => screen.getByText(/A History of Rock Music in 500 Songs/i));
        waitFor(() => screen.getByPlaceholderText(/Search podcasts/i));

        waitFor(() => {
            const searchInput = screen.getByPlaceholderText(/Search podcasts/i);
            expect(searchInput).toBeInTheDocument();

            // Filter for "The Joe Budden"
            fireEvent.change(searchInput, { target: { value: "The Joe Budden" } });

            // Wait for filtered results
            expect(screen.getByText(/The Joe Budden Podcast - The Joe Budden Network/i)).toBeInTheDocument();
            expect(screen.queryByText(/A History of Rock Music in 500 Songs/i)).toBeNull();

            // Clear filter
            fireEvent.change(searchInput, { target: { value: "" } });

            // Wait for cleared results
            expect(screen.getByText(/The Joe Budden Podcast - The Joe Budden Network/i)).toBeInTheDocument();
            expect(screen.getByText(/A History of Rock Music in 500 Songs/i)).toBeInTheDocument();
        });
    });

    it("shows loading indicator when data is being fetched", async () => {
        mocks.usePodcasterData.mockReturnValue([undefined, true, false]);
        render(<PodcastList />);
        waitFor(() => expect(screen.getByText(/Loading.../i)).toBeInTheDocument());
    });

    it("shows error message when there is an error fetching data", async () => {
        mocks.usePodcasterData.mockReturnValue([null, false, true]);
        render(<PodcastList />);
        waitFor(() => expect(screen.getByText(/Error loading data/i)).toBeInTheDocument());
    });
});

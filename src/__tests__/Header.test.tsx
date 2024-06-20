import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../components/Header';
// import * as router from 'react-router-dom';
// import { mockLocation } from '../__mocks__/useLocationMock';

describe('Header', () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('renders the header with the title "Podcaster"', () => {
        render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        );

        expect(screen.getByText(/Podcaster/i)).toBeInTheDocument();
    });

    // it('conditionally renders the LoadingIndicator based on isLoading state', () => {
    //     // Mock useLocation to return a different location on each call to trigger useEffect
    //     const useLocationMock = vi.spyOn(router, 'useLocation');
    //     useLocationMock.mockReturnValue(mockLocation('/'));

    //     const { rerender } = render(
    //         <BrowserRouter>
    //             <Header />
    //         </BrowserRouter>
    //     );

    //     // Expect the LoadingIndicator to be rendered since useEffect triggers handleStart and handleComplete
    //     expect(screen.queryByTestId('loading-indicator')).toBeInTheDocument();

    //     // Simulate a change in location to test the rerender
    //     useLocationMock.mockReturnValue(mockLocation('/new-location'));

    //     rerender(
    //         <BrowserRouter>
    //             <Header />
    //         </BrowserRouter>
    //     );

    //     // Expect the LoadingIndicator to be rendered again
    //     expect(screen.queryByTestId('loading-indicator')).toBeInTheDocument();
    // });
});

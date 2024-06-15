import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainView from './pages/MainView'
import PodcastDetail from './pages/PodcastDetail'
import EpisodeDetail from './pages/EpisodeDetail'


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainView />} />
        <Route path="/podcast/:id" element={<PodcastDetail />} />
        <Route path="/episode/:id/:trackId" element={<EpisodeDetail />} />
      </Routes>
    </BrowserRouter>

  )
}

export default App

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainView from './pages/MainView'
import PodcastDetail from './pages/PodcastDetail'


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainView />} />
        <Route path="/detail/:id" element={<PodcastDetail />} />
      </Routes>
    </BrowserRouter>

  )
}

export default App

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {NextUIProvider} from '@nextui-org/react';
import { DataProvider } from './context/DataContext';
import MainView from './pages/MainView'
import PodcastDetail from './pages/PodcastDetail'


function App() {

  return (
    <BrowserRouter>
    <DataProvider>
    <Routes>
      <Route path="/" element={<MainView />} />
      <Route path="/detail" element={<PodcastDetail />} />
    </Routes>
    </DataProvider>
    </BrowserRouter>

  )
}

export default App

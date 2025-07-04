import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import CreateMovie from './pages/Create';
import NowPlaying from './pages/NowPlaying';
import TopRated from './pages/TopRated'; 
import Counter from './components/Counter';
import Heading from '@/components/UI/Typography/Heading.jsx';
import Paragraph from './components/UI/Typography/Paragraph';
import { Box, Heading as ChakraHeading } from '@chakra-ui/react';
import Popular from './pages/Popular';

function App() {
  return (
    <Box padding="6">
      <ChakraHeading size="xl" mb={4}/>
      
      <Heading level={1} />
      <Paragraph />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/movie/create' element={<CreateMovie />} />
        <Route path='/movie/now' element={<NowPlaying />} />
        <Route path='/movie/populars' element={<Popular />} />
        <Route path='/movie/top' element={<TopRated />} /> 
        <Route path='/counter' element={<Counter />} />
      </Routes>
    </Box>
  );
}

export default App;

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './components/home'
import Search from './components/search-result';
import Details from './components/details';

const App = () => {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/search' element={<Search />} />
        <Route path='/movies/:id' element={<Details />} />
      </Routes>
    </>
  )
}

export default App

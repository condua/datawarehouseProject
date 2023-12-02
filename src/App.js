import logo from './logo.svg';
import './App.css';
import Header from './component/Header'
import Footer from './component/Footer'
import Login from './component/Login'
import Register from './component/Register'
import Home from './pages/Home';
import About from './pages/About';
import Tracuu from './pages/Tracuu';
import Phodiem from './pages/Phodiem';
import News from './pages/News';
import NewsList from './pages/NewsList';
import NewsDetails from './pages/NewsDetails';
import MyComponent from './json/Mycomponent';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Profile from './pages/Profile';


function App() {
  return (
    <BrowserRouter>
      <Header/>
        <Routes>
          <Route path='home' element={<Home/>}></Route>
          <Route path='mycomponent' element={<MyComponent/>}></Route>
          <Route path='settings' element={<Profile/>}></Route>

          <Route path='login' element={<Login/>}></Route>
          <Route path='register' element={<Register/>}></Route>
          <Route path='*' element={<About/>}></Route>
          <Route path='tracuu' element={<Tracuu/>}></Route>
          <Route path='phodiem' element={<Phodiem/>}></Route>
          <Route path='news' element={<News/>}></Route>
          <Route path='newslist' element={<NewsList/>}></Route>
          <Route path='documents/:id' element={<NewsDetails/>}></Route>

        </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;

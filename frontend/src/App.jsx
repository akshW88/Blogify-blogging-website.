import Navbar from '../components/Navbar'
import Login from '../components/Login'
import Home from '../components/Home'
import SignUp from '../components/SignUp'
import Blog from '../components/Blog'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import AddBlog from '../components/AddBlog'

function App() {

  return (
    <>
   
    <BrowserRouter>
     <Navbar/>
    <Routes>
      <Route path='/user/login' element={<Login/>}/>
      <Route path='/user/signUp' element={<SignUp/>}/>
      <Route path='/' element={<Home/>}/>
      <Route path='/blog/add' element={<AddBlog/>}/>
      <Route path='/blog/:id' element={<Blog/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

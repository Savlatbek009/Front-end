import { useContext } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Layout from './layout/frontLayout'
import HomePage from './pages/HomePage'
import CategoryPage from './pages/CategoryPage'
import AboutPage from './pages/AboutPage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import { AuthContext } from './context/AuthContext'
import AccountPage from './pages/AccountPage'
import NotFoundPage from './pages/NotFoundPage'
import { ToastContainer } from 'react-toastify'
import MyBlogsPage from './pages/MyBlogsPage'
import BlogPage from './pages/BlogPage'
import PostsPage from './pages/PostsPage'
import { LazyLoadImage } from 'react-lazy-load-image-component'


function App() {
  const { isAuthenticated } = useContext(AuthContext)



  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path='category/:id' element={<CategoryPage />} />
            <Route path='posts' element={<PostsPage />} />
            <Route path='about' element={<AboutPage />} />
            <Route path='register' element={<RegisterPage />} />
            <Route path='blog/:id' element={<BlogPage />} />
            {isAuthenticated ?
              <Route path='login' element={<NotFoundPage />} />
              :
              <Route path='login' element={<LoginPage />} />}
            <Route path='*' element={<NotFoundPage />} />
            {isAuthenticated ?
              <>
                <Route path='account' element={<AccountPage />} />
                <Route path='my-posts' element={<MyBlogsPage />} />
                <Route path='login' element={<NotFoundPage />} />
              </>

              :
              <Route path='*' element={<NotFoundPage />} />

            }
          </Route>
        </Routes>
      </BrowserRouter>

      <button
        className="back-to-top"
        onClick={scrollToTop}
      >
        <LazyLoadImage effect='blur' src='https://cdn4.iconfinder.com/data/icons/arrow-part-1-64-px/64/Artboard_2-512.png' width={"30px"} height={'30px'} />
      </button>

      <ToastContainer />
    </>
  )
}

export default App
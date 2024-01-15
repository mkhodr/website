import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { ChakraProvider } from '@chakra-ui/react'

import { createBrowserRouter, Router, RouterProvider } from 'react-router-dom'
import Home from './routes/Home'
import Iss from './routes/Iss'
import Particles from './routes/Particles'
import ErrorPage from './routes/ErrorPage.jsx'


const router = createBrowserRouter([
  { path: '/', element: <App />,errorElement: <ErrorPage/>, children: [
    { path: '/iss', element: <Iss /> },
    { path: '/particles', element: <Particles /> },
    { path: '/', element: <Home /> },
  ] },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider>
  {/* <React.StrictMode> */}
    {/* disallows zooming in mobile version */}
    <meta name="viewport" content="width=device-width, user-scalable=no" />
    <RouterProvider router={router} />
  {/* </React.StrictMode> */}
  </ChakraProvider>
)

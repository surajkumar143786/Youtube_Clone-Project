import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Body from './components/Body.jsx'
import Help from './components/Help.jsx'
import SignIn from './components/SignIn.jsx'
import Offer from './components/Offer.jsx'
import Error from './components/Error.jsx'
import VideoPlayer from './components/VideoPlayer.jsx'
import ChannelPage from './components/ChannelPage.jsx'
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import CreateChannel from './components/CreateChannel.jsx'
import AddVideo from './components/AddVideo.jsx'


/*
 Router configuration
 App = layout
 children = pages rendered inside <Outlet />
*/

const appRouter = createBrowserRouter([
  { path : '/',
    element : <App/>,
    errorElement : <Error/>,
    children : [
      {
        path : "/",
        element : <Body/>
      },
      {
        path : "/offer",
        element : <Offer/>
      },
      {
        path : "/help",
        element : <Help/>
      },
      {
        path : "/signin",
        element : <SignIn/>
      },
      {
        path : "/watch/:id",
        element : <VideoPlayer/>
      },
      {
        path: '/channel',
        element: <ProtectedRoute>
          <ChannelPage />
        </ProtectedRoute>

      },
      {
        path : "/login",
        element : <Login/>
      },
      {
        path : '/register',
        element : <Register/>
      },
      {
        path : '/create-channel',
        element : <ProtectedRoute>
          <CreateChannel/>
        </ProtectedRoute>
      },
      {
        path: "/add-video",
        element: (
          <ProtectedRoute>
            <AddVideo />
          </ProtectedRoute>
        )
      }
      
    ]
    
  },
])



createRoot(document.getElementById('root')).render(
  <RouterProvider router={appRouter}/>
)

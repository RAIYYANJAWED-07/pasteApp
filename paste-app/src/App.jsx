import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './styles/App.css'
import NavBar from './components/layout/NavBar'
import Home from './components/paste/Home'
import Paste from './components/paste/Paste'
import ViewPaste from './components/paste/ViewPaste'

const router = createBrowserRouter(
  [
    {
      path: '/',
      element:
      <div>
        <NavBar />
        <Home />
      </div>
    },
    {
      path: '/pastes',
      element:
      <div>
        <NavBar />
        <Paste />
      </div>
    },
    {
      path: '/pastes/:id',
      element:
      <div>
        <NavBar />
        <ViewPaste />
      </div>
    }
  ]
)

function App() {

  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App

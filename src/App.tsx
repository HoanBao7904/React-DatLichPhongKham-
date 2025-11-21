import './App.css'
import useRouteElements from './UseRouterElement'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const RouteElements = useRouteElements()

  return (
    <div>
      {RouteElements}
      <ToastContainer />
    </div>
  )
}

export default App

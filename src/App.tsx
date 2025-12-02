import './App.css'
import ScrollToTop from './components/ScrollToTop/ScrollToTop'
import useRouteElements from './UseRouterElement'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const RouteElements = useRouteElements()

  return (
    <div>
      <ScrollToTop />
      {RouteElements}
      <ToastContainer />
    </div>
  )
}

export default App

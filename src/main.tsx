import ReactDOM from 'react-dom/client'
import App from '@/app/App'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter basename="/">
    <App />
  </BrowserRouter>,
)

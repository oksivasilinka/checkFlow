import './index.css'
import { createRoot } from 'react-dom/client'
import * as serviceWorker from './serviceWorker'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { App, store } from 'app'

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container)
root.render(
    <Provider store={store}>
        <BrowserRouter future={{ v7_startTransition: true }} basename={'/checkFlow'}>
            <App />
        </BrowserRouter>
    </Provider>,
)

serviceWorker.unregister()

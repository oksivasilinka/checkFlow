import { Provider } from 'react-redux'
import { ThemeProvider } from '@mui/material'
import { theme } from 'styles'
import { Decorator } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'
import { store } from 'app/model/store'

export const StyleDecorator: Decorator = (Story) => (
    <BrowserRouter future={{ v7_startTransition: true }} basename={'/'}>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <Story />
            </ThemeProvider>
        </Provider>
    </BrowserRouter>
)

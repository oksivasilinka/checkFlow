import { AppRootState } from 'app/store'

export const selectIsLoggedIn = (state: AppRootState) => state.auth.isLoggedIn
export const selectError = (state: AppRootState) => state.app.error

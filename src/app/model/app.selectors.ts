import { AppRootState } from 'app'

export const selectStatus = (state: AppRootState) => state.app.status
export const selectIsInitialized = (state: AppRootState) => state.app.isInitialized

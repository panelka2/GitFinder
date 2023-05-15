import { combineReducers, configureStore } from "@reduxjs/toolkit";
import gitReducer from './gitReducer/gitSlice'
import repoReducer from './repoReducer/repoSlice'

const rootReducer = combineReducers({
    gitReducer,
    repoReducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
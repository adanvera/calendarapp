import { configureStore } from "@reduxjs/toolkit"
import { authSlice } from "./auth"
import { calendarSlice } from "./calendar"
import { uiSlice } from "./ui/uiSlice"

export const store = configureStore({
    reducer: {
        ui: uiSlice.reducer,
        auth: authSlice.reducer,
        calendar: calendarSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
import {configureStore} from "@reduxjs/toolkit";
import websiteSettingsReducer from "./siteSettingsSlice";


export const store = configureStore({
	reducer:{
		websiteSettings: websiteSettingsReducer
	}
})

// Types (TypeScript only)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
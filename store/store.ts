import {configureStore} from "@reduxjs/toolkit";
import websiteSettingsReducer from "./siteSettingsSlice";
import cakeReducer from "./cakeSlice";


export const store = configureStore({
	reducer:{
		websiteSettings: websiteSettingsReducer,
		cakes: cakeReducer
	}
})

// Types (TypeScript only)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
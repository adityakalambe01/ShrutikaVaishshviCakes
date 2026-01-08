import { createSlice } from '@reduxjs/toolkit';

interface SiteSettings {
	logo?: string
	phone?: string
	email?: string
	address?: string
	hours?: string
	instagram?: string
	facebook?: string
	aboutText?: string
}

const initialState: SiteSettings = {
	logo: '',
	phone: '',
	email: '',
	address: '',
	hours: '',
	instagram: '',
	facebook: '',
	aboutText: '',
}



const siteSettingsSlice = createSlice({
	name: 'siteSettings',
	initialState,
	reducers: {
		updateSettings: (state, action) => {
			return { ...state, ...action.payload };
		},
		resetSettings: (state) => {
			return initialState;
		},

	},
});

export const { updateSettings, resetSettings } = siteSettingsSlice.actions;
export default siteSettingsSlice.reducer;
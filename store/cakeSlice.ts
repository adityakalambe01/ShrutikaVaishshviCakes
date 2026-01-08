import {createSlice} from '@reduxjs/toolkit';

interface ICake{
	_id: string,
	name: string,
	flavor: string,
	description: string,
	price: number,
	servings: number,
	imageUrl: string,
	category: "Premium" | "Custom" | "Classic",
	isAvailable: boolean,
	tags: string[],
}

const initialCakeState: ICake[] = [];

const cakeSlice = createSlice({
	name: 'cakes',
	initialState: initialCakeState,
	reducers: {
		addCake: (state, action) => {
			state.push(action.payload);
			return state;
		},
		addAndReplaceAllCakes: (state, action) => {
			state = action.payload;
			return state;
		},
		removeAllCakes: (state) => {
			return initialCakeState;
		}
	}
})

export const {addCake, addAndReplaceAllCakes, removeAllCakes} = cakeSlice.actions;
export default cakeSlice.reducer;
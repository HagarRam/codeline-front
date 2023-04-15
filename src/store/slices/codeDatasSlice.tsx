import { createSlice } from '@reduxjs/toolkit';
import { ObjectId } from 'mongoose';
export interface ICodeBlock {
	_id?: ObjectId;
	title?: string;
	code?: string;
	correctCode?: string;
	readOnly?: boolean;
}

const data = async () => {
	try {
		const response = await fetch(
			'https://codelineback.onrender.com/codeblock',
			{
				method: 'GET',
			}
		);
		const data = await response.json();
		return data;
	} catch (err) {}
};
const codeData: ICodeBlock[] = await data();
export const codeSlice = createSlice({
	name: 'codeData',
	initialState: {
		value: codeData,
		filteredValue: {},
	},
	reducers: {
		setAllData: (state) => {
			state.filteredValue = state.value;
		},
	},
});

export const { setAllData } = codeSlice.actions;

export default codeSlice.reducer;

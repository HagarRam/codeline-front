import { createSlice } from '@reduxjs/toolkit';
import { ObjectId } from 'mongoose';

export interface ICodeBlock {
	_id: ObjectId;
	title: string;
	code: string;
}
const data = async () => {
	try {
		const response = await fetch('http://localhost:7000/codeBlock', {
			method: 'GET',
		});
		const data = await response.json();
		return data;
	} catch (err) {}
};
const codeDatas: ICodeBlock[] = await data();
console.log(codeDatas);
export const CodeBlockSlice = createSlice({
	name: 'CodeData',
	initialState: {
		value: codeDatas,
		filteredValue: {},
	},
	reducers: {
		setAllData: (state) => {
			state.filteredValue = state.value;
		},
	},
});

export const { setAllData } = CodeBlockSlice.actions;

export default CodeBlockSlice.reducer;

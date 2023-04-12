import { configureStore } from '@reduxjs/toolkit';
import codesReducer, { ICodeBlock } from './slices/codeDatasSlice';
export interface RootState {
	codeBlocks: ICodeDataState;
}
export interface ICodeDataState {
	value: ICodeBlock[];
}
export default configureStore({
	reducer: { codeBlocks: codesReducer },
});

import { configureStore } from '@reduxjs/toolkit';
import codesReducer, { ICodeBlock } from './slices/codeDatasSlice';
export interface RootState {
	codes: ICodeDataState;
}
export interface ICodeDataState {
	value: ICodeBlock[];
}
export default configureStore({
	reducer: { codes: codesReducer },
});

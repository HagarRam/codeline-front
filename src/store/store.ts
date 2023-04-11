import { configureStore } from '@reduxjs/toolkit';
import { ICodeBlock } from './slices/CodeBlockSlice';
import CodeBlockReducer from './slices/CodeBlockSlice';
export interface RootState {
	codeBlock: ICodeBlockState;
}
export interface ICodeBlockState {
	value: ICodeBlock[];
}
export default configureStore({
	reducer: { CodeBlock: CodeBlockReducer },
});

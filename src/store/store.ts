import {createStore} from 'redux';
import Reducer from '../reducers/reduce';

export interface enthusiasm{
    languageName: string,
    enthusiasmLevel: number
}
export interface StoreState{
    enthusiasm:enthusiasm
}

export const initialState:StoreState = {
    enthusiasm: {
        languageName: 'TypeScript',
        enthusiasmLevel: 1
    }
};

let store = createStore(Reducer,initialState);
export default store;
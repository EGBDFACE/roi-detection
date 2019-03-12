import {createStore} from 'redux';
import Reducer from '../reducers/reduce';

export interface enthusiasm{
    languageName: string,
    enthusiasmLevel: number
}
export interface variable_status{
    name: string,
    state:boolean,
    display: boolean,
    category: string,
    display_hover: boolean
}
export interface shuju_vari{
    variables: variable_status[]
}
export interface StoreState{
    enthusiasm:enthusiasm,
    // variables:variables
    // variables: variable_status[]
    shuju_variables: shuju_vari
}
const initVariables = {
    state: true,
    display: false,
    display_hover: false
}
const initDimensions = {
    ...initVariables,
    category: 'dimensions'
}
const initMagnitude = {
    ...initVariables,
    category: 'magnitude'
}
export const initialState:StoreState = {
    enthusiasm: {
        languageName: 'TypeScript',
        enthusiasmLevel: 1
    },
    shuju_variables:{
        variables:
        [
            {name:'性别',...initDimensions},
            {name:'病史',...initDimensions},
            {name:'ID编号',...initDimensions},
            {name:'自检表征',...initDimensions},
            {name:'触检表征',...initDimensions},
            {name:'肿瘤性质',...initDimensions},
            {name:'是否转移',...initDimensions},
            {name:'初检分型',...initDimensions},
            {name:'化疗用药',...initDimensions},
            {name:'不良反应',...initDimensions},
            {name:'年龄',...initMagnitude},
            {name:'自检时间',...initMagnitude},
            {name:'肿瘤半径',...initMagnitude},
            {name:'肿瘤质地',...initMagnitude},
            {name:'肿瘤平滑度',...initMagnitude},
            {name:'肿瘤周长',...initMagnitude},
            {name:'肿瘤面积',...initMagnitude},
            {name:'肿瘤致密度',...initMagnitude},
            {name:'肿瘤凹陷度',...initMagnitude},
            {name:'凹陷点数',...initMagnitude},
            {name:'对称性',...initMagnitude},
            {name:'化疗时长',...initMagnitude},
            {name:'不良反应的出现时间',...initMagnitude}
        ]
    }
    
};

let store = createStore(Reducer,initialState);
export default store;
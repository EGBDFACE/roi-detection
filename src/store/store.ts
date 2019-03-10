import {createStore} from 'redux';
import Reducer from '../reducers/reduce';

export interface enthusiasm{
    languageName: string,
    enthusiasmLevel: number
}
export interface variable_status{
    state:boolean,
    display: boolean
}
export interface variables{
    gender:variable_status,
    medicalHistory:variable_status,
    tumourId:variable_status,
    selfInspectCharacter: variable_status,
    chujian_character: variable_status,
    tumour_property: variable_status,
    whetherTransfer: variable_status,
    initialType: variable_status,
    chemotherapy_medicine: variable_status,
    adverse_reaction: variable_status,
    age: variable_status,
    selfinspect_time: variable_status,
    tumour_radius: variable_status,
    tumour_texture: variable_status,
    tumour_evenness: variable_status,
    tumour_girth: variable_status,
    tumour_area: variable_status,
    tumour_density: variable_status,
    tumour_sunken: variable_status,
    sunkenpoint: variable_status,
    symmetry: variable_status,
    chemotherapy_duration: variable_status,
    epoch: variable_status
}
export interface StoreState{
    enthusiasm:enthusiasm,
    variables:variables
}
const initVariables = {
    state: true,
    display: false
}
export const initialState:StoreState = {
    enthusiasm: {
        languageName: 'TypeScript',
        enthusiasmLevel: 1
    },
    variables: {
        gender: initVariables,
        medicalHistory: initVariables,
        tumourId: initVariables,
        selfInspectCharacter: initVariables,
        chujian_character: initVariables,
        tumour_property: initVariables,
        whetherTransfer: initVariables,
        initialType:  initVariables,
        chemotherapy_medicine: initVariables,
        adverse_reaction: initVariables,
        age: initVariables,
        selfinspect_time: initVariables,
        tumour_radius: initVariables,
        tumour_texture: initVariables,
        tumour_evenness: initVariables,
        tumour_girth: initVariables,
        tumour_area: initVariables,
        tumour_density: initVariables,
        tumour_sunken: initVariables,
        sunkenpoint: initVariables,
        symmetry: initVariables,
        chemotherapy_duration: initVariables,
        epoch: initVariables
    }
};

let store = createStore(Reducer,initialState);
export default store;
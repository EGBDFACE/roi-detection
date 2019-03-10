interface IncrementEnthusiasm {
    type: string;
}
interface DecrementEnthusiasm {
    type: string;
}
interface Variable_State{
    type: string,
    name: string,
    category: string
}

const INCREMENT_ENTHUSIASM = 'INCREMENT_ENTHUSIASM';
const DECREMENT_ENTHUSIASM = 'DECREMENT_ENTHUSIASM';
const VARIABLE_STATE_CHANGE = 'VARIABLE_STATE_CHANGE';

export type VariableState = Variable_State;
export type EnthusiasmAction = IncrementEnthusiasm | DecrementEnthusiasm;
export function incrementEnthusiasm():IncrementEnthusiasm{
    return {
        type: INCREMENT_ENTHUSIASM
    }
}
export function decrementEnthusiasm():DecrementEnthusiasm{
    return {
        type: DECREMENT_ENTHUSIASM
    }
}
export function stateChange(name:string,category:string):Variable_State{
    return{
        type: VARIABLE_STATE_CHANGE,
        name,
        category
    }
}

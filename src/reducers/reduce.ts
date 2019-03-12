import { EnthusiasmAction,VariableState } from '../actions/action';
import { StoreState, enthusiasm,variable_status, shuju_vari } from '../store/store';

const Reducer = (state:StoreState,action:any) => {
    return{
        enthusiasm: enthusiasm(state.enthusiasm,action),
        shuju_variables: variables(state.shuju_variables,action)
    }
}
function enthusiasm (state:enthusiasm,action:EnthusiasmAction){
    switch(action.type){
        case 'INCREMENT_ENTHUSIASM':
            console.log('run increment');
            console.log(state.enthusiasmLevel);
            return {
                ...state,
                enthusiasmLevel:state.enthusiasmLevel+1
            };
        case 'DECREMENT_ENTHUSIASM':
            console.log('run decrement');
            return {
                ...state,
                enthusiasmLevel:state.enthusiasmLevel-1
            };
        default: return state;
    }
}
function variables(state:shuju_vari,action:VariableState):shuju_vari{
    switch(action.type){
        case 'VARIABLE_STATE_CHANGE':
            return{
                ...state,
                // variables: stateChange(state.variables,action.key)
                variables: state.variables.map((value,index)=>{
                    if(index == action.key){
                        return {
                            ...value,
                            // name: value.name,
                            state: !value.state,
                            display: !value.display,
                            // category: value.category,
                            // display_hover: value.display_hover
                        }
                    }else{return value}
                })
            }
        case 'VARIABLE_DISPLAY_MOUSE_HOVER':
            return{
                ...state,
                variables: state.variables.map((value,index)=>{
                    if(index == action.key){
                        return{
                            ...value,
                            display_hover: !value.display_hover
                        }
                    }else{return value}
                })
            }
        case 'VARIABLE_DISPLAY_DELETE':
            console.log(action.key);
            return{
                ...state,
                variables: state.variables.map((value,index)=>{
                    if(index == action.key){
                        return{
                            ...value,
                            display: !value.display,
                            state: !value.state,
                            display_hover: false
                        }
                    }else{return value}
                })
            }
        default: return state
    }
}
// function stateChange(state:variable_status[],index:number):variable_status[]{

//     for(let i = 0;i<state.length;i++){
//         if(i == index){
//             state[i].display = !state[i].display;
//             state[i].state = !state[i].state;
//         }
//     }
//     return state;
// }
export default Reducer;
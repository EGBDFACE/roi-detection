interface IncrementEnthusiasm {
    type: string;
}
interface DecrementEnthusiasm {
    type: string;
}
interface Variable_State{
    type: string,
    key: number
}
interface Chart_Display{
    type: string,
    key:number
}
interface ChartColorChange{
    type: string,
    color: string
}
interface ChartShapeChange{
    type: string,
    shape: string
}
interface ChartSizeChange{
    type: string,
    size: number
}
export interface VariablesTab{
    type: string,
    color?: string,
    shape?: string,
    size?: number
}
export interface TooltipInfoAdd{
    type: string,
    label: string,
    data: number,
    left: number,
    top: number,
    proportion?: string
}
export interface TooltipInfoClear{
    type: string
}

const INCREMENT_ENTHUSIASM = 'INCREMENT_ENTHUSIASM';
const DECREMENT_ENTHUSIASM = 'DECREMENT_ENTHUSIASM';
const VARIABLE_STATE_CHANGE = 'VARIABLE_STATE_CHANGE';
const VARIABLE_DISPLAY_MOUSE_HOVER = 'VARIABLE_DISPLAY_MOUSE_HOVER';
const VARIABLE_DISPLAY_DELETE = 'VARIABLE_DISPLAY_DELETE';
const CHART_DISPLAY = 'CHART_DISPLAY';
const CHART_COLOR_CHANGE = 'CHART_COLOR_CHANGE';
const CHART_SHAPE_CHANGE = 'CHART_SHAPE_CHANGE';
const CHART_SIZE_CHANGE = 'CHART_SIZE_CHANGE';
const TOOLTIP_INFO_ADD = 'TOOLTIP_INFO_ADD';
const TOOLTIP_INFO_CLEAR = 'TOOLTIP_INFO_CLEAR';
const PIE_TOOLTIP_INFO_ADD = 'PIE_TOOLTIP_INFO_ADD';

export type VariableState = Variable_State;
export type ChartDisplay = Chart_Display;
export type Shuju = Variable_State|Chart_Display;
export type EnthusiasmAction = IncrementEnthusiasm | DecrementEnthusiasm;

export function pieTooltipInfoAdd(label:string,data: number,left:number,top:number,proportion:string):TooltipInfoAdd{
    return {
        type: PIE_TOOLTIP_INFO_ADD,
        label,
        data,
        left,
        top,
        proportion
    }
}
export function tooltipInfoAdd(label:string,data:number,left:number,top:number):TooltipInfoAdd{
    return{
        type: TOOLTIP_INFO_ADD,
        label,
        data,
        left,
        top
    }
}
export function tooltipInfoClear():TooltipInfoClear{
    return{
        type: TOOLTIP_INFO_CLEAR
    }
}
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
export function stateChange(key:number):Variable_State{
    return{
        type: VARIABLE_STATE_CHANGE,
        key
    }
}
export function selectedVarialeHover(key:number):Variable_State{
    return{
        type: VARIABLE_DISPLAY_MOUSE_HOVER,
        key
    }
}
export function selectedVariableDelete(key:number):Variable_State{
    return{
        type: VARIABLE_DISPLAY_DELETE,
        key
    }
}
export function drawChart(key:number):Chart_Display{
    return{
        type: CHART_DISPLAY,
        key
    }
}
export function chart_color_change(color:string):ChartColorChange{
    return{
        type: CHART_COLOR_CHANGE,
        color
    }
}
export function chart_shape_change(shape:string):ChartShapeChange{
    return{
        type: CHART_SHAPE_CHANGE,
        shape
    }
}
export function chart_size_change(size:number):ChartSizeChange{
    // console.log(size);
    return{
        type: CHART_SIZE_CHANGE,
        size
    }
}

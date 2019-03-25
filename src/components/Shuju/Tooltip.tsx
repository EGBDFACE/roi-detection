import * as React from 'react';
import { tooltipInfo } from '../../store/store';
import store from '../../store/store';

interface Props{
    tooltip:tooltipInfo[]
}
interface States{}

export default class Tooltip extends React.Component<Props,States>{
    constructor(props:Props){
        super(props);
        this.renderUnit = this.renderUnit.bind(this);
    }
    renderUnit(value:tooltipInfo){
        return(
            <p><strong>{value.label}</strong><span>{value.data}</span></p>
        )
    }
    render(){
        // let tooltip:tooltipInfo[] = []
        // store.subscribe(()=>{
        //     console.log(store.getState());
        //     tooltip = store.getState().tooltip;
        // })
        const tooltip = this.props.tooltip;
        console.log(tooltip);
        console.log(tooltip.length);
        if(tooltip.length === 0){
            return null;
        }else if(tooltip.length === 1){
            let position = {
                left: tooltip[0].left,
                top: tooltip[0].top
            }
            return(
                <div className='tooltip' style={position}>
                    <p><strong>{tooltip[0].label}</strong><span>{tooltip[0].data}</span></p>
                    <p><strong>所占比例:</strong><span>{tooltip[0].proportion}</span></p>
                </div>
            )
        }else {
            let position = {
                left: tooltip[0].left,
                top: tooltip[0].top
            }
            return (
                <div className='tooltip' style={position}>
                    {tooltip.map((value)=>this.renderUnit(value))}
                </div>
            )
        }
    }
}
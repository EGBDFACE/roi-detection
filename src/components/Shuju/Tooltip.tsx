import * as React from 'react';
import { tooltipInfo, displayUnitInfo } from '../../store/store';
import store from '../../store/store';

interface Props{
    // tooltip:tooltipInfo[]
    tooltip: tooltipInfo
}
interface States{}

export default class Tooltip extends React.Component<Props,States>{
    constructor(props:Props){
        super(props);
        this.renderUnit = this.renderUnit.bind(this);
    }
    // renderUnit(value:tooltipInfo,index:number){
    renderUnit(value:displayUnitInfo,index:number){
        return(
            <p key={index}><strong>{value.label}</strong><span>{value.data}</span></p>
        )
    }
    render(){
        // let tooltip:tooltipInfo[] = []
        // store.subscribe(()=>{
        //     console.log(store.getState());
        //     tooltip = store.getState().tooltip;
        // })
        const tooltip = this.props.tooltip;
        // console.log(tooltip);
        // console.log(tooltip.length);
        // if(tooltip.length === 0){
        if(tooltip.unitInfo.length === 0){
            return null;
        // }else if(tooltip.length === 1){
        }else if(tooltip.unitInfo.length === 1){
            let position = {
                // left: tooltip[0].left,
                // top: tooltip[0].top
                left: tooltip.left,
                top: tooltip.top
            }
            console.log(tooltip.proportion)
            if(!tooltip.proportion){
                // console.log('chord');
                return(
                    <div className='tooltip' style={position}>
                        <p><strong>{tooltip.unitInfo[0].label}</strong><span>{tooltip.unitInfo[0].data}</span></p>
                    </div>
                )
            }else{
                // console.log('pie')
                return(
                    <div className='tooltip' style={position}>
                        {/* <p><strong>{tooltip[0].label}</strong><span>{tooltip[0].data}</span></p>
                        <p><strong>所占比例:</strong><span>{tooltip[0].proportion}</span></p> */}
                        <p><strong>{tooltip.unitInfo[0].label}</strong><span>{tooltip.unitInfo[0].data}</span></p>
                        <p><strong>所占比例:</strong><span>{tooltip.proportion}</span></p>
                    </div>
                )
            }
        }else {
            let position = {
                // left: tooltip[0].left,
                // top: tooltip[0].top
                left: tooltip.left,
                top: tooltip.top
            }
            return (
                <div className='tooltip' style={position}>
                    {/* {tooltip.map((value,index)=>this.renderUnit(value,index))} */}
                    {tooltip.unitInfo.map((value,index)=>this.renderUnit(value,index))}
                </div>
            )
        }
    }
}
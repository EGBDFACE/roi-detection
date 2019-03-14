import * as React from 'react';

interface Props{
    chartShowingType: string
}
interface States{}

export default class ChartTools extends React.Component<Props,States>{
    constructor(props:Props){
        super(props);
    }
    render(){
        const { chartShowingType } = this.props;
        if(chartShowingType.length === 0){
            return null;
        }else{
            return(
                <div>
                   <p>导出SVG</p>
                   <p>导出PNG</p>
                   <p>导出PDF</p>
                </div>
            )
        }
    }
}
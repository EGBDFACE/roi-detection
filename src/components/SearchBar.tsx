import * as React from 'react';
import '../index.scss';
// import * as PIXI from 'pixi.js';

interface Props{

}
interface States{

}

export default class SearchBar extends React.Component<Props,States>{
    constructor(props:Props){
        super(props)
    }
    // componentDidMount(){
    //     let app = new PIXI.Application({
    //         width: 35,
    //         height: 35,
    //         antialias: true,
    //         backgroundColor: 0xFFFFFF,
    //         resolution: 5
    //     });
    //     document.getElementById('iconSearch').appendChild(app.view);
    //     let iconSearch = new PIXI.Graphics();
    //     iconSearch.lineStyle(2,0xFF0000,1);
    //     iconSearch.beginFill(0xFFFFFF,1);
    //     iconSearch.drawCircle(20,20,5);
    //     iconSearch.endFill();
    //     app.stage.addChild(iconSearch);
    //     iconSearch.lineStyle(2,0xFF0000,1);
    //     iconSearch.moveTo(24,24);
    //     iconSearch.lineTo(30,30);
    //     app.stage.addChild(iconSearch);
    // }
    render(){
        return(
            <div className='searchBar'>
                {/* <i id='iconSearch'></i> */}
                <div className='iconSearch'></div>
                <input type='text' name='content' placeholder='快速搜索：查找患者/病历/医生'></input>
            </div>
        )
    }
}
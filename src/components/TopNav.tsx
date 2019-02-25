import * as React from 'react';
import '../index.scss';
import * as PIXI from 'pixi.js';
import SearchBar from './SearchBar';

interface Props{

}
interface States{

}

const emailPNG = require('../images/email.png');
const doctorPic = require('../images/doctorPic.jpg');
export default class TopNav extends React.Component<Props,States>{
    constructor(props:Props){
        super(props);
    }
    componentDidMount(){
        let appRing = new PIXI.Application({
            width: 20,
            height: 20,
            antialias: true,
            backgroundColor: 0xFFFFFF,
            resolution: 5
        });
        document.getElementById('inRing').appendChild(appRing.view);
        let innerCircle = new PIXI.Graphics();
        innerCircle.lineStyle(0);
        innerCircle.beginFill(0x009966, 1);
        innerCircle.drawCircle(10,10,3.8);
        innerCircle.endFill();
        appRing.stage.addChild(innerCircle);
        let appEmail = new PIXI.Application({
            width: 30,
            height: 20,
            antialias: true,
            backgroundColor: 0xFFFFFF,
            resolution: 5
        });
        document.getElementById('emailIcon').appendChild(appEmail.view);
        let emailIcon = PIXI.Sprite.from(emailPNG);
        emailIcon.x = 5;
        emailIcon.y = 2.5;
        emailIcon.width = 20;
        emailIcon.height = 15;
        appEmail.stage.addChild(emailIcon);
        let appDoc = new PIXI.Application({
            width: 70,
            height: 70,
            antialias: true,
            backgroundColor: 0xFFFFFF,
            resolution: 5
        });
        document.getElementById('doctorPic').appendChild(appDoc.view);
        let docPicSprite = PIXI.Sprite.from(doctorPic);
        docPicSprite.width = 80;
        docPicSprite.height = 90;
        docPicSprite.x = -12;
        appDoc.stage.addChild(docPicSprite);
    }
    render(){
        return(
            <div className='topNav'>
                <div className='iconLeft'>
                    <div className='outRing'>
                      <i id='inRing'></i>
                    </div>
                    <p className='title'>两颗桃</p>
                    <p className='version'>医生版</p>
                </div>
                <SearchBar/>
                <div className='iconRight'>
                    <i id='emailIcon'></i>
                    <i id='doctorPic'></i>
                </div>
            </div>
        )
    }
}
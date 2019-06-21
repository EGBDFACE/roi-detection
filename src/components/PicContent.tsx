import * as React from 'react';
import { CANCER_TYPE as cancerType, 
    PIC_SIZE as picSize ,
    ROI_MENU_MAX_LENGTH as menuMaxLength } from '../constant';
import { IPicInfo, IRoiInfo } from '../store';

interface IProps{
    roiStatusChange: (id: number, newStatus: string, index: number) => void,
    selectedRoiDisplayId: number,
    selectedSvsId: number,
    showAllRoisFlag: boolean,
    selectAllRoi: (flag: boolean) => void,
    selectRoi: (value: number) => void,
    showShortListFlag: boolean,
    pic: IPicInfo
}
interface IStates{
    hoveredRoiId: number,
    imgDragPrePos:{
        x: number,
        y: number
    },
    imgZoomScale: number,
    wantToChangeIndex: number
}

export default class PicContent extends React.Component<IProps, IStates>{
    constructor(props: IProps){
        super(props);
        this.state = {
            hoveredRoiId: 0,
            imgDragPrePos: {
                x: 0,
                y: 0
            },
            imgZoomScale: 1,
            wantToChangeIndex: -1
        }
        this.handleImgWheel = this.handleImgWheel.bind(this);
        this.handleImgMouseDown = this.handleImgMouseDown.bind(this);
        this.renderRoiMenu = this.renderRoiMenu.bind(this);
        this.renderRois = this.renderRois.bind(this);
        this.roiMouseEnter = this.roiMouseEnter.bind(this);
        this.roiMouseLeave = this.roiMouseLeave.bind(this);
        this.roiStatusChange = this.roiStatusChange.bind(this);
        this.notWantToChange = this.notWantToChange.bind(this);
        this.wantToChange = this.wantToChange.bind(this);
        this.showAllRoisFlagChange = this.showAllRoisFlagChange.bind(this);
        this.setRoiMenuItemIndex = this.setRoiMenuItemIndex.bind(this);
        this.renderRoiSwitchBarItem = this.renderRoiSwitchBarItem.bind(this);
    }
    public showAllRoisFlagChange = (flag: boolean) => (event: any) => {
        this.props.selectAllRoi(flag);
        if(flag){
            this.props.selectRoi(-1);
        }
    }
    public setRoiMenuItemIndex = (index: number) => (event:any) => {
        this.props.selectRoi(index);
    }
    public roiStatusChange = (id: number, newStatus: string, index: number) => (event: any) => {
        this.props.roiStatusChange(id, newStatus, index);
    }
    public notWantToChange(){
        this.setState({
            wantToChangeIndex: -1
        });
    }
    public wantToChange = (index: number) => (event:any) =>{
        this.setState({
            wantToChangeIndex: index
        });
    }
    public handleImgWheel(e:any){
        const eve = e||window.event;
        const { imgZoomScale } = this.state; 
        let scale = imgZoomScale + eve.deltaY * -0.01;
        // Restrict scale
        scale = Math.min(Math.max(.125, scale), 4);
        this.setState({
            imgZoomScale: scale,
        })
    }
    public handleImgMouseDown(e:any){
        e.preventDefault();
        const { imgDragPrePos } = this.state;
        const disx = e.pageX - imgDragPrePos.x || 0 ;
        const disy = e.pageY - imgDragPrePos.y || 0 ;
        let _this = this;
        document.onmouseup = function() {
                document.onmousemove = null;
                document.onmousedown = null;
            }
        document.onmousemove = function(ev: any){
            _this.setState({
                imgDragPrePos: {
                    x: ev.pageX - disx,
                    y: ev.pageY - disy
                }
            })
        }
    }
    public roiMouseEnter = (id: number) => (event: any) => {
        this.setState({
            hoveredRoiId: id
        });
    }
    public roiMouseLeave(){
        this.setState({
            hoveredRoiId: -1
        });
    }
    
    public renderRoiMenu(value: IRoiInfo, index: number){
        // const { selectedRoiId, wantToChangeIndex } = this.state;
        const { wantToChangeIndex, hoveredRoiId } = this.state;
        const { pic } = this.props;
        const roiWidth = ((value.x2-value.x1)/pic.picWidth) * picSize;
        const smallRoiMenuStyle = {
            // width: '25px',
            // height: '25px',
            // marginLeft: '5px',
            width: roiWidth/5 + 'px',
            height: roiWidth/5 + 'px',
            marginLeft: roiWidth/15 + 'px',
            // width: roiWidth/3 + 'px',
            // height: roiWidth/3 + 'px',
            // marginLeft: roiWidth/8 + 'px',
            backgroundSize: 'cover'
        }
        const smallRoiMenuAreaStyle = {
            right: roiWidth/20 + 'px',
            bottom: roiWidth/20 + 'px'
        };
        const wantToChangeStyle ={
            // width: '20px',
            // height: '20px',
            // marginLeft: '5px',
            width: roiWidth/7 + 'px',
            height: roiWidth/7 + 'px',
            marginLeft: roiWidth/15 + 'px',
            backgroundSize: 'cover'
        };
        if(value.status === 'unlabeled'){
            if(hoveredRoiId === value.roiId){
              return( 
                    <div className='main__content__roi__menu'
                        style={roiWidth < menuMaxLength ? smallRoiMenuAreaStyle : undefined} >
                        <i className='roi__menu_notSure'
                            style={ roiWidth < menuMaxLength ? smallRoiMenuStyle : undefined }
                            onClick={this.roiStatusChange(value.roiId,'notsure',index)} />
                        <i className='roi__menu_true' 
                            style={ roiWidth < menuMaxLength ? smallRoiMenuStyle : undefined}
                            onClick={this.roiStatusChange(value.roiId, 'true', index)} />
                        <i className='roi__menu_false' 
                            style={ roiWidth < menuMaxLength ? smallRoiMenuStyle : undefined}
                            onClick={this.roiStatusChange(value.roiId, 'false', index)} />
                    </div>
                )  
            }else{
                return null
            }
        }else if(value.status === 'true'){
            if(wantToChangeIndex === index){
                return(
                    <div className='main__content__roi__menu'
                        onMouseLeave={this.notWantToChange} 
                        style={roiWidth < menuMaxLength ? smallRoiMenuAreaStyle : undefined} 
                        >
                        <i className='roi__menu_notSure'
                            style={ roiWidth < menuMaxLength ? wantToChangeStyle : undefined}
                            onClick={this.roiStatusChange(value.roiId, 'notsure',index)} />
                        <i className='roi__menu_false'
                            style= { roiWidth < menuMaxLength ? wantToChangeStyle : undefined}
                            onClick={this.roiStatusChange(value.roiId, 'false', index)} />
                        <i className='roi__menu_true_hl' 
                            style={ roiWidth < menuMaxLength ? smallRoiMenuStyle : undefined}
                            onMouseEnter={this.wantToChange(index)} />
                    </div> 
                )
            }else{
                return(
                    <div className='main__content__roi__menu'
                        onMouseLeave={this.notWantToChange} 
                        style={roiWidth < menuMaxLength ? smallRoiMenuAreaStyle : undefined} 
                        >
                        <i className='roi__menu_true_hl'
                            style={ roiWidth < menuMaxLength ? smallRoiMenuStyle : undefined} 
                            onMouseEnter={this.wantToChange(index)} />
                    </div>
                )
            }
        }else if(value.status === 'false'){
            if(wantToChangeIndex === index){
                return(
                    <div className='main__content__roi__menu'
                        onMouseLeave={this.notWantToChange}
                        style={roiWidth < menuMaxLength ? smallRoiMenuAreaStyle : undefined} 
                        >
                        <i className='roi__menu_notSure'
                            style={ roiWidth < menuMaxLength ? wantToChangeStyle : undefined}
                            onClick = { this.roiStatusChange(value.roiId, 'notsure', index)} />
                        <i className='roi__menu_true'
                            style= { roiWidth < menuMaxLength ? wantToChangeStyle : undefined}
                            onClick={this.roiStatusChange(value.roiId, 'true', index)} />
                        <i className='roi__menu_false_hl' 
                            style={ roiWidth < menuMaxLength ? smallRoiMenuStyle : undefined}
                            onMouseEnter={this.wantToChange(index)} />
                    </div>
                )
            }else{
                return(
                    <div className='main__content__roi__menu'
                        onMouseLeave={this.notWantToChange}
                        style={roiWidth < menuMaxLength ? smallRoiMenuAreaStyle : undefined} 
                        >
                        <i className='roi__menu_false_hl' 
                            style={ roiWidth < menuMaxLength ? smallRoiMenuStyle : undefined}
                            onMouseEnter={this.wantToChange(index)} />
                    </div>
                )
            }
        }else if(value.status === 'notsure'){
            if(wantToChangeIndex === index){
                return(
                    <div className='main__content__roi__menu'
                        onMouseLeave={this.notWantToChange}
                        style={ roiWidth < menuMaxLength ? smallRoiMenuAreaStyle: undefined}
                        >
                        <i className='roi__menu_true'
                            style={ roiWidth < menuMaxLength ? wantToChangeStyle : undefined}
                            onClick={ this.roiStatusChange(value.roiId, 'true', index)} />
                        <i className='roi__menu_false'
                            style={ roiWidth < menuMaxLength ? wantToChangeStyle : undefined}
                            onClick={ this.roiStatusChange(value.roiId, 'false', index)} />
                        <i className='roi__menu_notSure_hl'
                            style={ roiWidth < menuMaxLength ? smallRoiMenuStyle : undefined}
                            onMouseEnter={this.wantToChange(index)} />
                    </div>
                )
            }else{
                return(
                    <div className='main__content__roi__menu'
                        onMouseLeave={this.notWantToChange}
                        style={roiWidth < menuMaxLength ? smallRoiMenuAreaStyle : undefined}
                        >
                        <i className='roi__menu_notSure_hl'
                            style={ roiWidth < menuMaxLength ? smallRoiMenuStyle : undefined}
                            onMouseEnter={this.wantToChange(index)} />
                    </div>
                )
            }
        }else{
            return null
        }
    }
    public renderRois(value: IRoiInfo,index:number){
        const { pic, showAllRoisFlag, selectedRoiDisplayId } = this.props;
        const roiPosX = (value.x1/pic.picWidth)*100;
        const roiPosY = (value.y1/pic.picWidth)*100;
        const roiWidth = ((value.x2-value.x1)/pic.picWidth) * 100;
        const roiHeight = ((value.y2-value.y1)/pic.picHeight) *100;
        let roiPosStyle = undefined,
            commonRoiTitleStyle = undefined;
        roiPosStyle = {
            left: roiPosX + '%',
            height: roiHeight + '%',
            top: roiPosY + '%',
            width: roiWidth + '%'
        };
        if((roiWidth*picSize/100) < 86){
            commonRoiTitleStyle = {
                width: '100%'
            };
        }
        const falseBorderStyle = {
            ...roiPosStyle,
            borderColor: '#FFE14F' 
        };
        const falseTitleStyle = {
            ...commonRoiTitleStyle,
            backgroundColor: '#FFE14F'
        };
        const tureBorderStyle = {
            ...roiPosStyle,
            borderColor: '#79FF6F'
        };
        const trueTitleStyle = {
            ...commonRoiTitleStyle,
            backgroundColor: '#79FF6F'
        };
        const notSureBorderStyle = {
            ...roiPosStyle,
            borderColor: '#FFC997'
        };
        const notSureTitleStyle = {
            ...commonRoiTitleStyle,
            backgroundColor: '#FFC997'
        };
        let roiTitleStyle, roiBorderStyle;
        switch(value.status){
            case 'true':
                roiTitleStyle = trueTitleStyle;
                roiBorderStyle = tureBorderStyle;
                break;
            case 'false':
                roiTitleStyle = falseTitleStyle;
                roiBorderStyle = falseBorderStyle;
                break;
            case 'unlabeled':
                roiTitleStyle = commonRoiTitleStyle;
                roiBorderStyle = roiPosStyle;
                break;
            case 'notsure':
                roiBorderStyle = notSureBorderStyle;
                roiTitleStyle = notSureTitleStyle;
                break;
        }
        if((roiPosY*picSize/100) < 23){
            roiTitleStyle = {
                ...roiTitleStyle,
                top: '0px'
            }
        }
        if((showAllRoisFlag) || (selectedRoiDisplayId === value.roiId)){
            return (
                <div className='main__content__roi' 
                    key={index} 
                    onMouseEnter={this.roiMouseEnter(value.roiId)}
                    onMouseLeave={this.roiMouseLeave}
                    style={roiBorderStyle}
                    >
                    <div className='main__content__roi__title'
                        style={ roiTitleStyle } >
                        <span className='main__content__roi__title__type'
                            >{cancerType[value.type]}</span>
                        <span className='main__content__roi__title__score'
                            >{value.score.toFixed(2)}</span>
                    </div> 
                    {this.renderRoiMenu(value, index)}
                </div>
            )
        }else{
            return null
        }
    }
    public renderRoiSwitchBarItem(value: IRoiInfo, index: number){
        // const { roiMenuItemIndex } = this.state;
        const {  selectedRoiDisplayId ,showAllRoisFlag } = this.props;
        const greenStyle = { backgroundColor: '#79FF6F'};
        const yellowStyle = { backgroundColor: '#FFE14F'};
        const grayStyle = { backgroundColor: '#BBBBBB'};
        const notSureStyle = { backgroundColor : '#FFC997'};
        const selectedStyle = { backgroundColor: 'white'};
        let valueStyle: any;
        switch(value.status){
            case 'true':
                valueStyle = greenStyle;
                break;
            case 'false':
                valueStyle = yellowStyle;
                break;
            case 'unlabeled':
                valueStyle = grayStyle;
                break;
            case 'notsure':
                valueStyle = notSureStyle;
                break;
        }
        if(showAllRoisFlag){
            return(
                <div style={ valueStyle }
                    className='roi__switch_item'
                    key={index} 
                    >{index + 1}</div>
            )
        }else{
            const newSelectedStyle ={
                ...selectedStyle,
                cursor: 'pointer'
            };
            const newValueStyle ={
                ...valueStyle,
                cursor: 'pointer'
            };
            // if(roiMenuItemIndex === index){
            if(selectedRoiDisplayId === value.roiId){
                return(
                    <div style={ newSelectedStyle }
                        className='roi__switch_item'
                        key={index}
                        > {index + 1} </div>
                )
            }else{
                return(
                    <div style={ newValueStyle } 
                        className='roi__switch_item'
                        onClick={this.setRoiMenuItemIndex(value.roiId)} 
                        key={index}
                        > {index + 1} </div> 
                )
            }
        }
    }
    public render(){
        const { selectedSvsId, showAllRoisFlag, showShortListFlag, pic } = this.props;
        const { imgDragPrePos, imgZoomScale } = this.state;
        // let shortListContentStyle:any = {
        //     left: '8%',
        //     width: '92%'
        // };
        // let displayStyle = undefined;
        // if(selectedSvsId !== pic.svsId){
        //     shortListContentStyle = {
        //         ...shortListContentStyle,
        //         display: 'none'
        //     }
        //     displayStyle = {
        //         display: 'none'
        //     }
        // }
        let picStyle = undefined;
        if(showShortListFlag){
            picStyle = {
                left: '8%',
                width: '92%'
            }
        }
        if(selectedSvsId !== pic.svsId){
            picStyle = {
                ...picStyle,
                display: 'none'
            }
        }
        return(
            <div className='main__content'
                style={picStyle}
            >
                <div className='main__content__pic__area'>
                    <div id='svs_img'
                        style={{
                            left: imgDragPrePos.x,
                            top: imgDragPrePos.y,
                            transform: `scale(${imgZoomScale})`,
                            position: 'relative'
                        }}
                        onWheel={this.handleImgWheel}
                        onMouseDown={this.handleImgMouseDown}
                    >
                        <img id='svs-pic'
                            src={pic.picUrl}
                            className='main__content__pic'
                        />
                        {pic.roi.map((value, index)=>this.renderRois(value, index))}
                    </div>
                </div>
                <div className='main__content__roi__switch'>
                    <div className='roi__switch_area'>
                        {pic.roi.map((value, index)=>this.renderRoiSwitchBarItem(value, index))}
                    </div>
                    {  showAllRoisFlag && <i className='roi__switch_all_enable'
                            onClick={this.showAllRoisFlagChange(false)} /> }
                    { !showAllRoisFlag && <i className='roi__switch_all_disable'
                        onClick={this.showAllRoisFlagChange(true)} /> }
                </div>
            </div>
        )
    }
}
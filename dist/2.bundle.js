(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[2],{

/***/ "./src/containers/Main.ts":
/*!********************************!*\
  !*** ./src/containers/Main.ts ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../actions */ "./src/actions/index.ts");
/* harmony import */ var _pages_MainPage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../pages/MainPage */ "./src/pages/MainPage.tsx");



function mapStateToProps(state) {
    return {
        fileList: state.fileList,
        pic: state.pic,
        selectedRoiId: state.select.selectedRoiId,
        selectedSvsId: state.select.selectedSvsId,
        // statistics: state.summaryStatistics,
        statistics: state.summary.statistics,
        userName: state.user.name
    };
}
function mapDispatchToProps(dispatch) {
    return {
        selectRoi: function (id) { return dispatch(_actions__WEBPACK_IMPORTED_MODULE_1__["selectRoi"](id)); },
        selectSvs: function (id) { return dispatch(_actions__WEBPACK_IMPORTED_MODULE_1__["selectSvs"](id)); },
        setFileList: function (list) { return dispatch(_actions__WEBPACK_IMPORTED_MODULE_1__["setFileList"](list)); },
        setPic: function (pic) { return dispatch(_actions__WEBPACK_IMPORTED_MODULE_1__["setPic"](pic)); },
        setStatistics: function (data) { return dispatch(_actions__WEBPACK_IMPORTED_MODULE_1__["setStatistics"](data)); },
        setSummary: function (data) { return dispatch(_actions__WEBPACK_IMPORTED_MODULE_1__["setSummary"](data)); },
        userSignOut: function () { return dispatch(_actions__WEBPACK_IMPORTED_MODULE_1__["userSignOut"]()); }
    };
}
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_0__["connect"])(mapStateToProps, mapDispatchToProps)(_pages_MainPage__WEBPACK_IMPORTED_MODULE_2__["default"]));


/***/ }),

/***/ "./src/pages/MainPage.tsx":
/*!********************************!*\
  !*** ./src/pages/MainPage.tsx ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../api */ "./src/api/index.ts");
/* harmony import */ var _constant__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../constant */ "./src/constant/index.ts");
/* harmony import */ var _css_global_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../css/global.scss */ "./src/css/global.scss");
/* harmony import */ var _css_global_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_css_global_scss__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _css_mainPage_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../css/mainPage.scss */ "./src/css/mainPage.scss");
/* harmony import */ var _css_mainPage_scss__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_css_mainPage_scss__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _router_history__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../router/history */ "./src/router/history.ts");
/* harmony import */ var _utils_resolveSummary__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/resolveSummary */ "./src/utils/resolveSummary.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};


// import { CANCER_TYPE as cancerType, PIC_SIZE as picSize, ROI_SCORE_THRESHOLD as threshold } from '../constant';




// import draw  from '../utils/drawPic';

var MainPage = /** @class */ (function (_super) {
    __extends(MainPage, _super);
    function MainPage(props) {
        var _this = _super.call(this, props) || this;
        _this.setRoiMenuItemIndex = function (index) { return function (event) {
            _this.setState({
                roiMenuItemIndex: index
            });
        }; };
        _this.wantToChange = function (index) { return function (event) {
            _this.setState({
                wantToChangeIndex: index
            });
        }; };
        _this.roiStatusChange = function (id, newStatus, index) { return function (event) {
            var _a = _this.props, fileList = _a.fileList, pic = _a.pic, setFileList = _a.setFileList, setPic = _a.setPic;
            var newRoiStatus = {
                roi_id: id,
                status: newStatus,
                svs_id: pic.svsId
            };
            var newFileList = JSON.parse(JSON.stringify(fileList));
            for (var i = 0; i < fileList.length; i++) {
                if (newFileList[i].svsId === pic.svsId) {
                    if (pic.roi[index].status === 'unlabeled') {
                        newFileList[i].labeledCount = newFileList[i].labeledCount + 1;
                        break;
                    }
                }
            }
            setFileList(newFileList);
            Object(_api__WEBPACK_IMPORTED_MODULE_1__["setRoiStatus"])(newRoiStatus).then(function (res) {
                // tslint:disable-next-line:no-console
                // console.log(res);
                Object(_api__WEBPACK_IMPORTED_MODULE_1__["getSummaryHttp"])().then(function (resSum) {
                    // tslint:disable-next-line:no-console
                    // console.log(res);
                    var summaryData = Object(_utils_resolveSummary__WEBPACK_IMPORTED_MODULE_6__["default"])(resSum.data.response);
                    _this.props.setSummary(summaryData.total);
                    _this.props.setStatistics(summaryData.statistics);
                }).catch(function (error) {
                    // console.error(error);
                });
            }).catch(function (error) {
                // console.error(error);
            });
            var newPic = JSON.parse(JSON.stringify(pic));
            newPic.roi[index].status = newStatus;
            setPic(newPic);
        }; };
        _this.roiMouseEnter = function (id) { return function (event) {
            _this.setState({
                selectedRoiId: id
            });
        }; };
        _this.switchPic = function (index) { return function (event) {
            var fileList = _this.props.fileList;
            var svsId = fileList[index].svsId;
            _this.setState({
                selectedPicItem: index
            });
            _this.getPic(svsId);
        }; };
        _this.state = {
            roiMenuItemIndex: -1,
            selectedPicItem: 0,
            selectedRoiId: -1,
            // selectedRoiItem: -1,
            showAllRoisFlag: true,
            showLogOutFlag: false,
            showShortListFlag: false,
            wantToChangeIndex: -1
        };
        _this.showShortList = _this.showShortList.bind(_this);
        _this.switchPic = _this.switchPic.bind(_this);
        _this.next = _this.next.bind(_this);
        _this.previous = _this.previous.bind(_this);
        // this.selectRoiFn = this.selectRoiFn.bind(this);
        _this.dataSumary = _this.dataSumary.bind(_this);
        _this.roiMouseEnter = _this.roiMouseEnter.bind(_this);
        _this.roiMouseLeave = _this.roiMouseLeave.bind(_this);
        _this.roiStatusChange = _this.roiStatusChange.bind(_this);
        _this.wantToChange = _this.wantToChange.bind(_this);
        _this.notWantToChange = _this.notWantToChange.bind(_this);
        _this.showLogOutEnable = _this.showLogOutEnable.bind(_this);
        _this.showLogOutDisable = _this.showLogOutDisable.bind(_this);
        _this.logout = _this.logout.bind(_this);
        _this.showAllRoisFlagChange = _this.showAllRoisFlagChange.bind(_this);
        _this.setRoiMenuItemIndex = _this.setRoiMenuItemIndex.bind(_this);
        return _this;
        // this.hoverEnterRoi = this.hoverEnterRoi.bind(this);
        // this.hoverLeaveRoi = this.hoverLeaveRoi.bind(this);
    }
    MainPage.prototype.showAllRoisFlagChange = function () {
        this.setState({
            showAllRoisFlag: !this.state.showAllRoisFlag
        });
    };
    MainPage.prototype.logout = function () {
        var userSignOut = this.props.userSignOut;
        userSignOut();
        // history.push('/');
        _router_history__WEBPACK_IMPORTED_MODULE_5__["default"].push('/roi');
    };
    MainPage.prototype.showLogOutEnable = function () {
        this.setState({
            showLogOutFlag: true
        });
    };
    MainPage.prototype.showLogOutDisable = function () {
        this.setState({
            showLogOutFlag: false
        });
    };
    MainPage.prototype.notWantToChange = function () {
        this.setState({
            wantToChangeIndex: -1
        });
    };
    MainPage.prototype.roiMouseLeave = function () {
        this.setState({
            selectedRoiId: -1
        });
    };
    // public selectRoiClick = (id: number) => (event: any) =>{
    //     this.props.sele
    // }
    // public componentDidMount(){
    //     draw(this.props.pic.picUrl);
    // }
    // public hoverEnterRoi = (id: number) => (event: any) => {
    //     this.props.selectRoi(id);
    //     // this.setState({
    //     //     selectedRoiItem: index
    //     // });
    // }
    // public hoverLeaveRoi(){
    //     this.props.selectRoi(-1);
    //     // this.setState({
    //     //     selectedRoiItem: -1
    //     // });
    // }
    // public selectRoiFn = (id: number) => (event:any) => {
    //     this.props.selectRoi(id);
    // }
    MainPage.prototype.next = function () {
        var selectedPicItem = this.state.selectedPicItem;
        var fileList = this.props.fileList;
        if (selectedPicItem === fileList.length - 1) {
            this.setState({
                selectedPicItem: 0
            });
            this.getPic(fileList[0].svsId);
        }
        else {
            this.getPic(fileList[this.state.selectedPicItem + 1].svsId);
            this.setState({
                selectedPicItem: this.state.selectedPicItem + 1
            });
        }
    };
    MainPage.prototype.previous = function () {
        var selectedPicItem = this.state.selectedPicItem;
        var fileList = this.props.fileList;
        // const { fileList } = this.props;
        if (selectedPicItem === 0) {
            this.setState({
                selectedPicItem: fileList.length - 1
            });
            var svsId = fileList[fileList.length - 1].svsId;
            this.getPic(svsId);
        }
        else {
            this.getPic(fileList[this.state.selectedPicItem - 1].svsId);
            this.setState({
                selectedPicItem: this.state.selectedPicItem - 1
            });
        }
    };
    MainPage.prototype.getPic = function (svsIdNumber) {
        var _a = this.props, selectSvs = _a.selectSvs, setPic = _a.setPic;
        selectSvs(svsIdNumber);
        Object(_api__WEBPACK_IMPORTED_MODULE_1__["getPicHttp"])(svsIdNumber).then(function (res) {
            var roiD = [];
            var j;
            for (j = 0; j < res.data.response.rois_data.length; j++) {
                var v = res.data.response.rois_data[j];
                roiD[j] = {
                    roiId: v.roi_id,
                    roiUrl: v.roi_url,
                    score: v.score,
                    status: v.status,
                    type: v.cancer_type,
                    userName: v.user_name,
                    x1: v.x1,
                    x2: v.x2,
                    y1: v.y1,
                    y2: v.y2
                };
            }
            var pic = {
                picHeight: res.data.response.height,
                picUrl: res.data.response.svs_url,
                picWidth: res.data.response.width,
                roi: roiD,
                svsId: svsIdNumber
            };
            setPic(pic);
        }).catch(function (error) {
            // console.error(error);
        });
    };
    MainPage.prototype.dataSumary = function () {
        var _this = this;
        if (this.props.statistics.length === 0) {
            Object(_api__WEBPACK_IMPORTED_MODULE_1__["getSummaryHttp"])().then(function (res) {
                // tslint:disable-next-line:no-console
                // console.log(res);
                var summaryData = Object(_utils_resolveSummary__WEBPACK_IMPORTED_MODULE_6__["default"])(res.data.response);
                _this.props.setSummary(summaryData.total);
                _this.props.setStatistics(summaryData.statistics);
            }).catch(function (error) {
                // console.error(error);
            });
        }
        // history.push('/dataSummary');
        _router_history__WEBPACK_IMPORTED_MODULE_5__["default"].push('/roi/dataSummary');
    };
    MainPage.prototype.showShortList = function () {
        this.setState({
            showShortListFlag: !this.state.showShortListFlag
        });
    };
    MainPage.prototype.renderRoiMenu = function (value, index) {
        var _a = this.state, selectedRoiId = _a.selectedRoiId, wantToChangeIndex = _a.wantToChangeIndex;
        // if(selectedRoiId === value.roiId){
        //     if(value.status === 'unlabeled'){
        //         return(
        //             <div className='main__content__roi__menu'>
        //                 <i className='roi__menu_true' />
        //                 <i className='roi__menu_false' />
        //             </div>
        //         )
        //     }else if(value.status === 'true'){
        //     }else if(value.status === 'false'){
        //     }
        //     return(
        //         <div className='main__content__roi__menu'>
        //         </div>
        //     )
        // }else {
        //     return null
        // }
        if (value.status === 'unlabeled') {
            if (selectedRoiId === value.roiId) {
                return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: 'main__content__roi__menu' },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("i", { className: 'roi__menu_true', onClick: this.roiStatusChange(value.roiId, 'true', index) }),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("i", { className: 'roi__menu_false', onClick: this.roiStatusChange(value.roiId, 'false', index) })));
            }
            else {
                return null;
            }
        }
        else if (value.status === 'true') {
            if (wantToChangeIndex === index) {
                return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: 'main__content__roi__menu', onMouseLeave: this.notWantToChange },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("i", { className: 'roi__menu_false', onClick: this.roiStatusChange(value.roiId, 'false', index) }),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("i", { className: 'roi__menu_true_hl', onMouseEnter: this.wantToChange(index) })));
            }
            else {
                return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: 'main__content__roi__menu', onMouseLeave: this.notWantToChange },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("i", { className: 'roi__menu_true_hl', onMouseEnter: this.wantToChange(index) })));
            }
        }
        else if (value.status === 'false') {
            if (wantToChangeIndex === index) {
                return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: 'main__content__roi__menu', onMouseLeave: this.notWantToChange },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("i", { className: 'roi__menu_true', onClick: this.roiStatusChange(value.roiId, 'true', index) }),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("i", { className: 'roi__menu_false_hl', onMouseEnter: this.wantToChange(index) })));
            }
            else {
                return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: 'main__content__roi__menu', onMouseLeave: this.notWantToChange },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("i", { className: 'roi__menu_false_hl', onMouseEnter: this.wantToChange(index) })));
            }
        }
        else {
            return null;
        }
    };
    MainPage.prototype.renderRois = function (value, index) {
        var pic = this.props.pic;
        // const { selectedRoiId } = this.state;
        var _a = this.state, showAllRoisFlag = _a.showAllRoisFlag, roiMenuItemIndex = _a.roiMenuItemIndex;
        var roiPosX = (value.x1 / pic.picWidth) * _constant__WEBPACK_IMPORTED_MODULE_2__["PIC_SIZE"] + 'px';
        var roiPosY = (value.y1 / pic.picHeight) * _constant__WEBPACK_IMPORTED_MODULE_2__["PIC_SIZE"] + 'px';
        var roiPosStyle = {
            height: ((value.y2 - value.y1) / pic.picHeight) * _constant__WEBPACK_IMPORTED_MODULE_2__["PIC_SIZE"] + 'px',
            left: roiPosX,
            top: roiPosY,
            width: ((value.x2 - value.x1) / pic.picWidth) * _constant__WEBPACK_IMPORTED_MODULE_2__["PIC_SIZE"] + 'px',
        };
        var falseBorderStyle = __assign({}, roiPosStyle, { borderColor: '#FFE14F' });
        var falseTitleStyle = {
            backgroundColor: '#FFE14F'
        };
        // const hidden = { display: 'none'};
        // const zIndexStyle = { 
        //     ...roiPosStyle,
        //     zIndex: 1
        // };
        // const roiTitlePosStyle = {
        //     left: roiPosX,
        //     top: roiPosY
        // };
        // if(value.score > threshold){
        //     return (
        //         <div className='main__content__roi' 
        //             // style={roiPosStyle} 
        //             key={index} 
        //             // onClick={this.selectRoiFn(value.roiId)}
        //             onMouseEnter={this.roiMouseEnter(value.roiId)}
        //             onMouseLeave={this.roiMouseLeave}
        //             // style={this.props.selectedRoiId === value.roiId ? zIndexStyle : roiPosStyle} 
        //             // style={ selectedRoiId === value.roiId ? zIndexStyle : roiPosStyle}
        //             style={roiPosStyle}
        //             >
        //             <div className='main__content__roi__title'>
        //                 <span className='main__content__roi__title__type'>{cancerType[value.type]}</span>
        //                 <span className='main__content__roi__title__score'>{value.score.toFixed(2)}</span>
        //             </div> 
        //             {this.renderRoiMenu(value, index)}
        //             {/* <div className='main__content__roi__menu'
        //                 style={this.props.selectedRoiId === value.roiId ? undefined : hidden}>
        //                 <i className='main__content__roi__menu__true' />
        //                 <i className='main__content__roi__menu__false' />
        //             </div>   */}
        //         </div>
        //     )
        // }else{
        //     return null
        // }
        if ((showAllRoisFlag) || (roiMenuItemIndex === index)) {
            return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: 'main__content__roi', 
                // style={roiPosStyle} 
                key: index, 
                // onClick={this.selectRoiFn(value.roiId)}
                onMouseEnter: this.roiMouseEnter(value.roiId), onMouseLeave: this.roiMouseLeave, 
                // style={this.props.selectedRoiId === value.roiId ? zIndexStyle : roiPosStyle} 
                // style={ selectedRoiId === value.roiId ? zIndexStyle : roiPosStyle}
                style: (value.status === 'false') ? falseBorderStyle : roiPosStyle },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: 'main__content__roi__title', style: value.status === 'false' ? falseTitleStyle : undefined },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", { className: 'main__content__roi__title__type' }, _constant__WEBPACK_IMPORTED_MODULE_2__["CANCER_TYPE"][value.type]),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", { className: 'main__content__roi__title__score' }, value.score.toFixed(2))),
                this.renderRoiMenu(value, index)));
        }
        else {
            return null;
        }
    };
    MainPage.prototype.renderRoiSwitchBarItem = function (value, index) {
        var _a = this.state, showAllRoisFlag = _a.showAllRoisFlag, roiMenuItemIndex = _a.roiMenuItemIndex;
        var greenStyle = { backgroundColor: '#79FF6F' };
        var yellowStyle = { backgroundColor: '#FFE14F' };
        var grayStyle = { backgroundColor: '#BBBBBB' };
        var selectedStyle = { backgroundColor: 'white' };
        var valueStyle;
        switch (value.status) {
            case 'true':
                valueStyle = greenStyle;
                break;
            case 'false':
                valueStyle = yellowStyle;
                break;
            case 'unlabeled':
                valueStyle = grayStyle;
        }
        if (showAllRoisFlag) {
            return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { style: valueStyle, className: 'roi__switch_item', key: index }, index + 1));
        }
        else {
            var newSelectedStyle = __assign({}, selectedStyle, { cursor: 'pointer' });
            var newValueStyle = __assign({}, valueStyle, { cursor: 'pointer' });
            if (roiMenuItemIndex === index) {
                return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { style: newSelectedStyle, className: 'roi__switch_item', key: index },
                    " ",
                    index + 1,
                    " "));
            }
            else {
                return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { style: newValueStyle, className: 'roi__switch_item', onClick: this.setRoiMenuItemIndex(index), key: index },
                    " ",
                    index + 1,
                    " "));
            }
        }
    };
    MainPage.prototype.renderTable = function (index, value) {
        // const oddBgStyle = { backgroundColor: '#EEEEEE' };
        var id = toFiveNumberString(index + 1);
        var oddIconStyle = { backgroundColor: '#613ED8', border: '1px solid #613ED8' };
        var selectedBg = { backgroundColor: '#E4DCFF' };
        // const selectedPicItem = this.state.selectedPicItem;
        var selectedSvsId = this.props.selectedSvsId;
        return (
        // <div className='table__item' key={index} 
        //     style={index%2 ? undefined : oddBgStyle}>
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: index % 2 ? 'table__item' : 'table__item__odd', 
            // style={selectedPicItem === index ? selectedBg : undefined}
            style: selectedSvsId === value.svsId ? selectedBg : undefined, key: index, onClick: this.switchPic(index) },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: 'table__item__id' },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("i", { className: 'table__item__id__icon', style: value.labeledCount ? oddIconStyle : undefined }),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", { className: 'table__item__id__value' }, id)),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", { className: 'table__item__magn' }, value.magnification),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: 'table__item__roi' },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", { className: 'table__item__roi__done' }, value.labeledCount),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", null,
                    "/",
                    value.totalCount))));
    };
    MainPage.prototype.renderBriefTable = function (index, value) {
        var doneIconStyle = { backgroundColor: '#613ED8', border: '1px solid #613ED8' };
        // const selectedPicItem = this.state.selectedPicItem;
        var selectedSvsId = this.props.selectedSvsId;
        var selectedBg = { backgroundColor: '#E4DCFF' };
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: index % 2 ? 'table__item' : 'table__item__odd', 
            // style={selectedPicItem === index ? selectedBg : undefined}
            style: selectedSvsId === value.svsId ? selectedBg : undefined, key: index, onClick: this.switchPic(index) },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: 'table__item__id' },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("i", { className: 'table__item__id__icon', style: value.labeledCount ? doneIconStyle : undefined })),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: 'table__item__roi__brief' },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", { className: 'table__item__roi__done' }, value.labeledCount),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", null,
                    "/",
                    value.totalCount))));
    };
    MainPage.prototype.render = function () {
        var _this = this;
        if (!this.props.userName) {
            // return null;
            return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", null, "please sign in"));
        }
        var _a = this.props, fileList = _a.fileList, pic = _a.pic, selectedSvsId = _a.selectedSvsId, userName = _a.userName;
        // const { selectedPicItem } = this.state;
        var _b = this.state, showLogOutFlag = _b.showLogOutFlag, showAllRoisFlag = _b.showAllRoisFlag;
        var hidden = { display: 'none' };
        var shortListContentStyle = {
            left: '8%',
            width: '92%'
        };
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: 'page' },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: 'main__header' },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", null,
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: 'header__icon' }, "Pathology.ai"),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: 'header__userInfo' },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", { className: 'userInfo__label' }, "Pathologist: "),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", { className: 'userInfo__name' }, userName),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: 'userInfo__menu', onMouseEnter: this.showLogOutEnable, onMouseLeave: this.showLogOutDisable },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("i", { className: 'userInfo__menu_icon' }),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("p", { className: 'userInfo__menu_logout', onMouseEnter: this.showLogOutEnable, onMouseLeave: this.showLogOutDisable, onClick: this.logout, style: showLogOutFlag ? undefined : hidden }, "Log out")))),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: 'header__menu__switch' },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", { className: 'switch__pre', onClick: this.previous }, "pre"),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: 'switch__label' },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", null,
                            "imageID: ",
                            selectedSvsId,
                            "/",
                            fileList.length)),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", { className: 'switch__next', onClick: this.next }, "next")),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", null,
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", { className: 'header__menu__dataSummary', onClick: this.dataSumary }, "Data Summary"))),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: 'main__sideBar', style: this.state.showShortListFlag ? hidden : undefined },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: 'sideBar__header' },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", { className: 'sideBar__header__title' }, "Image List"),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", { className: 'sideBar__header__serialNumber' },
                        "30/",
                        fileList.length),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("i", { className: 'sideBar__header__icon', onClick: this.showShortList })),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: 'sideBar__table__header' },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: 'table__header__id' }, "ID"),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: 'table__header__magn' }, "MAGN"),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: 'table__header__roi' }, "ROI")),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: 'sideBar__table__content' }, fileList.map(function (value, index) { return _this.renderTable(index, value); }))),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: 'main__sideBar__brief', style: this.state.showShortListFlag ? undefined : hidden },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: 'sideBar__brief__header' },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("i", { className: 'sideBar__brief__header__icon', onClick: this.showShortList })),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: 'sideBar__brief__table__header' }, "ROI"),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: 'sideBar__brief__table__content' }, fileList.map(function (value, index) { return _this.renderBriefTable(index, value); }))),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: 'main__content', style: this.state.showShortListFlag ? shortListContentStyle : undefined },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: 'main__content__pic__area' },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("img", { src: pic.picUrl, className: 'main__content__pic' }),
                    pic.roi.map(function (value, index) { return _this.renderRois(value, index); })),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: 'main__content__roi__switch' },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: 'roi__switch_area' }, pic.roi.map(function (value, index) { return _this.renderRoiSwitchBarItem(value, index); })),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("i", { className: showAllRoisFlag ? 'roi__switch_all_enable' : 'roi__switch_all_disable', onClick: this.showAllRoisFlagChange })))));
    };
    return MainPage;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));
/* harmony default export */ __webpack_exports__["default"] = (MainPage);
function toFiveNumberString(i) {
    var decimal = i / Math.pow(10, 5);
    var decimalStr = decimal.toFixed(5) + '';
    return decimalStr.substr(decimalStr.indexOf('.') + 1);
}


/***/ }),

/***/ "./src/utils/resolveSummary.ts":
/*!*************************************!*\
  !*** ./src/utils/resolveSummary.ts ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return resolveSummary; });
function resolveSummary(data) {
    var summaryData = {
        N: {
            false: [],
            true: [],
            unlabelled: []
        },
        R: {
            false: [],
            true: [],
            unlabelled: []
        },
        S: {
            false: [],
            true: [],
            unlabelled: []
        },
        T: {
            false: [],
            true: [],
            unlabelled: []
        },
        X: {
            false: [],
            true: [],
            unlabelled: []
        },
    };
    var statisticsData = [];
    var i;
    for (i = 0; i < data.length; i++) {
        var r = data[i];
        var v = {
            roiUrl: r.roi_url,
            status: r.status,
            svsId: r.svs_id,
            svsUrl: r.svs_url,
            type: r.cancer_type,
            userName: r.user_name
        };
        switch (r.cancer_type + '-' + r.status) {
            case 'N-true':
                summaryData.N.true.push(v);
                break;
            case 'N-false':
                summaryData.N.false.push(v);
                break;
            case 'N-unlabeled':
                summaryData.N.unlabelled.push(v);
                break;
            case 'R-true':
                summaryData.R.true.push(v);
                break;
            case 'R-false':
                summaryData.R.false.push(v);
                break;
            case 'R-unlabeled':
                summaryData.R.unlabelled.push(v);
                break;
            case 'S-true':
                summaryData.S.true.push(v);
                break;
            case 'S-false':
                summaryData.S.false.push(v);
                break;
            case 'S-unlabeled':
                summaryData.S.unlabelled.push(v);
                break;
            case 'T-true':
                summaryData.T.true.push(v);
                break;
            case 'T-false':
                summaryData.T.false.push(v);
                break;
            case 'T-unlabeled':
                summaryData.T.unlabelled.push(v);
                break;
            case 'X-true':
                summaryData.X.true.push(v);
                break;
            case 'X-false':
                summaryData.X.false.push(v);
                break;
            case 'X-unlabeled':
                summaryData.X.unlabelled.push(v);
                break;
        }
    }
    statisticsData = [
        {
            labelFalseNumber: summaryData.N.false.length,
            labelTrueNumber: summaryData.N.true.length,
            nonLabelNumber: summaryData.N.unlabelled.length,
            selectFalse: false,
            selectTrue: false,
            selectUnlabelled: false,
            // showDetialFlag: false,
            showDetialFlag: true,
            // subject: cancerType.N,
            subject: 'N',
            totalNumber: summaryData.N.false.length +
                summaryData.N.true.length +
                summaryData.N.unlabelled.length
        },
        {
            labelFalseNumber: summaryData.S.false.length,
            labelTrueNumber: summaryData.S.true.length,
            nonLabelNumber: summaryData.S.unlabelled.length,
            selectFalse: false,
            selectTrue: false,
            selectUnlabelled: false,
            showDetialFlag: true,
            // showDetialFlag: false,
            // subject: cancerType.S,
            subject: 'S',
            totalNumber: summaryData.S.false.length +
                summaryData.S.true.length +
                summaryData.S.unlabelled.length
        },
        {
            labelFalseNumber: summaryData.R.false.length,
            labelTrueNumber: summaryData.R.true.length,
            nonLabelNumber: summaryData.R.unlabelled.length,
            selectFalse: false,
            selectTrue: false,
            selectUnlabelled: false,
            showDetialFlag: true,
            // showDetialFlag: false,
            // subject: cancerType.R,
            subject: 'R',
            totalNumber: summaryData.R.false.length +
                summaryData.R.true.length +
                summaryData.R.unlabelled.length
        },
        {
            labelFalseNumber: summaryData.T.false.length,
            labelTrueNumber: summaryData.T.true.length,
            nonLabelNumber: summaryData.T.unlabelled.length,
            selectFalse: false,
            selectTrue: false,
            selectUnlabelled: false,
            showDetialFlag: true,
            // showDetialFlag: false,
            // subject: cancerType.T,
            subject: 'T',
            totalNumber: summaryData.T.false.length +
                summaryData.T.true.length +
                summaryData.T.unlabelled.length
        },
        {
            labelFalseNumber: summaryData.X.false.length,
            labelTrueNumber: summaryData.X.true.length,
            nonLabelNumber: summaryData.X.unlabelled.length,
            selectFalse: false,
            selectTrue: false,
            selectUnlabelled: false,
            showDetialFlag: true,
            // showDetialFlag: false,
            // subject: cancerType.X,
            subject: 'X',
            totalNumber: summaryData.X.false.length +
                summaryData.X.true.length +
                summaryData.X.unlabelled.length
        },
    ];
    var result = {
        statistics: statisticsData,
        total: summaryData
    };
    return result;
}


/***/ })

}]);
//# sourceMappingURL=2.bundle.js.map
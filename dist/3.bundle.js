(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[3],{

/***/ "./src/pages/Jiezhen.tsx":
/*!*******************************!*\
  !*** ./src/pages/Jiezhen.tsx ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");
/* harmony import */ var _Shuju__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Shuju */ "./src/pages/Shuju.tsx");
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



var Jiezhen = /** @class */ (function (_super) {
    __extends(Jiezhen, _super);
    function Jiezhen(props) {
        return _super.call(this, props) || this;
    }
    Jiezhen.prototype.render = function () {
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: 'main' },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: 'leftNav' },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("ul", null,
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", null,
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("img", { className: 'firstRouterLabel', src: _Shuju__WEBPACK_IMPORTED_MODULE_2__["firstRouterLabelPic"] }),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Link"], { to: '/jiezhen' },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("i", { className: 'jiezhenPage' }),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("p", null, "\u63A5\u8BCA"))),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", null,
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Link"], { to: '/huizhen' },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("i", { className: 'huizhen' }),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("p", null, "\u4F1A\u8BCA"))),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", null,
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Link"], { to: '/' },
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("i", { className: 'mydata' }),
                            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("p", null, "\u6211\u7684\u6570\u636E")))))));
    };
    return Jiezhen;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));
/* harmony default export */ __webpack_exports__["default"] = (Jiezhen);


/***/ })

}]);
//# sourceMappingURL=3.bundle.js.map
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/css/summaryPage.scss":
/*!*****************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/css/summaryPage.scss ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Imports
var urlEscape = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/url-escape.js */ "./node_modules/css-loader/dist/runtime/url-escape.js");
var ___CSS_LOADER_URL___0___ = urlEscape(__webpack_require__(/*! ./img/checked.svg */ "./src/css/img/checked.svg"));
var ___CSS_LOADER_URL___1___ = urlEscape(__webpack_require__(/*! ./img/unchecked.svg */ "./src/css/img/unchecked.svg"));
var ___CSS_LOADER_URL___2___ = urlEscape(__webpack_require__(/*! ./img/dropDownIconLitter.svg */ "./src/css/img/dropDownIconLitter.svg"));
var ___CSS_LOADER_URL___3___ = urlEscape(__webpack_require__(/*! ./img/dropUpIconLitter.svg */ "./src/css/img/dropUpIconLitter.svg"));
var ___CSS_LOADER_URL___4___ = urlEscape(__webpack_require__(/*! ./img/trueHl.svg */ "./src/css/img/trueHl.svg"));
var ___CSS_LOADER_URL___5___ = urlEscape(__webpack_require__(/*! ./img/falseHl.svg */ "./src/css/img/falseHl.svg"));
var ___CSS_LOADER_URL___6___ = urlEscape(__webpack_require__(/*! ./img/unlabelled.svg */ "./src/css/img/unlabelled.svg"));
var ___CSS_LOADER_URL___7___ = urlEscape(__webpack_require__(/*! ./img/renderNext.svg */ "./src/css/img/renderNext.svg"));
var ___CSS_LOADER_URL___8___ = urlEscape(__webpack_require__(/*! ./img/close.svg */ "./src/css/img/close.svg"));
var ___CSS_LOADER_URL___9___ = urlEscape(__webpack_require__(/*! ./img/edit.svg */ "./src/css/img/edit.svg"));
var ___CSS_LOADER_URL___10___ = urlEscape(__webpack_require__(/*! ./img/previous.svg */ "./src/css/img/previous.svg"));
var ___CSS_LOADER_URL___11___ = urlEscape(__webpack_require__(/*! ./img/next.svg */ "./src/css/img/next.svg"));

// Module
exports.push([module.i, ".summary__title {\n  color: white;\n  font-weight: bold;\n  font-size: 1.5rem;\n  letter-spacing: 1.2px; }\n\n.summary__sideBar__content {\n  position: absolute;\n  top: 60px;\n  height: 94%;\n  overflow-x: hidden;\n  overflow-y: scroll;\n  width: 84%;\n  margin-left: 25px; }\n  .summary__sideBar__content input {\n    cursor: pointer; }\n\n.summary__item__content__true,\n.summary__item__content__false,\n.summary__item__content__notLabeled {\n  margin-top: 10px;\n  display: flex;\n  align-items: center; }\n\n.content__select__icon, .content__unselect__icon {\n  background-image: url(" + ___CSS_LOADER_URL___0___ + ");\n  width: 16px;\n  height: 16px;\n  background-repeat: no-repeat;\n  display: inline-block;\n  cursor: pointer;\n  margin-right: 20px; }\n\n.content__unselect__icon {\n  background-image: url(" + ___CSS_LOADER_URL___1___ + "); }\n\n.summary__item__header {\n  position: relative;\n  height: 54px;\n  line-height: 54px;\n  border-bottom: 1px solid rgba(151, 151, 151, 0.2); }\n\n.summary__item__header__title, .summary__sideBar__content span {\n  color: #1E2D52;\n  letter-spacing: 0.8px; }\n\n.summary__item__header__dropDownIcon, .summary__item__header__dropUpIcon {\n  position: absolute;\n  width: 10px;\n  height: 8px;\n  background-image: url(" + ___CSS_LOADER_URL___2___ + ");\n  background-repeat: no-repeat;\n  top: 50%;\n  margin-top: -4px;\n  right: 18px;\n  cursor: pointer; }\n\n.summary__item__header__dropUpIcon {\n  background-image: url(" + ___CSS_LOADER_URL___3___ + "); }\n\n.summary__content__rois {\n  width: 94%;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  color: #E4DCFF;\n  flex-wrap: wrap;\n  position: relative;\n  height: 80%;\n  overflow-x: hidden;\n  overflow-y: scroll; }\n\n.rois {\n  width: 18%;\n  display: inline-block;\n  margin: 0 30px;\n  text-align: center;\n  letter-spacing: 1px;\n  margin-bottom: 10px; }\n\n.rois__pic {\n  width: 100%;\n  height: 0;\n  padding-bottom: 100%;\n  cursor: pointer;\n  border: 4px solid rgba(34, 34, 34, 0);\n  position: relative; }\n  .rois__pic:hover {\n    border: 4px solid #79FF6F; }\n  .rois__pic img {\n    width: 100%;\n    height: 100%;\n    position: absolute;\n    left: 0; }\n\n.rois__pic__label_true, .rois__pic__label_false, .rois__pic__label_unlabelled {\n  background-image: url(" + ___CSS_LOADER_URL___4___ + ");\n  background-repeat: no-repeat;\n  display: inline-block;\n  width: 38px;\n  height: 38px;\n  position: absolute;\n  bottom: 10px;\n  right: 10px; }\n\n.rois__pic__label_false {\n  background-image: url(" + ___CSS_LOADER_URL___5___ + "); }\n\n.rois__pic__label_unlabelled {\n  background-image: url(" + ___CSS_LOADER_URL___6___ + "); }\n\n.summary__content__next_area {\n  flex: 0 1 100%;\n  text-align: center; }\n\n.summary__content__render_icon {\n  background-image: url(" + ___CSS_LOADER_URL___7___ + ");\n  background-repeat: no-repeat;\n  display: inline-block;\n  width: 38px;\n  height: 38px;\n  cursor: pointer; }\n\n.summary__content__single_pic {\n  width: 100%;\n  text-align: center;\n  display: flex;\n  flex-direction: column;\n  position: relative; }\n  .summary__content__single_pic img {\n    width: 100%; }\n\n.single_pic__img {\n  width: 60%;\n  padding-bottom: 60%;\n  margin: 0 auto;\n  height: 0; }\n\n.single_pic__title {\n  color: white; }\n\n.single_pic__close {\n  background-image: url(" + ___CSS_LOADER_URL___8___ + ");\n  background-repeat: no-repeat;\n  display: inline-block;\n  width: 32px;\n  height: 32px;\n  position: absolute;\n  top: 20px;\n  left: 40px;\n  cursor: pointer; }\n\n.single_pic__edit {\n  background-image: url(" + ___CSS_LOADER_URL___9___ + ");\n  background-repeat: no-repeat;\n  display: inline-block;\n  width: 48px;\n  height: 48px;\n  position: absolute;\n  top: 20px;\n  right: 40px;\n  cursor: pointer; }\n\n.single_pic__pre {\n  background-image: url(" + ___CSS_LOADER_URL___10___ + ");\n  background-repeat: no-repeat;\n  display: inline-block;\n  width: 48px;\n  height: 32px;\n  position: absolute;\n  bottom: 20px;\n  left: 40px;\n  cursor: pointer; }\n\n.single_pic__next {\n  background-image: url(" + ___CSS_LOADER_URL___11___ + ");\n  background-repeat: no-repeat;\n  display: inline-block;\n  width: 48px;\n  height: 32px;\n  position: absolute;\n  bottom: 20px;\n  right: 40px;\n  cursor: pointer; }\n", ""]);



/***/ }),

/***/ "./src/containers/Summary.ts":
/*!***********************************!*\
  !*** ./src/containers/Summary.ts ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../actions */ "./src/actions/index.ts");
/* harmony import */ var _pages_SummaryPage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../pages/SummaryPage */ "./src/pages/SummaryPage.tsx");



function mapStateToProps(state) {
    return {
        selectedRoisPage: state.select.selectedRoisPage,
        summaryDisplay: state.summary.filterDisplay,
        summaryFilter: state.summary.filter,
        summaryStatistics: state.summary.statistics,
        summaryTotal: state.summary.total,
        // summary: state.summary,
        userName: state.user.name,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        roiPageNext: function () { return dispatch(_actions__WEBPACK_IMPORTED_MODULE_1__["roiPageNext"]()); },
        selectSvs: function (id) { return dispatch(_actions__WEBPACK_IMPORTED_MODULE_1__["selectSvs"](id)); },
        setFilter: function (data) { return dispatch(_actions__WEBPACK_IMPORTED_MODULE_1__["setFilter"](data)); },
        setFilterDisplay: function (data) { return dispatch(_actions__WEBPACK_IMPORTED_MODULE_1__["setFilterDisplay"](data)); },
        setPic: function (pic) { return dispatch(_actions__WEBPACK_IMPORTED_MODULE_1__["setPic"](pic)); },
        setStatistics: function (data) { return dispatch(_actions__WEBPACK_IMPORTED_MODULE_1__["setStatistics"](data)); }
    };
}
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_0__["connect"])(mapStateToProps, mapDispatchToProps)(_pages_SummaryPage__WEBPACK_IMPORTED_MODULE_2__["default"]));


/***/ }),

/***/ "./src/css/img/checked.svg":
/*!*********************************!*\
  !*** ./src/css/img/checked.svg ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMTYgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUxLjMgKDU3NTQ0KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGRlZnM+CiAgICAgICAgPHJlY3QgaWQ9InBhdGgtMSIgeD0iMCIgeT0iMCIgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2IiByeD0iMyI+PC9yZWN0PgogICAgICAgIDxmaWx0ZXIgeD0iLTkuNCUiIHk9Ii05LjQlIiB3aWR0aD0iMTE4LjglIiBoZWlnaHQ9IjExOC44JSIgZmlsdGVyVW5pdHM9Im9iamVjdEJvdW5kaW5nQm94IiBpZD0iZmlsdGVyLTIiPgogICAgICAgICAgICA8ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPSIwLjUiIGluPSJTb3VyY2VBbHBoYSIgcmVzdWx0PSJzaGFkb3dCbHVySW5uZXIxIj48L2ZlR2F1c3NpYW5CbHVyPgogICAgICAgICAgICA8ZmVPZmZzZXQgZHg9IjAiIGR5PSIyIiBpbj0ic2hhZG93Qmx1cklubmVyMSIgcmVzdWx0PSJzaGFkb3dPZmZzZXRJbm5lcjEiPjwvZmVPZmZzZXQ+CiAgICAgICAgICAgIDxmZUNvbXBvc2l0ZSBpbj0ic2hhZG93T2Zmc2V0SW5uZXIxIiBpbjI9IlNvdXJjZUFscGhhIiBvcGVyYXRvcj0iYXJpdGhtZXRpYyIgazI9Ii0xIiBrMz0iMSIgcmVzdWx0PSJzaGFkb3dJbm5lcklubmVyMSI+PC9mZUNvbXBvc2l0ZT4KICAgICAgICAgICAgPGZlQ29sb3JNYXRyaXggdmFsdWVzPSIwIDAgMCAwIDAgICAwIDAgMCAwIDAgICAwIDAgMCAwIDAgIDAgMCAwIDAuMDU5MDE4MzQyNCAwIiB0eXBlPSJtYXRyaXgiIGluPSJzaGFkb3dJbm5lcklubmVyMSI+PC9mZUNvbG9yTWF0cml4PgogICAgICAgIDwvZmlsdGVyPgogICAgPC9kZWZzPgogICAgPGcgaWQ9ImZpbmFsIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iREFUQS1TdW1tYXJ5IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTguMDAwMDAwLCAtNDk5LjAwMDAwMCkiPgogICAgICAgICAgICA8ZyBpZD0iR3JvdXAtMyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTguMDAwMDAwLCA0OTkuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICA8ZyBpZD0iUmVjdGFuZ2xlLTE4Ij4KICAgICAgICAgICAgICAgICAgICA8dXNlIGZpbGw9IiNGRkZGRkYiIGZpbGwtcnVsZT0iZXZlbm9kZCIgeGxpbms6aHJlZj0iI3BhdGgtMSI+PC91c2U+CiAgICAgICAgICAgICAgICAgICAgPHVzZSBmaWxsPSJibGFjayIgZmlsbC1vcGFjaXR5PSIxIiBmaWx0ZXI9InVybCgjZmlsdGVyLTIpIiB4bGluazpocmVmPSIjcGF0aC0xIj48L3VzZT4KICAgICAgICAgICAgICAgICAgICA8cmVjdCBzdHJva2U9IiNCNEJGQzkiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWxpbmVqb2luPSJzcXVhcmUiIHg9IjAuNSIgeT0iMC41IiB3aWR0aD0iMTUiIGhlaWdodD0iMTUiIHJ4PSIzIj48L3JlY3Q+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICA8cG9seWdvbiBpZD0iSW1wb3J0ZWQtTGF5ZXJzIiBmaWxsPSIjNDg1NDVGIiBwb2ludHM9IjMgOC44Mjc1MTI2NSA0LjYxMDU0MzQzIDcuMTQzMzIyOTcgNi40OTc0NDU0MiA4Ljg3ODcxMDMxIDExLjY4MzIzMjcgNCAxMyA1LjcwNDQ1NTQyIDYuNDUyMTU5NzggMTEuNzc3Nzc3OCI+PC9wb2x5Z29uPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4="

/***/ }),

/***/ "./src/css/img/close.svg":
/*!*******************************!*\
  !*** ./src/css/img/close.svg ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzJweCIgaGVpZ2h0PSIzMnB4IiB2aWV3Qm94PSIwIDAgMzIgMzIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUxLjMgKDU3NTQ0KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGRlZnM+PC9kZWZzPgogICAgPGcgaWQ9ImZpbmFsIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iUHJldmlldy1EYXRhLVN1bW1hcnktIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMzQyLjAwMDAwMCwgLTEyMS4wMDAwMDApIiBmaWxsPSIjRkZGRkZGIj4KICAgICAgICAgICAgPHBhdGggZD0iTTM3My4zMjY1NTIsMTQ5LjA1NjgyNiBMMzYxLjMyNTgwNSwxMzcuMDM1MDggTDM3My4yNTgyMTEsMTI1LjE4MjE3MSBDMzc0LjE1ODAzOSwxMjQuMjkwMDY2IDM3NC4xNTgwMzksMTIyLjg0NTgxNCAzNzMuMjU4MjExLDEyMS45NTU5OSBDMzcyLjM2MDY2MSwxMjEuMDY2MTY2IDM3MC45MDI3MTEsMTIxLjA2NjE2NiAzNzAuMDA1MTYxLDEyMS45NTU5OSBMMzU4LjA4ODcwMSwxMzMuNzkyOTI3IEwzNDUuOTk0NTU0LDEyMS42Nzc2MzUgQzM0NS4wOTcwMDQsMTIwLjc3NDEyMiAzNDMuNjM5MDU0LDEyMC43NzQxMjIgMzQyLjc0MTUwNCwxMjEuNjc3NjM1IEMzNDEuODQzOTU0LDEyMi41Nzg4NjcgMzQxLjg0Mzk1NCwxMjQuMDQzNjUzIDM0Mi43NDE1MDQsMTI0Ljk0NDg4NSBMMzU0LjgxNzQyNywxMzcuMDQxOTI0IEwzNDIuNjczMTYzLDE0OS4xMDQ3NCBDMzQxLjc3NTYxMiwxNDkuOTk2ODQ1IDM0MS43NzU2MTIsMTUxLjQ0MTA5NyAzNDIuNjczMTYzLDE1Mi4zMzA5MjEgQzM0My41NzA3MTMsMTUzLjIyMzAyNiAzNDUuMDI4NjYyLDE1My4yMjMwMjYgMzQ1LjkyODQ5MSwxNTIuMzMwOTIxIEwzNTguMDU2ODA5LDE0MC4yODQwNzcgTDM3MC4wNzU3OCwxNTIuMzIxNzk1IEMzNzAuOTczMzMxLDE1My4yMjUzMDggMzcyLjQzMTI4LDE1My4yMjUzMDggMzczLjMyODgzLDE1Mi4zMjE3OTUgQzM3NC4yMjQxMDMsMTUxLjQyMjg0NSAzNzQuMjI0MTAzLDE0OS45NjAzMzkgMzczLjMyNjU1MiwxNDkuMDU2ODI2IFoiIGlkPSJTaGFwZSI+PC9wYXRoPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+"

/***/ }),

/***/ "./src/css/img/dropDownIconLitter.svg":
/*!********************************************!*\
  !*** ./src/css/img/dropDownIconLitter.svg ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTBweCIgaGVpZ2h0PSI5cHgiIHZpZXdCb3g9IjAgMCAxMCA5IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCA1MS4zICg1NzU0NCkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxkZWZzPjwvZGVmcz4KICAgIDxnIGlkPSJmaW5hbCIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IkRBVEEtU3VtbWFyeSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTIzOS4wMDAwMDAsIC0xNjcuMDAwMDAwKSIgc3Ryb2tlPSIjOTI5MjkyIiBzdHJva2Utd2lkdGg9IjIiPgogICAgICAgICAgICA8ZyBpZD0iaWNvbmZpbmRlcl9leHBhbmQyXzMwODk2NCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjQwLjAwMDAwMCwgMTY4LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPHBvbHlsaW5lIGlkPSJTaGFwZSIgcG9pbnRzPSI4IDAuMyA0IDUuNyAwIDAuMyI+PC9wb2x5bGluZT4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+"

/***/ }),

/***/ "./src/css/img/dropUpIconLitter.svg":
/*!******************************************!*\
  !*** ./src/css/img/dropUpIconLitter.svg ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTBweCIgaGVpZ2h0PSI5cHgiIHZpZXdCb3g9IjAgMCAxMCA5IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCA1MS4zICg1NzU0NCkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxkZWZzPjwvZGVmcz4KICAgIDxnIGlkPSJmaW5hbCIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IkRBVEEtU3VtbWFyeSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTIzOS4wMDAwMDAsIC0yMTguMDAwMDAwKSIgc3Ryb2tlPSIjOTI5MjkyIiBzdHJva2Utd2lkdGg9IjIiPgogICAgICAgICAgICA8ZyBpZD0iaWNvbmZpbmRlcl9jb2xsYXBzZTJfMzA4OTY4IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyNDAuMDAwMDAwLCAyMjAuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICA8cG9seWxpbmUgaWQ9IlNoYXBlIiBwb2ludHM9IjAgNS43IDQgMC4zIDggNS43Ij48L3BvbHlsaW5lPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4="

/***/ }),

/***/ "./src/css/img/edit.svg":
/*!******************************!*\
  !*** ./src/css/img/edit.svg ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDhweCIgaGVpZ2h0PSI0OHB4IiB2aWV3Qm94PSIwIDAgNDggNDgiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUxLjMgKDU3NTQ0KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGRlZnM+PC9kZWZzPgogICAgPGcgaWQ9ImZpbmFsIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iUHJldmlldy1EYXRhLVN1bW1hcnktIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTM4Ny4wMDAwMDAsIC0xMDUuMDAwMDAwKSIgZmlsbC1ydWxlPSJub256ZXJvIj4KICAgICAgICAgICAgPGcgaWQ9Imljb25maW5kZXJfU3RyZWFtbGluZS0yMl8xODUwNDIiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEzODcuMDAwMDAwLCAxMDUuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMzcsNDggTDAsNDggTDAsNCBMMjksNCBDMjkuNTUyLDQgMzAsNC40NDggMzAsNSBDMzAsNS41NTIgMjkuNTUyLDYgMjksNiBMMiw2IEwyLDQ2IEwzNSw0NiBMMzUsMjQgQzM1LDIzLjQ0OCAzNS40NDgsMjMgMzYsMjMgQzM2LjU1MiwyMyAzNywyMy40NDggMzcsMjQgTDM3LDQ4IFoiIGlkPSJTaGFwZSIgZmlsbD0iI0ZGRkZGRiI+PC9wYXRoPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTIxLjk4NzcwOTcsMjcgQzIxLjczMTE4MjQsMjcgMjEuNDc4NjAxNiwyNi45MDAzMzk5IDIxLjI4OTE2NjEsMjYuNzEwODg3IEMyMC45ODkyMjY1LDI2LjQxMDkxOTkgMjAuOTE0MjQxNiwyNS45NTIwODg2IDIxLjEwMzY3NzEsMjUuNTcyMTk2IEwyMy44OTM5MDQ5LDE5Ljk5MDI0MjMgQzIzLjk0MTI2MzgsMTkuODk1NTE1OCAyNC4wMDM0MjIzLDE5LjgwODY4MzMgMjQuMDc5MzkzOSwxOS43MzM2OTE1IEw0Mi45MTczNzc5LDAuODk0OTY3NjU3IEM0My41MDI0NTc1LDAuMzA4ODQ3NzE0IDQ0LjIxNTgwMDgsMCA0NC45Nzg0NzYyLDAgQzQ2LjE3NTI3NDcsMCA0Ny4zMDEwMzUsMC43NzM1OTkzODYgNDcuNzc3NTgzOCwxLjkyNDEzMTEzIEM0OC4yMzI0MjY0LDMuMDIzMzUyNyA0Ny45ODA4MzIzLDQuMjAzNDg2NDYgNDcuMTAzNzA2Myw1LjA4MDY5MjkxIEwyOC4yNjY3MDg4LDIzLjkxOTQxNjcgQzI4LjE5MTcyMzksMjMuOTk0NDA4NSAyOC4xMDQ4OTkzLDI0LjA1NjU3MjcgMjguMDEwMTgxNSwyNC4xMDQ5MjI3IEwyMi40Mjg3MzkzLDI2Ljg5NjM5MjkgQzIyLjI4ODYzNTksMjYuOTY2NDUxIDIyLjEzNzY3OTUsMjcgMjEuOTg3NzA5NywyNyBaIE0yNS41ODg5NTg0LDIxLjAxNTQ1ODggTDI0LjE5Mzg0NDUsMjMuODA2OTI5MSBMMjYuOTg1MDU4OSwyMi40MTA3MDA2IEw0NS43MDg1OTI0LDMuNjg1NDUxMTYgQzQ2LjAxOTM4NTEsMy4zNzQ2Mjk5NyA0Ni4xMDIyNjMxLDMuMDM2MTgwMjQgNDUuOTU1MjUzMiwyLjY3ODk4MjU3IEM0NS43ODc1MjM4LDIuMjc3MzgxODcgNDUuMzY4MjAwNCwxLjk3MzQ2NzgyIDQ0Ljk3ODQ3NjIsMS45NzM0Njc4MiBDNDQuNzQ2NjE1LDEuOTczNDY3ODIgNDQuNTIyNjQ2OSwyLjA4MDAzNTA4IDQ0LjMxMjQ5MTgsMi4yOTAyMDk0MSBMMjUuNTg4OTU4NCwyMS4wMTU0NTg4IFoiIGlkPSJTaGFwZSIgZmlsbD0iI0ZGRkZGRiI+PC9wYXRoPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTQzLjk2NDg5MjMsOCBDNDMuNjk5NzcyMiw4IDQzLjQzNDY1Miw3Ljg5ODU0MDIyIDQzLjIzMTY2OTQsNy42OTY2NTU5NyBMNDAuMzAyOTIwNSw0Ljc2Nzc4MTM0IEMzOS44OTkwMjY1LDQuMzYyOTc3NTMgMzkuODk5MDI2NSwzLjcwNzYzMDE5IDQwLjMwMjkyMDUsMy4zMDI4MjYzOCBDNDAuNzA3ODUsMi44OTkwNTc4NyA0MS4zNjM0MDEsMi44OTkwNTc4NyA0MS43NjgzMzA2LDMuMzAyODI2MzggTDQ0LjY5NzA3OTUsNi4yMzE3MDEgQzQ1LjEwMDk3MzUsNi42MzY1MDQ4MSA0NS4xMDA5NzM1LDcuMjkxODUyMTYgNDQuNjk3MDc5NSw3LjY5NjY1NTk3IEM0NC40OTUxMzI2LDcuODk5NTc1NTMgNDQuMjMwMDEyNCw4IDQzLjk2NDg5MjMsOCBaIiBpZD0iU2hhcGUiIGZpbGw9IiMwMDAwMDAiPjwvcGF0aD4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+"

/***/ }),

/***/ "./src/css/img/next.svg":
/*!******************************!*\
  !*** ./src/css/img/next.svg ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDhweCIgaGVpZ2h0PSIzMnB4IiB2aWV3Qm94PSIwIDAgNDggMzIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUxLjMgKDU3NTQ0KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGRlZnM+PC9kZWZzPgogICAgPGcgaWQ9ImZpbmFsIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iUHJldmlldy1EYXRhLVN1bW1hcnktIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTM4Ny4wMDAwMDAsIC03NDMuMDAwMDAwKSIgZmlsbD0iI0ZGRkZGRiI+CiAgICAgICAgICAgIDxnIGlkPSJpY29uZmluZGVyX0Fycm93X0ZvcndhcmRfMTA2Mzg3OSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTM4Ny4wMDAwMDAsIDc0My4wMDAwMDApIj4KICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik00OCwxNi4wMDAyNzI2IEM0OCwxNS42MTIyMTU0IDQ3LjgzNSwxNS4yNDE1OTkxIDQ3LjU2MDUsMTQuOTYyNTQ2NyBMMzIuNzEyLDAuNDMwMDI0MTg1IEMzMi4xMjU1LC0wLjE0NDA2Nzg2NCAzMS4xNzYsLTAuMTQyNjE0NDY2IDMwLjU5MSwwLjQzMDAyNDE4NSBDMzAuMDA0NSwxLjAwMjY2Mjg0IDMwLjAwNDUsMS45MzI4MzczIDMwLjU5MSwyLjUwNTQ3NTk1IEw0Mi44ODA1LDE0LjUzMjM0MSBMMS41LDE0LjUzMjM0MSBDMC42NzIsMTQuNTMyMzQxIDAsMTUuMTg5Mjc2NyAwLDE2LjAwMDI3MjYgQzAsMTYuODExMjY4NSAwLjY3MiwxNy40NjgyMDQyIDEuNSwxNy40NjgyMDQyIEw0Mi44NzksMTcuNDY4MjA0MiBMMzAuNTkxLDI5LjQ5NTA2OTIgQzMwLjAwNDUsMzAuMDY3NzA3OSAzMC4wMDYsMzAuOTk3ODgyNCAzMC41OTEsMzEuNTcwNTIxIEMzMS4xNzc1LDMyLjE0MzE1OTcgMzIuMTI3LDMyLjE0MzE1OTcgMzIuNzEyLDMxLjU3MDUyMSBMNDcuNTYwNSwxNy4wMzc5OTg1IEM0Ny44NDEsMTYuNzYzMzA2MyA0Ny45OTU1LDE2LjM4NTQyMyA0OCwxNi4wMDAyNzI2IFoiIGlkPSJBcnJvd19Gb3J3YXJkIj48L3BhdGg+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg=="

/***/ }),

/***/ "./src/css/img/previous.svg":
/*!**********************************!*\
  !*** ./src/css/img/previous.svg ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDdweCIgaGVpZ2h0PSIzMnB4IiB2aWV3Qm94PSIwIDAgNDcgMzIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUxLjMgKDU3NTQ0KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGRlZnM+PC9kZWZzPgogICAgPGcgaWQ9ImZpbmFsIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iUHJldmlldy1EYXRhLVN1bW1hcnktIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMzQyLjAwMDAwMCwgLTc0My4wMDAwMDApIiBmaWxsPSIjRkZGRkZGIj4KICAgICAgICAgICAgPGcgaWQ9Imljb25maW5kZXJfQXJyb3dfQmFja18xMDYzODkxIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgzNDIuMDAwMDAwLCA3NDMuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICA8cGF0aCBkPSJNNDUuMjQ1MDkwOSwxNC41NDU0NTQ1IEw0Ljc2OCwxNC41NDU0NTQ1IEwxNi44NzcwOTA5LDIuNDgyOTA5MDkgQzE3LjQ0NTgxODIsMS45MTQxODE4MiAxNy40NDU4MTgyLDAuOTkzNDU0NTQ1IDE2Ljg3NzA5MDksMC40MjYxODE4MTggQzE2LjMwODM2MzYsLTAuMTQyNTQ1NDU1IDE1LjM4NzYzNjQsLTAuMTQyNTQ1NDU1IDE0LjgyMDM2MzYsMC40MjYxODE4MTggTDAuNDIwMzYzNjM2LDE0LjgyNDcyNzMgQy0wLjEzOTYzNjM2NCwxNS4zODQ3MjczIC0wLjEzOTYzNjM2NCwxNi4zMjE0NTQ1IDAuNDIwMzYzNjM2LDE2Ljg4MTQ1NDUgTDE0LjgyMDM2MzYsMzEuMjgxNDU0NSBDMTUuMzg5MDkwOSwzMS44NTAxODE4IDE2LjMwOTgxODIsMzEuODUwMTgxOCAxNi44NzcwOTA5LDMxLjI4MTQ1NDUgQzE3LjQ0NTgxODIsMzAuNzEyNzI3MyAxNy40NDU4MTgyLDI5Ljc5MiAxNi44NzcwOTA5LDI5LjIyNDcyNzMgTDQuNzY4LDE3LjQ1NDU0NTUgTDQ1LjI0NTA5MDksMTcuNDU0NTQ1NSBDNDYuMDQ4LDE3LjQ1NDU0NTUgNDYuNjk5NjM2NCwxNi44MDI5MDkxIDQ2LjY5OTYzNjQsMTYgQzQ2LjY5OTYzNjQsMTUuMTk3MDkwOSA0Ni4wNDgsMTQuNTQ1NDU0NSA0NS4yNDUwOTA5LDE0LjU0NTQ1NDUgWiIgaWQ9IkFycm93X0JhY2siPjwvcGF0aD4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+"

/***/ }),

/***/ "./src/css/img/renderNext.svg":
/*!************************************!*\
  !*** ./src/css/img/renderNext.svg ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzBweCIgaGVpZ2h0PSIzMHB4IiB2aWV3Qm94PSIwIDAgMzAgMzAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUxLjMgKDU3NTQ0KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGRlZnM+PC9kZWZzPgogICAgPGcgaWQ9ImZpbmFsIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iREFUQS1TdW1tYXJ5IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtODc0LjAwMDAwMCwgLTc1NS4wMDAwMDApIiBmaWxsPSIjRUVFRUVFIiBmaWxsLXJ1bGU9Im5vbnplcm8iPgogICAgICAgICAgICA8cGF0aCBkPSJNODkwLjUsNzYyLjUgTDg4Ny41LDc2Mi41IEw4ODcuNSw3NjguNSBMODgxLjUsNzY4LjUgTDg4MS41LDc3MS41IEw4ODcuNSw3NzEuNSBMODg3LjUsNzc3LjUgTDg5MC41LDc3Ny41IEw4OTAuNSw3NzEuNSBMODk2LjUsNzcxLjUgTDg5Ni41LDc2OC41IEw4OTAuNSw3NjguNSBMODkwLjUsNzYyLjUgWiBNODg5LDc1NSBDODgwLjc1LDc1NSA4NzQsNzYxLjc1IDg3NCw3NzAgQzg3NCw3NzguMjUgODgwLjc1LDc4NSA4ODksNzg1IEM4OTcuMjUsNzg1IDkwNCw3NzguMjUgOTA0LDc3MCBDOTA0LDc2MS43NSA4OTcuMjUsNzU1IDg4OSw3NTUgWiBNODg5LDc4MiBDODgyLjQsNzgyIDg3Nyw3NzYuNiA4NzcsNzcwIEM4NzcsNzYzLjQgODgyLjQsNzU4IDg4OSw3NTggQzg5NS42LDc1OCA5MDEsNzYzLjQgOTAxLDc3MCBDOTAxLDc3Ni42IDg5NS42LDc4MiA4ODksNzgyIFoiIGlkPSJTaGFwZSI+PC9wYXRoPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+"

/***/ }),

/***/ "./src/css/img/unchecked.svg":
/*!***********************************!*\
  !*** ./src/css/img/unchecked.svg ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMTYgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUxLjMgKDU3NTQ0KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGRlZnM+CiAgICAgICAgPHJlY3QgaWQ9InBhdGgtMSIgeD0iMTgiIHk9IjQ2NSIgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2IiByeD0iMyI+PC9yZWN0PgogICAgICAgIDxmaWx0ZXIgeD0iLTkuNCUiIHk9Ii05LjQlIiB3aWR0aD0iMTE4LjglIiBoZWlnaHQ9IjExOC44JSIgZmlsdGVyVW5pdHM9Im9iamVjdEJvdW5kaW5nQm94IiBpZD0iZmlsdGVyLTIiPgogICAgICAgICAgICA8ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPSIwLjUiIGluPSJTb3VyY2VBbHBoYSIgcmVzdWx0PSJzaGFkb3dCbHVySW5uZXIxIj48L2ZlR2F1c3NpYW5CbHVyPgogICAgICAgICAgICA8ZmVPZmZzZXQgZHg9IjAiIGR5PSIyIiBpbj0ic2hhZG93Qmx1cklubmVyMSIgcmVzdWx0PSJzaGFkb3dPZmZzZXRJbm5lcjEiPjwvZmVPZmZzZXQ+CiAgICAgICAgICAgIDxmZUNvbXBvc2l0ZSBpbj0ic2hhZG93T2Zmc2V0SW5uZXIxIiBpbjI9IlNvdXJjZUFscGhhIiBvcGVyYXRvcj0iYXJpdGhtZXRpYyIgazI9Ii0xIiBrMz0iMSIgcmVzdWx0PSJzaGFkb3dJbm5lcklubmVyMSI+PC9mZUNvbXBvc2l0ZT4KICAgICAgICAgICAgPGZlQ29sb3JNYXRyaXggdmFsdWVzPSIwIDAgMCAwIDAgICAwIDAgMCAwIDAgICAwIDAgMCAwIDAgIDAgMCAwIDAuMDU5MDE4MzQyNCAwIiB0eXBlPSJtYXRyaXgiIGluPSJzaGFkb3dJbm5lcklubmVyMSI+PC9mZUNvbG9yTWF0cml4PgogICAgICAgIDwvZmlsdGVyPgogICAgPC9kZWZzPgogICAgPGcgaWQ9ImZpbmFsIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iREFUQS1TdW1tYXJ5IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTguMDAwMDAwLCAtNDY1LjAwMDAwMCkiPgogICAgICAgICAgICA8ZyBpZD0iUmVjdGFuZ2xlLTE4LUNvcHkiPgogICAgICAgICAgICAgICAgPHVzZSBmaWxsPSIjRkZGRkZGIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHhsaW5rOmhyZWY9IiNwYXRoLTEiPjwvdXNlPgogICAgICAgICAgICAgICAgPHVzZSBmaWxsPSJibGFjayIgZmlsbC1vcGFjaXR5PSIxIiBmaWx0ZXI9InVybCgjZmlsdGVyLTIpIiB4bGluazpocmVmPSIjcGF0aC0xIj48L3VzZT4KICAgICAgICAgICAgICAgIDxyZWN0IHN0cm9rZT0iI0I0QkZDOSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWpvaW49InNxdWFyZSIgeD0iMTguNSIgeT0iNDY1LjUiIHdpZHRoPSIxNSIgaGVpZ2h0PSIxNSIgcng9IjMiPjwvcmVjdD4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+"

/***/ }),

/***/ "./src/css/img/unlabelled.svg":
/*!************************************!*\
  !*** ./src/css/img/unlabelled.svg ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzhweCIgaGVpZ2h0PSIzOHB4IiB2aWV3Qm94PSIwIDAgMzggMzgiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUxLjMgKDU3NTQ0KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGRlZnM+PC9kZWZzPgogICAgPGcgaWQ9ImZpbmFsIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iREFUQS1TdW1tYXJ5IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtODEyLjAwMDAwMCwgLTMxOS4wMDAwMDApIj4KICAgICAgICAgICAgPGcgaWQ9Ikdyb3VwLTYiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDgxMi4wMDAwMDAsIDMxOS4wMDAwMDApIj4KICAgICAgICAgICAgICAgIDxjaXJjbGUgaWQ9Ik92YWwtQ29weS00IiBmaWxsPSIjRkZGRkZGIiBjeD0iMTkiIGN5PSIxOSIgcj0iMTkiPjwvY2lyY2xlPgogICAgICAgICAgICAgICAgPGcgaWQ9InF1ZXN0aW9ubWFyazIiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDMuMDAwMDAwLCAzLjAwMDAwMCkiIGZpbGw9IiNCQkJCQkIiIGZpbGwtcnVsZT0ibm9uemVybyI+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTAsMTYgQzAsMjQuOCA3LjIsMzIgMTYsMzIgQzI0LjgsMzIgMzIsMjQuOCAzMiwxNiBDMzIsNy4yIDI0LjgsMCAxNiwwIEM3LjIsMCAwLDcuMiAwLDE2IFogTTE3LjYsMjcuMiBMMTQuNCwyNy4yIEwxNC40LDI0IEwxNy42LDI0IEwxNy42LDI3LjIgWiBNMjAuOTYsMTQuODggTDE5LjUyLDE2LjMyIEMxOC4yNCwxNy40NCAxNy42LDE4LjQgMTcuNiwyMC44IEwxNC40LDIwLjggTDE0LjQsMjAgQzE0LjQsMTguMjQgMTUuMDQsMTYuNjQgMTYuMzIsMTUuNTIgTDE4LjI0LDEzLjQ0IEMxOC44OCwxMi45NiAxOS4yLDEyLjE2IDE5LjIsMTEuMiBDMTkuMiw5LjQ0IDE3Ljc2LDggMTYsOCBDMTQuMjQsOCAxMi44LDkuNDQgMTIuOCwxMS4yIEw5LjYsMTEuMiBDOS42LDcuNjggMTIuNDgsNC44IDE2LDQuOCBDMTkuNTIsNC44IDIyLjQsNy42OCAyMi40LDExLjIgQzIyLjQsMTIuNjQgMjEuNzYsMTMuOTIgMjAuOTYsMTQuODggWiIgaWQ9IlNoYXBlIj48L3BhdGg+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg=="

/***/ }),

/***/ "./src/css/summaryPage.scss":
/*!**********************************!*\
  !*** ./src/css/summaryPage.scss ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/lib/loader.js!./summaryPage.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/css/summaryPage.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/lib/loader.js!./summaryPage.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/css/summaryPage.scss", function() {
		var newContent = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/lib/loader.js!./summaryPage.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/css/summaryPage.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/pages/SummaryPage.tsx":
/*!***********************************!*\
  !*** ./src/pages/SummaryPage.tsx ***!
  \***********************************/
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
/* harmony import */ var _css_summaryPage_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../css/summaryPage.scss */ "./src/css/summaryPage.scss");
/* harmony import */ var _css_summaryPage_scss__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_css_summaryPage_scss__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _router_history__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../router/history */ "./src/router/history.ts");
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







var SummaryPage = /** @class */ (function (_super) {
    __extends(SummaryPage, _super);
    function SummaryPage(props) {
        var _this = _super.call(this, props) || this;
        _this.showSingleRoi = function (index) { return function (event) {
            var summaryDisplay = _this.props.summaryDisplay;
            _this.setState({
                selectedRoi: summaryDisplay[index],
                selectedRoiFlag: true,
                selectedRoiIndex: index
            });
        }; };
        _this.filterRoi = function (index, label) { return function (event) {
            var newStatistics = JSON.parse(JSON.stringify(_this.props.summaryStatistics));
            switch (label) {
                case 'true':
                    newStatistics[index].selectTrue = !newStatistics[index].selectTrue;
                    break;
                case 'false':
                    newStatistics[index].selectFalse = !newStatistics[index].selectFalse;
                    break;
                case 'notLabelled':
                    newStatistics[index].selectUnlabelled = !newStatistics[index].selectUnlabelled;
                    break;
            }
            _this.props.setStatistics(newStatistics);
            var newSummaryData = [];
            var summaryTotal = _this.props.summaryTotal;
            var i;
            for (i = 0; i < newStatistics.length; i++) {
                // switch(nextProps.statistics[i].subject){
                //     case cancerType.N:
                //         if()
                // }
                if (newStatistics[i].selectFalse) {
                    newSummaryData = newSummaryData.concat(summaryTotal[newStatistics[i].subject].false);
                }
                if (newStatistics[i].selectTrue) {
                    newSummaryData = newSummaryData.concat(summaryTotal[newStatistics[i].subject].true);
                }
                if (newStatistics[i].selectUnlabelled) {
                    newSummaryData = newSummaryData.concat(summaryTotal[newStatistics[i].subject].unlabelled);
                }
            }
            _this.props.setFilter(newSummaryData);
            var initEightFilters = [];
            var j;
            if (newSummaryData.length) {
                var length_1 = newSummaryData.length > 48 ? 48 : newSummaryData.length;
                for (j = 0; j < length_1; j++) {
                    initEightFilters[j] = newSummaryData[j];
                }
            }
            _this.props.setFilterDisplay(initEightFilters);
        }; };
        _this.showDetailFlagChange = function (index) { return function (event) {
            // const newSummaryData = this.state.summaryData;
            // newSummaryData[index].showDetialFlag = !this.state.summaryData[index].showDetialFlag;
            // this.setState({
            //     summaryData: newSummaryData
            // });
            // const newSummary = JSON.parse(JSON.stringify(this.props.summary));
            // newSummary.statistics[index].showDetialFlag = !newSummary.statistics[index].showDetialFlag;
            // this.props.setSummary(newSummary);
            var newStatistics = JSON.parse(JSON.stringify(_this.props.summaryStatistics));
            newStatistics[index].showDetialFlag = !newStatistics[index].showDetialFlag;
            _this.props.setStatistics(newStatistics);
        }; };
        _this.state = {
            // summaryFilter: []
            filterRoiPicUrl: [],
            selectedRoi: {
                roiUrl: '',
                status: '',
                svsId: 0,
                svsUrl: '',
                type: '',
                userName: ''
            },
            selectedRoiFlag: false,
            selectedRoiIndex: 0,
        };
        _this.showDetailFlagChange = _this.showDetailFlagChange.bind(_this);
        _this.filterRoi = _this.filterRoi.bind(_this);
        _this.changeRoiPages = _this.changeRoiPages.bind(_this);
        _this.showSingleRoi = _this.showSingleRoi.bind(_this);
        _this.closeSingleRoi = _this.closeSingleRoi.bind(_this);
        _this.preSingleRoi = _this.preSingleRoi.bind(_this);
        _this.nextSingleRoi = _this.nextSingleRoi.bind(_this);
        _this.editSingleRoi = _this.editSingleRoi.bind(_this);
        return _this;
    }
    SummaryPage.prototype.editSingleRoi = function () {
        var _a = this.props, selectSvs = _a.selectSvs, setPic = _a.setPic;
        // this.props.selectSvs(this.state.selectedRoi.svsId);
        var selectedRoi = this.state.selectedRoi;
        selectSvs(selectedRoi.svsId);
        Object(_api__WEBPACK_IMPORTED_MODULE_1__["getPicHttp"])(selectedRoi.svsId).then(function (res) {
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
                svsId: selectedRoi.svsId
            };
            setPic(pic);
            // history.push('/mainPage');
            _router_history__WEBPACK_IMPORTED_MODULE_6__["default"].push('/roi/mainPage');
        }).catch(function (error) {
            // console.error(error);
        });
    };
    SummaryPage.prototype.closeSingleRoi = function () {
        this.setState({
            selectedRoiFlag: false
        });
    };
    SummaryPage.prototype.preSingleRoi = function () {
        var summaryDisplay = this.props.summaryDisplay;
        var selectedRoiIndex = this.state.selectedRoiIndex;
        var newSelectedRoiIndex;
        if (selectedRoiIndex === 0) {
            newSelectedRoiIndex = 7;
        }
        else {
            newSelectedRoiIndex = selectedRoiIndex - 1;
        }
        this.setState({
            selectedRoi: summaryDisplay[newSelectedRoiIndex],
            selectedRoiIndex: newSelectedRoiIndex
        });
    };
    SummaryPage.prototype.nextSingleRoi = function () {
        var summaryDisplay = this.props.summaryDisplay;
        var selectedRoiIndex = this.state.selectedRoiIndex;
        var newSelectedRoiIndex;
        if (selectedRoiIndex === 7) {
            newSelectedRoiIndex = 0;
        }
        else {
            newSelectedRoiIndex = selectedRoiIndex + 1;
        }
        this.setState({
            selectedRoi: summaryDisplay[newSelectedRoiIndex],
            selectedRoiIndex: newSelectedRoiIndex
        });
    };
    SummaryPage.prototype.changeRoiPages = function () {
        var _a = this.props, roiPageNext = _a.roiPageNext, selectedRoisPage = _a.selectedRoisPage, setFilterDisplay = _a.setFilterDisplay, summaryFilter = _a.summaryFilter;
        var newFilterDisplay = [];
        var i;
        // const length = summaryDisplay.length < 48 ? summaryDisplay.length : 48;
        var length = ((selectedRoisPage + 2) * 48 > summaryFilter.length) ? (summaryFilter.length - (selectedRoisPage + 1) * 48) : 48;
        // tslint:disable-next-line:no-console
        // console.log(length);
        for (i = 0; i < length; i++) {
            newFilterDisplay[i] = summaryFilter[(selectedRoisPage + 1) * 48 + i];
        }
        roiPageNext();
        // tslint:disable-next-line:no-console
        // console.log(newFilterDisplay);
        // tslint:disable-next-line:no-console
        // console.log(summaryFilter)
        setFilterDisplay(newFilterDisplay);
    };
    SummaryPage.prototype.mainPage = function () {
        // history.push('/mainPage');
        _router_history__WEBPACK_IMPORTED_MODULE_6__["default"].push('/roi/mainPage');
    };
    SummaryPage.prototype.renderSummaryLabelItemDetail = function (value, index) {
        if (value.showDetialFlag) {
            return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: 'summary__item__content' },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: 'summary__item__content__true' },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("i", { className: value.selectTrue ? 'content__select__icon' : 'content__unselect__icon', onClick: this.filterRoi(index, 'true') }),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", null,
                        "True (",
                        value.labelTrueNumber,
                        ")")),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: 'summary__item__content__false' },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("i", { className: value.selectFalse ? 'content__select__icon' : 'content__unselect__icon', onClick: this.filterRoi(index, 'false') }),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", null,
                        "False (",
                        value.labelFalseNumber,
                        ")")),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: 'summary__item__content__notLabeled' },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("i", { className: value.selectUnlabelled ? 'content__select__icon' : 'content__unselect__icon', onClick: this.filterRoi(index, 'notLabelled') }),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", null,
                        "Non-labelled (",
                        value.nonLabelNumber,
                        ")"))));
        }
        else {
            return undefined;
        }
    };
    SummaryPage.prototype.renderSummaryLabelItem = function (value, index) {
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: 'summary__item', key: index },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: 'summary__item__header' },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", { className: 'summary__item__header__title' },
                    _constant__WEBPACK_IMPORTED_MODULE_2__["CANCER_TYPE"][value.subject],
                    " (",
                    value.totalNumber,
                    ")"),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("i", { className: value.showDetialFlag ? 'summary__item__header__dropUpIcon' : 'summary__item__header__dropDownIcon', 
                    // onClick={()=>this.showDetailFlagChange(index)} />
                    onClick: this.showDetailFlagChange(index) })),
            this.renderSummaryLabelItemDetail(value, index)));
    };
    SummaryPage.prototype.renderDisplayItem = function (index, value) {
        // tslint:disable-next-line:no-console
        //  console.log(value);
        var labelClass = '';
        switch (value.status) {
            case 'true':
                labelClass = 'rois__pic__label_true';
                break;
            case 'false':
                labelClass = 'rois__pic__label_false';
                break;
            case 'unlabeled':
                labelClass = 'rois__pic__label_unlabelled';
                break;
        }
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: 'rois', key: index },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: 'rois__pic' },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("img", { src: value.roiUrl, onClick: this.showSingleRoi(index) }),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("i", { className: labelClass })),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", null, _constant__WEBPACK_IMPORTED_MODULE_2__["CANCER_TYPE"][value.type]),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", null,
                "from image ",
                toFiveNumberString(value.svsId)),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", null,
                "Editor: ",
                value.userName || 'None')));
    };
    SummaryPage.prototype.renderMainContent = function () {
        var _this = this;
        var _a = this.state, selectedRoiFlag = _a.selectedRoiFlag, selectedRoi = _a.selectedRoi;
        var _b = this.props, summaryDisplay = _b.summaryDisplay, selectedRoisPage = _b.selectedRoisPage, summaryFilter = _b.summaryFilter;
        if (summaryDisplay.length === 0) {
            return null;
        }
        else {
            if (selectedRoiFlag) {
                return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: 'summary__content__single_pic' },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: 'single_pic__title' },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", null,
                            _constant__WEBPACK_IMPORTED_MODULE_2__["CANCER_TYPE"][selectedRoi.type],
                            "\uFF0C"),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", null,
                            "from Image ",
                            toFiveNumberString(selectedRoi.svsId),
                            "\uFF0C"),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", null,
                            "Editor: ",
                            selectedRoi.userName || 'None')),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: 'single_pic__img' },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("img", { src: selectedRoi.svsUrl })),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("i", { className: 'single_pic__close', onClick: this.closeSingleRoi }),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("i", { className: 'single_pic__edit', onClick: this.editSingleRoi }),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("i", { className: 'single_pic__pre', onClick: this.preSingleRoi }),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("i", { className: 'single_pic__next', onClick: this.nextSingleRoi })));
            }
            else if (summaryFilter.length <= (selectedRoisPage + 1) * 48) {
                return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: 'summary__content__rois' }, summaryDisplay.map(function (value, index) { return _this.renderDisplayItem(index, value); })));
            }
            else {
                // tslint:disable-next-line:no-console
                // console.log(summaryDisplay);
                return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: 'summary__content__rois' },
                    summaryDisplay.map(function (value, index) { return _this.renderDisplayItem(index, value); }),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: 'summary__content__next_area' },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("i", { className: 'summary__content__render_icon', onClick: this.changeRoiPages }))));
            }
        }
    };
    SummaryPage.prototype.render = function () {
        var _this = this;
        if (!this.props.userName) {
            // return null
            return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", null, "please sign in"));
        }
        var summaryStatistics = this.props.summaryStatistics;
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: 'page' },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: 'main__header' },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", null,
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: 'header__icon' }, "Pathology.ai"),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: 'header__userInfo' },
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", { className: 'userInfo__label' }, "Pathologist: "),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", { className: 'userInfo__name' }, "tongjiA"),
                        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("i", { className: 'userInfo__menu__icon' }))),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: 'summary__title' }, "Data Summary"),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", null,
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", { className: 'header__menu__dataSummary', onClick: this.mainPage }, "Back to Image List"))),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: 'main__sideBar' },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: 'sideBar__header' },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", { className: 'sideBar__header__title' }, "ROI\u5206\u7C7B"),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("i", { className: 'sideBar__header__icon' })),
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: 'summary__sideBar__content' }, summaryStatistics.map(function (value, index) { return _this.renderSummaryLabelItem(value, index); }))),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: 'main__content' }, this.renderMainContent())));
    };
    return SummaryPage;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));
/* harmony default export */ __webpack_exports__["default"] = (SummaryPage);
function toFiveNumberString(i) {
    var decimal = i / Math.pow(10, 5);
    var decimalStr = decimal.toFixed(5) + '';
    return decimalStr.substr(decimalStr.indexOf('.') + 1);
}


/***/ })

}]);
//# sourceMappingURL=1.bundle.js.map
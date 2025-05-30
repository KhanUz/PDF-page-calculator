/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/ts/calculatePage.ts":
/*!*********************************!*\
  !*** ./src/ts/calculatePage.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   calculatePages: () => (/* binding */ calculatePages)
/* harmony export */ });
function calculatePages(start, end, onSignlePage, isBothSides) {
    let entireSection = Array.from({ length: end - start + 1 }, (_, i) => i + start);
    if (isBothSides === false || onSignlePage === 1) {
        return {
            frontPage: entireSection,
            backPage: []
        };
    }
    else if (isBothSides) {
        return entireSection.reduce((acc, curr, currI) => {
            let currChunk = Math.floor(currI / onSignlePage);
            if (currChunk % 2) {
                acc.backPage.push(curr);
            }
            else {
                acc.frontPage.push(curr);
            }
            return acc;
        }, { frontPage: [], backPage: [] });
    }
    else {
        return {
            frontPage: entireSection,
            backPage: []
        };
    }
}


/***/ }),

/***/ "./src/ts/injectClipBoarArea.ts":
/*!**************************************!*\
  !*** ./src/ts/injectClipBoarArea.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   injectClipboardArea: () => (/* binding */ injectClipboardArea)
/* harmony export */ });
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function injectClipboardArea(values, name) {
    var _a;
    const copyBar = document.getElementById("copyBar");
    let r = (Math.random() + 1).toString(36).substring(7);
    copyBar.insertAdjacentHTML("beforeend", `<div class="border border-1 rounded-4 border-info bg-body-tertiary w-100 my-3 p-1">
            <div class="text-center text-info opacity-75  h5 d-flex justify-content-center align-items-center m-3 " >
                <span class="mx-3" id=""">${values}</span>
                <button type="button" id="${r}" data-bs-toggle="modal" data-bs-target="#copied"  data-copy="${values}" class= "btn btn-outline-info" > <i  data-bs-toggle="modal" data-bs-target="#copied"  class="bi bi-clipboard"></i> <span>${name}</span></button>
            </div>
        </div>`);
    (_a = document.getElementById(`${r}`)) === null || _a === void 0 ? void 0 : _a.addEventListener("click", (e) => __awaiter(this, void 0, void 0, function* () {
        var _a;
        const target = e.target;
        if (target.tagName === "BUTTON") {
            navigator.clipboard.writeText(target.dataset.copy);
        }
        else if (target.tagName === "I") {
            navigator.clipboard.writeText((_a = target.parentElement) === null || _a === void 0 ? void 0 : _a.dataset.copy);
        }
    }));
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!*************************!*\
  !*** ./src/ts/index.ts ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _calculatePage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./calculatePage */ "./src/ts/calculatePage.ts");
/* harmony import */ var _injectClipBoarArea__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./injectClipBoarArea */ "./src/ts/injectClipBoarArea.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;


const copyBar = document.getElementById("copyBar");
const formFilter = document.getElementById("form");
const startNumber = document.getElementById("startNumber");
const endNumber = document.getElementById("endNumber");
const pagesPerSide = document.getElementById("pagesPerSide");
const isBothSides = document.getElementById("onBothSides");
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        formFilter === null || formFilter === void 0 ? void 0 : formFilter.addEventListener("submit", (e) => {
            e.preventDefault();
            let { frontPage: frontPages, backPage: backPages } = (0,_calculatePage__WEBPACK_IMPORTED_MODULE_0__.calculatePages)(parseInt(startNumber.value), parseInt(endNumber.value), parseInt(pagesPerSide.value), isBothSides.checked);
            copyBar.innerHTML = "";
            if (frontPages.length) {
                (0,_injectClipBoarArea__WEBPACK_IMPORTED_MODULE_1__.injectClipboardArea)(frontPages, "front");
            }
            if (backPages.length) {
                (0,_injectClipBoarArea__WEBPACK_IMPORTED_MODULE_1__.injectClipboardArea)(backPages, "back");
            }
        });
    });
}
run();
(_a = document.getElementById("themeBTN")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => { document.body.dataset.bsTheme = document.body.dataset.bsTheme === "dark" ? "light" : "dark"; });

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map
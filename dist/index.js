(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("vue"));
	else if(typeof define === 'function' && define.amd)
		define(["vue"], factory);
	else if(typeof exports === 'object')
		exports["vue-notification"] = factory(require("vue"));
	else
		root["vue-notification"] = factory(root["vue"]);
})(self, function(__WEBPACK_EXTERNAL_MODULE__103__) {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 882:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(645);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\n.vue-notification-group {\n  display: block;\n  position: fixed;\n  z-index: 5000;\n}\n.vue-notification-wrapper {\n  display: block;\n  overflow: hidden;\n  width: 100%;\n  margin: 0;\n  padding: 0;\n}\n.notification-title {\n  font-weight: 600;\n}\n.vue-notification-template {\n  display: block;\n  box-sizing: border-box;\n  background: white;\n  text-align: left;\n}\n.vue-notification {\n  display: block;\n  box-sizing: border-box;\n  text-align: left;\n  font-size: 12px;\n  padding: 10px;\n  margin: 0 5px 5px;\n\n  color: white;\n  background: #44A4FC;\n  border-left: 5px solid #187FE7;\n}\n.vue-notification.warn {\n  background: #ffb648;\n  border-left-color: #f48a06;\n}\n.vue-notification.error {\n  background: #E54D42;\n  border-left-color: #B82E24;\n}\n.vue-notification.success {\n  background: #68CD86;\n  border-left-color: #42A85F;\n}\n.vn-fade-enter-active, .vn-fade-leave-active, .vn-fade-move  {\n  transition: all .5s;\n}\n.vn-fade-enter-from, .vn-fade-leave-to {\n  opacity: 0;\n}\n\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 645:
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ 311:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(882);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.id, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(346)/* .default */ .Z
var update = add("7801e124", content, false, {});
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ 346:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ addStylesClient)
});

;// CONCATENATED MODULE: ./node_modules/vue-style-loader/lib/listToStyles.js
/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}

;// CONCATENATED MODULE: ./node_modules/vue-style-loader/lib/addStylesClient.js
/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/



var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

function addStylesClient (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),

/***/ 103:
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE__103__;

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
/******/ 			id: moduleId,
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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ Notification),
  "notify": () => (/* binding */ notify)
});

// EXTERNAL MODULE: external "vue"
var external_vue_ = __webpack_require__(103);
;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0]!./src/Notifications.vue?vue&type=template&id=523bfa6f

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,external_vue_.openBlock)(), (0,external_vue_.createBlock)("div", {
    "class": "vue-notification-group",
    style: _ctx.styles
  }, [((0,external_vue_.openBlock)(), (0,external_vue_.createBlock)((0,external_vue_.resolveDynamicComponent)(_ctx.componentName), {
    name: _ctx.animationName,
    onEnter: _ctx.enter,
    onLeave: _ctx.leave,
    onAfterLeave: _ctx.clean
  }, {
    "default": (0,external_vue_.withCtx)(function () {
      return [((0,external_vue_.openBlock)(true), (0,external_vue_.createBlock)(external_vue_.Fragment, null, (0,external_vue_.renderList)(_ctx.active, function (item) {
        return (0,external_vue_.openBlock)(), (0,external_vue_.createBlock)("div", {
          key: item.id,
          "class": "vue-notification-wrapper",
          style: _ctx.notifyWrapperStyle(item),
          "data-id": item.id,
          onMouseenter: _cache[1] || (_cache[1] = function () {
            return _ctx.pauseTimeout && _ctx.pauseTimeout.apply(_ctx, arguments);
          }),
          onMouseleave: _cache[2] || (_cache[2] = function () {
            return _ctx.resumeTimeout && _ctx.resumeTimeout.apply(_ctx, arguments);
          })
        }, [(0,external_vue_.renderSlot)(_ctx.$slots, "body", {
          "class": [_ctx.classes, item.type],
          item: item,
          close: function close() {
            return _ctx.destroy(item);
          }
        }, function () {
          return [(0,external_vue_.createCommentVNode)(" Default slot template "), (0,external_vue_.createVNode)("div", {
            "class": _ctx.notifyClass(item),
            onClick: function onClick($event) {
              return _ctx.destroyIfNecessary(item);
            }
          }, [item.title ? ((0,external_vue_.openBlock)(), (0,external_vue_.createBlock)("div", {
            key: 0,
            "class": "notification-title",
            innerHTML: item.title
          }, null, 8
          /* PROPS */
          , ["innerHTML"])) : (0,external_vue_.createCommentVNode)("v-if", true), (0,external_vue_.createVNode)("div", {
            "class": "notification-content",
            innerHTML: item.text
          }, null, 8
          /* PROPS */
          , ["innerHTML"])], 10
          /* CLASS, PROPS */
          , ["onClick"])];
        })], 44
        /* STYLE, PROPS, HYDRATE_EVENTS */
        , ["data-id"]);
      }), 128
      /* KEYED_FRAGMENT */
      ))];
    }),
    _: 3
    /* FORWARDED */

  }, 8
  /* PROPS */
  , ["name", "onEnter", "onLeave", "onAfterLeave"]))], 4
  /* STYLE */
  );
}
;// CONCATENATED MODULE: ./src/Notifications.vue?vue&type=template&id=523bfa6f

;// CONCATENATED MODULE: ./node_modules/mitt/dist/mitt.es.js
/* harmony default export */ function mitt_es(n){return{all:n=n||new Map,on:function(t,e){var i=n.get(t);i&&i.push(e)||n.set(t,[e])},off:function(t,e){var i=n.get(t);i&&i.splice(i.indexOf(e)>>>0,1)},emit:function(t,e){(n.get(t)||[]).slice().map(function(n){n(e)}),(n.get("*")||[]).slice().map(function(n){n(t,e)})}}}
//# sourceMappingURL=mitt.es.js.map

;// CONCATENATED MODULE: ./src/events.js

var events = mitt_es();
;// CONCATENATED MODULE: ./src/util.js
var directions = {
  x: ['left', 'center', 'right'],
  y: ['top', 'bottom']
};
/**
  * Sequential ID generator
  */

var Id = function (i) {
  return function () {
    return i++;
  };
}(0);
/**
  * Splits space/tab separated string into array and cleans empty string items.
  */

var split = function split(value) {
  if (typeof value !== 'string') {
    return [];
  }

  return value.split(/\s+/gi).filter(function (v) {
    return v;
  });
};
/**
  * Cleanes and transforms string of format "x y" into object {x, y}.
  * Possible combinations:
  *   x - left, center, right
  *   y - top, bottom
  */

var listToDirection = function listToDirection(value) {
  if (typeof value === 'string') {
    value = split(value);
  }

  var x = null;
  var y = null;
  value.forEach(function (v) {
    if (directions.y.indexOf(v) !== -1) {
      y = v;
    }

    if (directions.x.indexOf(v) !== -1) {
      x = v;
    }
  });
  return {
    x: x,
    y: y
  };
};
function Timer(callback, delay, notifItem) {
  var start,
      remaining = delay;

  this.pause = function () {
    clearTimeout(notifItem.timer);
    remaining -= Date.now() - start;
  };

  this.resume = function () {
    start = Date.now();
    clearTimeout(notifItem.timer);
    notifItem.timer = setTimeout(callback, remaining);
  };

  this.resume();
}
;// CONCATENATED MODULE: ./src/defaults.js
/* harmony default export */ const defaults = ({
  position: ['top', 'right'],
  cssAnimation: 'vn-fade',
  velocityAnimation: {
    enter: function enter(el) {
      var height = el.clientHeight;
      return {
        height: [height, 0],
        opacity: [1, 0]
      };
    },
    leave: {
      height: 0,
      opacity: [0, 1]
    }
  }
});
;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0]!./src/VelocityGroup.vue?vue&type=template&id=99d2c4f8

function VelocityGroupvue_type_template_id_99d2c4f8_render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,external_vue_.openBlock)(), (0,external_vue_.createBlock)(external_vue_.TransitionGroup, {
    tag: "span",
    css: false,
    onEnter: _ctx.enter,
    onLeave: _ctx.leave,
    onAfterLeave: _ctx.afterLeave
  }, {
    "default": (0,external_vue_.withCtx)(function () {
      return [(0,external_vue_.renderSlot)(_ctx.$slots, "default")];
    }),
    _: 3
    /* FORWARDED */

  }, 8
  /* PROPS */
  , ["onEnter", "onLeave", "onAfterLeave"]);
}
;// CONCATENATED MODULE: ./src/VelocityGroup.vue?vue&type=template&id=99d2c4f8

;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/dist/index.js??ruleSet[0]!./src/VelocityGroup.vue?vue&type=script&lang=js

/* harmony default export */ const VelocityGroupvue_type_script_lang_js = ((0,external_vue_.defineComponent)({
  name: 'VelocityGroup',
  components: {
    TransitionGroup: external_vue_.TransitionGroup
  },
  emits: ['afterLeave', 'leave', 'enter'],
  methods: {
    enter: function enter(el, complete) {
      this.$emit('enter', {
        el: el,
        complete: complete
      });
    },
    leave: function leave(el, complete) {
      this.$emit('leave', {
        el: el,
        complete: complete
      });
    },
    afterLeave: function afterLeave() {
      this.$emit('afterLeave');
    }
  }
}));
;// CONCATENATED MODULE: ./src/VelocityGroup.vue?vue&type=script&lang=js
 
;// CONCATENATED MODULE: ./src/VelocityGroup.vue



VelocityGroupvue_type_script_lang_js.render = VelocityGroupvue_type_template_id_99d2c4f8_render

/* harmony default export */ const VelocityGroup = (VelocityGroupvue_type_script_lang_js);
;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0]!./src/CssGroup.vue?vue&type=template&id=02850a88

function CssGroupvue_type_template_id_02850a88_render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,external_vue_.openBlock)(), (0,external_vue_.createBlock)(external_vue_.TransitionGroup, {
    tag: "span",
    name: _ctx.name
  }, {
    "default": (0,external_vue_.withCtx)(function () {
      return [(0,external_vue_.renderSlot)(_ctx.$slots, "default")];
    }),
    _: 3
    /* FORWARDED */

  }, 8
  /* PROPS */
  , ["name"]);
}
;// CONCATENATED MODULE: ./src/CssGroup.vue?vue&type=template&id=02850a88

;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/dist/index.js??ruleSet[0]!./src/CssGroup.vue?vue&type=script&lang=js

/* harmony default export */ const CssGroupvue_type_script_lang_js = ((0,external_vue_.defineComponent)({
  name: 'CssGroup',
  components: {
    TransitionGroup: external_vue_.TransitionGroup
  },
  props: {
    name: {
      type: String,
      required: true
    }
  }
}));
;// CONCATENATED MODULE: ./src/CssGroup.vue?vue&type=script&lang=js
 
;// CONCATENATED MODULE: ./src/CssGroup.vue



CssGroupvue_type_script_lang_js.render = CssGroupvue_type_template_id_02850a88_render

/* harmony default export */ const CssGroup = (CssGroupvue_type_script_lang_js);
;// CONCATENATED MODULE: ./src/parser.js
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var floatRegexp = '[-+]?[0-9]*.?[0-9]+';
var types = [{
  name: 'px',
  regexp: new RegExp("^".concat(floatRegexp, "px$"))
}, {
  name: '%',
  regexp: new RegExp("^".concat(floatRegexp, "%$"))
},
/**
 * Fallback option
 * If no suffix specified, assigning "px"
 */
{
  name: 'px',
  regexp: new RegExp("^".concat(floatRegexp, "$"))
}];

var getType = function getType(value) {
  if (value === 'auto') {
    return {
      type: value,
      value: 0
    };
  }

  for (var i = 0; i < types.length; i++) {
    var type = types[i];

    if (type.regexp.test(value)) {
      return {
        type: type.name,
        value: parseFloat(value)
      };
    }
  }

  return {
    type: '',
    value: value
  };
};

var parse = function parse(value) {
  switch (_typeof(value)) {
    case 'number':
      return {
        type: 'px',
        value: value
      };

    case 'string':
      return getType(value);

    default:
      return {
        type: '',
        value: value
      };
  }
};
/* harmony default export */ const parser = (parse);
;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/dist/index.js??ruleSet[0]!./src/Notifications.vue?vue&type=script&lang=js
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }









var STATE = {
  IDLE: 0,
  DESTROYED: 2
};
/* harmony default export */ const Notificationsvue_type_script_lang_js = ((0,external_vue_.defineComponent)({
  name: 'Notifications',
  components: {
    VelocityGroup: VelocityGroup,
    CssGroup: CssGroup
  },
  props: {
    group: {
      type: String,
      "default": ''
    },
    width: {
      type: [Number, String],
      "default": 300
    },
    reverse: {
      type: Boolean,
      "default": false
    },
    position: {
      type: [String, Array],
      "default": function _default() {
        return defaults.position;
      }
    },
    classes: {
      type: String,
      "default": 'vue-notification'
    },
    animationType: {
      type: String,
      "default": 'css',
      validator: function validator(value) {
        return value === 'css' || value === 'velocity';
      }
    },
    animation: {
      type: Object,
      "default": function _default() {
        return defaults.velocityAnimation;
      }
    },
    animationName: {
      type: String,
      "default": defaults.cssAnimation
    },
    speed: {
      type: Number,
      "default": 300
    },

    /* Todo */
    cooldown: {
      type: Number,
      "default": 0
    },
    duration: {
      type: Number,
      "default": 3000
    },
    delay: {
      type: Number,
      "default": 0
    },
    max: {
      type: Number,
      "default": Infinity
    },
    ignoreDuplicates: {
      type: Boolean,
      "default": false
    },
    closeOnClick: {
      type: Boolean,
      "default": true
    },
    pauseOnHover: {
      type: Boolean,
      "default": false
    }
  },
  emits: ['click', 'destroy'],
  data: function data() {
    return {
      list: [],
      velocity: Notification.params.velocity,
      timerControl: ""
    };
  },
  computed: {
    actualWidth: function actualWidth() {
      return parser(this.width);
    },

    /**
      * isVelocityAnimation
      */
    isVA: function isVA() {
      return this.animationType === 'velocity';
    },
    componentName: function componentName() {
      return this.isVA ? 'velocity-group' : 'css-group';
    },
    styles: function styles() {
      var _listToDirection = listToDirection(this.position),
          x = _listToDirection.x,
          y = _listToDirection.y;

      var width = this.actualWidth.value;
      var suffix = this.actualWidth.type;

      var styles = _defineProperty({
        width: width + suffix
      }, y, '0px');

      if (x === 'center') {
        styles['left'] = "calc(50% - ".concat(width / 2).concat(suffix, ")");
      } else {
        styles[x] = '0px';
      }

      return styles;
    },
    active: function active() {
      return this.list.filter(function (v) {
        return v.state !== STATE.DESTROYED;
      });
    },
    botToTop: function botToTop() {
      // eslint-disable-next-line no-prototype-builtins
      return this.styles.hasOwnProperty('bottom');
    }
  },
  mounted: function mounted() {
    events.on('add', this.addItem);
    events.on('close', this.closeItem);
  },
  methods: {
    destroyIfNecessary: function destroyIfNecessary(item) {
      this.$emit('click', item);

      if (this.closeOnClick) {
        this.destroy(item);
      }
    },
    pauseTimeout: function pauseTimeout() {
      if (this.pauseOnHover) {
        this.timerControl.pause();
      }
    },
    resumeTimeout: function resumeTimeout() {
      if (this.pauseOnHover) {
        this.timerControl.resume();
      }
    },
    addItem: function addItem(event) {
      var _this = this;

      event.group = event.group || '';
      event.data = event.data || {};

      if (this.group !== event.group) {
        return;
      }

      if (event.clean || event.clear) {
        this.destroyAll();
        return;
      }

      var duration = typeof event.duration === 'number' ? event.duration : this.duration;
      var speed = typeof event.speed === 'number' ? event.speed : this.speed;
      var ignoreDuplicates = typeof event.ignoreDuplicates === 'boolean' ? event.ignoreDuplicates : this.ignoreDuplicates;
      var title = event.title,
          text = event.text,
          type = event.type,
          data = event.data,
          id = event.id;
      var item = {
        id: id || Id(),
        title: title,
        text: text,
        type: type,
        state: STATE.IDLE,
        speed: speed,
        length: duration + 2 * speed,
        data: data
      };

      if (duration >= 0) {
        this.timerControl = new Timer(function () {
          return _this.destroy(item);
        }, item.length, item);
      }

      var direction = this.reverse ? !this.botToTop : this.botToTop;
      var indexToDestroy = -1;
      var isDuplicate = this.active.some(function (item) {
        return item.title === event.title && item.text === event.text;
      });
      var canAdd = ignoreDuplicates ? !isDuplicate : true;
      if (!canAdd) return;

      if (direction) {
        this.list.push(item);

        if (this.active.length > this.max) {
          indexToDestroy = 0;
        }
      } else {
        this.list.unshift(item);

        if (this.active.length > this.max) {
          indexToDestroy = this.active.length - 1;
        }
      }

      if (indexToDestroy !== -1) {
        this.destroy(this.active[indexToDestroy]);
      }
    },
    closeItem: function closeItem(id) {
      this.destroyById(id);
    },
    notifyClass: function notifyClass(item) {
      return ['vue-notification-template', this.classes, item.type];
    },
    notifyWrapperStyle: function notifyWrapperStyle(item) {
      return this.isVA ? null : {
        transition: "all ".concat(item.speed, "ms")
      };
    },
    destroy: function destroy(item) {
      clearTimeout(item.timer);
      item.state = STATE.DESTROYED;

      if (!this.isVA) {
        this.clean();
      }

      this.$emit('destroy', item);
    },
    destroyById: function destroyById(id) {
      var item = this.list.find(function (v) {
        return v.id === id;
      });

      if (item) {
        this.destroy(item);
      }
    },
    destroyAll: function destroyAll() {
      this.active.forEach(this.destroy);
    },
    getAnimation: function getAnimation(index, el) {
      var animation = this.animation[index];
      return typeof animation === 'function' ? animation.call(this, el) : animation;
    },
    enter: function enter(el, complete) {
      if (!this.isVA) {
        complete();
        return;
      }

      var animation = this.getAnimation('enter', el);
      this.velocity(el, animation, {
        duration: this.speed,
        complete: complete
      });
    },
    leave: function leave(el, complete) {
      if (!this.isVA) {
        complete();
        return;
      }

      var animation = this.getAnimation('leave', el);
      this.velocity(el, animation, {
        duration: this.speed,
        complete: complete
      });
    },
    clean: function clean() {
      this.list = this.list.filter(function (v) {
        return v.state !== STATE.DESTROYED;
      });
    }
  }
}));
;// CONCATENATED MODULE: ./src/Notifications.vue?vue&type=script&lang=js
 
// EXTERNAL MODULE: ./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/vue-loader/dist/index.js??ruleSet[0]!./src/Notifications.vue?vue&type=style&index=0&id=523bfa6f&lang=css
var Notificationsvue_type_style_index_0_id_523bfa6f_lang_css = __webpack_require__(311);
;// CONCATENATED MODULE: ./src/Notifications.vue?vue&type=style&index=0&id=523bfa6f&lang=css

;// CONCATENATED MODULE: ./src/Notifications.vue




;
Notificationsvue_type_script_lang_js.render = render

/* harmony default export */ const Notifications = (Notificationsvue_type_script_lang_js);
;// CONCATENATED MODULE: ./src/index.js
function src_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { src_typeof = function _typeof(obj) { return typeof obj; }; } else { src_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return src_typeof(obj); }



var notify = function notify(params) {
  if (typeof params === 'string') {
    params = {
      title: '',
      text: params
    };
  }

  if (src_typeof(params) === 'object') {
    events.emit('add', params);
  }
};

notify.close = function (id) {
  events.emit('close', id);
};

function Notification() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  Notification.params = args;
  return function (app) {
    app.component(args.componentName || 'notifications', Notifications);
    var name = args.name || 'notify';
    app.config.globalProperties['$' + name] = notify;
  };
}
})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
!function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=9)}([function(e,t){e.exports=function(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}},function(e,t,r){"use strict";(function(e,n){var o,i=r(7);o="undefined"!=typeof self?self:"undefined"!=typeof window?window:void 0!==e?e:n;var a=Object(i.a)(o);t.a=a}).call(this,r(2),r(10)(e))},function(e,t){var r;r=function(){return this}();try{r=r||new Function("return this")()}catch(e){"object"==typeof window&&(r=window)}e.exports=r},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.DEFAULT_PORT_NAME=t.PATCH_STATE_TYPE=t.STATE_TYPE=t.DISPATCH_TYPE=void 0;t.DISPATCH_TYPE="chromex.dispatch";t.STATE_TYPE="chromex.state";t.PATCH_STATE_TYPE="chromex.patch_state";t.DEFAULT_PORT_NAME="chromex.port_name"},function(e,t,r){"use strict";function n(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{},n=Object.keys(r);"function"==typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(r).filter((function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable})))),n.forEach((function(t){o(e,t,r[t])}))}return e}function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}Object.defineProperty(t,"__esModule",{value:!0}),t.withSerializer=t.withDeserializer=t.noop=void 0;var i=function(e){return e};t.noop=i;var a=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:i;return n({},e,e.payload?{payload:t(e.payload)}:{})},c=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:i,r=arguments.length>2?arguments[2]:void 0;return r?function(n){for(var o=arguments.length,i=new Array(o>1?o-1:0),c=1;c<o;c++)i[c-1]=arguments[c];return r.apply(void 0,[n].concat(i))?e.apply(void 0,[a(n,t)].concat(i)):e.apply(void 0,[n].concat(i))}:function(r){for(var n=arguments.length,o=new Array(n>1?n-1:0),i=1;i<n;i++)o[i-1]=arguments[i];return e.apply(void 0,[a(r,t)].concat(o))}};t.withDeserializer=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:i;return function(t){return function(r,n){return t(c(r,e,n))}}};t.withSerializer=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:i;return function(t){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return function(){for(var n=arguments.length,o=new Array(n),i=0;i<n;i++)o[i]=arguments[i];if(o.length<=r)throw new Error("Message in request could not be serialized. "+"Expected message in position ".concat(r," but only received ").concat(o.length," args."));return o[r]=a(o[r],e),t.apply(void 0,o)}}}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.DIFF_STATUS_ARRAY_UPDATED=t.DIFF_STATUS_KEYS_UPDATED=t.DIFF_STATUS_REMOVED=t.DIFF_STATUS_UPDATED=void 0;t.DIFF_STATUS_UPDATED="updated";t.DIFF_STATUS_REMOVED="removed";t.DIFF_STATUS_KEYS_UPDATED="updated_keys";t.DIFF_STATUS_ARRAY_UPDATED="updated_array"},function(e,t,r){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.getBrowserAPI=function(){var t;try{t=e.chrome||e.browser||browser}catch(e){t=browser}if(!t)throw new Error("Browser API is not present");return t}}).call(this,r(2))},function(e,t,r){"use strict";function n(e){var t,r=e.Symbol;return"function"==typeof r?r.observable?t=r.observable:(t=r("observable"),r.observable=t):t="@@observable",t}r.d(t,"a",(function(){return n}))},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"Store",{enumerable:!0,get:function(){return n.default}}),Object.defineProperty(t,"applyMiddleware",{enumerable:!0,get:function(){return o.default}}),Object.defineProperty(t,"wrapStore",{enumerable:!0,get:function(){return i.default}}),Object.defineProperty(t,"alias",{enumerable:!0,get:function(){return a.default}});var n=c(r(11)),o=c(r(14)),i=c(r(15)),a=c(r(17));function c(e){return e&&e.__esModule?e:{default:e}}},function(e,t,r){e.exports=r(18)},function(e,t){e.exports=function(e){if(!e.webpackPolyfill){var t=Object.create(e);t.children||(t.children=[]),Object.defineProperty(t,"loaded",{enumerable:!0,get:function(){return t.l}}),Object.defineProperty(t,"id",{enumerable:!0,get:function(){return t.i}}),Object.defineProperty(t,"exports",{enumerable:!0}),t.webpackPolyfill=1}return t}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=u(r(12)),o=r(3),i=r(4),a=u(r(13)),c=r(6);function u(e){return e&&e.__esModule?e:{default:e}}function s(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var f={portName:o.DEFAULT_PORT_NAME,state:{},extensionId:null,serializer:i.noop,deserializer:i.noop,patchStrategy:a.default},p=function(){function e(){var t=this,r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:f,n=r.portName,a=void 0===n?f.portName:n,u=r.state,l=void 0===u?f.state:u,p=r.extensionId,d=void 0===p?f.extensionId:p,y=r.serializer,b=void 0===y?f.serializer:y,h=r.deserializer,v=void 0===h?f.deserializer:h,O=r.patchStrategy,g=void 0===O?f.patchStrategy:O;if(s(this,e),!a)throw new Error("portName is required in options");if("function"!=typeof b)throw new Error("serializer must be a function");if("function"!=typeof v)throw new Error("deserializer must be a function");if("function"!=typeof g)throw new Error("patchStrategy must be one of the included patching strategies or a custom patching function");this.portName=a,this.readyResolved=!1,this.readyPromise=new Promise((function(e){return t.readyResolve=e})),this.browserAPI=(0,c.getBrowserAPI)(),this.extensionId=d,this.port=this.browserAPI.runtime.connect(this.extensionId,{name:a}),this.safetyHandler=this.safetyHandler.bind(this),this.safetyMessage=this.browserAPI.runtime.onMessage.addListener(this.safetyHandler),this.serializedPortListener=(0,i.withDeserializer)(v)((function(){var e;return(e=t.port.onMessage).addListener.apply(e,arguments)})),this.serializedMessageSender=(0,i.withSerializer)(b)((function(){var e;return(e=t.browserAPI.runtime).sendMessage.apply(e,arguments)}),1),this.listeners=[],this.state=l,this.patchStrategy=g,this.serializedPortListener((function(e){switch(e.type){case o.STATE_TYPE:t.replaceState(e.payload),t.readyResolved||(t.readyResolved=!0,t.readyResolve());break;case o.PATCH_STATE_TYPE:t.patchState(e.payload)}})),this.dispatch=this.dispatch.bind(this)}var t,r,a;return t=e,(r=[{key:"ready",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;return null!==e?this.readyPromise.then(e):this.readyPromise}},{key:"subscribe",value:function(e){var t=this;return this.listeners.push(e),function(){t.listeners=t.listeners.filter((function(t){return t!==e}))}}},{key:"patchState",value:function(e){this.state=this.patchStrategy(this.state,e),this.listeners.forEach((function(e){return e()}))}},{key:"replaceState",value:function(e){this.state=e,this.listeners.forEach((function(e){return e()}))}},{key:"getState",value:function(){return this.state}},{key:"replaceReducer",value:function(){}},{key:"dispatch",value:function(e){var t=this;return new Promise((function(r,i){t.serializedMessageSender(t.extensionId,{type:o.DISPATCH_TYPE,portName:t.portName,payload:e},null,(function(e){var t=e.error,o=e.value;if(t){var a=new Error("".concat("\nLooks like there is an error in the background page. You might want to inspect your background page for more details.\n").concat(t));i((0,n.default)(a,t))}else r(o&&o.payload)}))}))}},{key:"safetyHandler",value:function(e){"storeReady"===e.action&&(this.browserAPI.runtime.onMessage.removeListener(this.safetyHandler),this.readyResolved||(this.readyResolved=!0,this.readyResolve()))}}])&&l(t.prototype,r),a&&l(t,a),e}();t.default=p},function(e,t){var r=/^(?:0|[1-9]\d*)$/;function n(e,t,r){switch(r.length){case 0:return e.call(t);case 1:return e.call(t,r[0]);case 2:return e.call(t,r[0],r[1]);case 3:return e.call(t,r[0],r[1],r[2])}return e.apply(t,r)}var o=Object.prototype,i=o.hasOwnProperty,a=o.toString,c=o.propertyIsEnumerable,u=Math.max;function s(e,t){var r=y(e)||function(e){return function(e){return function(e){return!!e&&"object"==typeof e}(e)&&b(e)}(e)&&i.call(e,"callee")&&(!c.call(e,"callee")||"[object Arguments]"==a.call(e))}(e)?function(e,t){for(var r=-1,n=Array(e);++r<e;)n[r]=t(r);return n}(e.length,String):[],n=r.length,o=!!n;for(var u in e)!t&&!i.call(e,u)||o&&("length"==u||p(u,n))||r.push(u);return r}function l(e,t,r){var n=e[t];i.call(e,t)&&d(n,r)&&(void 0!==r||t in e)||(e[t]=r)}function f(e){if(!h(e))return function(e){var t=[];if(null!=e)for(var r in Object(e))t.push(r);return t}(e);var t,r,n,a=(r=(t=e)&&t.constructor,n="function"==typeof r&&r.prototype||o,t===n),c=[];for(var u in e)("constructor"!=u||!a&&i.call(e,u))&&c.push(u);return c}function p(e,t){return!!(t=null==t?9007199254740991:t)&&("number"==typeof e||r.test(e))&&e>-1&&e%1==0&&e<t}function d(e,t){return e===t||e!=e&&t!=t}var y=Array.isArray;function b(e){return null!=e&&function(e){return"number"==typeof e&&e>-1&&e%1==0&&e<=9007199254740991}(e.length)&&!function(e){var t=h(e)?a.call(e):"";return"[object Function]"==t||"[object GeneratorFunction]"==t}(e)}function h(e){var t=typeof e;return!!e&&("object"==t||"function"==t)}var v,O,g,w=(v=function(e,t){!function(e,t,r,n){r||(r={});for(var o=-1,i=t.length;++o<i;){var a=t[o],c=n?n(r[a],e[a],a,r,e):void 0;l(r,a,void 0===c?e[a]:c)}}(t,function(e){return b(e)?s(e,!0):f(e)}(t),e)},O=function(e,t){var r=-1,n=t.length,o=n>1?t[n-1]:void 0,i=n>2?t[2]:void 0;for(o=v.length>3&&"function"==typeof o?(n--,o):void 0,i&&function(e,t,r){if(!h(r))return!1;var n=typeof t;return!!("number"==n?b(r)&&p(t,r.length):"string"==n&&t in r)&&d(r[t],e)}(t[0],t[1],i)&&(o=n<3?void 0:o,n=1),e=Object(e);++r<n;){var a=t[r];a&&v(e,a,r,o)}return e},g=u(void 0===g?O.length-1:g,0),function(){for(var e=arguments,t=-1,r=u(e.length-g,0),o=Array(r);++t<r;)o[t]=e[g+t];t=-1;for(var i=Array(g+1);++t<g;)i[t]=e[t];return i[g]=o,n(O,this,i)});e.exports=w},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){var r=Object.assign({},e);return t.forEach((function(e){var t=e.change,o=e.key,i=e.value;switch(t){case n.DIFF_STATUS_UPDATED:r[o]=i;break;case n.DIFF_STATUS_REMOVED:Reflect.deleteProperty(r,o)}})),r};var n=r(5)},function(e,t,r){"use strict";function n(e){return function(e){if(Array.isArray(e)){for(var t=0,r=new Array(e.length);t<e.length;t++)r[t]=e[t];return r}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function o(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return 0===t.length?function(e){return e}:1===t.length?t[0]:t.reduce((function(e,t){return function(){return e(t.apply(void 0,arguments))}}))}Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){for(var t=arguments.length,r=new Array(t>1?t-1:0),i=1;i<t;i++)r[i-1]=arguments[i];var a=function(){throw new Error("Dispatching while constructing your middleware is not allowed. Other middleware would not be applied to this dispatch.")},c={getState:e.getState.bind(e),dispatch:function(){return a.apply(void 0,arguments)}};return r=(r||[]).map((function(e){return e(c)})),a=o.apply(void 0,n(r))(e.dispatch),e.dispatch=a,e}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n,o=r(3),i=r(4),a=r(6),c=(n=r(16))&&n.__esModule?n:{default:n};var u={portName:o.DEFAULT_PORT_NAME,dispatchResponder:function(e,t){Promise.resolve(e).then((function(e){t({error:null,value:e})})).catch((function(e){console.error("error dispatching result:",e),t({error:e.message,value:null})}))},serializer:i.noop,deserializer:i.noop,diffStrategy:c.default};t.default=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:u,r=t.portName,n=void 0===r?u.portName:r,c=t.dispatchResponder,s=void 0===c?u.dispatchResponder:c,l=t.serializer,f=void 0===l?u.serializer:l,p=t.deserializer,d=void 0===p?u.deserializer:p,y=t.diffStrategy,b=void 0===y?u.diffStrategy:y;if(!n)throw new Error("portName is required in options");if("function"!=typeof f)throw new Error("serializer must be a function");if("function"!=typeof d)throw new Error("deserializer must be a function");if("function"!=typeof b)throw new Error("diffStrategy must be one of the included diffing strategies or a custom diff function");var h=(0,a.getBrowserAPI)(),v=function(t,r,i){if(t.type===o.DISPATCH_TYPE&&t.portName===n){var a=Object.assign({},t.payload,{_sender:r}),c=null;try{c=e.dispatch(a)}catch(e){c=Promise.reject(e.message),console.error(e)}return s(c,i),!0}},O=function(t){if(t.name===n){var r=(0,i.withSerializer)(f)((function(){return t.postMessage.apply(t,arguments)})),a=e.getState(),c=e.subscribe((function(){var t=e.getState(),n=b(a,t);n.length&&(a=t,r({type:o.PATCH_STATE_TYPE,payload:n}))}));t.onDisconnect.addListener(c),r({type:o.STATE_TYPE,payload:a})}},g=(0,i.withDeserializer)(d),w=function(e){return e.type===o.DISPATCH_TYPE&&e.portName===n};g((function(){var e;return(e=h.runtime.onMessage).addListener.apply(e,arguments)}))(v,w),h.runtime.onMessageExternal?g((function(){var e;return(e=h.runtime.onMessageExternal).addListener.apply(e,arguments)}))(v,w):console.warn("runtime.onMessageExternal is not supported"),h.runtime.onConnect.addListener(O),h.runtime.onConnectExternal?h.runtime.onConnectExternal.addListener(O):console.warn("runtime.onConnectExternal is not supported"),h.tabs.query({},(function(e){var t=!0,r=!1,n=void 0;try{for(var o,i=e[Symbol.iterator]();!(t=(o=i.next()).done);t=!0){var a=o.value;h.tabs.sendMessage(a.id,{action:"storeReady"},(function(){chrome.runtime.lastError}))}}catch(e){r=!0,n=e}finally{try{t||null==i.return||i.return()}finally{if(r)throw n}}}))}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){var r=[];return Object.keys(t).forEach((function(o){e[o]!==t[o]&&r.push({key:o,value:t[o],change:n.DIFF_STATUS_UPDATED})})),Object.keys(e).forEach((function(e){t.hasOwnProperty(e)||r.push({key:e,change:n.DIFF_STATUS_REMOVED})})),r};var n=r(5)},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;t.default=function(e){return function(){return function(t){return function(r){var n=e[r.type];return t(n?n(r):r)}}}}},function(e,t,r){"use strict";r.r(t);var n=r(1),o=function(){return Math.random().toString(36).substring(7).split("").join(".")},i={INIT:"@@redux/INIT"+o(),REPLACE:"@@redux/REPLACE"+o(),PROBE_UNKNOWN_ACTION:function(){return"@@redux/PROBE_UNKNOWN_ACTION"+o()}};function a(e){if("object"!=typeof e||null===e)return!1;for(var t=e;null!==Object.getPrototypeOf(t);)t=Object.getPrototypeOf(t);return Object.getPrototypeOf(e)===t}function c(e,t){var r=t&&t.type;return"Given "+(r&&'action "'+String(r)+'"'||"an action")+', reducer "'+e+'" returned undefined. To ignore an action, you must explicitly return the previous state. If you want this reducer to hold no value, you can return null instead of undefined.'}var u=r(0),s=r.n(u);function l(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function f(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?l(Object(r),!0).forEach((function(t){s()(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var p={accountId:"",publicKey:"",privateKey:""};function d(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function y(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?d(Object(r),!0).forEach((function(t){s()(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):d(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var b={},h=JSON.parse(localStorage.getItem("DATA"));function v(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function O(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?v(Object(r),!0).forEach((function(t){s()(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):v(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var g={network:"testnet"};function w(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function P(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?w(Object(r),!0).forEach((function(t){s()(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):w(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var m={hashArray:null};function j(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function T(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?j(Object(r),!0).forEach((function(t){s()(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):j(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var E={bodyContent:""};function A(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function S(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?A(Object(r),!0).forEach((function(t){s()(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):A(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var _={update:""};function D(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function N(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?D(Object(r),!0).forEach((function(t){s()(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):D(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var I={currentAccountId:"",currentAccountName:"",accessToClient:!1};function C(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function k(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?C(Object(r),!0).forEach((function(t){s()(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):C(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var x={currentView:"",tokenToSend:{}};function R(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function M(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?R(Object(r),!0).forEach((function(t){s()(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):R(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var F={DATA:JSON.parse(localStorage.getItem("DATA"))};function U(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function K(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?U(Object(r),!0).forEach((function(t){s()(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):U(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var L={type:"",actionFromWeb:!1,dataFromWeb:{},actionToWeb:!1,dataToWeb:{}},z=function(e){for(var t=Object.keys(e),r={},n=0;n<t.length;n++){var o=t[n];0,"function"==typeof e[o]&&(r[o]=e[o])}var a,u=Object.keys(r);try{!function(e){Object.keys(e).forEach((function(t){var r=e[t];if(void 0===r(void 0,{type:i.INIT}))throw new Error('Reducer "'+t+"\" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined. If you don't want to set a value for this reducer, you can use null instead of undefined.");if(void 0===r(void 0,{type:i.PROBE_UNKNOWN_ACTION()}))throw new Error('Reducer "'+t+"\" returned undefined when probed with a random type. Don't try to handle "+i.INIT+' or other actions in "redux/*" namespace. They are considered private. Instead, you must return the current state for any unknown actions, unless it is undefined, in which case you must return the initial state, regardless of the action type. The initial state may not be undefined, but can be null.')}))}(r)}catch(e){a=e}return function(e,t){if(void 0===e&&(e={}),a)throw a;for(var n=!1,o={},i=0;i<u.length;i++){var s=u[i],l=r[s],f=e[s],p=l(f,t);if(void 0===p){var d=c(s,t);throw new Error(d)}o[s]=p,n=n||p!==f}return(n=n||u.length!==Object.keys(e).length)?o:e}}({account:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:p,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SAVE_ACCOUNT":return console.log("IN SAVE_ACCOUNT"),console.log("PAYLOAD",t),console.log("STATE",e),f({},e,{accountId:t.state.accountId,publicKey:t.state.publicKey,privateKey:t.state.privateKey});default:return e}},saveAccount:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:b,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"STORE_ACCOUNT":var r;console.log("IN STORE_ACCOUNT"),console.log("STORE_ACCOUNT PAYLOAD",t),console.log("STORE_ACCOUNT STATE",e),r=y({},e,{privateKey:t.state.privateKey,publicKey:t.state.publicKey,accountId:t.state.accountId});var n=t.state.DATA,o="ACCOUNT ".concat(n.listAccountsNames.length+1),i={name:o,accountId:r.accountId,publicKey:r.publicKey,privateKey:r.privateKey};return n.listAccountsNames.push(o),n.accounts.push(i),localStorage.setItem("DATA",JSON.stringify(n)),r;default:return e}},getLocalStorage:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:h;arguments.length>1&&arguments[1];return e},getNetwork:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:g,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"CHANGE_NETWORK":return console.log("IN CHANGE_NETWORK"),console.log("CHANGE_NETWORK PAYLOAD",t),alert(t),console.log("CHANGE_NETWORK STATE",e),O({},e,{network:t.state});default:return e}},saveWallet:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:m,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SAVE_WALLET":console.log("IN SAVE_WALLET"),console.log("PAYLOAD",t),console.log("STATE",e);var r=P({},e,{accountId:t.state.accountId,publicKey:t.state.publicKey,privateKey:t.state.privateKey,hashArray:t.state.hashArray}),n={passwordHash:r.hashArray[0],salt:r.hashArray[1],listAccountsNames:["ACCOUNT 1"],accounts:[{name:"ACCOUNT 1",accountId:r.accountId,publicKey:r.publicKey,privateKey:r.privateKey}],listTokensSymbols:[],tokens:[]};return localStorage.setItem("DATA",JSON.stringify(n)),r;default:return e}},changeBody:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:E,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"CHANGE_BODY":return console.log("CHANGE_BODY PAYLOAD",t),console.log("CHANGE_BODY STATE",e),T({},e,{bodyContent:t.state.bodyContent});default:return e}},updateState:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:_,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"UPDATE_STATE":return S({},e,{update:t.state.update});default:return e}},sendToContent:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:I,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SEND_TO_CONTENT":return N({},e,{currentAccountId:t.state.accountId,currentAccountName:t.state.accountName});case"ACCESS_TO_CLIENT":return N({},e,{accessToClient:t.state.accessToClient});default:return e}},gotoView:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:x,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"CHANGE_VIEW":return k({},e,{currentView:t.state.newView,tokenToSend:t.state.tokenToSend?t.state.tokenToSend:{}});default:return e}},localStorageUpdate:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:F,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"ADD_NEW_TOKEN":console.log("ADD_NEW_TOKEN ACTION",t);var r=t.state.DATA,n={tokenId:t.state.tokenId,tokenName:t.state.tokenName,tokenSymbol:t.state.tokenSymbol};return r.listTokensSymbols.push(n.tokenSymbol),r.tokens.push(n),localStorage.setItem("DATA",JSON.stringify(r)),M({},e);default:return e}},contentActions:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:L,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"RESET_CONTENT_ACTIONS":return K({},e,{type:"",actionFromWeb:!1,dataFromWeb:{},actionToWeb:!1,dataToWeb:{}});case"CALL_FUNCTION":return K({},e,{type:t.state.type,actionFromWeb:!0,actionToWeb:!1,dataFromWeb:t.state.dataFromWeb});case"FUNCTION_CALLED":return K({},e,{actionFromWeb:!1,actionToWeb:!0,dataToWeb:t.state.dataToWeb});default:return e}}}),W=r(8),Y=function e(t,r,o){var c;if("function"==typeof r&&"function"==typeof o||"function"==typeof o&&"function"==typeof arguments[3])throw new Error("It looks like you are passing several store enhancers to createStore(). This is not supported. Instead, compose them together to a single function.");if("function"==typeof r&&void 0===o&&(o=r,r=void 0),void 0!==o){if("function"!=typeof o)throw new Error("Expected the enhancer to be a function.");return o(e)(t,r)}if("function"!=typeof t)throw new Error("Expected the reducer to be a function.");var u=t,s=r,l=[],f=l,p=!1;function d(){f===l&&(f=l.slice())}function y(){if(p)throw new Error("You may not call store.getState() while the reducer is executing. The reducer has already received the state as an argument. Pass it down from the top reducer instead of reading it from the store.");return s}function b(e){if("function"!=typeof e)throw new Error("Expected the listener to be a function.");if(p)throw new Error("You may not call store.subscribe() while the reducer is executing. If you would like to be notified after the store has been updated, subscribe from a component and invoke store.getState() in the callback to access the latest state. See https://redux.js.org/api-reference/store#subscribelistener for more details.");var t=!0;return d(),f.push(e),function(){if(t){if(p)throw new Error("You may not unsubscribe from a store listener while the reducer is executing. See https://redux.js.org/api-reference/store#subscribelistener for more details.");t=!1,d();var r=f.indexOf(e);f.splice(r,1),l=null}}}function h(e){if(!a(e))throw new Error("Actions must be plain objects. Use custom middleware for async actions.");if(void 0===e.type)throw new Error('Actions may not have an undefined "type" property. Have you misspelled a constant?');if(p)throw new Error("Reducers may not dispatch actions.");try{p=!0,s=u(s,e)}finally{p=!1}for(var t=l=f,r=0;r<t.length;r++){(0,t[r])()}return e}function v(e){if("function"!=typeof e)throw new Error("Expected the nextReducer to be a function.");u=e,h({type:i.REPLACE})}function O(){var e,t=b;return(e={subscribe:function(e){if("object"!=typeof e||null===e)throw new TypeError("Expected the observer to be an object.");function r(){e.next&&e.next(y())}return r(),{unsubscribe:t(r)}}})[n.a]=function(){return this},e}return h({type:i.INIT}),(c={dispatch:h,subscribe:b,getState:y,replaceReducer:v})[n.a]=O,c}(z);Object(W.wrapStore)(Y)}]);
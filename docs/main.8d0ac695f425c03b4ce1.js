!function(e){function t(t){for(var n,o,c=t[0],s=t[1],i=t[2],d=0,f=[];d<c.length;d++)o=c[d],u[o]&&f.push(u[o][0]),u[o]=0;for(n in s)Object.prototype.hasOwnProperty.call(s,n)&&(e[n]=s[n]);for(l&&l(t);f.length;)f.shift()();return a.push.apply(a,i||[]),r()}function r(){for(var e,t=0;t<a.length;t++){for(var r=a[t],n=!0,c=1;c<r.length;c++){var s=r[c];0!==u[s]&&(n=!1)}n&&(a.splice(t--,1),e=o(o.s=r[0]))}return e}var n={},u={1:0},a=[];function o(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,o),r.l=!0,r.exports}o.m=e,o.c=n,o.d=function(e,t,r){o.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:r})},o.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="";var c=window.webpackJsonp=window.webpackJsonp||[],s=c.push.bind(c);c.push=t,c=c.slice();for(var i=0;i<c.length;i++)t(c[i]);var l=s;a.push([478,0]),r()}({130:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.add=t.ADD=void 0;var n=r(83),u=t.ADD=n.NAME+"/ADD";t.add=function(){return{type:u}}},131:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(201);Object.defineProperty(t,"fn",{enumerable:!0,get:function(){return o(n).default}});var u=r(200);Object.defineProperty(t,"number",{enumerable:!0,get:function(){return o(u).default}});var a=r(199);function o(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"types",{enumerable:!0,get:function(){return o(a).default}})},132:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.tick=t.TICK=void 0;var n=r(84),u=t.TICK=n.NAME+"/TICK";t.tick=function(){return{type:u}}},133:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n,u=r(84),a=r(132),o=r(203),c=(n=o)&&n.__esModule?n:{default:n};t.default={NAME:u.NAME,TICK_INTERVAL_MS:u.TICK_INTERVAL_MS,TICK:a.TICK,saga:c.default,tick:a.tick}},134:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getResourcesList=t.isFull=t.getPerSecond=t.getMax=t.getCurrent=void 0;var n=r(52),u=r(86);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var o=t.getCurrent=function(e,t){return e.getIn([u.NAME,"current",t],0)},c=(0,n.Map)(a({},u.QI,function(){return 5})),s=t.getMax=function(e,t){return c.get(t)(e)},i=(0,n.Map)(a({},u.QI,function(){return.5})),l=(t.getPerSecond=function(e,t){return i.get(t)(e)},t.isFull=function(e,t){return o(e,t)>=s(e,t)},(0,n.List)([u.QI]));t.getResourcesList=function(){return l}},145:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.loadMessages=t.MESSAGES_LOAD=void 0;var n=r(93),u=t.MESSAGES_LOAD=n.NAME+"/MESSAGES_LOAD";t.loadMessages=function(e){return{type:u,payload:e}}},186:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={main:"mediumseagreen"}},187:function(e,t){e.exports={"unit.second.short":"s","resource.qi":"Qi"}},188:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a(r(63)),u=a(r(133));function a(e){return e&&e.__esModule?e:{default:e}}t.default=[n.default,u.default].map(function(e){return e.saga})},189:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=s;var n,u=r(58),a=r(188),o=(n=a)&&n.__esModule?n:{default:n};var c=regeneratorRuntime.mark(s);function s(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,u.all)(o.default.map(u.fork));case 2:case"end":return e.stop()}},c,this)}},190:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a(r(63)),u=a(r(94));function a(e){return e&&e.__esModule?e:{default:e}}t.default=[n.default,u.default].reduce(function(e,t){return Object.assign({},e,(r={},n=t.NAME,u=t.reducer,n in r?Object.defineProperty(r,n,{value:u,enumerable:!0,configurable:!0,writable:!0}):r[n]=u,r));var r,n,u},{})},191:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(130);t.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;return arguments[1].type===n.ADD?e+1:e}},192:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getCount=void 0;var n=r(83);t.getCount=function(e){return e.get(n.NAME)}},193:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n,u=r(83),a=r(130),o=r(192),c=r(191),s=(n=c)&&n.__esModule?n:{default:n};t.default={NAME:u.NAME,add:a.add,getCount:o.getCount,reducer:s.default}},194:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n,u=r(193),a=(n=u)&&n.__esModule?n:{default:n};t.default=[a.default].reduce(function(e,t){return Object.assign({},e,(r={},n=t.NAME,u=t.reducer,n in r?Object.defineProperty(r,n,{value:u,enumerable:!0,configurable:!0,writable:!0}):r[n]=u,r));var r,n,u},{})},195:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},u=r(92),a=c(r(194)),o=c(r(190));function c(e){return e&&e.__esModule?e:{default:e}}t.default=(0,u.combineReducers)(n({},o.default,a.default))},196:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(122),u=c(r(127)),a=c(r(195)),o=c(r(189));function c(e){return e&&e.__esModule?e:{default:e}}var s=(0,u.default)(),i=(0,n.compose)((0,n.applyMiddleware)(s),window.devToolsExtension?window.devToolsExtension():function(e){return e});t.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=(0,n.createStore)(a.default,i);return e.forEach(t.dispatch),s.run(o.default),t}},197:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=c(r(12)),u=c(r(7)),a=c(r(143)),o=r(131);function c(e){return e&&e.__esModule?e:{default:e}}var s=function(e){var t=e.current,r=e.max,u=e.displayName,a=e.perSecond,o=e.msg,c=e.classes;return n.default.createElement("div",{className:c.container},n.default.createElement("span",null,u,": "),n.default.createElement("span",null,t,"/",r),n.default.createElement("span",null,"(",a,"/",o.secondShort,")"))};s.propTypes={current:u.default.string.isRequired,max:u.default.string.isRequired,perSecond:u.default.string.isRequired,displayName:u.default.string.isRequired,msg:o.types.msgProps(["secondShort"]).isRequired,classes:u.default.object.isRequired},t.default=(0,a.default)(function(e){return{container:{background:e.main}}})(s)},198:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(197);Object.defineProperty(t,"ResourceStatus",{enumerable:!0,get:function(){return(e=n,e&&e.__esModule?e:{default:e}).default;var e}})},199:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n,u=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},a=r(7),o=(n=a)&&n.__esModule?n:{default:n};t.default={msgProps:function(e){return o.default.shape(u({},e.reduce(function(e,t){return Object.assign(e,(r={},n=t,u=o.default.string.isRequired,n in r?Object.defineProperty(r,n,{value:u,enumerable:!0,configurable:!0,writable:!0}):r[n]=u,r));var r,n,u},{})))}}},200:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={formatInt:function(e){return Math.floor(e).toString()},formatFloat:function(e){return Number(e).toFixed(2).toString()}}},201:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={noop:function(){},identity:function(e){return e}}},202:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.Resource=void 0;var n=i(r(7)),u=r(129),a=i(r(94)),o=r(131),c=i(r(63)),s=r(198);function i(e){return e&&e.__esModule?e:{default:e}}var l=a.default.createGetMessages({secondShort:"unit.second.short"});(t.Resource=(0,u.connect)(function(e,t){var r=t.resource;return{current:c.default.getCurrent(e,r),max:c.default.getMax(e,r),perSecond:c.default.getPerSecond(e,r),displayName:a.default.getMessage(e,r),msg:l(e)}},void 0,function(e){var t=e.current,r=e.max,n=e.perSecond,u=e.displayName,a=e.msg;return{current:o.number.formatInt(t),max:o.number.formatInt(r),perSecond:o.number.formatFloat(n),displayName:u,msg:a}})(s.ResourceStatus)).propTypes={resource:n.default.string.isRequired}},203:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=i;var n=r(127),u=r(58),a=r(84),o=r(132),c=regeneratorRuntime.mark(i),s=regeneratorRuntime.mark(l);function i(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,u.fork)(l);case 2:case"end":return e.stop()}},c,this)}function l(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,u.put)((0,o.tick)());case 2:return e.next=4,(0,u.call)(n.delay,a.TICK_INTERVAL_MS);case 4:e.next=0;break;case 6:case"end":return e.stop()}},s,this)}},204:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(){return function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function(e,t){var r=[],n=!0,u=!1,a=void 0;try{for(var o,c=e[Symbol.iterator]();!(n=(o=c.next()).done)&&(r.push(o.value),!t||r.length!==t);n=!0);}catch(e){u=!0,a=e}finally{try{!n&&c.return&&c.return()}finally{if(u)throw a}}return r}(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();t.default=v;var u,a=r(58),o=r(52),c=r(133),s=(u=c)&&u.__esModule?u:{default:u},i=r(85),l=r(134);var d=regeneratorRuntime.mark(v),f=regeneratorRuntime.mark(_),p=regeneratorRuntime.mark(M);function v(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,a.takeEvery)(i.ADD,_);case 2:return e.next=4,(0,a.takeEvery)(s.default.TICK,M);case 4:case"end":return e.stop()}},d,this)}function _(e){var t,r,u,c,s,d=e.payload,p=e.meta;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,a.all)([(0,a.select)(l.getCurrent,p.resource),(0,a.select)(l.getMax,p.resource)]);case 2:return t=e.sent,r=n(t,2),u=r[0],c=r[1],s=Math.min(u+d,c),e.next=9,(0,a.put)((0,i.setBulk)((0,o.Map)((f={},v=p.resource,_=s,v in f?Object.defineProperty(f,v,{value:_,enumerable:!0,configurable:!0,writable:!0}):f[v]=_,f))));case 9:case"end":return e.stop()}var f,v,_},f,this)}function M(){var e,t,r,n,u;return regeneratorRuntime.wrap(function(c){for(;;)switch(c.prev=c.next){case 0:return c.next=2,(0,a.select)(l.getResourcesList);case 2:return e=c.sent.toJS(),c.next=5,(0,a.all)(e.map(function(e){return(0,a.select)(l.getCurrent,e)}));case 5:return t=c.sent,c.next=8,(0,a.all)(e.map(function(e){return(0,a.select)(l.getPerSecond,e)}));case 8:return r=c.sent,c.next=11,(0,a.all)(e.map(function(e){return(0,a.select)(l.getMax,e)}));case 11:if(n=c.sent,(u=e.reduce(function(e,u,a){var o=r[a]*(s.default.TICK_INTERVAL_MS/1e3);return t[a]>=n[a]?e:e.set(u,Math.min(o+t[a],n[a]))},(0,o.Map)())).isEmpty()){c.next=16;break}return c.next=16,(0,a.put)((0,i.setBulk)(u));case 16:case"end":return c.stop()}},p,this)}},205:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(92),u=r(52),a=r(85);t.default=(0,n.combineReducers)({current:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:(0,u.Map)(),t=arguments[1],r=t.type,n=t.payload;switch(r){case a.SET_BULK:return e.merge(n);default:return e}}})},209:function(e,t,r){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0});var n=c(r(12)),u=r(207),a=c(r(63)),o=r(202);function c(e){return e&&e.__esModule?e:{default:e}}t.default=(0,u.hot)(e)(function(){return n.default.createElement("div",null,n.default.createElement(o.Resource,{resource:a.default.QI}))})}).call(this,r(208)(e))},256:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=c(r(12)),u=r(129),a=r(143),o=c(r(209));function c(e){return e&&e.__esModule?e:{default:e}}t.default=function(e){var t=e.store,r=e.theme;return n.default.createElement(u.Provider,{store:t},n.default.createElement(a.ThemeProvider,{theme:r},n.default.createElement(o.default,null)))}},261:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(52),u=r(92),a=r(145);t.default=(0,u.combineReducers)({messages:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:(0,n.Map)(),t=arguments[1];switch(t.type){case a.MESSAGES_LOAD:return e.merge((0,n.fromJS)(t.payload));default:return e}}})},263:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.createGetMessages=t.getMessage=void 0;var n=r(262),u=r(93),a=t.getMessage=function(e,t){var r=function(e){return e.get(u.NAME)}(e).getIn(["messages",t]);return r||"["+t+"]"};t.createGetMessages=function(e){var t={};return Object.keys(e).forEach(function(r){t[r]=function(t){return a(t,e[r])}}),(0,n.createStructuredSelector)(t)}},275:function(e,t,r){"use strict";var n=l(r(12)),u=r(273),a=l(r(94)),o=l(r(256)),c=l(r(196)),s=l(r(187)),i=l(r(186));function l(e){return e&&e.__esModule?e:{default:e}}var d,f=(0,c.default)([a.default.loadMessages(s.default)]);d=o.default,(0,u.render)(n.default.createElement(d,{store:f,theme:i.default}),document.querySelector("#app"))},478:function(e,t,r){r(477),e.exports=r(275)},63:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(86),u=r(85),a=r(134),o=s(r(205)),c=s(r(204));function s(e){return e&&e.__esModule?e:{default:e}}t.default={NAME:n.NAME,reducer:o.default,saga:c.default,QI:n.QI,getCurrent:a.getCurrent,getMax:a.getMax,getPerSecond:a.getPerSecond,isFull:a.isFull,add:u.add}},83:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.NAME="pokus"},84:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.NAME="core-time",t.TICK_INTERVAL_MS=1e3},85:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.setBulk=t.add=t.SET_BULK=t.ADD=void 0;var n=r(86),u=t.ADD=n.NAME+"/ADD",a=t.SET_BULK=n.NAME+"/BULK";t.add=function(e,t){return{type:u,meta:{resource:e},payload:t}},t.setBulk=function(e){return{type:a,payload:e}}},86:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.NAME="core-resources",t.QI="resource.qi"},93:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.NAME="core-i18n"},94:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n,u=r(93),a=r(263),o=r(261),c=(n=o)&&n.__esModule?n:{default:n},s=r(145);var i={NAME:u.NAME,getMessage:a.getMessage,createGetMessages:a.createGetMessages,loadMessages:s.loadMessages,reducer:c.default};t.default=i}});
//# sourceMappingURL=main.8d0ac695f425c03b4ce1.js.map
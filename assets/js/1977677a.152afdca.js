"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[6804],{3905:function(e,t,r){r.d(t,{Zo:function(){return u},kt:function(){return b}});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function c(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var l=n.createContext({}),p=function(e){var t=n.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},u=function(e){var t=p(e.components);return n.createElement(l.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,u=c(e,["components","mdxType","originalType","parentName"]),d=p(r),b=a,m=d["".concat(l,".").concat(b)]||d[b]||s[b]||o;return r?n.createElement(m,i(i({ref:t},u),{},{components:r})):n.createElement(m,i({ref:t},u))}));function b(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,i=new Array(o);i[0]=d;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c.mdxType="string"==typeof e?e:a,i[1]=c;for(var p=2;p<o;p++)i[p]=r[p];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}d.displayName="MDXCreateElement"},6502:function(e,t,r){r.r(t),r.d(t,{assets:function(){return u},contentTitle:function(){return l},default:function(){return b},frontMatter:function(){return c},metadata:function(){return p},toc:function(){return s}});var n=r(7462),a=r(3366),o=(r(7294),r(3905)),i=["components"],c={},l="PlaybackErrorEvent",p={unversionedId:"api/objects/playback-error-event",id:"version-4.0/api/objects/playback-error-event",title:"PlaybackErrorEvent",description:"An object denoting a playback error encountered during loading or playback of a",source:"@site/versioned_docs/version-4.0/api/objects/playback-error-event.md",sourceDirName:"api/objects",slug:"/api/objects/playback-error-event",permalink:"/docs/4.0/api/objects/playback-error-event",editUrl:"https://github.com/doublesymmetry/react-native-track-player/tree/main/docs/versioned_docs/version-4.0/api/objects/playback-error-event.md",tags:[],version:"4.0",frontMatter:{},sidebar:"app",previous:{title:"AudioMetadataReceivedEvent",permalink:"/docs/4.0/api/objects/metadata"},next:{title:"PlaybackState",permalink:"/docs/4.0/api/objects/playback-state"}},u={},s=[],d={toc:s};function b(e){var t=e.components,r=(0,a.Z)(e,i);return(0,o.kt)("wrapper",(0,n.Z)({},d,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"playbackerrorevent"},"PlaybackErrorEvent"),(0,o.kt)("p",null,"An object denoting a playback error encountered during loading or playback of a\ntrack."),(0,o.kt)("table",null,(0,o.kt)("thead",{parentName:"table"},(0,o.kt)("tr",{parentName:"thead"},(0,o.kt)("th",{parentName:"tr",align:null},"Property"),(0,o.kt)("th",{parentName:"tr",align:null},"Type"),(0,o.kt)("th",{parentName:"tr",align:null},"Description"))),(0,o.kt)("tbody",{parentName:"table"},(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},"code"),(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"string")),(0,o.kt)("td",{parentName:"tr",align:null},"The code values are strings prefixed with ",(0,o.kt)("inlineCode",{parentName:"td"},"android_")," on Android and ",(0,o.kt)("inlineCode",{parentName:"td"},"ios_")," on iOS.")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},"message"),(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"string")),(0,o.kt)("td",{parentName:"tr",align:null},"The error message emitted by the native player.")))))}b.isMDXComponent=!0}}]);
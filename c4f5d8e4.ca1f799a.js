(window.webpackJsonp=window.webpackJsonp||[]).push([[35],{132:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return v}));var n=a(0),r=a.n(n),o=a(155),c=a(149),l=a(184),s=a.n(l),i=a(8),u=a.n(i),d=a(150),m=a(152),h=a.n(m),f=a(153),b=a(151);function g({imageUrl:e,title:t=null,description:a=null}={}){const n=Object(d.a)(e);return r.a.createElement("div",{className:h()("col col--4",s.a.feature)},!!n&&r.a.createElement("div",{className:"text--center"},r.a.createElement("img",{className:s.a.featureImage,src:n,alt:t})),r.a.createElement("h3",null,t),r.a.createElement("p",null,a))}function p(){const{isDarkTheme:e}=Object(f.a)(),{siteConfig:t}=Object(c.a)(),[a,o]=Object(n.useState)(void 0);Object(n.useEffect)(()=>{e!==a&&o(e)},[e,o]);const l=void 0===a?"":a?s.a.heroBanner:s.a.heroBannerLight;return r.a.createElement("header",{key:e?"dark":"light",className:h()("hero hero--primary",l,s.a.banner)},r.a.createElement("div",{className:s.a.headerOverlay}),r.a.createElement("div",{className:"container"},r.a.createElement("h1",{className:"hero__title"},t.title),r.a.createElement("p",{className:"hero__subtitle"},t.tagline),r.a.createElement("div",{className:s.a.buttons},r.a.createElement(b.a,{className:h()("button button--outline button--secondary button--lg",s.a.getStarted),to:Object(d.a)("docs/skeleton/skeleton_about")},"Get Started"))))}function v(){const e=Object(c.a)(),{siteConfig:t={}}=e;return r.a.createElement(o.a,{title:t.title,description:t.tagline},r.a.createElement(p,null),r.a.createElement("main",null,r.a.createElement("section",{className:s.a.features},r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"row"},[{title:"Easy to Use",description:"It was build to provide the most suitable API for front-end development. That is easy to use and configure."},{title:"Focus on What Matters",description:"We tried to solve most common problems, to give you extra time for styling and animations."},{title:"Stop dublicating code",description:"Our architecture rules and build-in modules help you to stop dublicating same code."},{title:"Stop making same errors",description:"We provide crossbrowser support. And our modules helps you to do not make same errors."},{title:"Cross platform",description:"You can use this toolkit for MPA, SPA and Mobile ( React-Native ) projects."},{title:"Best practices",description:"We are using best practices and newest technologies."}].map(({title:e,imageUrl:t,description:a}={})=>r.a.createElement(g,{key:e,title:e,imageUrl:t,description:a})))))),r.a.createElement("div",{className:s.a.overlay}))}g.propTypes={imageUrl:u.a.string,title:u.a.string,description:u.a.string},g.defaultProps={imageUrl:void 0,title:"",description:""}},153:function(e,t,a){"use strict";var n=a(0),r=a(160);t.a=function(){return Object(n.useContext)(r.a)}},155:function(e,t,a){"use strict";a.d(t,"a",(function(){return X}));var n=a(0),r=a.n(n),o=a(169),c=a(154),l=a(149),s=a(150),i=a(166),u=a(165),d=a(163),m=a(1),h=a(152),f=a.n(h),b=a(151),g=a(167),p=a(164),v=a(153),k=a(168),E=a(161),_=a(162),y=a(8),O=a.n(y);function j({activeBasePath:e,to:t,href:a,label:n,position:o,...c}){const l=Object(s.a)(t),i=Object(s.a)(e);return r.a.createElement(b.a,Object(m.a)({},a?{target:"_blank",rel:"noopener noreferrer",href:a}:{activeClassName:"navbar__link--active",to:l,...e?{isActive:(e,t)=>t.pathname.startsWith(i)}:null},c),n)}function C({items:e,position:t,...a}){return e?r.a.createElement("div",{className:f()("navbar__item","dropdown","dropdown--hoverable",{"dropdown--left":"left"===t,"dropdown--right":"right"===t})},r.a.createElement(j,Object(m.a)({className:"navbar__item navbar__link"},a),a.label),r.a.createElement("ul",{className:"dropdown__menu"},e.map((e,t)=>r.a.createElement("li",{key:t},r.a.createElement(j,Object(m.a)({className:"navbar__item navbar__link"},e)))))):r.a.createElement(j,Object(m.a)({className:"navbar__item navbar__link"},a))}function w({items:e,...t}){return e?r.a.createElement("li",{className:"menu__list-item"},r.a.createElement(j,Object(m.a)({className:"menu__link menu__link--sublist"},t),t.label),r.a.createElement("ul",{className:"menu__list"},e.map((e,t)=>r.a.createElement("li",{className:"menu__list-item",key:t},r.a.createElement(j,Object(m.a)({className:"menu__link"},e)))))):r.a.createElement("li",{className:"menu__list-item"},r.a.createElement(j,Object(m.a)({className:"menu__link"},t)))}j.propTypes={activeBasePath:O.a.string,to:O.a.string,href:O.a.string,position:O.a.oneOf(["left","right"]),label:O.a.string},j.defaultProps={activeBasePath:void 0,href:void 0,to:void 0,position:void 0,label:void 0},C.propTypes={items:O.a.array,position:O.a.oneOf(["left","right"]),label:O.a.string},C.defaultProps={items:[],position:void 0,label:""},w.propTypes={items:O.a.array,label:O.a.string},w.defaultProps={items:[],label:""};var N=a(156),T=a.n(N);function S(){const{siteConfig:{themeConfig:{navbar:{title:e,links:t=[],hideOnScroll:a=!1}={},disableDarkMode:o=!1}},isClient:c}=Object(l.a)(),[s,i]=Object(n.useState)(!1),[u,d]=Object(n.useState)(!1),{isDarkTheme:h,setLightTheme:y,setDarkTheme:O}=Object(v.a)(),{navbarRef:j,isNavbarVisible:N}=Object(k.a)(a),{logoLink:S,logoLinkProps:P,logoAlt:L}=Object(_.a)();Object(E.a)(s);const x=Object(n.useCallback)(()=>{i(!0)},[i]),B=Object(n.useCallback)(()=>{i(!1)},[i]),M=Object(n.useCallback)(e=>e.target.checked?O():y(),[y,O]),I=h?"/bones/img/logo_white.svg":"/bones/img/logo.svg";return r.a.createElement("nav",{ref:j,className:f()("navbar","navbar--light","navbar--fixed-top",{"navbar-sidebar--show":s,[T.a.navbarHideable]:a,[T.a.navbarHidden]:!N})},r.a.createElement("div",{className:"navbar__inner"},r.a.createElement("div",{className:"navbar__items"},r.a.createElement("div",{"aria-label":"Navigation bar toggle",className:"navbar__toggle",role:"button",tabIndex:0,onClick:x,onKeyDown:x},r.a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"30",height:"30",viewBox:"0 0 30 30",role:"img",focusable:"false"},r.a.createElement("title",null,"Menu"),r.a.createElement("path",{stroke:"currentColor",strokeLinecap:"round",strokeMiterlimit:"10",strokeWidth:"2",d:"M4 7h22M4 15h22M4 23h22"}))),r.a.createElement(b.a,Object(m.a)({className:"navbar__brand",to:S},P),null!=I&&r.a.createElement("img",{key:c,className:"navbar__logo",src:I,alt:L})),t.filter(e=>"left"===e.position).map((e,t)=>r.a.createElement(C,Object(m.a)({},e,{key:t})))),r.a.createElement("div",{className:"navbar__items navbar__items--right"},t.filter(e=>"right"===e.position).map((e,t)=>r.a.createElement(C,Object(m.a)({},e,{key:t}))),!o&&r.a.createElement(p.a,{className:T.a.displayOnlyInLargeViewport,"aria-label":"Dark mode toggle",checked:h,onChange:M}),r.a.createElement(g.a,{handleSearchBarToggle:d,isSearchBarExpanded:u}))),r.a.createElement("div",{role:"presentation",className:"navbar-sidebar__backdrop",onClick:B}),r.a.createElement("div",{className:"navbar-sidebar"},r.a.createElement("div",{className:"navbar-sidebar__brand"},r.a.createElement(b.a,Object(m.a)({className:"navbar__brand",onClick:B,to:S},P),null!=I&&r.a.createElement("img",{key:c,className:"navbar__logo",src:I,alt:L})),!o&&s&&r.a.createElement(p.a,{"aria-label":"Dark mode toggle in sidebar",checked:h,onChange:M})),r.a.createElement("div",{className:"navbar-sidebar__items"},r.a.createElement("div",{className:"menu"},r.a.createElement("ul",{className:"menu__list"},t.map((e,t)=>r.a.createElement(w,Object(m.a)({},e,{onClick:B,key:t}))))))))}var P=a(157),L=a.n(P);function x({to:e,href:t,label:a,icon:n,noTitle:o,...c}){const l=Object(s.a)(e);return t?r.a.createElement(b.a,Object(m.a)({},c,{target:"_blank",rel:"noopener noreferrer",href:t,className:"footer__link-item "+L.a.linkItem}),!!n&&r.a.createElement("i",{className:`${n} ${L.a.icon}`}),!o&&a):r.a.createElement(b.a,Object(m.a)({},c,{target:"_blank",className:"footer__link-item "+L.a.linkItem,to:l}),n&&r.a.createElement("i",{className:`${n} ${L.a.icon}`}),!o&&a)}x.propTypes={to:O.a.string,href:O.a.string,label:O.a.string,icon:O.a.string,noTitle:O.a.bool},x.defaultProps={to:"",href:"",label:"",icon:"",noTitle:!1};var B=a(158),M=a.n(B);function I(){return Array.from(arguments).filter(Boolean).join(" ")}function D(){const e=Object(l.a)(),{siteConfig:t={}}=e,{themeConfig:a={}}=t,{footer:o}=a,{links:c=[],logo:i={}}=o||{},u=Object(n.useMemo)(()=>c.map(e=>r.a.createElement(x,Object(m.a)({key:e.label},e))),[c]);return r.a.createElement("footer",{className:I("footer",M.a.footer)},r.a.createElement("div",{className:I("container",M.a.logoContainer)},r.a.createElement("a",{href:i.href,target:"_blank",rel:"noopener noreferrer",className:M.a.logo},r.a.createElement("img",{src:Object(s.a)("img/logo_white.svg"),alt:i.alt})),r.a.createElement("p",{className:M.a.copyright},"Copyright \xa9 2020 alexgu4enko. All rights reserved.")),r.a.createElement("div",{className:M.a.footerLinks},r.a.createElement("div",null,u)))}a(159);function X({children:e,title:t,description:a,image:n,keywords:m,permalink:h,version:f}){const{siteConfig:b={}}=Object(l.a)(),{favicon:g,title:p,themeConfig:{image:v},url:k}=b||{},E=t?`${t} | ${p}`:p,_=n||v;let y=k+Object(s.a)(_);Object(c.a)(_)||(y=_);const O=Object(s.a)(g);return r.a.createElement(i.a,null,r.a.createElement(u.a,null,r.a.createElement(o.a,null,r.a.createElement("html",{lang:"en"}),!!E&&r.a.createElement("title",null,E),!!E&&r.a.createElement("meta",{property:"og:title",content:E}),!!g&&r.a.createElement("link",{rel:"shortcut icon",href:O}),!!a&&r.a.createElement("meta",{name:"description",content:a}),!!a&&r.a.createElement("meta",{property:"og:description",content:a}),!!f&&r.a.createElement("meta",{name:"docsearch:version",content:f}),!!m&&m.length&&r.a.createElement("meta",{name:"keywords",content:m.join(",")}),!!_&&r.a.createElement("meta",{property:"og:image",content:y}),!!_&&r.a.createElement("meta",{property:"twitter:image",content:y}),!!_&&r.a.createElement("meta",{name:"twitter:image:alt",content:"Image for "+E}),h&&r.a.createElement("meta",{property:"og:url",content:k+h}),r.a.createElement("meta",{name:"twitter:card",content:"summary_large_image"})),r.a.createElement(d.a,null),r.a.createElement(S,null),r.a.createElement("div",{className:"main-wrapper"},e),r.a.createElement(D,null)))}},156:function(e,t,a){e.exports={displayOnlyInLargeViewport:"displayOnlyInLargeViewport_fMrT",hideLogoText:"hideLogoText_3V_S",navbarHideable:"navbarHideable_365A",navbarHidden:"navbarHidden_3Pj8"}},157:function(e,t,a){e.exports={title:"title_3_wM",wrapper:"wrapper_32RU",icon:"icon_moPa",linkItem:"linkItem_3uQP",items:"items_3JX_"}},158:function(e,t,a){e.exports={footer:"footer_FBdE",copyright:"copyright_2eY0",logo:"logo_3PPs",logoContainer:"logoContainer_3GMH",footerLinks:"footerLinks_i5Og"}},159:function(e,t,a){},160:function(e,t,a){"use strict";var n=a(0);const r=a.n(n).a.createContext({isDarkTheme:!1,setLightTheme:()=>{},setDarkTheme:()=>{}});t.a=r},161:function(e,t,a){"use strict";var n=a(0);t.a=function(e=!0){Object(n.useEffect)(()=>(document.body.style.overflow=e?"hidden":"visible",()=>{document.body.style.overflow="visible"}),[e])}},162:function(e,t,a){"use strict";var n=a(149),r=a(153),o=a(150),c=a(154);t.a=()=>{const{siteConfig:{baseUrl:e,themeConfig:{navbar:{logo:t={}}={}}}={}}=Object(n.a)(),{isDarkTheme:a}=Object(r.a)(),l=t.href||e;let s={};t.target?s={target:t.target}:Object(c.a)(l)||(s={rel:"noopener noreferrer",target:"_blank"});const i=t.srcDark&&a?t.srcDark:t.src;return{logoLink:l,logoLinkProps:s,logoImageUrl:Object(o.a)(i),logoAlt:t.alt}}},163:function(e,t,a){"use strict";var n=a(0),r=a.n(n),o=a(149),c=a(93),l=a.n(c);t.a=function(){const{siteConfig:{themeConfig:{announcementBar:e={}}}={}}=Object(o.a)(),{id:t,content:a,backgroundColor:c,textColor:s}=e,[i,u]=Object(n.useState)(!0);return Object(n.useEffect)(()=>{const e=localStorage.getItem("docusaurus.announcement.id"),a=t!==e;localStorage.setItem("docusaurus.announcement.id",t),a&&localStorage.setItem("docusaurus.announcement.dismiss",!1),(a||"false"===localStorage.getItem("docusaurus.announcement.dismiss"))&&u(!1)},[]),!a||i?null:r.a.createElement("div",{className:l.a.announcementBar,style:{backgroundColor:c,color:s},role:"banner"},r.a.createElement("div",{className:l.a.announcementBarContent,dangerouslySetInnerHTML:{__html:a}}),r.a.createElement("button",{type:"button",className:l.a.announcementBarClose,onClick:()=>{localStorage.setItem("docusaurus.announcement.dismiss",!0),u(!0)},"aria-label":"Close"},r.a.createElement("span",{"aria-hidden":"true"},"\xd7")))}},164:function(e,t,a){"use strict";var n=a(1),r=a(0),o=a.n(r),c=a(171),l=a.n(c),s=a(149),i=a(152),u=a.n(i),d=a(94),m=a.n(d);const h=()=>o.a.createElement("span",{className:u()(m.a.toggle,m.a.moon)}),f=()=>o.a.createElement("span",{className:u()(m.a.toggle,m.a.sun)});t.a=function(e){const{isClient:t}=Object(s.a)();return o.a.createElement(l.a,Object(n.a)({disabled:!t,icons:{checked:o.a.createElement(h,null),unchecked:o.a.createElement(f,null)}},e))}},165:function(e,t,a){"use strict";var n=a(0),r=a.n(n);var o=()=>{const[e,t]=Object(n.useState)({}),a=Object(n.useCallback)((e,t)=>{try{localStorage.setItem("docusaurus.tab."+e,t)}catch(a){console.error(a)}},[]);return Object(n.useEffect)(()=>{try{const e={};for(let t=0;t<localStorage.length;t+=1){const a=localStorage.key(t);if(a.startsWith("docusaurus.tab.")){e[a.substring("docusaurus.tab.".length)]=localStorage.getItem(a)}}t(e)}catch(e){console.error(e)}},[]),{tabGroupChoices:e,setTabGroupChoices:(e,n)=>{t(t=>({...t,[e]:n})),a(e,n)}}};var c=Object(n.createContext)({tabGroupChoices:{},setTabGroupChoices:()=>{}});t.a=function(e){const{tabGroupChoices:t,setTabGroupChoices:a}=o();return r.a.createElement(c.Provider,{value:{tabGroupChoices:t,setTabGroupChoices:a}},e.children)}},166:function(e,t,a){"use strict";var n=a(0),r=a.n(n),o=a(149);const c="",l="dark";var s=()=>{const{siteConfig:{themeConfig:{disableDarkMode:e}}={}}=Object(o.a)(),[t,a]=Object(n.useState)("undefined"!=typeof document?document.documentElement.getAttribute("data-theme"):c),r=Object(n.useCallback)(e=>{try{localStorage.setItem("theme",e)}catch(t){console.error(t)}},[a]),s=Object(n.useCallback)(()=>{a(c),r(c)},[]),i=Object(n.useCallback)(()=>{a(l),r(l)},[]);return Object(n.useEffect)(()=>{document.documentElement.setAttribute("data-theme",t)},[t]),Object(n.useEffect)(()=>{if(!e)try{const e=localStorage.getItem("theme");null!==e&&a(e)}catch(t){console.error(t)}},[a]),Object(n.useEffect)(()=>{e||window.matchMedia("(prefers-color-scheme: dark)").addListener(({matches:e})=>{a(e?l:c)})},[]),{isDarkTheme:t===l,setLightTheme:s,setDarkTheme:i}},i=a(160);t.a=function(e){const{isDarkTheme:t,setLightTheme:a,setDarkTheme:n}=s();return r.a.createElement(i.a.Provider,{value:{isDarkTheme:t,setLightTheme:a,setDarkTheme:n}},e.children)}},167:function(e,t,a){"use strict";a.d(t,"a",(function(){return n}));var n=function(){return null}},168:function(e,t,a){"use strict";var n=a(0),r=a(170);var o=function(e){const[t,a]=Object(n.useState)(e);return Object(n.useEffect)(()=>{const e=()=>a(window.location.hash);return window.addEventListener("hashchange",e),()=>window.removeEventListener("hashchange",e)},[]),[t,a]};t.a=e=>{const[t,a]=Object(n.useState)(!0),[c,l]=Object(n.useState)(!1),[s,i]=Object(n.useState)(0),[u,d]=Object(n.useState)(0),m=Object(n.useCallback)(e=>{null!==e&&d(e.getBoundingClientRect().height)},[]),h=Object(r.b)(),[f,b]=o(h.hash),g=()=>{const e=window.pageYOffset||document.documentElement.scrollTop;if(0===e&&a(!0),e<u)return;if(c)return l(!1),a(!1),void i(e);const t=document.documentElement.scrollHeight-u,n=window.innerHeight;s&&e>=s?a(!1):e+n<t&&a(!0),i(e)};return Object(n.useEffect)(()=>{if(e)return window.addEventListener("scroll",g),()=>{window.removeEventListener("scroll",g)}},[s,u]),Object(n.useEffect)(()=>{e&&(a(!0),b(h.hash))},[h]),Object(n.useEffect)(()=>{e&&f&&l(!0)},[f]),{navbarRef:m,isNavbarVisible:t}}},170:function(e,t,a){"use strict";var n=a(19);a.d(t,"a",(function(){return n.c})),a.d(t,"b",(function(){return n.d}))},171:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e},r=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),o=a(0),c=m(o),l=m(a(152)),s=m(a(8)),i=m(a(172)),u=m(a(173)),d=a(174);function m(e){return e&&e.__esModule?e:{default:e}}var h=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var a=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return a.handleClick=a.handleClick.bind(a),a.handleTouchStart=a.handleTouchStart.bind(a),a.handleTouchMove=a.handleTouchMove.bind(a),a.handleTouchEnd=a.handleTouchEnd.bind(a),a.handleFocus=a.handleFocus.bind(a),a.handleBlur=a.handleBlur.bind(a),a.previouslyChecked=!(!e.checked&&!e.defaultChecked),a.state={checked:!(!e.checked&&!e.defaultChecked),hasFocus:!1},a}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),r(t,[{key:"componentDidUpdate",value:function(e){e.checked!==this.props.checked&&this.setState({checked:!!this.props.checked})}},{key:"handleClick",value:function(e){var t=this.input;if(e.target!==t&&!this.moved)return this.previouslyChecked=t.checked,e.preventDefault(),t.focus(),void t.click();var a=this.props.hasOwnProperty("checked")?this.props.checked:t.checked;this.setState({checked:a})}},{key:"handleTouchStart",value:function(e){this.startX=(0,d.pointerCoord)(e).x,this.activated=!0}},{key:"handleTouchMove",value:function(e){if(this.activated&&(this.moved=!0,this.startX)){var t=(0,d.pointerCoord)(e).x;this.state.checked&&t+15<this.startX?(this.setState({checked:!1}),this.startX=t,this.activated=!0):t-15>this.startX&&(this.setState({checked:!0}),this.startX=t,this.activated=t<this.startX+5)}}},{key:"handleTouchEnd",value:function(e){if(this.moved){var t=this.input;if(e.preventDefault(),this.startX){var a=(0,d.pointerCoord)(e).x;!0===this.previouslyChecked&&this.startX+4>a?this.previouslyChecked!==this.state.checked&&(this.setState({checked:!1}),this.previouslyChecked=this.state.checked,t.click()):this.startX-4<a&&this.previouslyChecked!==this.state.checked&&(this.setState({checked:!0}),this.previouslyChecked=this.state.checked,t.click()),this.activated=!1,this.startX=null,this.moved=!1}}}},{key:"handleFocus",value:function(e){var t=this.props.onFocus;t&&t(e),this.setState({hasFocus:!0})}},{key:"handleBlur",value:function(e){var t=this.props.onBlur;t&&t(e),this.setState({hasFocus:!1})}},{key:"getIcon",value:function(e){var a=this.props.icons;return a?void 0===a[e]?t.defaultProps.icons[e]:a[e]:null}},{key:"render",value:function(){var e=this,t=this.props,a=t.className,r=(t.icons,function(e,t){var a={};for(var n in e)t.indexOf(n)>=0||Object.prototype.hasOwnProperty.call(e,n)&&(a[n]=e[n]);return a}(t,["className","icons"])),o=(0,l.default)("react-toggle",{"react-toggle--checked":this.state.checked,"react-toggle--focus":this.state.hasFocus,"react-toggle--disabled":this.props.disabled},a);return c.default.createElement("div",{className:o,onClick:this.handleClick,onTouchStart:this.handleTouchStart,onTouchMove:this.handleTouchMove,onTouchEnd:this.handleTouchEnd},c.default.createElement("div",{className:"react-toggle-track"},c.default.createElement("div",{className:"react-toggle-track-check"},this.getIcon("checked")),c.default.createElement("div",{className:"react-toggle-track-x"},this.getIcon("unchecked"))),c.default.createElement("div",{className:"react-toggle-thumb"}),c.default.createElement("input",n({},r,{ref:function(t){e.input=t},onFocus:this.handleFocus,onBlur:this.handleBlur,className:"react-toggle-screenreader-only",type:"checkbox"})))}}]),t}(o.PureComponent);t.default=h,h.displayName="Toggle",h.defaultProps={icons:{checked:c.default.createElement(i.default,null),unchecked:c.default.createElement(u.default,null)}},h.propTypes={checked:s.default.bool,disabled:s.default.bool,defaultChecked:s.default.bool,onChange:s.default.func,onFocus:s.default.func,onBlur:s.default.func,className:s.default.string,name:s.default.string,value:s.default.string,id:s.default.string,"aria-labelledby":s.default.string,"aria-label":s.default.string,icons:s.default.oneOfType([s.default.bool,s.default.shape({checked:s.default.node,unchecked:s.default.node})])}},172:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n,r=a(0),o=(n=r)&&n.__esModule?n:{default:n};t.default=function(){return o.default.createElement("svg",{width:"14",height:"11",viewBox:"0 0 14 11"},o.default.createElement("title",null,"switch-check"),o.default.createElement("path",{d:"M11.264 0L5.26 6.004 2.103 2.847 0 4.95l5.26 5.26 8.108-8.107L11.264 0",fill:"#fff",fillRule:"evenodd"}))}},173:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n,r=a(0),o=(n=r)&&n.__esModule?n:{default:n};t.default=function(){return o.default.createElement("svg",{width:"10",height:"10",viewBox:"0 0 10 10"},o.default.createElement("title",null,"switch-x"),o.default.createElement("path",{d:"M9.9 2.12L7.78 0 4.95 2.828 2.12 0 0 2.12l2.83 2.83L0 7.776 2.123 9.9 4.95 7.07 7.78 9.9 9.9 7.776 7.072 4.95 9.9 2.12",fill:"#fff",fillRule:"evenodd"}))}},174:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.pointerCoord=function(e){if(e){var t=e.changedTouches;if(t&&t.length>0){var a=t[0];return{x:a.clientX,y:a.clientY}}var n=e.pageX;if(void 0!==n)return{x:n,y:e.pageY}}return{x:0,y:0}}},184:function(e,t,a){e.exports={banner:"banner_3abB",getStarted:"getStarted_16lI",headerOverlay:"headerOverlay_2HDO",heroBanner:"heroBanner_2Wl1",heroBannerLight:"heroBannerLight_1ov_",overlay:"overlay_2yuA",buttons:"buttons_2sHG",features:"features_3SLh",featureImage:"featureImage_28zy"}}}]);
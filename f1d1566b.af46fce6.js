(window.webpackJsonp=window.webpackJsonp||[]).push([[64],{160:function(e,n,t){"use strict";t.r(n),t.d(n,"frontMatter",(function(){return s})),t.d(n,"metadata",(function(){return c})),t.d(n,"rightToc",(function(){return u})),t.d(n,"default",(function(){return l}));var r=t(1),a=t(6),o=(t(0),t(169)),s={id:"use-custom-request",title:"useCustomRequest",sidebar_label:"useCustomRequest"},c={id:"resources/hooks/use-custom-request",title:"useCustomRequest",description:"## basic",source:"@site/docs/resources/hooks/use-custom-request.md",permalink:"/bones/docs/resources/hooks/use-custom-request",editUrl:"https://github.com/alexgul4enko/bones/tree/master/docs/docs/resources/hooks/use-custom-request.md",sidebar_label:"useCustomRequest",sidebar:"resourcesSitebar",previous:{title:"usePrefetchResource",permalink:"/bones/docs/resources/hooks/use-prefetch-resource"},next:{title:"usePrefetchRequest",permalink:"/bones/docs/resources/hooks/use-prefetch-request"}},u=[{value:"basic",id:"basic",children:[]},{value:"Creating async function",id:"creating-async-function",children:[{value:"API",id:"api",children:[]},{value:"payload",id:"payload",children:[]},{value:"meta",id:"meta",children:[]},{value:"store",id:"store",children:[]}]},{value:"simple syntax",id:"simple-syntax",children:[]},{value:"Aborting requests",id:"aborting-requests",children:[{value:"Default API implementation",id:"default-api-implementation",children:[]},{value:"Own implementation",id:"own-implementation",children:[]}]}],i={rightToc:u};function l(e){var n=e.components,t=Object(a.a)(e,["components"]);return Object(o.b)("wrapper",Object(r.a)({},i,t,{components:n,mdxType:"MDXLayout"}),Object(o.b)("h2",{id:"basic"},"basic"),Object(o.b)("pre",null,Object(o.b)("code",Object(r.a)({parentName:"pre"},{className:"language-ts"}),"useCustomRequest(asyncFunction, resourceConfig)\n")),Object(o.b)("p",null,"Using ",Object(o.b)("inlineCode",{parentName:"p"},"useCustomRequest")," you can create your own async function and integare it into ",Object(o.b)("inlineCode",{parentName:"p"},"resource")," module. And in same time you still can use all other ",Object(o.b)("inlineCode",{parentName:"p"},"resource")," methods."),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"useCustomRequest")," accepts 2 arguments:"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},"asyncFunction"),Object(o.b)("li",{parentName:"ul"},Object(o.b)("a",Object(r.a)({parentName:"li"},{href:"/docs/resources/hooks/use-resource"}),"Resource Config"))),Object(o.b)("pre",null,Object(o.b)("code",Object(r.a)({parentName:"pre"},{className:"language-jsx",metastring:"{8-14,30}","{8-14,30}":!0}),"import { useCustomRequest } from '@cranium/resource'\n\nconst resourceConfig = {\n    namespace: 'users',\n    endpoint: '/users',\n}\n\nfunction myAsyncFunction(API, payload, meta) {\n  return API.put('/test',{})\n}\n\nfunction MyReactComponent () {\n    const {\n        data,            // body from success HTTP request\n        isLoading,       // boolean flag that fill be automatically toggle while using fetch|fetchOptions|create|update|remove actions\n        options,         // body from success OPTIONS HTTP request\n        errors,          // errors from HTTP request\n        filters,         // JSON representation of query string\n        // async actions\n        fetch,           // action to send GET HTTP request\n        fetchOptions,    // action to send OPTIONS HTTP request\n        create,          // action to send POST HTTP request\n        replace,         // action to send PUT HTTP request\n        update,          // action to send PATCH HTTP request\n        remove,          // action to send DELETE HTTP request \n        request          // action that will call your own Async function with same flow as all previous actions\n        // sync actions\n        setData,         // action to change data\n        setLoading,      // action to toggle loading flag\n        setErrors,       // action to change errors\n        setFilters,      // action to change filters\n        clear,           // action to delete all resource:  data,isLoading,options,errors,filters,\n    } = useCustomRequest(myAsyncFunction, resourceConfig)\n}\n")),Object(o.b)("h2",{id:"creating-async-function"},"Creating async function"),Object(o.b)("div",{className:"admonition admonition-danger alert alert--danger"},Object(o.b)("div",Object(r.a)({parentName:"div"},{className:"admonition-heading"}),Object(o.b)("h5",{parentName:"div"},Object(o.b)("span",Object(r.a)({parentName:"h5"},{className:"admonition-icon"}),Object(o.b)("svg",Object(r.a)({parentName:"span"},{xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"}),Object(o.b)("path",Object(r.a)({parentName:"svg"},{fillRule:"evenodd",d:"M5.05.31c.81 2.17.41 3.38-.52 4.31C3.55 5.67 1.98 6.45.9 7.98c-1.45 2.05-1.7 6.53 3.53 7.7-2.2-1.16-2.67-4.52-.3-6.61-.61 2.03.53 3.33 1.94 2.86 1.39-.47 2.3.53 2.27 1.67-.02.78-.31 1.44-1.13 1.81 3.42-.59 4.78-3.42 4.78-5.56 0-2.84-2.53-3.22-1.25-5.61-1.52.13-2.03 1.13-1.89 2.75.09 1.08-1.02 1.8-1.86 1.33-.67-.41-.66-1.19-.06-1.78C8.18 5.31 8.68 2.45 5.05.32L5.03.3l.02.01z"})))),"danger")),Object(o.b)("div",Object(r.a)({parentName:"div"},{className:"admonition-content"}),Object(o.b)("p",{parentName:"div"},"Note that async function that is passed to ",Object(o.b)("inlineCode",{parentName:"p"},"useCustomRequest")," should return ",Object(o.b)("inlineCode",{parentName:"p"},"Promise")),Object(o.b)("p",{parentName:"div"},"This will not work:"),Object(o.b)("pre",{parentName:"div"},Object(o.b)("code",Object(r.a)({parentName:"pre"},{className:"language-js"}),"import { useCustomRequest } from '@cranium/resource'\n\nfunction myCustomFetch(API, payload, meta, store) {\n  return 12\n}\n\nuseCustomRequest(myCustomFetch, { namespace: 'test' })\n")))),Object(o.b)("h3",{id:"api"},"API"),Object(o.b)("p",null,"Instance of ",Object(o.b)("a",Object(r.a)({parentName:"p"},{href:"/docs/api/api_about"}),"API"),". "),Object(o.b)("div",{className:"admonition admonition-tip alert alert--success"},Object(o.b)("div",Object(r.a)({parentName:"div"},{className:"admonition-heading"}),Object(o.b)("h5",{parentName:"div"},Object(o.b)("span",Object(r.a)({parentName:"h5"},{className:"admonition-icon"}),Object(o.b)("svg",Object(r.a)({parentName:"span"},{xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"}),Object(o.b)("path",Object(r.a)({parentName:"svg"},{fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"})))),"tip")),Object(o.b)("div",Object(r.a)({parentName:"div"},{className:"admonition-content"}),Object(o.b)("p",{parentName:"div"},"It is recommended to use ",Object(o.b)("a",Object(r.a)({parentName:"p"},{href:"/docs/api/api_about"}),"API")," module for sending HTTP request.\nAPI already has global interceptor to handle 401 to logout user, so that you don't need to handle this exception.\nAPI returns special type of Promise that has ",Object(o.b)("inlineCode",{parentName:"p"},"cancel")," method to terminate request."),Object(o.b)("pre",{parentName:"div"},Object(o.b)("code",Object(r.a)({parentName:"pre"},{className:"language-ts"}),"import { API } from '@cranium/api';\nimport { useCustomRequest } from '@cranium/resource';\n\nfunction getUsers(api: typeof API) {\n  return API.get('users')\n}\n\nconst resourceConfig = {\n    namespace: 'users',\n    endpoint: 'users/:uuid'\n}\n\nfunction MyComponent(argument) {\n    const { request } = useCustomRequest(getUsers, resourceConfig)\n}\n")))),Object(o.b)("h3",{id:"payload"},"payload"),Object(o.b)("p",null,"Action payload, or params that will be passed to ",Object(o.b)("inlineCode",{parentName:"p"},"request")," function"),Object(o.b)("pre",null,Object(o.b)("code",Object(r.a)({parentName:"pre"},{className:"language-tsx",metastring:"{5,18}","{5,18}":!0}),"import { API } from '@cranium/api';\nimport { useCustomRequest } from '@cranium/resource'\n\nfunction myCustomFetch(api: typeof API, payload, meta, store) {\n  console.log(payload) //=> { uuid: 12, name: 'test'}\n  return api.get('users/:uuid', { params: payload.uuid }) => //GET /api/users/12\n}\n\nconst resourceConfig = {\n    namespace: 'users',\n    endpoint: 'users/:uuid'\n}\n\nfunction MyComponent({ users }) {\n    const { request } = useCustomRequest(myCustomFetch, resourceConfig)\n\n    useEffect(() => {\n        const request = users.request({ uuid: 12, name: 'test'})\n        //abort request on unmount\n        return request.cancel\n    }, []) \n}\n\n")),Object(o.b)("h3",{id:"meta"},"meta"),Object(o.b)("p",null,Object(o.b)("a",Object(r.a)({parentName:"p"},{href:"/docs/resources/hooks/use-resource"}),"Resource configuration")," "),Object(o.b)("pre",null,Object(o.b)("code",Object(r.a)({parentName:"pre"},{className:"language-js",metastring:"{5,9-12}","{5,9-12}":!0}),"import { API } from '@cranium/api';\nimport { useCustomRequest } from '@cranium/resource'\n\nfunction myCustomFetch(api: typeof API, payload, meta, store) {\n  console.log(meta) //=> { namespace: 'users', endpoint: 'users/:uuid' }\n  return api.get(meta.endpoint, { params: payload.uuid }) => //GET /api/users/12\n}\n\nconst resourceConfig = {\n    namespace: 'users',\n    endpoint: 'users/:uuid'\n}\n\nfunction MyComponent({ users }) {\n    const { request } = useCustomRequest(myCustomFetch, resourceConfig)\n\n    useEffect(() => {\n        const request = users.request({ uuid: 12, name: 'test'})\n        //abort request on unmount\n        return request.cancel\n    }, []) \n}\n")),Object(o.b)("h3",{id:"store"},"store"),Object(o.b)("p",null,Object(o.b)("a",Object(r.a)({parentName:"p"},{href:"https://redux.js.org/api/store"}),"Redux store")),Object(o.b)("h2",{id:"simple-syntax"},"simple syntax"),Object(o.b)("p",null,"You can define namespace as a String"),Object(o.b)("pre",null,Object(o.b)("code",Object(r.a)({parentName:"pre"},{className:"language-js",metastring:"{10}","{10}":!0}),"import { useCustomRequest, makeCancelablePromise } from '@cranium/resource'\n\nfunction myCustomFetch() {\n  return makeCancelablePromise(new Promise( function( resolve, reject ) {\n    setTimeout( () => resolve({ success: true }), 1000 )\n  }))\n}\n\nfunction MyComponent({ users }) {\n    const { request } = useCustomRequest(myCustomFetch, 'users')\n}\n")),Object(o.b)("h2",{id:"aborting-requests"},"Aborting requests"),Object(o.b)("h3",{id:"default-api-implementation"},"Default API implementation"),Object(o.b)("p",null,"By, default ",Object(o.b)("inlineCode",{parentName:"p"},"API")," module already returns Promise with extra method ",Object(o.b)("inlineCode",{parentName:"p"},"cancel")," that will use AbortController to abort Pending requests."),Object(o.b)("pre",null,Object(o.b)("code",Object(r.a)({parentName:"pre"},{className:"language-tsx",metastring:"{18,19}","{18,19}":!0}),"import { API } from '@cranium/api';\nimport { useCustomRequest } from '@cranium/resource'\n\nfunction myCustomFetch(api: typeof API, payload, meta, store) {\n  return api.get('users/:uuid', { params: payload.uuid }) => //GET /api/users/12\n}\n\nconst resourceConfig = {\n    namespace: 'users',\n    endpoint: 'users/:uuid'\n}\n\nfunction MyComponent({ users }) {\n    const { request } = useCustomRequest(myCustomFetch, resourceConfig)\n\n    useEffect(() => {\n        const request = users.request({ uuid: 12, name: 'test'})\n        //abort request on unmount\n        return request.cancel\n    }, []) \n}\n\n")),Object(o.b)("h3",{id:"own-implementation"},"Own implementation"),Object(o.b)("p",null,"In case your async function does not return instance of ",Object(o.b)("inlineCode",{parentName:"p"},"API")," Request, you will need:"),Object(o.b)("ol",null,Object(o.b)("li",{parentName:"ol"},"create your own instance of ",Object(o.b)("inlineCode",{parentName:"li"},"AbortController")),Object(o.b)("li",{parentName:"ol"},"pass AbortController ",Object(o.b)("inlineCode",{parentName:"li"},"signal")," to ",Object(o.b)("inlineCode",{parentName:"li"},"API")," module"),Object(o.b)("li",{parentName:"ol"},"Wrap Promise from async function with ",Object(o.b)("inlineCode",{parentName:"li"},"makeCancelablePromise"))),Object(o.b)("pre",null,Object(o.b)("code",Object(r.a)({parentName:"pre"},{className:"language-tsx",metastring:"{6,8,15,23,28,44}","{6,8,15,23,28,44}":!0}),"import { API } from '@cranium/api';\nimport { useCustomRequest, makeCancelablePromise } from '@cranium/resource'\n\nfunction myCustomFetch(api: typeof API, payload, meta, store) {\n  //create new instance of AbortController\n  const controller = new AbortController();\n  // wrap your Promise with \"makeCancelablePromise\" function\n  return makeCancelablePromise (\n    Promise.all([ \n        api.get(\n            'users/:uuid', \n            {\n                params: payload.uuid,\n                //pass signal to API module\n                signal: controller.signal\n            }\n        ),\n        api.get(\n            'users/:uuid/cars', \n            {\n                params: payload.uuid,\n                //pass signal to API module\n                signal: controller.signal\n            }\n        )\n    ]),\n    //pass controller\n    controller\n  )\n  \n}\n\nconst resourceConfig = {\n    namespace: 'users',\n    endpoint: 'users/:uuid'\n}\n\nfunction MyComponent({ users }) {\n    const { request } = useCustomRequest(myCustomFetch, resourceConfig)\n\n    useEffect(() => {\n        const request = users.request({ uuid: 12, name: 'test'})\n        //abort request on unmount\n        return request.cancel\n    }, []) \n}\n\n")))}l.isMDXComponent=!0},169:function(e,n,t){"use strict";t.d(n,"a",(function(){return m})),t.d(n,"b",(function(){return d}));var r=t(0),a=t.n(r);function o(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function s(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function c(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?s(Object(t),!0).forEach((function(n){o(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):s(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function u(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var i=a.a.createContext({}),l=function(e){var n=a.a.useContext(i),t=n;return e&&(t="function"==typeof e?e(n):c({},n,{},e)),t},m=function(e){var n=l(e.components);return a.a.createElement(i.Provider,{value:n},e.children)},p={inlineCode:"code",wrapper:function(e){var n=e.children;return a.a.createElement(a.a.Fragment,{},n)}},b=Object(r.forwardRef)((function(e,n){var t=e.components,r=e.mdxType,o=e.originalType,s=e.parentName,i=u(e,["components","mdxType","originalType","parentName"]),m=l(t),b=r,d=m["".concat(s,".").concat(b)]||m[b]||p[b]||o;return t?a.a.createElement(d,c({ref:n},i,{components:t})):a.a.createElement(d,c({ref:n},i))}));function d(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var o=t.length,s=new Array(o);s[0]=b;var c={};for(var u in n)hasOwnProperty.call(n,u)&&(c[u]=n[u]);c.originalType=e,c.mdxType="string"==typeof e?e:r,s[1]=c;for(var i=2;i<o;i++)s[i]=t[i];return a.a.createElement.apply(null,s)}return a.a.createElement.apply(null,t)}b.displayName="MDXCreateElement"}}]);
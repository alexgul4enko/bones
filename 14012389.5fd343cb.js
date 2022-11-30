(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{101:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return o})),n.d(t,"metadata",(function(){return c})),n.d(t,"rightToc",(function(){return i})),n.d(t,"default",(function(){return l}));var r=n(1),s=n(6),a=(n(0),n(169)),o={id:"connect_resources",title:"connectResources",sidebar_label:"connectResources"},c={id:"resources/connect_resources",title:"connectResources",description:"**connectResources** is a function that will return [HOC](https://reactjs.org/docs/higher-order-components.html) to pass all necessary props to your React component for async HTTP request.",source:"@site/docs/resources/connectResources.md",permalink:"/bones/docs/resources/connect_resources",editUrl:"https://github.com/alexgul4enko/bones/tree/master/docs/docs/resources/connectResources.md",sidebar_label:"connectResources",sidebar:"resourcesSitebar",previous:{title:"Resource config",permalink:"/bones/docs/resources/connect_resource_type"},next:{title:"Custom Resource",permalink:"/bones/docs/resources/resource_customresources"}},i=[{value:"Basic usage",id:"basic-usage",children:[]},{value:"Redux",id:"redux",children:[]},{value:"Sending HTTP requests",id:"sending-http-requests",children:[{value:"GET request",id:"get-request",children:[]},{value:"GET request with dynamic URL",id:"get-request-with-dynamic-url",children:[]},{value:"GET request with query params",id:"get-request-with-query-params",children:[]},{value:"OPTIONS request",id:"options-request",children:[]},{value:"POST request",id:"post-request",children:[]},{value:"DELETE request",id:"delete-request",children:[]},{value:"PUT request",id:"put-request",children:[]},{value:"PATCH request",id:"patch-request",children:[]},{value:"Terminating requests",id:"terminating-requests",children:[]},{value:"Handling HTTP requests",id:"handling-http-requests",children:[]}]},{value:"Changing store data",id:"changing-store-data",children:[{value:"setData",id:"setdata",children:[]},{value:"setLoading",id:"setloading",children:[]},{value:"setErrors",id:"seterrors",children:[]},{value:"setFilters",id:"setfilters",children:[]}]},{value:"Several resources",id:"several-resources",children:[]},{value:"filters",id:"filters",children:[]},{value:"Clear resource data (<code>clear</code>)",id:"clear-resource-data-clear",children:[]}],u={rightToc:i};function l(e){var t=e.components,n=Object(s.a)(e,["components"]);return Object(a.b)("wrapper",Object(r.a)({},u,n,{components:t,mdxType:"MDXLayout"}),Object(a.b)("p",null,Object(a.b)("strong",{parentName:"p"},"connectResources")," is a function that will return ",Object(a.b)("a",Object(r.a)({parentName:"p"},{href:"https://reactjs.org/docs/higher-order-components.html"}),"HOC")," to pass all necessary props to your React component for async HTTP request."),Object(a.b)("p",null,Object(a.b)("inlineCode",{parentName:"p"},"connectResources")," accept 1 argument  ",Object(a.b)("a",Object(r.a)({parentName:"p"},{href:"/docs/resources/connect_resource_type"}),"ResourceConfig")," or an Array of ",Object(a.b)("a",Object(r.a)({parentName:"p"},{href:"/docs/resources/connect_resource_type"}),"ResourceConfig")),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-ts"}),"import connectResources from '@cranium/resource' \n\nconnectResources(ResourceConfig | []ResourceConfig)\n")),Object(a.b)("h2",{id:"basic-usage"},"Basic usage"),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-js"}),"import { connectResources } from '@cranium/resource'\n\nfunction MyReactComponent({ users }){\n  const {\n      // meta data\n      data,            // body from success HTTP request\n      isLoading,       // boolean flag to determinate async action status\n      options,         // body from success OPTIONS HTTP request\n      errors,          // error from HTTP request\n      filters,         // JSON representation of query string\n      // async actions\n      fetch,           // action to send GET HTTP request\n      fetchOptions,    // action to send OPTIONS HTTP request\n      create,          // action to send POST HTTP request\n      replace,         // action to send PUT HTTP request\n      update,          // action to send PATCH HTTP request\n      remove,          // action to send DELETE HTTP request \n      // sync actions\n      setData,         // action to change data\n      setLoading,      // action to toggle loading flag\n      setErrors,       // action to change errors\n      setFilters,      // action to change filters\n      clear,           // action to clear current part of redux store\n  } = users\n  return ...\n}\n/*\n * Using 1 line of code you will have prop users inside your React Component to:\n * - work with HTTP requests \n * - change redux store data\n*/\nexport default connectResources('users')(MyReactComponent)\n")),Object(a.b)("div",{className:"admonition admonition-tip alert alert--success"},Object(a.b)("div",Object(r.a)({parentName:"div"},{className:"admonition-heading"}),Object(a.b)("h5",{parentName:"div"},Object(a.b)("span",Object(r.a)({parentName:"h5"},{className:"admonition-icon"}),Object(a.b)("svg",Object(r.a)({parentName:"span"},{xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"}),Object(a.b)("path",Object(r.a)({parentName:"svg"},{fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"})))),"tip")),Object(a.b)("div",Object(r.a)({parentName:"div"},{className:"admonition-content"}),Object(a.b)("p",{parentName:"div"},"You will have same property name as argument in  ",Object(a.b)("inlineCode",{parentName:"p"},"connectResources"),".\nLike ",Object(a.b)("inlineCode",{parentName:"p"},"<MyReactComponent>")," has property ",Object(a.b)("inlineCode",{parentName:"p"},"users")," because of ",Object(a.b)("inlineCode",{parentName:"p"},"connectResources('users')")))),Object(a.b)("h2",{id:"redux"},"Redux"),Object(a.b)("p",null,"1 of biggest redux problem is that it is required to create reducers to handle changes for each part of store data.\nThat's why Redux applications on start have store with lot of empty objects, like:"),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-js"}),"{\n  users: {\n    data: null,\n    errors: null,\n    isLoading: false\n  },\n  user: {\n    data: null,\n    errors: null,\n    isLoading: false\n  },\n  cars: {\n    data: null,\n    errors: null,\n    isLoading: false\n  },\n  pets: {\n    data: null,\n    errors: null,\n    isLoading: false\n  }\n}\n")),Object(a.b)("p",null,Object(a.b)("inlineCode",{parentName:"p"},"resources")," module has empty store on start. And data in store will appear while sending HTTP requests. Also by default ",Object(a.b)("inlineCode",{parentName:"p"},"resources")," module clears redux store on component unmount, so that you will see only that data in redux store that is currently using to render current components."),Object(a.b)("ol",null,Object(a.b)("li",{parentName:"ol"},"Initial app store")),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-js",metastring:'title="redux store"',title:'"redux','store"':!0}),"{}\n")),Object(a.b)("ol",{start:2},Object(a.b)("li",{parentName:"ol"},"Render component wrapped with ",Object(a.b)("inlineCode",{parentName:"li"},"connectResources"))),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-js",metastring:'title="redux store"',title:'"redux','store"':!0}),"{}\n")),Object(a.b)("ol",{start:3},Object(a.b)("li",{parentName:"ol"},"Send first HTTP request")),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-js",metastring:'title="redux store"',title:'"redux','store"':!0}),"{ \n  users: {\n    data: { count: 12, results: [] },\n    errors: null,\n    isLoading: false\n  }\n}\n")),Object(a.b)("ol",{start:4},Object(a.b)("li",{parentName:"ol"},"Unmount component")),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-js",metastring:'title="redux store"',title:'"redux','store"':!0}),"{}\n")),Object(a.b)("p",null,"In this way Redux store will be readable and understandable. There will not be any unused data, so ot will be more optimized"),Object(a.b)("h2",{id:"sending-http-requests"},"Sending HTTP requests"),Object(a.b)("h3",{id:"get-request"},"GET request"),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-js",metastring:"{7}","{7}":!0}),"import { connectResources } from '@cranium/resource'\n\nfunction UserList({ users }) {\n  const { data, isLoading, errors, fetch } = users\n  useEffect(()=>{\n    //GET /api/users\n    fetch()\n  },[])\n  if(isLoading){\n    return 'Loading...'\n  }\n  if(errors){\n    return 'Oooops... Server is temporary unavailable'\n  }\n  return data.map(user=><User {...data} key={user.uuid}/>)\n}\nexport default connectResources('users')(UserList)\n")),Object(a.b)("h3",{id:"get-request-with-dynamic-url"},"GET request with dynamic URL"),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-js",metastring:"{7}","{7}":!0}),"import { connectResources } from '@cranium/resource'\n\nfunction UserList({ user }) {\n  const { data, isLoading, errors, fetch } = user\n  useEffect(()=>{\n    //GET /api/users/taras\n    fetch({ uuid: 'taras' })\n  },[])\n  if(isLoading){\n    return 'Loading...'\n  }\n  if(errors){\n    return 'Oooops... Server is temporary unavailable'\n  }\n  return <h1> Welcome {data.fullName}<h1>\n}\nexport default connectResources({\n  namespace: 'user',\n  endpoint: 'users/:uuid'\n})(UserList)\n")),Object(a.b)("h3",{id:"get-request-with-query-params"},"GET request with query params"),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-js",metastring:"{7,20}","{7,20}":!0}),"import { connectResources } from '@cranium/resource'\n\nfunction UserList({ users }) {\n  const { data, isLoading, errors, fetch } = users\n  useEffect(()=>{\n    //GET /api/users?offset=0&limit=10\n    fetch({ offset: 0, limit: 10 })\n  },[])\n  if(isLoading){\n    return 'Loading...'\n  }\n  if(errors){\n    return 'Oooops... Server is temporary unavailable'\n  }\n  return data.map(user=><User {...data} key={user.uuid}/>)\n}\nexport default connectResources({\n  namespace: 'users',\n  endpoint: 'users',\n  queries: ['offset', 'limit']\n})(UserList)\n")),Object(a.b)("div",{className:"admonition admonition-info alert alert--info"},Object(a.b)("div",Object(r.a)({parentName:"div"},{className:"admonition-heading"}),Object(a.b)("h5",{parentName:"div"},Object(a.b)("span",Object(r.a)({parentName:"h5"},{className:"admonition-icon"}),Object(a.b)("svg",Object(r.a)({parentName:"span"},{xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"}),Object(a.b)("path",Object(r.a)({parentName:"svg"},{fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"})))),"info")),Object(a.b)("div",Object(r.a)({parentName:"div"},{className:"admonition-content"}),Object(a.b)("p",{parentName:"div"},"Please note that it is important to describe all possible ",Object(a.b)("inlineCode",{parentName:"p"},"queries"),".\nThis is made to build query string only with values that current API support. Like swagger schema.\nThis optimization will add more safety to your code"),Object(a.b)("pre",{parentName:"div"},Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-js",metastring:"{7,13}","{7,13}":!0}),"import { connectResources } from '@cranium/resource'\n\nfunction UserList({ users }) {\n  const { data, isLoading, errors, fetch } = users\n  useEffect(()=>{\n    //GET /api/users?offset=0&limit=10\n    //fakeData data will not appear in HTPP request URL\n    fetch({ offset: 0, limit: 10, fakeData: 'fake' })\n  },[])\n}\nexport default connectResources({\n  namespace: 'users',\n  endpoint: 'users',\n  queries: ['offset', 'limit']\n})(UserList)\n")))),Object(a.b)("h3",{id:"options-request"},"OPTIONS request"),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-js",metastring:"{7}","{7}":!0}),"import { connectResources } from '@cranium/resource'\n\nfunction UserList({ users }) {\n  const { options, isLoading, errors, fetchOptions } = users\n  useEffect(()=>{\n    //OPTIONS /api/users\n    fetchOptions()\n  },[])\n  if(isLoading){\n    return 'Loading...'\n  }\n  if(errors){\n    return 'Oooops... Server is temporary unavailable'\n  }\n  return <p>{options.count}</p>\n}\nexport default connectResources('users')(UserList)\n")),Object(a.b)("h3",{id:"post-request"},"POST request"),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-js",metastring:"{7}","{7}":!0}),"import { connectResources } from '@cranium/resource'\n\nfunction UserList({ users }) {\n  const { data, isLoading, errors, create } = users\n  useEffect(()=>{\n    //POST /api/users\n    create({ name: 'wonder woman', world: 'DC' })\n  },[])\n  if(isLoading){\n    return 'creating Wonder Woman'\n  }\n  if(errors){\n    return 'Oooops... Can not create super hero'\n  }\n  return <p>{data.name} is created</p>\n}\nexport default connectResources('users')(UserList)\n")),Object(a.b)("h3",{id:"delete-request"},"DELETE request"),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-js",metastring:"{7}","{7}":!0}),"import { connectResources } from '@cranium/resource'\n\nfunction UserList({ users }) {\n  const { isLoading, errors, remove } = users\n  useEffect(()=>{\n    //DELETE /api/super-man\n    remove({ hero: 'super-man' })\n  },[])\n  if(isLoading){\n    return 'deleting Super Man'\n  }\n  if(errors){\n    return 'Oooops... Super Man is stronger than our API, please try again'\n  }\n  return <p>Super Man has gone</p>\n}\nexport default connectResources('users/:hero')(UserList)\n")),Object(a.b)("h3",{id:"put-request"},"PUT request"),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-js",metastring:"{7}","{7}":!0}),"import { connectResources } from '@cranium/resource'\n\nfunction UserList({ users }) {\n  const { isLoading, errors, replace } = users\n  useEffect(()=>{\n    //PUT /api/super-man\n    replace({ hero: 'wonder-woman', isSingle: true })\n  },[])\n  if(isLoading){\n    return 'updating Wonder Woman'\n  }\n  if(errors){\n    return 'Oooops... Yaron Varsano is stronger than our API, please try again'\n  }\n  return <p>Wonder Woman is now single</p>\n}\nexport default connectResources('users/:hero')(UserList)\n")),Object(a.b)("h3",{id:"patch-request"},"PATCH request"),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-js",metastring:"{7}","{7}":!0}),"import { connectResources } from '@cranium/resource'\n\nfunction UserList({ users }) {\n  const { isLoading, errors, update } = users\n  useEffect(()=>{\n    //PATCH /api/super-man\n    update({ hero: 'wonder-woman', isSingle: true })\n  },[])\n  if(isLoading){\n    return 'updating Wonder Woman'\n  }\n  if(errors){\n    return 'Oooops... Yaron Varsano is stronger than our API, please try again'\n  }\n  return <p>Wonder Woman is now single</p>\n}\nexport default connectResources('users/:hero')(UserList)\n")),Object(a.b)("div",{className:"admonition admonition-note alert alert--secondary"},Object(a.b)("div",Object(r.a)({parentName:"div"},{className:"admonition-heading"}),Object(a.b)("h5",{parentName:"div"},Object(a.b)("span",Object(r.a)({parentName:"h5"},{className:"admonition-icon"}),Object(a.b)("svg",Object(r.a)({parentName:"span"},{xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"}),Object(a.b)("path",Object(r.a)({parentName:"svg"},{fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"})))),"note")),Object(a.b)("div",Object(r.a)({parentName:"div"},{className:"admonition-content"}),Object(a.b)("p",{parentName:"div"},"To send PUT, PATCH, POST request with dynamic url, add URL params to body request"),Object(a.b)("pre",{parentName:"div"},Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-js"}),"// For URL /users/:uuid\n\n//PUT /users/123-1233-123 { name: test }\nreplace({ uuid: '123-1233-123', name: 'test' })\n\n//PATCH /users/123-1233-123 { name: test }\nupdate({ uuid: '123-1233-123', name: 'test' })\n\n//POST /users/123-1233-123 { name: test }\ncreate({ uuid: '123-1233-123', name: 'test' })\n\n")))),Object(a.b)("h3",{id:"terminating-requests"},"Terminating requests"),Object(a.b)("p",null,"Every async action returns Promise with 1 extra method ",Object(a.b)("inlineCode",{parentName:"p"},"cancel")," that calls AbortController ",Object(a.b)("inlineCode",{parentName:"p"},"abort")," function. ",Object(a.b)("a",Object(r.a)({parentName:"p"},{href:"/docs/api/api_terminate"}),"Read more")),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-js",metastring:"{7,8}","{7,8}":!0}),"import { connectResources } from '@cranium/resource'\n\nfunction UserList({ users }) {\n  const { data, isLoading, errors, fetch } = users\n  useEffect(()=>{\n    //GET /api/users\n    const request = fetch()\n    return request.cancel\n  },[])\n}\nexport default connectResources('users')(UserList)\n")),Object(a.b)("h3",{id:"handling-http-requests"},"Handling HTTP requests"),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-js",metastring:"{7-10}","{7-10}":!0}),"import { connectResources } from '@cranium/resource'\n\nfunction UserList({ users }) {\n  const { data, isLoading, errors, fetch } = users\n  useEffect(()=>{\n    //GET /api/users\n    fetch()\n      .then((data)=>console.log(data))\n      .catch(console.warn)\n      .finally(()=>alert('done'))\n  },[])\n  \n}\nexport default connectResources('users')(UserList)\n")),Object(a.b)("h2",{id:"changing-store-data"},"Changing store data"),Object(a.b)("h3",{id:"setdata"},"setData"),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-js",metastring:"{5,7}","{5,7}":!0}),"import { connectResources } from '@cranium/resource'\n\nfunction MyComponent({ users }) {\n  const { data, setData } = users\n  setData({ wife: 'Wonder Woman' })  \n\n  return <p>Your wife is: {data.wife}</p>\n}\nexport default connectResources('users')(MyComponent)\n")),Object(a.b)("h3",{id:"setloading"},"setLoading"),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-js",metastring:"{5,7}","{5,7}":!0}),"import { connectResources } from '@cranium/resource'\n\nfunction MyComponent({ users }) {\n  const { isLoading, setLoading } = users\n  setLoading(true)  \n\n  return <p>{isLoading ? 'Loading...': 'Loaded'}</p>\n}\nexport default connectResources('users')(MyComponent)\n")),Object(a.b)("h3",{id:"seterrors"},"setErrors"),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-js",metastring:"{5,7}","{5,7}":!0}),"import { connectResources } from '@cranium/resource'\n\nfunction MyComponent({ users }) {\n  const { errors, setErrors } = users\n  setErrors('Ooops...')  \n\n  return <p>{errors}</p>\n}\nexport default connectResources('users')(MyComponent)\n")),Object(a.b)("h3",{id:"setfilters"},"setFilters"),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-js",metastring:"{5,7}","{5,7}":!0}),"import { connectResources } from '@cranium/resource'\n\nfunction MyComponent({ users }) {\n  const { filters, setFilters } = users\n  setFilters({ offset: 0, limit: 12})  \n\n  return <p>offset: {filters.offset}, limit {filters.limit}</p>\n}\nexport default connectResources('users')(MyComponent)\n")),Object(a.b)("h2",{id:"several-resources"},"Several resources"),Object(a.b)("p",null,"To have several resources in 1 Component, you can define an Array of Resources to ",Object(a.b)("inlineCode",{parentName:"p"},"connectResources")),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-js"}),"function MyComponent({ cars, pets }){\n  //than u will have 2 resources in 1 component\n}\nconnectResources([\n  { namespace: 'cars' },\n  'pets'\n])(MyComponent)\n")),Object(a.b)("div",{className:"admonition admonition-caution alert alert--warning"},Object(a.b)("div",Object(r.a)({parentName:"div"},{className:"admonition-heading"}),Object(a.b)("h5",{parentName:"div"},Object(a.b)("span",Object(r.a)({parentName:"h5"},{className:"admonition-icon"}),Object(a.b)("svg",Object(r.a)({parentName:"span"},{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 16 16"}),Object(a.b)("path",Object(r.a)({parentName:"svg"},{fillRule:"evenodd",d:"M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 0 0 0 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 0 0 .01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z"})))),"caution")),Object(a.b)("div",Object(r.a)({parentName:"div"},{className:"admonition-content"}),Object(a.b)("p",{parentName:"div"},"Pay attention that all resources should have unique namespace, otherwise it will just override each other"))),Object(a.b)("div",{className:"admonition admonition-tip alert alert--success"},Object(a.b)("div",Object(r.a)({parentName:"div"},{className:"admonition-heading"}),Object(a.b)("h5",{parentName:"div"},Object(a.b)("span",Object(r.a)({parentName:"h5"},{className:"admonition-icon"}),Object(a.b)("svg",Object(r.a)({parentName:"span"},{xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"}),Object(a.b)("path",Object(r.a)({parentName:"svg"},{fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"})))),"tip")),Object(a.b)("div",Object(r.a)({parentName:"div"},{className:"admonition-content"}),Object(a.b)("p",{parentName:"div"},"Pay that is it much better to split your code. That's why mostly it is not a good choice to use several resources in 1 React Component."),Object(a.b)("span",{style:{color:"red",fontWeight:"bold"}},"BAD"),Object(a.b)("pre",{parentName:"div"},Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-jsx",metastring:'title="my-component.js"',title:'"my-component.js"'}),"\nconnectResources([\n  { namespace: 'cars' },\n  { namespace: 'pets' }\n])\n\nfunction MyComponent({ cars, pets }){\n  return (\n    <Pets {...pets}/>\n    <Cars {...cars}/>\n  )\n}\n")),Object(a.b)("span",{style:{color:"green",fontWeight:"bold"}},"GOOD"),Object(a.b)("pre",{parentName:"div"},Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-js",metastring:'title="with-pets.js"',title:'"with-pets.js"'}),"export default connectResources({ namespace: 'pets' })\n")),Object(a.b)("pre",{parentName:"div"},Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-js",metastring:'title="with-cars.js"',title:'"with-cars.js"'}),"export default connectResources({ namespace: 'cars' })\n")),Object(a.b)("pre",{parentName:"div"},Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-js",metastring:'title="pets.js"',title:'"pets.js"'}),"import PetsView from './pets-view'\nimport withPets from './with-pets'\n\nexport default withPets(PetsView)\n")),Object(a.b)("pre",{parentName:"div"},Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-js",metastring:'title="cars.js"',title:'"cars.js"'}),"import CarsView from './cars-view'\nimport withCars from './with-cars'\n\nexport default withCars(CarsView)\n")),Object(a.b)("pre",{parentName:"div"},Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-jsx",metastring:'title="my-component.js"',title:'"my-component.js"'}),"\nimport Pets from './pets'\nimport Cars from './cars'\n\nexport default function MyComponent(){\n  return (\n    <>\n      <Pets/>\n      <Cars/>\n    </>\n  )\n}\n")))),Object(a.b)("h2",{id:"filters"},"filters"),Object(a.b)("p",null,"Filters is json object that contains Query string and Url params from latest HTTP request."),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-jsx",metastring:"{7,18-20,26,27}","{7,18-20,26,27}":!0}),"import { connectResources } from '@cranium/resource'\n\nfunction UserList({ users }) {\n  const { filters, isLoading, errors, fetch } = users\n  useEffect(()=>{\n    //GET /api/users/dc?offset=0&limit=10\n    fetch({ offset: 0, limit: 10, world: 'dc' })\n  },[])\n  if(isLoading){\n    return 'Loading...'\n  }\n  if(errors){\n    return 'Oooops... Server is temporary unavailable'\n  }\n\n  return (\n    <>\n      <p>world: {filters.world}</p>   // world: dc\n      <p>offset: {filters.offset}</p> // offset: 0\n      <p>limit: {limit.limit}</p>     // limit: 10\n    </>\n  )\n}\nexport default connectResources({\n  namespace: 'users',\n  endpoint: 'users/:world',\n  queries: ['offset', 'limit']\n})(UserList)\n")),Object(a.b)("h2",{id:"clear-resource-data-clear"},"Clear resource data (",Object(a.b)("inlineCode",{parentName:"h2"},"clear"),")"),Object(a.b)("p",null,"To delete resource data from redux use ",Object(a.b)("inlineCode",{parentName:"p"},"clear")," action"),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-js",metastring:"{12}","{12}":!0}),"import { connectResources } from '@cranium/resource'\n\nfunction MyComponent({ users }) {\n  const { data, setData, clear } = users\n  setData({ wife: 'Wonder Woman' })\n  /*\n  * after setData action redux store is\n  * {\n  *     cars: { data: ['BMW'] }\n  *     users: { data: { wife: 'Wonder Woman'} }\n  * }\n  */ \n  clear()\n  /*\n  * after clear action redux store is\n  * {\n  *     cars: { data: ['BMW'] }\n  * }\n  */ \n\n}\nexport default connectResources('users')(MyComponent)\n")),Object(a.b)("p",null,Object(a.b)("inlineCode",{parentName:"p"},"clear")," action will fully remove data from Redux store by ",Object(a.b)("inlineCode",{parentName:"p"},"namespace")," key"))}l.isMDXComponent=!0},169:function(e,t,n){"use strict";n.d(t,"a",(function(){return p})),n.d(t,"b",(function(){return b}));var r=n(0),s=n.n(r);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,s=function(e,t){if(null==e)return{};var n,r,s={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(s[n]=e[n]);return s}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(s[n]=e[n])}return s}var u=s.a.createContext({}),l=function(e){var t=s.a.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):c({},t,{},e)),n},p=function(e){var t=l(e.components);return s.a.createElement(u.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return s.a.createElement(s.a.Fragment,{},t)}},m=Object(r.forwardRef)((function(e,t){var n=e.components,r=e.mdxType,a=e.originalType,o=e.parentName,u=i(e,["components","mdxType","originalType","parentName"]),p=l(n),m=r,b=p["".concat(o,".").concat(m)]||p[m]||d[m]||a;return n?s.a.createElement(b,c({ref:t},u,{components:n})):s.a.createElement(b,c({ref:t},u))}));function b(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=n.length,o=new Array(a);o[0]=m;var c={};for(var i in t)hasOwnProperty.call(t,i)&&(c[i]=t[i]);c.originalType=e,c.mdxType="string"==typeof e?e:r,o[1]=c;for(var u=2;u<a;u++)o[u]=n[u];return s.a.createElement.apply(null,o)}return s.a.createElement.apply(null,n)}m.displayName="MDXCreateElement"}}]);
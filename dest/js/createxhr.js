"use strict";function ajax(e){function t(){200==r.status?e.success&&e.success(r.responseText):e.error&&e.Error()}e.type=e.type||"get",e.async=void 0==e.async||e.async;var r=createXhr(),n=getParamStr(e.data);"get"==e.type.toLowerCase()&&(e.url+=n?"?"+n:""),r.open(e.type,e.url,e.async),"get"==e.type?r.send(null):(r.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),r.send(n)),e.async?r.onreadystatechange=function(){4==r.readyState&&t()}:t()}function getParamStr(e){var t=[];for(var r in e){var n=r+"="+e[r];t.push(n)}return t.join("&")}var createXhr=function(){return window.XMLHttpRequest?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTPRequest")};
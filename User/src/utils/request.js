import fetch from 'dva/fetch';
import qs from 'qs';

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {

  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}
//全局添加跨域请求头，及Token票据
// function optionsAppend(options){
//     debugger;
//     var headers=new Headers();
//     headers.set('Content-Type','text/plain');
//     if(sessionStorage['Token']){
//       headers.set('Authorization',sessionStorage['Token']);
//     }
//     var customOptions={
//       method:'GET',
//       mode:'cors',
//       headers:headers,
//
//     }
//     return  Object.assign(customOptions,options);  //{...customOptions,...options};
// }
/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  const baseURL="http://localhost:8082/";

  let curURL=baseURL+url;
  //params=escape(qs.stringify(params));
  // if(!options.method||options.method.toLowerCase()=='get'){
  //   curURL=curURL+'?'+params;
  // }
  const headers=new Headers();
  headers.append('Content-Type','text/plain');

  if(sessionStorage['Token']){
    document.cookie='Authorization='+sessionStorage['Token'];
  }
  if(options){

  }
  const  coptions={mode: "cors",credentials: 'include',headers:headers};
  Object.assign(coptions,options);
  return fetch(curURL,coptions)
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => ({ data }))
    .catch((err) => {throw err});
}

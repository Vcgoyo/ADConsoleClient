import fetch from 'dva/fetch';


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
function optionsAppend(options){
    var headers=new Headers();
    headers.set('Content-Type','text/plain');
    if(sessionStorage['Token']){
      headers.set('Authorization',sessionStorage['Token']);
    }
    var customOptions={
      mode:'cors',
      headers:headers,
    }
    return {...customOptions,...options};
}
/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  options=optionsAppend(options);
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => ({ data }))
    .catch((err) => ({ err }));
}

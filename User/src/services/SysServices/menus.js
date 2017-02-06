import request from '../../utils/request';

import qs from 'qs';


export async function menulist(params) {
  return request('poweritem/v1/menuslist?'+qs.stringify(params),{});
}

export async function create(params) {
  return request('poweritem/v1/menus',{
    method:'post',
    body:JSON.stringify(params),
  });
}

export async function update(params) {
  return request('poweritem/v1/menus/'+params.id,{
    method:'put',
    body:JSON.stringify(params),
  });
}
export async function remove(params) {
  return request('poweritem/v1/menus/'+params.id, {
    method: 'delete',
    //body: JSON.stringify(params),
  });
}
export async function queryChilds(params){
  return request('poweritem/v1/menus?pid='+params.id)
}

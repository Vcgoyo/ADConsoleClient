import React from 'react';
import {Form,Input,Button,Select} from 'antd';



const ListHead=({
  onAdd
})=>{

  return (
    <div>
        <Button type="ghost" onClick={onAdd}>添加</Button>
    </div>
  )
}

export default ListHead;

import React,{PropTypes}  from 'react'
import {Form,Input,Modal} from 'antd'
const FormItem=Form.Item;


const MenuModal=({
  visible,
  item={},
  onOk,
  onCancel,
  form:{
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  }
})=>{

  const handleOk=()=>{
    validateFields((errors)=>{
      if(errors){
        return;
      }
      const data={...getFieldsValue(),key:item.key};
      onOk(data);
    });
  }

  const formItemLayout={
    labelCol:{
      span:6
    },
    wrapperCol:{
      span: 14
    }
  };

  const modalOpts={
    title:'编辑菜单',
    visible,
    onOk:handleOk,
    onCancel,
  };

  return (
    <Modal {...modalOpts}>
        <Form horizontal>
            <FormItem label="菜单名称" hasFeedBack {...formItemLayout}>
              {getFieldDecorator('name',{
                initialValue:item.name,
                rules:[
                  {required:true,message:'名称未填写'}
                ],
              })(
                <Input type='text'/>
              )}
            </FormItem>
            <FormItem label="URL" hasFeedBack {...formItemLayout}>
              {getFieldDecorator('age',{
                initialValue:item.age,
                // rules:[
                //   {validator:checkNumber }
                // ],
              })(
                <Input type='text'/>
              )}
            </FormItem>
        </Form>
    </Modal>
  )
}

export default Form.create()(MenuModal);

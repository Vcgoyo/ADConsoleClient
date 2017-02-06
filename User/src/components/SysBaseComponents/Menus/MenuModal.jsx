import React,{PropTypes}  from 'react'
import {Form,Input,Modal,Alert} from 'antd'
const FormItem=Form.Item;


const MenuModal=({
  visible,
  item={},
  onOk,
  onCancel,
  errShow='none',
  errMessage,
  //currentItem={},
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
      const data={...getFieldsValue(),id:item.id};
      debugger;
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
    width:500,
    onOk:handleOk,
    onCancel,
  };

  return (
    <Modal {...modalOpts}>
        <Form horizontal>
            <FormItem label="菜单名称" hasFeedBack {...formItemLayout}>
              {
                getFieldDecorator('itemname',{
                initialValue:item.itemname,
                rules:[
                  {required:true,message:'名称未填写'}
                ],
              })(
                <Input type='text'/>
              )}
            </FormItem>
            <FormItem label="URL" hasFeedBack {...formItemLayout}>
              {getFieldDecorator('itemurl',{
                initialValue:item.itemurl,
                // rules:[
                //   {validator:checkNumber }
                // ],
              })(
                <Input type='text'/>
              )}
            </FormItem>
            <FormItem label="菜单类型" hasFeedBack {...formItemLayout}>
              {getFieldDecorator('itemtype',{
                initialValue:item.itemtype,
                // rules:[
                //   {validator:checkNumber }
                // ],
              })(
                <Input type='text'/>
              )}
            </FormItem>
        </Form>
        <Alert style={{display:errShow}}
           message="错误"
           description={errMessage}
           type="error"
           closeText="关闭"
           showIcon
        />
    </Modal>
  )
}

export default Form.create()(MenuModal);

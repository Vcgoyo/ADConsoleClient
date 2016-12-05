import React,{PropTypes} from 'react';
import {Form,Input,Modal} from 'antd'
const FormItem=Form.Item;

const UserModal=({
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

 const checkNumber=(rule, value, callback)=>{
   if(!value){
     callback(new Error('年龄未填写'));
   }
   if (!/^[\d]{1,2}$/.test(value)) {
      callback(new Error('年龄不合法'));
    } else {
      callback();
    }
 }
  const modalOpts={
    title:'修改用户',
    visible,
    onOk:handleOk,
    onCancel,
  };

  return (
    <Modal {...modalOpts}>
        <Form horizontal>
            <FormItem label="姓名" hasFeedBack {...formItemLayout}>
              {getFieldDecorator('name',{
                initialValue:item.name,
                rules:[
                  {required:true,message:'名称未填写'}
                ],
              })(
                <Input type='text'/>
              )}
            </FormItem>
            <FormItem label="年龄" hasFeedBack {...formItemLayout}>
              {getFieldDecorator('age',{
                initialValue:item.age,
                rules:[
                  {validator:checkNumber }
                ],
              })(
                <Input type='text'/>
              )}
            </FormItem>
            <FormItem label="地址" hasFeedBack {...formItemLayout}>
              {getFieldDecorator('address',{
                initialValue:item.address,
                rules:[
                  {required: true, message: '不能为空' }
                ],
              })(
                <Input type='address'/>
              )}
            </FormItem>
        </Form>
    </Modal>
  )
}

UserModal.propTypes = {
  visible: PropTypes.any,
  form: PropTypes.object,
  item: PropTypes.object,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
};

export default Form.create()(UserModal);

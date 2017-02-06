import React,{PropTypes} from 'react';
import {Form,Input,Modal,Select} from 'antd'
const FormItem=Form.Item;
const Option=Select.Option

const UserModal=({
  visible,
  item={},
  onOk,
  onCancel,
  roleList,
  form:{
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    setFieldsValue,
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
 const children=[];
 for (let i = 0; i < roleList.length; i++) {
   children.push(<Option key={roleList[i].id}>{roleList[i].rolename}</Option>)
 }
 // setFieldsValue({
 //   roleIds:13,
 // })
 const roleListinitialValue=item.roleIdsStr?{initialValue:item.roleIdsStr.split(',')}:{};
 debugger;
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
            <FormItem label="昵称" hasFeedBack {...formItemLayout}>
              {getFieldDecorator('aliasname',{
                initialValue:item.aliasname,
                rules:[
                  {required:true,message:'名称未填写'}
                ],
              })(
                <Input type='text'/>
              )}
            </FormItem>
            <FormItem label="用户名" hasFeedBack {...formItemLayout}>
              {getFieldDecorator('username',{
                initialValue:item.username,
                rules:[
                  {required:true,message:'请填写用户名'},
                  //{validator:checkNumber }
                ],
              })(
                <Input type='text'/>
              )}
            </FormItem>
            <FormItem label="用户类型" hasFeedBack {...formItemLayout}>
              {getFieldDecorator('usertype',{
                initialValue:item.usertype,
                rules:[
                  {required: true, message: '不能为空' }
                ],
              })(
                <Input type='text'/>
              )}
            </FormItem>
            <FormItem label="性别" hasFeedBack {...formItemLayout}>
              {getFieldDecorator('sex',{
                initialValue:item.sex,
                rules:[
                  {required: true, message: '不能为空' }
                ],
              })(
                <Input type='text'/>
              )}
            </FormItem>
            <FormItem label="出生年月" hasFeedBack {...formItemLayout}>
              {getFieldDecorator('birthday',{
                initialValue:item.birthday,
                rules:[
                  {required: true, message: '不能为空' }
                ],
              })(
                <Input type='text'/>
              )}
            </FormItem>
            <FormItem label="角色"   {...formItemLayout} >
              {getFieldDecorator('roleIds',
                roleListinitialValue
              )(
                <Select multiple placeholder="请点击选择"  >
                  {children}
                </Select>
              )}
            </FormItem>
            <FormItem label="最后登录日期" hasFeedBack {...formItemLayout}>
              {getFieldDecorator('lastlogindate',{
                initialValue:item.lastlogindate,
              })(
                <Input type='text' readOnly/>
              )}
            </FormItem>
            <FormItem label="最后登录IP" hasFeedBack {...formItemLayout}>
              {getFieldDecorator('lastloginip',{
                initialValue:item.lastloginip,
              })(
                <Input type='text' readOnly/>
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

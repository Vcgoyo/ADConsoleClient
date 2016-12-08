import React, {PropTypes } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;

const Login=({
  form:{
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  }
})=>{
  function handleSubmit(e){
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
      //const data={...getFieldsValue(),key:item.key};
    });
  }
  const  { getFieldDecorator } = form;

  return (
    <Form onSubmit={handleSubmit} style={{max-width: 300px}}>
       <FormItem>
         {getFieldDecorator('userName', {
           rules: [{ required: true, message: 'Please input your username!' }],
         })(
           <Input addonBefore={<Icon type="user" />} placeholder="Username" />
         )}
       </FormItem>
       <FormItem>
         {getFieldDecorator('password', {
           rules: [{ required: true, message: 'Please input your Password!' }],
         })(
           <Input addonBefore={<Icon type="lock" />} type="password" placeholder="Password" />
         )}
       </FormItem>
       <FormItem>
         {getFieldDecorator('remember', {
           valuePropName: 'checked',
           initialValue: true,
         })(
           <Checkbox>Remember me</Checkbox>
         )}
         <a className="login-form-forgot">Forgot password</a>
         <Button type="primary" htmlType="submit" style={{width: 100%}}>
           Log in
         </Button>
         Or <a>register now!</a>
       </FormItem>
     </Form>
  )
}

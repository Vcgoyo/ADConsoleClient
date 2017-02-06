import React, {PropTypes } from 'react';
import { Form, Icon, Input, Button, Checkbox,Row, Col } from 'antd';
import styles from './LoginForm.less';
const FormItem = Form.Item;

const LoginForm=({
  LoginSubmit,
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
        LoginSubmit(values);
      }
      //const data={...getFieldsValue(),key:item.key};
    });
  }
  //const  { getFieldDecorator } = props.form;

  return (
    <div >
      <Row>
      <Col span={10}>18</Col>
      <Col span={14} style={{'margin-top':'15%'}}>
        <Form onSubmit={handleSubmit} className={styles.loginform} >
           <FormItem>
             {getFieldDecorator('username', {
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
             <a className={styles.loginformforgot}>Forgot password</a>
             <Button type="primary" htmlType="submit" className={styles.loginformbutton}>
               Log in
             </Button>
             Or <a>register now!</a>
           </FormItem>
         </Form>
      </Col>
    </Row>

     </div>
  )
}
export default Form.create()(LoginForm);

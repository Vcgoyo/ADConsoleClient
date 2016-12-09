import React,{PropTypes} from 'react';
import {connect} from 'dva';
import LoginForm from '../components/SysBaseComponents/LoginForm';

function Login({dispatch}) {

  const LoginFormProps={
    LoginSubmit(userLoginMsg){
      dispatch({
        type:'login/requestLogin',
        userloginmsg:userLoginMsg,
      })
    }
  }

  return <LoginForm {...LoginFormProps}/>
}

function mapStateToProps({login}){
  return {login};
}

export default connect(mapStateToProps)(Login);

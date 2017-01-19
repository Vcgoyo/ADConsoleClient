export default {
  namespace:'header',
  state:{
    userName:'VicGo',
    handImage:'./resource/image/b2.jpg',
    dropDownMenuVisible:'none',
  },
  subscriptions:{

  },
  effects:{

  },
  reducers:{
    toggleDropDownMenu(state){
      let nowVisible;
      if(state.dropDownMenuVisible=='none'){
        nowVisible='block';
      }else{
        nowVisible='none';
      }
      return {...state,dropDownMenuVisible:nowVisible}
    },
  }
}

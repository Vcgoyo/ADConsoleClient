import './index.html';
import './index.css';
import dva  from 'dva';
import 'antd/dist/antd.css'
import {routerRedux} from 'dva/router';
import { browserHistory } from 'dva/router';
import { useRouterHistory } from 'dva/router';
import { createHashHistory } from 'history';

// 1. Initialize
const app = dva({
  //history: browserHistory,
   //history: useRouterHistory(createHashHistory)({ queryKey: false }),
  //  onError(e) {
  //    //服务器请求相关错误
   //
  //    debugger;
  //    if(e.response){
  //      switch (e.response.status) {
  //        case 200:
  //         location='/#/login';
  //          break;
  //        default:
   //
  //      }
  //    }
  //  },
});

// 2. Plugins
//app.use({});

// 3. Model
app.model(require('./models/users'));
app.model(require('./models/SysModels/menus'));
app.model(require('./models/SysModels/login'));
app.model(require('./models/SysModels/header'));
// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');

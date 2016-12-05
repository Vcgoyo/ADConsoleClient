import './index.html';
import './index.css';
import dva from 'dva';
import 'antd/dist/antd.css'
import { browserHistory } from 'dva/router';

// 1. Initialize
const app = dva({
  //history: browserHistory,
});

// 2. Plugins
//app.use({});

// 3. Model
app.model(require('./models/users'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');

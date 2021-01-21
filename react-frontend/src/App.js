// react-router-dom is same as react-router excepth this four things
// BrowserRouter、 HashRouter、Link、NavLink。
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import ListEmployeeComponent from './components/ListEmployeeComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import CreateEmployeeComponent from './components/CreateEmployeeComponent';
import UpdateEmployeeComponent from './components/UpdateEmployeeComponent';
import ViewEmployeeComponent from './components/ViewEmployeeComponent';


function App() {
  return (
    <div className="conBig">
      <Router>
          <HeaderComponent></HeaderComponent>
            <div className="container">
              <Switch>
                <Route exact path = "/" component = {ListEmployeeComponent}></Route>
                <Route path = "/employees" component = {ListEmployeeComponent}></Route>
                <Route path = "/add-employee" component = {CreateEmployeeComponent}></Route>
                <Route path = "/update-employee/:id" component = {UpdateEmployeeComponent}></Route>
                <Route path = "/view-employee/:id" component = {ViewEmployeeComponent}></Route>
              </Switch>
            </div>
              <FooterComponent></FooterComponent>
        </Router>
    </div>
    
  );
}
export default App;

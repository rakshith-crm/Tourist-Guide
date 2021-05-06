import './App.css';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import LoginPage from './components/LoginPage';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
function App() {
  const [isAuthenticated, setAuthentication] = useState(false);

  const setAuth = boolean=>{
    setAuthentication(boolean);
    if(boolean===false){
      localStorage.token=null;
      toast.error('Logged Out');
    }
  };

  useEffect(()=>{
    const isAuth = async()=>{
      try {
        const query = await fetch('http://localhost:5000/auth/is-verify',{
          method : 'GET',
          headers : {token : localStorage.token }
        });
        const response = await query.json();
        console.log(response);
        if(response===true){
          setAuth(true);
        }
        else
        {
          toast.error('Not Authorized')
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    isAuth();
  },[]);
  return (
    <Router>
      <Switch>
        <Route path='/' exact> <Redirect to='/login'></Redirect>  </Route>
        <Route path='/login' render ={props => !isAuthenticated ?<LoginPage setAuth={setAuth} /> : <Redirect to='/dashboard'/>} ></Route>
        <Route path='/register' render={props => !isAuthenticated ? <Register setAuth={setAuth} /> : <Redirect to='/login' /> }></Route>
        <Route path='/dashboard' render={props => isAuthenticated ? <Dashboard setAuth={setAuth} /> : <Redirect to='/login' />}></Route>
      </Switch>
    </Router>
  );
}

export default App;

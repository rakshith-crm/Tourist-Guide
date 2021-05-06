import React,{Fragment, useState} from 'react';
import { useHistory } from 'react-router';
import {toast} from 'react-toastify';
toast.configure();
const LoginPage = ({setAuth})=>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const Login = async e=>{
      e.preventDefault();
      try {
        const body = {email, password};
        const query = await fetch('http://localhost:5000/auth/login',{
          method : 'POST',
          headers : {'Content-Type' : 'application/json'},
          body : JSON.stringify(body)
        });
        const response = await query.json();
        console.log(response);
        if(response.status!==401){
          console.log('Success');
          localStorage.setItem('token', response.token);
          setAuth(true);
          toast.success('Logged In');
        }
        else
        {
          setAuth(false);
          toast.error('Error!');
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    return(
        <Fragment>
<form className='container jumbotron mt-5' onSubmit={Login}>
    <h1 style={{textAlign : 'center'}}>Sign-In</h1><hr/>
  <div className="form-group mt-3">
    <label>Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={e=>setEmail(e.target.value)} required/>
    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div className="form-group">
    <label>Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" onChange={e=>setPassword(e.target.value)} required/>
  </div>

  <button type="submit" className="btn btn-primary">Submit</button>
  <button className='btn btn-info ml-2' onClick={()=>history.push('/register')}>Register</button>
</form>
        </Fragment>
    );
};

export default LoginPage;

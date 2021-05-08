import React,{Fragment, useState} from 'react';

const Register = ({setAuth})=>{
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const RegisterUser = async(e) =>{
        e.preventDefault();
        try {
            const body = {username, email, password};
            const query = await fetch('/auth/register',{
                method : 'POST',
                headers : {'Content-Type' : 'application/json'},
                body : JSON.stringify(body)
            });
            const response = await query.json();
            console.log(response);
            localStorage.setItem('token', response.token); 
            setAuth(true);
        } catch (error) {
            console.log(error.message);
        }
    };
    return(
<Fragment>
<form className='needs-validation container border jumbotron p-5 mt-5' onSubmit={RegisterUser}>
    <h1  style={{textAlign : 'center'}}>Register</h1>
    <hr className='mb-3'/>
  <div className="form-group">
    <label>Name</label>
    <input type="text" className="form-control" aria-describedby="emailHelp" onChange={e=>setUsername(e.target.value)} required/>
  </div>
  <div className="form-group">
    <label>Email address</label>
    <input type="email" className="form-control" aria-describedby="emailHelp" onChange={e=>setEmail(e.target.value)} required/>
    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div className="form-group">
    <label>Password</label>
    <input type="password" className="form-control"onChange={e=>setPassword (e.target.value)} required/>
  </div>
  <button type="submit" className="btn btn-lg btn-info mt-2">Submit</button>
</form>
</Fragment>
    );
};

export default Register;
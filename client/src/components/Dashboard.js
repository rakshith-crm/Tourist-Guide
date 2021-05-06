import React,{Fragment, useEffect, useState} from 'react';
import NewPost from './NewPost';
import AllLocations from './AllLocations';
const Dashboard = ({setAuth})=>{
    const [username, setUsername] = useState('');
    const GetDetails = async ()=>{
        try {
            const query = await fetch('http://localhost:5000/dashboard',{
                method: 'GET',
                headers : {token : localStorage.token}
            })
            const response = await query.json();
            console.log(response);
            setUsername(response.username);
        } catch (error) {
            console.log(error.message);
        }
    };
    useEffect(()=>{
        GetDetails();
    },[])
    return(
<Fragment>
<nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-3">
  <a className="navbar-brand" href='http://localhost:3000/dashboard'>Home</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarSupportedContent">

  <form className="form-inline my-2 my-lg-0"  style={{display : 'flex', justifyContent : 'flex-end', width : '100%', padding : '0px'}}>
      <button className="btn btn-danger my-sm-0"  type="submit" onClick={()=>setAuth(false)}>Logout</button>
    </form>
  </div>
</nav>
<h1 style={{textAlign : 'center'}}>Welcome {username}</h1>
<div className='container border p-2' style={{display : 'flex', width : '100%'}}>
<h4 style={{display : 'flex', width : '100%', justifyContent : 'flex-start'}}>Add your favourite location</h4>
<button className="btn btn-primary rounded" style={{justifyContent : 'flex-end'}} type="button" data-toggle="collapse" data-target="#collapseExample">
Add
</button>
</div>
<div className='collapse m-5' id='collapseExample'>
  <div className="card card-body">
        <NewPost />
  </div>
</div>
<AllLocations />
</Fragment>
    );
};

export default Dashboard;
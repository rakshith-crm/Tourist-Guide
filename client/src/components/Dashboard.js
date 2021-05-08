import React,{Fragment, useEffect, useState} from 'react';
import NewPost from './NewPost';
import AllLocations from './AllLocations';
import {FaRegUserCircle as User} from 'react-icons/fa';
import {BsPlusCircleFill as Plus} from 'react-icons/bs';

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
  <User size='30px' color='white' className='mr-1 mb-1' />
  <h4 style={{textAlign : 'center', color : 'white'}} className='mr-3 mt-1'>Welcome {username}</h4>

      <button className="btn btn-danger my-sm-0"  type="submit" onClick={()=>setAuth(false)}>Logout</button>
    </form>
  </div>

</nav>
<div className='container p-2 shadow p-3 mb-5 bg-white rounded' style={{display : 'flex', width : '100%'}}>
<h5 style={{display : 'flex', width : '100%', justifyContent : 'flex-start'}} className='mt-2 ml-5'>Add your favourite location</h5>
<a className="" style={{justifyContent : 'flex-end'}} data-toggle="collapse" href="#collapseExample">
<Plus size='40px' color='DodgerBlue' />
</a>
</div>
<div className='collapse m-5' id='collapseExample'>
  <div className="container shadow-lg p-3 mb-5 bg-white rounded p-5">
        <NewPost />
  </div>
</div>
<AllLocations />
</Fragment>
    );
};

export default Dashboard;
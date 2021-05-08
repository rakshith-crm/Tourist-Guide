import React, { Fragment, useEffect, useState } from 'react';
import { FcLike as Like, FcLikePlaceholder as Dislike} from 'react-icons/fc';

const AllLocations = ()=>{
    const [AllLocations, setLocations] = useState([]);
    const LikeIt = async(location_id)=>{
        try {
            const query = await fetch(`/ratings/${location_id}`,{
                method : 'POST',
                headers : {token : localStorage.token}
            });
            const response = await query.json();
            console.log(response);
            window.location.reload();
        } catch (error) {
            console.log(error.message);
        }
    };
    const DislikeIt = async(location_id)=>{
        try {
            const query = await fetch(`/ratings/${location_id}`,{
                method : 'DELETE',
                headers : {token : localStorage.token}
            });
            const response = await query.json();
            console.log(response);
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    };
    const GetAllLocations = async()=>{
        try {
            const query = await fetch('http://localhost:5000/dashboard/alllocations',{
                method : 'GET',
                headers : {token : localStorage.token}
            });
            const data =await query.json();
            console.log(data);
            setLocations(data);
        } catch (error) {
            console.log(error.message);
        }
    };
    useEffect(()=>{
        GetAllLocations();
    },[]);
    return (
<Fragment>
    <h1 style={{textAlign : 'center'}} className='mt-5'>All Locations</h1><hr />
    <div className=''>
<div className="row" style={{textAlign : 'center'}}>
{AllLocations.map(location => (
        <div className="col-md-4 card p-3" key={location.location_id}>
        <div style={{display : 'flex'}}>
            <p style={{display : 'flex', justifyContent : 'flex-start', width : '15rem'}} className='ml-3 mr-1 badge-info rounded p-1 text-wrap text-monospace'>Added by :</p>
            <p style={{display : 'flex', justifyContent : 'flex-end', width : '30rem'}} className='mr-3 badge-light rounded p-1 text-wrap text-monospace'>username@ {location.username}</p>
        </div>
        <div className='container'>
            <img src = {location.photo} alt="None" style={{width : '80%', height : '200px'}} className='rounded' />
            <hr style={{width : '100%'}}></hr>
            <ul className="list-group mb-2">
            <li className="list-group-item d-flex justify-content-between align-items-center">
                <u><h5>Location Name</h5></u>
                <b><i>{location.location_name}</i></b>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
                City
                <i>{location.city}</i>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
                Visit During
                <i>{location.visit_during}</i>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
                Latitude
                <i>{location.latitude}</i>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
                Longitude
                <i>{location.longitude}</i>
            </li>
            
            <li className="list-group-item d-flex justify-content-between align-items-center">
                Like
                {location.liked !== null ? <Like size='30px' onClick={()=>DislikeIt(location.location_id)}/> : <Dislike size='30px' onClick={()=>LikeIt(location.location_id)} />}
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
                Liked by
                <i>{location.count}</i>
            </li>
            </ul>
            <h3 className='mt-3'>About</h3>
                <p style={{textAlign : 'justify'}}>{location.description}</p>
        </div>
    </div>

))}
</div>

</div>
</Fragment>
    );
};

export default AllLocations;
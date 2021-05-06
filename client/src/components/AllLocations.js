import React, { Fragment, useEffect, useState } from 'react';

const AllLocations = ()=>{
    const [AllLocations, setLocations] = useState([]);
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
<div class="row" style={{textAlign : 'center'}}>
{AllLocations.map(location => (
        <div class="col-md-4 card p-3">
        <div style={{display : 'flex'}}>
            <p style={{display : 'flex', justifyContent : 'flex-start', width : '15rem'}} className='ml-3 mr-1 badge-info rounded p-1 text-wrap text-monospace'>Added by :</p>
            <p style={{display : 'flex', justifyContent : 'flex-end', width : '30rem'}} className='mr-3 badge-light rounded p-1 text-wrap text-monospace'>username@ {location.username}</p>
        </div>
        <div class='container'>
            <img src = {location.photo} alt="None" style={{width : '80%'}} className='rounded' />
            <hr style={{width : '100%'}}></hr>
            <ul class="list-group mb-2">
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <h5>Location Name</h5>
                <text>{location.location_name}</text>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center">
                City
                <text>{location.city}</text>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center">
                Visit During
                <text>{location.visit_during}</text>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center">
                Latitude
                <text>{location.latitude}</text>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center">
                Longitude
                <text>{location.longitude}</text>
            </li>
            </ul>
            <h3>About</h3>
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
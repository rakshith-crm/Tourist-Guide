import React, { Fragment, useState } from 'react';
import axios from 'axios';
const NewPost = ()=>{
    const [location_name, setLocation] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [description, setDescription] = useState('');
    const [city, setCity] = useState('');
    const [photo, setPhoto] = useState('');
    const [visit_during, setVisit] = useState('');

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const body = {location_name, latitude, longitude, description, city, visit_during};
            console.log(body);
            const formData = new FormData();
            formData.append('file', photo);
            formData.append('location_name', location_name);
            formData.append('latitude', latitude);
            formData.append('longitude', longitude);
            formData.append('description', description);
            formData.append('city', city);
            formData.append('visit_during', visit_during);
            const query = await axios.post('http://localhost:5000/dashboard/addpost', formData, {
                headers : {token : localStorage.token , 'Content-Type' : 'multipart/form-data'},
            });
            const response = await query.data;
            console.log(response);
        } catch (error) {
            console.log(error.message);
        }
    };
    return (
<Fragment>
<form onSubmit={onSubmit}>
  <div className="form-group">
    <label htmlFor='#1'>Location Name</label>
    <input type="text" className="form-control" id='1' onChange={e=>setLocation(e.target.value)} />
    <label htmlFor='#2'>Latitide</label>
    <input type="text" className="form-control" id='2' onChange={e=>setLatitude(e.target.value)} />
    <label htmlFor='#3'>Longitude</label>
    <input type="text" className="form-control" id='3' onChange={e=>setLongitude(e.target.value)} />
    <label htmlFor='#4'>Description</label>
    <textarea type="textarea" className="form-control" id='4' onChange={e=>setDescription(e.target.value)} />
    <label htmlFor='#5'>City</label>
    <input type="text" className="form-control" id='5' onChange={e=>setCity(e.target.value)} />
    Choose Photo <br></br>
    <input type="file" className="m-4 customer-file-input" id='6' onChange={e=>setPhoto(e.target.files[0])} /><br></br>
    <label htmlFor='#7'>Visit During</label>
    <input type="text" className="form-control" id='7' onChange={e=>setVisit(e.target.value)} />
        
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
</Fragment>
    );
};

export default NewPost;
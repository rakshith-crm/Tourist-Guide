const router = require('express').Router();
const express = require('express');
const pool = require('../database');
const cors = require('cors');
const fileupload = require('express-fileupload');
const authorization = require('../middleware/authorization');
router.use(fileupload());
router.use(cors());
router.use(express.json());
router.get('/', authorization, async(req,res)=>{
    try {
        const query = await pool.query('select username from users where user_id=$1',[req.user]);
        if(query.rows.length===0){
            return res.send('Authentication Failed...');
        }
        res.json(query.rows[0])
    } catch (error) {
        console.log(error.message);
        res.send('Server Error!');
    }
});

router.post('/addpost', authorization, async(req,res)=>{
    try {
        const user_id = req.user;
        const {location_name, latitude, longitude, description, city, visit_during} = req.body;
        console.log(req.files.file.name);
        console.log(req.body);
        if(req.files === null)
        {
            console.log('No File');
            return res.status(400).send('Missing Files');
        }
        console.log('reached here..')
        const photo = req.files.file;
        console.log(__dirname);
        await photo.mv(__dirname+`/../../client/public/uploads/${photo.name}`, err=>{
            if(err){
                console.log(err.message);
                return res.status(500).send('Server Error');
            }
            else
            {
                console.log({filename : photo.name, path : `/uploads/${photo.name}`})
            }
        });
        const query = await pool.query('insert into locations(location_name, latitude, longitude, description, city, photo, visit_during, added_by) values($1,$2,$3,$4,$5,$6,$7,$8) returning *',
        [location_name, latitude, longitude, description, city, `/uploads/${photo.name}`, visit_during, user_id]);
        res.status(200).json(query.rows[0]);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error');
    }
});
router.get('/alllocations', async(req,res)=>{
    try {
        const query = await pool.query('select location_name, latitude, longitude, description, city, photo, visit_during, username from locations left join users on users.user_id=locations.added_by');
        res.json(query.rows);
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
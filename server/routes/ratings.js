const router = require('express').Router();
const express = require('express');
const cors = require('cors');
const pool = require('../database');
const authorization = require('../middleware/authorization');
router.use(cors());
router.use(express.json());

router.get('/', async(req,res)=>{
    try {
        const query = await pool.query('select * from ratings');
        res.json(query.rows);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({msg : 'Server Error'});
    }
});
router.get('/:location_id', authorization, async (req,res) =>{
    try {
        const {location_id} = req.params;
        const query = await pool.query('select location_id, user_id, liked from ratings where location_id=cast($1 as integer) and user_id=CAST($2 as uuid)',
        [location_id,req.user]);
        res.json(query.rows);
        console.log(query.rows);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({msg : 'Server Error'});
    }
});

router.get('/isliked/:location_id', authorization, async(req,res)=>{
    try {
        const {location_id} = req.params;
        const query = await pool.query('select * from ratings where user_id=CAST($1 as uuid) and location_id=CAST($2 as INTEGER)',
        [req.user,location_id]);
        if(query.rowCount === 0){
            return res.json(false)
        }
        return res.json(true);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message : 'Server Error'});
    }
});
router.post('/:location_id', authorization, async(req,res)=>{
    try {
        const {location_id} = req.params;
        const query = await pool.query('call insert_into_ratings($1, $2, \'true\')',
        [location_id,req.user]);
        res.json({location_id : location_id, user_id : req.user});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message : 'Server Error'});
    }
});
router.delete('/:location_id', authorization, async(req,res)=>{
    try {
        const {location_id} = req.params;
        const query = await pool.query('delete from ratings where user_id=CAST($1 as uuid) and location_id=$2',
        [req.user, location_id]);
        res.json({location_id : location_id, user_id : req.user});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message : 'Server Error'});
    }   
});
module.exports = router;
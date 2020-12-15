const Hackers = require('../models/Hackers');

const router = require('express').Router();

router.get('/', (req, res)=>{
  res.status(200).json('Hi there')  
})

router.get('/leader-board', (req, res)=>{
    res.status(200).send("leader board")
})

router.get('/add-team',async (req, res) => {
    const add_Team = new Hackers({
        team_name: req.query.team_name,
        wins : 0,
        losses : 0,
        ties : 0,
        scores : 0
    });
    try{
        const new_team = await add_Team.save();
        res.status(201).json(new_team)
    } catch (err){
        res.status(400).json(err)
    }
});

router.get('/select-teams', (req, res)=>{
    res.send("select teams")
})

router.get('/search', (req, res)=>{
    res.send("searching")
})

module.exports = router;
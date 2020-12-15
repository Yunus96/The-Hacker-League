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
        total_wins: 0,
        total_losses: 0,
        total_ties: 0,
        total_score: 0
    })
    try{
        const saved_team = await add_Team.save()
        res.status(200).json(saved_team)
    } catch (err){
        res.status(400).json(err)
    }
})

router.get('/select-teams', (req, res)=>{
    res.send("select teams")
})

router.get('/search', (req, res)=>{
    res.send("searching")
})

module.exports = router;
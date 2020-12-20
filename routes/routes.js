const Hackers = require('../models/Hackers');

const router = require('express').Router();

router.get('/', (req, res)=>{
  res.render('test');  
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

router.get('/select-teams',async (req, res)=>{
    const team_a = req.query.team_a;
    const team_b = req.query.team_b;
    const team_won = req.query.team_won;
    const team_lost = req.query.team_lost;
    const tie = req.query.tie;
    
    if(tie == 'true') {
        const teamA = await Hackers.updateOne({ team_name: team_a }, { $inc : { ties : 1, scores: 1}});
        const teamB = await Hackers.updateOne( {team_name: team_b}, {$inc: {ties: 1, scores: 1}} )
        return res.status(200).json("Scores Updated")
    }else{
        await Hackers.updateOne({ team_name: team_won }, { $inc : { wins : 1, scores: 3}});
        await Hackers.updateOne({ team_name: team_lost }, { $inc : { losses : 1}});
        return res.status(500).send('Updated')
    }
})

router.get('/search', (req, res)=>{
    res.send("searching")
})

module.exports = router;
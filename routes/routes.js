const Hackers = require('../models/Hackers');

const router = require('express').Router();

router.get('/', (req, res)=>{
    res.render('home');  
})

router.get('/dashboard', async (req, res)=>{
    const allData = await Hackers.find()
    try{
        res.render('index', {allData : allData });  
    } catch(e){
        res.send("Something Went Wrong")
    }
})

router.get('/leader-board',async (req, res)=>{
    const allData = await Hackers.find()
    res.render("leader-board", {allData : allData})
})

router.get('/add-team',async (req, res) => {

    //check whether team exist
    const team_exist = await Hackers.findOne({team_name : req.query.team_name})
    if(team_exist) return res.json({'Message' : "team exist"})

    const add_Team = new Hackers({
        team_name: req.query.team_name,
        wins : 0,
        losses : 0,
        ties : 0,
        score : 0
    });
    try{
        const new_team = await add_Team.save();
        res.status(201).json({message : "Team Add Successfully"})
    } catch (err){
        res.status(400).json({message : "Something Went Wrong"})
    }
});

router.get(`/select-teams`,async (req, res)=>{
    let team_a = req.query.team_a;
    let team_b = req.query.team_b;
    let team_won = req.query.winning_team;
    let tie = req.query.tie;
    let team_lost = "";

    //setting loser param
    if(team_won == team_a){
       team_lost = team_b;
    } else {
       team_lost = team_a;
    }
    

    //checking for team_a exist
    const team_a_exist = await Hackers.findOne({team_name : team_a})
    if(!team_a_exist) return res.json({'message' : `${team_a} doesn't exist`})
    //checking for team_b exist
    const team_b_exist = await Hackers.findOne({team_name : team_b})
    if(!team_b_exist) return res.json({"message" : `${team_b} doesn't exist`})

    
    if(tie == 'true') {
        const teamA = await Hackers.updateOne({ team_name: team_a }, { $inc : { ties : 1, score: 1}});
        const teamB = await Hackers.updateOne({ team_name: team_b }, { $inc: { ties: 1, score: 1}} )
        res.status(200).json({"Message":"Match Result Updated"})
    }else{
        await Hackers.updateOne({ team_name: team_won }, { $inc : { wins : 1, score: 3}});
        await Hackers.updateOne({ team_name: team_lost }, { $inc : { losses : 1}});
        res.status(200).json({"Message":'Match Result Updated'})
    }
})


module.exports = router;
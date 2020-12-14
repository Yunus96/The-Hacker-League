const router = require('express').Router();

router.get('/', (req, res)=>{
  res.status(200).json('Hi there')  
})

router.get('/leader-board', (req, res)=>{
    res.status(200).send("leader board")
})

router.get('/add-team', (req, res) => {
    res.status(200).send("Add Team")
})

router.get('/select-teams', (req, res)=>{
    res.send("select teams")
})

router.get('/search', (req, res)=>{
    res.send("searching")
})

module.exports = router;
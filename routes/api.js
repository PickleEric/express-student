let express = require('express')
let db = require('../models')// fetches what index exports
let Student = db.Student // referance from our student model
let Sequelize = require('sequelize')
let router = express.Router() // matches requests to functions that can responed 

router.get('/students', function(req, res, next){
    Student.findAll( {order: ['name'] } ).then(students => { //creates a promise, with in a promise we need a retrun
        return res.json(students)
    })
    .catch(err => next (err))
})

router.post('/students', function (req, res, next){
    Student.create( req.body ).then( (data) => {
        return res.status(201).send("Success")
    }).catch( err => {
        if (err instanceof Sequelize.ValidationError) {
            let messages = err.errors.map (e=>e.message)
            console.log(messages)
            return res.status(400).json(messages)
        }
        return next(err)
    })
})
router.patch('/students/:id', function(req, res, next){

    Student.update( req.body, {where: { id: req.params.id } } )
    .then( rowModified => {
        return res.send("ok")
    }).then( (rowsModified) =>{
        if(!rowModified[0]) {
            return res.status(404).send('Not Found')
        }else {
            return res.send('ok')
        }
    }).catch( err => {
        if (err instanceof Sequelize.ValidationError) {
            let messages = err.errors.map( (e) => e.message)
            return res.status(500).json(messages)
        }
        return next(err)
    })

})
router.delete('/students/:id', function(req, res, next){
    Student.destroy( { where: { id: req.params.id } } )
        .then(rowModified => {
            return res.send("ok")
        }).catch ( err => next(err) )
})
module.exports = router
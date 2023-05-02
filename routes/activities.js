var express = require('express');
var router = express.Router();

const { isLoggedIn } = require('../middleware/route-guard')

const Activity = require('../models/Activity');

router.get('/add-activity', (req, res, next) => {
    res.render('activities/add-activity.hbs')
})

router.post('/add-activity', isLoggedIn, (req, res, next) => {
    const { name, description, imageUrl } = req.body

    Activity.create({
        name,
        description,
        imageUrl,
        owner: req.session.user._id
    })
        .then((createdActivity) => {
            console.log("charmander: ", createdActivity)
            res.redirect(`/activities/activity-details/${createdActivity._id}`)
        })
        .catch((err) => {
            console.log(err)
        })
})

router.get('/all-activities', (req, res, next) => {
    Activity.find()
        .then((activities) => {
            res.render('activities/all-activities.hbs', { activities })
        })
        .catch((err) => {
            console.log(err)
        })
})

module.exports = router;
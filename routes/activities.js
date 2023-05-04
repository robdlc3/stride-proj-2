var express = require('express');
var router = express.Router();

const { isLoggedIn } = require('../middleware/route-guard')

const Activity = require('../models/Activity');

// ********* require fileUploader in order to use it *********
const fileUploader = require('../config/cloudinary.js')


router.get('/add-activity', (req, res, next) => {
    res.render('activities/add-activity.hbs')
})

router.post('/add-activity', isLoggedIn, fileUploader.single('activity-cover-image'), (req, res, next) => {
    const { name, description, imageUrl, date, time } = req.body

    Activity.create({
        name,
        description,
        imageUrl: req.file.path,
        owner: req.session.user._id,
        date,
        time
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
            console.log(activities)
            res.render('activities/all-activities.hbs', { activities })
        })
        .catch((err) => {
            console.log(err)
        })
})

router.get('/activity-details/:id', (req, res, next) => {
    Activity.findById(req.params.id)
        .populate('owner')
        .populate({
            path: "reviews",
            populate: { path: "user" }
        })
        .then((foundActivity) => {
            console.log("found activity!!!", foundActivity)
            res.render('activities/activity-details.hbs', foundActivity)
        })
        .catch((err) => {
            console.log(err)
        })
})



// completed Edit 11A Thursday ---//
router.get('/edit/:id', (req, res, next) => {
    const { id } = req.params;

    Activity.findById(id)
        .then((foundActivity) => {
            console.log("Found the activity: ", foundActivity)
            res.render('activities/activity-edit.hbs', foundActivity)
        })
        .catch((err) => {
            console.log(err)
        })
})


router.post('/edit/:id', fileUploader.single('activity-cover-image'), (req, res, next) => {
    const { id } = req.params;
    const { name, description, owner, reviews, date, time } = req.body;

    Activity.findByIdAndUpdate(id, { name, description, imageUrl: req.file.path, owner, reviews, date, time },
        { new: true })
        .then((updatedActivity) => {
            console.log("Updated activity", updatedActivity);
            res.redirect(`/activities/activity-details/${updatedActivity._id}`);
        })
        .catch((err) => {
            console.log(err);
        });
})

// completed Edit 11A Thursday ---//



router.get('/delete/:id', (req, res, next) => {
    const { id } = req.params
    Activity.findByIdAndDelete(id)
        .then((post) => {
            res.redirect('/activities/all-activities')
        })
        .catch((err) => {
            console.log(err)
        })
})




module.exports = router;








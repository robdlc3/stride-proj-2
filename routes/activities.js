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
    const { name, description, imageUrl } = req.body

    Activity.create({
        name,
        description,
        imageUrl: req.file.path,
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
            res.render('activities/activity-details.hbs', foundActivity)
        })
        .catch((err) => {
            console.log(err)
        })
})


// working on delete 5P Wednesday //
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


// router.post('/activities/:activityId/delete', (req, res, next) => {
//     const { activityId } = req.params;

//     Activity.findByIdAndDelete(activityId)
//         .then(() => res.redirect('/activities'))
//         .catch(error => next(error));
// });





module.exports = router;



// working 4P Wednesday on edit activities

// router.get('/activity-edit/:id', isLoggedIn, (req, res, next) => {
//     Activity.findById(req.params.id)
//         .then((activity) => {
//             res.render('activities/edit-activity.hbs', { activity });
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// });

// router.post('/activity-edit/:id', isLoggedIn, fileUploader.single('activity-cover-image'), (req, res, next) => {
//     const { name, description } = req.body;
//     const imageUrl = req.file ? req.file.path : req.body.existingImage;

//     Activity.findByIdAndUpdate(
//         req.params.id,
//         {
//             name,
//             description,
//             imageUrl
//         },
//         { new: true }
//     )
//         .then((updatedActivity) => {
//             console.log(updatedActivity);
//             res.redirect(`/activities/activity-details/${updatedActivity._id}`);
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// });

// working 4P Wednesday on edit


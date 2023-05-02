var express = require('express');
var router = express.Router();

const Review = require('../models/Review');
const Activity = require('../models/Activity')

const { isLoggedIn } = require('../middleware/route-guard')

router.post('/add-review/:id', isLoggedIn, (req, res, next) => {

    Review.create({
        user: req.session.user._id,
        comment: req.body.comment
    })
        .then((newReview) => {
            console.log("New review:", newReview)
            return Activity.findByIdAndUpdate(
                req.params.id,
                {
                    $push: { reviews: newReview._id }
                }
                ,
                { new: true }
            )
        })
        .then((updatedActivity) => {
            console.log('Updated Activity:', updatedActivity)
            res.redirect(`/activities/activity-details/${updatedActivity._id}`)
        })
        .catch((err) => {
            console.log(err)
        })


})

module.exports = router;
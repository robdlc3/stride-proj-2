const { model, Schema } = require('mongoose')

const reviewSchema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: "User" },
        comment: { type: String, maxlength: 200 }
    }
);

module.exports = model('Review', reviewSchema)
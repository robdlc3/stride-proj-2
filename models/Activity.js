const { model, Schema } = require('mongoose')


const activitySchema = new Schema(
    {
        name: { type: String },
        description: { type: String },
        imageUrl: { type: String },
        owner: { type: Schema.Types.ObjectId, ref: "User" },
        reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
        date: { type: String },
        time: { type: String }
    }
);

module.exports = model('Activity', activitySchema)
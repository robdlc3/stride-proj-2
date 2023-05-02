const { model, Schema } = require('mongoose')


const activitySchema = new Schema(
    {
        name: { type: String },
        description: { type: String },
        imageUrl: { type: String },
        owner: { type: Schema.Types.ObjectId, ref: "User" },
        reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }];
    }
);

module.exports = model('Activity', activitySchema)
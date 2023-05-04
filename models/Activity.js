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

// adding date and time 12P Thursdsay //
function getFormattedDate(dateString) {
    const date = new Date(dateString);
    const month = date.toLocaleString('default', { month: 'long' });
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
}

// adding date and time 12P Thursdsay //

module.exports = model('Activity', activitySchema)
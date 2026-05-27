import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        enum: ['running', 'cycling', 'swimming', 'gym', 'walking', 'other'],
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    distance: {
        type: Number
    },
    calories: {
        type: Number
    },
    notes: {
        type: String,
        trim: true
    },
    loggedAt: {
        type: Date,
        required: true
    }
}, {
    timestamps: true
});

const Activity = mongoose.model('Activity', activitySchema);

export default Activity;

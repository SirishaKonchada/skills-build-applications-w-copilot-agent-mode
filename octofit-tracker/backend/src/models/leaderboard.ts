import mongoose from 'mongoose';

const leaderboardSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
    },
    score: {
        type: Number,
        default: 0
    },
    rank: {
        type: Number,
        default: 0
    },
    activitiesCount: {
        type: Number,
        default: 0
    },
    totalCalories: {
        type: Number,
        default: 0
    },
    totalDistance: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema);

export default Leaderboard;

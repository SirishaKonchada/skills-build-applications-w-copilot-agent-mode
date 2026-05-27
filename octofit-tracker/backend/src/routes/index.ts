import { Router, Request, Response } from 'express';
import User from '../models/user';
import Team from '../models/team';
import Activity from '../models/activity';
import Leaderboard from '../models/leaderboard';
import Workout from '../models/workout';

const router = Router();

export function setRoutes(app: any) {
    // User authentication routes
    router.post('/api/auth/register', async (req: Request, res: Response) => {
        try {
            const { username, email, password } = req.body;
            const user = new User({ username, email, password });
            await user.save();
            res.status(201).json({ message: 'User registered successfully', user });
        } catch (err: any) {
            res.status(400).json({ error: err.message });
        }
    });

    router.post('/api/auth/login', async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email, password });
            if (!user) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }
            res.json({ message: 'Login successful', user });
        } catch (err: any) {
            res.status(400).json({ error: err.message });
        }
    });

    // User profile routes
    router.get('/api/users/:userId', async (req: Request, res: Response) => {
        try {
            const user = await User.findById(req.params.userId);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json(user);
        } catch (err: any) {
            res.status(400).json({ error: err.message });
        }
    });

    // Activity logging routes
    router.post('/api/activity/log', async (req: Request, res: Response) => {
        try {
            const { userId, type, duration, distance, calories, notes, loggedAt } = req.body;
            const activity = new Activity({
                user: userId,
                type,
                duration,
                distance,
                calories,
                notes,
                loggedAt: loggedAt || new Date()
            });
            await activity.save();
            res.status(201).json({ message: 'Activity logged successfully', activity });
        } catch (err: any) {
            res.status(400).json({ error: err.message });
        }
    });

    router.get('/api/activity/user/:userId', async (req: Request, res: Response) => {
        try {
            const activities = await Activity.find({ user: req.params.userId });
            res.json(activities);
        } catch (err: any) {
            res.status(400).json({ error: err.message });
        }
    });

    // Team routes
    router.post('/api/teams', async (req: Request, res: Response) => {
        try {
            const { name, description, creatorId } = req.body;
            const team = new Team({
                name,
                description,
                creator: creatorId,
                members: [creatorId]
            });
            await team.save();
            res.status(201).json({ message: 'Team created successfully', team });
        } catch (err: any) {
            res.status(400).json({ error: err.message });
        }
    });

    router.get('/api/teams/:teamId', async (req: Request, res: Response) => {
        try {
            const team = await Team.findById(req.params.teamId)
                .populate('creator')
                .populate('members');
            if (!team) {
                return res.status(404).json({ error: 'Team not found' });
            }
            res.json(team);
        } catch (err: any) {
            res.status(400).json({ error: err.message });
        }
    });

    router.post('/api/teams/:teamId/members', async (req: Request, res: Response) => {
        try {
            const { userId } = req.body;
            const team = await Team.findByIdAndUpdate(
                req.params.teamId,
                { $addToSet: { members: userId } },
                { new: true }
            );
            res.json({ message: 'Member added to team', team });
        } catch (err: any) {
            res.status(400).json({ error: err.message });
        }
    });

    // Leaderboard routes
    router.get('/api/leaderboard', async (req: Request, res: Response) => {
        try {
            const leaderboard = await Leaderboard.find()
                .sort({ score: -1 })
                .populate('user')
                .limit(100);
            res.json(leaderboard);
        } catch (err: any) {
            res.status(400).json({ error: err.message });
        }
    });

    router.get('/api/leaderboard/team/:teamId', async (req: Request, res: Response) => {
        try {
            const leaderboard = await Leaderboard.find({ team: req.params.teamId })
                .sort({ score: -1 })
                .populate('user');
            res.json(leaderboard);
        } catch (err: any) {
            res.status(400).json({ error: err.message });
        }
    });

    router.post('/api/leaderboard/update', async (req: Request, res: Response) => {
        try {
            const { userId, score, activitiesCount, totalCalories, totalDistance } = req.body;
            const leaderboard = await Leaderboard.findOneAndUpdate(
                { user: userId },
                {
                    score: score || 0,
                    activitiesCount: activitiesCount || 0,
                    totalCalories: totalCalories || 0,
                    totalDistance: totalDistance || 0
                },
                { upsert: true, new: true }
            );
            res.json({ message: 'Leaderboard updated', leaderboard });
        } catch (err: any) {
            res.status(400).json({ error: err.message });
        }
    });

    // Workout routes
    router.post('/api/workouts', async (req: Request, res: Response) => {
        try {
            const { title, description, difficulty, duration, exercises, targetMuscles, createdById } = req.body;
            const workout = new Workout({
                title,
                description,
                difficulty,
                duration,
                exercises,
                targetMuscles,
                createdBy: createdById
            });
            await workout.save();
            res.status(201).json({ message: 'Workout created successfully', workout });
        } catch (err: any) {
            res.status(400).json({ error: err.message });
        }
    });

    router.get('/api/workouts', async (req: Request, res: Response) => {
        try {
            const difficulty = req.query.difficulty as string;
            const query = difficulty ? { difficulty } : {};
            const workouts = await Workout.find(query).populate('createdBy');
            res.json(workouts);
        } catch (err: any) {
            res.status(400).json({ error: err.message });
        }
    });

    router.get('/api/workouts/:workoutId', async (req: Request, res: Response) => {
        try {
            const workout = await Workout.findById(req.params.workoutId).populate('createdBy');
            if (!workout) {
                return res.status(404).json({ error: 'Workout not found' });
            }
            res.json(workout);
        } catch (err: any) {
            res.status(400).json({ error: err.message });
        }
    });

    // Health check route
    router.get('/api/health', (req: Request, res: Response) => {
        res.json({ status: 'OK', message: 'API is running' });
    });

    app.use(router);
}
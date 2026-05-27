import mongoose from 'mongoose';
import User from '../models/user';
import Team from '../models/team';
import Activity from '../models/activity';
import Leaderboard from '../models/leaderboard';
import Workout from '../models/workout';

export async function seedDatabase() {
    try {
        // Check if data already exists
        const userCount = await User.countDocuments();
        if (userCount > 0) {
            console.log('Database already seeded, skipping...');
            return;
        }

        console.log('Seeding database...');

        // Create sample users
        const users = await User.create([
            {
                username: 'alice_runner',
                email: 'alice@octofit.com',
                password: 'password123'
            },
            {
                username: 'bob_cyclist',
                email: 'bob@octofit.com',
                password: 'password123'
            },
            {
                username: 'charlie_swimmer',
                email: 'charlie@octofit.com',
                password: 'password123'
            },
            {
                username: 'diana_gym',
                email: 'diana@octofit.com',
                password: 'password123'
            }
        ]);

        console.log(`Created ${users.length} users`);

        // Create sample teams
        const teams = await Team.create([
            {
                name: 'Morning Runners',
                description: 'Early morning running group',
                creator: users[0]._id,
                members: [users[0]._id, users[1]._id]
            },
            {
                name: 'Weekend Warriors',
                description: 'Weekend fitness enthusiasts',
                creator: users[2]._id,
                members: [users[2]._id, users[3]._id]
            }
        ]);

        console.log(`Created ${teams.length} teams`);

        // Create sample activities
        const activities = await Activity.create([
            {
                user: users[0]._id,
                type: 'running',
                duration: 45,
                distance: 7.5,
                calories: 600,
                notes: 'Morning run in the park',
                loggedAt: new Date(Date.now() - 1000 * 60 * 60 * 2)
            },
            {
                user: users[1]._id,
                type: 'cycling',
                duration: 60,
                distance: 25,
                calories: 550,
                notes: 'Mountain biking trail',
                loggedAt: new Date(Date.now() - 1000 * 60 * 60 * 4)
            },
            {
                user: users[2]._id,
                type: 'swimming',
                duration: 30,
                distance: 1.5,
                calories: 400,
                notes: 'Laps at the pool',
                loggedAt: new Date(Date.now() - 1000 * 60 * 60 * 6)
            },
            {
                user: users[3]._id,
                type: 'gym',
                duration: 90,
                distance: 0,
                calories: 750,
                notes: 'Full body workout',
                loggedAt: new Date(Date.now() - 1000 * 60 * 60 * 24)
            }
        ]);

        console.log(`Created ${activities.length} activities`);

        // Create leaderboard entries
        const leaderboard = await Leaderboard.create([
            {
                user: users[3]._id,
                team: teams[1]._id,
                score: 1500,
                rank: 1,
                activitiesCount: 12,
                totalCalories: 8500,
                totalDistance: 42
            },
            {
                user: users[0]._id,
                team: teams[0]._id,
                score: 1200,
                rank: 2,
                activitiesCount: 10,
                totalCalories: 7200,
                totalDistance: 65
            },
            {
                user: users[1]._id,
                team: teams[0]._id,
                score: 1100,
                rank: 3,
                activitiesCount: 9,
                totalCalories: 6800,
                totalDistance: 180
            },
            {
                user: users[2]._id,
                team: teams[1]._id,
                score: 950,
                rank: 4,
                activitiesCount: 8,
                totalCalories: 5500,
                totalDistance: 15
            }
        ]);

        console.log(`Created ${leaderboard.length} leaderboard entries`);

        // Create sample workouts
        const workouts = await Workout.create([
            {
                title: 'Beginner Running Program',
                description: '5K training program for beginners',
                difficulty: 'beginner',
                duration: 45,
                exercises: [
                    { name: 'Warm-up jog', sets: 1, reps: 0, duration: 5 },
                    { name: '2K run', sets: 1, reps: 0, duration: 30 },
                    { name: 'Cool-down walk', sets: 1, reps: 0, duration: 10 }
                ],
                targetMuscles: ['legs', 'cardio'],
                createdBy: users[0]._id
            },
            {
                title: 'Full Body Gym Workout',
                description: 'Comprehensive strength training routine',
                difficulty: 'intermediate',
                duration: 90,
                exercises: [
                    { name: 'Bench Press', sets: 4, reps: 8, duration: 15 },
                    { name: 'Squats', sets: 4, reps: 10, duration: 15 },
                    { name: 'Deadlifts', sets: 3, reps: 5, duration: 15 },
                    { name: 'Rows', sets: 3, reps: 8, duration: 12 },
                    { name: 'Core work', sets: 3, reps: 15, duration: 10 }
                ],
                targetMuscles: ['chest', 'legs', 'back', 'arms', 'core'],
                createdBy: users[3]._id
            },
            {
                title: 'Swimming Basics',
                description: 'Learn proper swimming techniques',
                difficulty: 'beginner',
                duration: 30,
                exercises: [
                    { name: 'Freestyle laps', sets: 1, reps: 0, duration: 20 },
                    { name: 'Backstroke drills', sets: 1, reps: 0, duration: 10 }
                ],
                targetMuscles: ['shoulders', 'back', 'legs', 'cardio'],
                createdBy: users[2]._id
            },
            {
                title: 'Advanced HIIT',
                description: 'High intensity interval training for advanced athletes',
                difficulty: 'advanced',
                duration: 30,
                exercises: [
                    { name: 'Burpees', sets: 4, reps: 15, duration: 8 },
                    { name: 'Mountain climbers', sets: 4, reps: 20, duration: 8 },
                    { name: 'Jump squats', sets: 4, reps: 15, duration: 8 }
                ],
                targetMuscles: ['full body', 'cardio'],
                createdBy: users[0]._id
            }
        ]);

        console.log(`Created ${workouts.length} workouts`);
        console.log('Database seeded successfully!');
    } catch (err) {
        console.error('Error seeding database:', err);
    }
}

import React from 'react';
import { useQuery } from 'react-query';
import { useTodos } from '../context/TodoContext';
import { User, Post, AnalyticsData } from '../types';

const fetchUsers = async (): Promise<User[]> => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!response.ok) {
        throw new Error('Failed to fetch users');
    }
    return response.json();
};

const fetchPosts = async (): Promise<Post[]> => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!response.ok) {
        throw new Error('Failed to fetch posts');
    }
    return response.json();
};

const Analytics: React.FC = () => {
    const { todos } = useTodos();

    const { data: users, isLoading: usersLoading } = useQuery<User[]>('users', fetchUsers);
    const { data: posts, isLoading: postsLoading } = useQuery<Post[]>('posts', fetchPosts);

    if (usersLoading || postsLoading) {
        return <div className="text-center py-4">Loading analytics...</div>;
    }

    if (!users || !posts) {
        return <div className="text-center py-4 text-red-600">Error loading data</div>;
    }

    const calculateAnalytics = (): AnalyticsData => {
        const totalUsers = users.length;

        const postsPerUser = users.map(user => ({
            userId: user.id,
            username: user.username,
            count: posts.filter(post => post.userId === user.id).length
        }));

        const completedTodosPerUser = users.map(user => ({
            userId: user.id,
            username: user.username,
            count: todos.filter(todo => todo.userId === user.id && todo.completed).length
        }));

        const sortedByPosts = [...postsPerUser].sort((a, b) => b.count - a.count);
        const userWithMostPosts = sortedByPosts[0];
        const userWithFewestPosts = sortedByPosts[sortedByPosts.length - 1];

        const sortedByCompletedTodos = [...completedTodosPerUser].sort((a, b) => b.count - a.count);
        const userWithMostCompletedTodos = sortedByCompletedTodos[0];
        const userWithFewestCompletedTodos = sortedByCompletedTodos[sortedByCompletedTodos.length - 1];

        return {
            totalUsers,
            userWithMostPosts: {
                username: userWithMostPosts.username,
                count: userWithMostPosts.count
            },
            userWithFewestPosts: {
                username: userWithFewestPosts.username,
                count: userWithFewestPosts.count
            },
            userWithMostCompletedTodos: {
                username: userWithMostCompletedTodos.username,
                count: userWithMostCompletedTodos.count
            },
            userWithFewestCompletedTodos: {
                username: userWithFewestCompletedTodos.username,
                count: userWithFewestCompletedTodos.count
            }
        };
    };

    const analytics = calculateAnalytics();

    const StatCard: React.FC<{ title: string; value: string | number; subtitle?: string; color: string }> = ({
        title,
        value,
        subtitle,
        color
    }) => (
        <div className={`p-4 rounded-lg border ${color}`}>
            <h4 className="text-sm font-medium text-gray-600 mb-1">{title}</h4>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </div>
    );

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <StatCard
                    title="Total Users"
                    value={analytics.totalUsers}
                    color="bg-blue-50 border-blue-200"
                />

                <StatCard
                    title="Most Posts"
                    value={analytics.userWithMostPosts.count}
                    subtitle={`@${analytics.userWithMostPosts.username}`}
                    color="bg-green-50 border-green-200"
                />

                <StatCard
                    title="Fewest Posts"
                    value={analytics.userWithFewestPosts.count}
                    subtitle={`@${analytics.userWithFewestPosts.username}`}
                    color="bg-yellow-50 border-yellow-200"
                />

                <StatCard
                    title="Most Completed Todos"
                    value={analytics.userWithMostCompletedTodos.count}
                    subtitle={`@${analytics.userWithMostCompletedTodos.username}`}
                    color="bg-purple-50 border-purple-200"
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <StatCard
                    title="Fewest Completed Todos"
                    value={analytics.userWithFewestCompletedTodos.count}
                    subtitle={`@${analytics.userWithFewestCompletedTodos.username}`}
                    color="bg-red-50 border-red-200"
                />
            </div>
        </div>
    );
};

export default Analytics;

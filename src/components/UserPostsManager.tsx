import React from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { User } from '../types';

const fetchUsers = async (): Promise<User[]> => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!response.ok) {
        throw new Error('Failed to fetch users');
    }
    return response.json();
};

const UserPostsManager: React.FC = () => {
    const { data: users, isLoading, error } = useQuery<User[]>('users', fetchUsers);

    if (isLoading) return <div className="text-center py-4">Loading users...</div>;
    if (error) return <div className="text-center py-4 text-red-600">Error loading users</div>;

    return (
        <div>
            <h4 className="text-md font-medium text-gray-700 mb-3">Users List</h4>
            <div className="space-y-2 max-h-64 overflow-y-auto">
                {users?.map((user) => (
                    <Link
                        key={user.id}
                        to={`/users/${user.id}`}
                        className="block p-3 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
                    >
                        <div className="font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-600">{user.email}</div>
                        <div className="text-sm text-gray-500">@{user.username}</div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default UserPostsManager;

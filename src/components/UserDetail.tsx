import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useTodos } from '../context/TodoContext';
import { User, Post, Todo } from '../types';

const fetchUser = async (id: string): Promise<User> => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch user');
    }
    return response.json();
};

const fetchUserPosts = async (userId: string): Promise<Post[]> => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch posts');
    }
    return response.json();
};

const fetchUserTodos = async (userId: string): Promise<Todo[]> => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch todos');
    }
    return response.json();
};

const UserDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { todos, setTodos, toggleTodo } = useTodos();

    const { data: user, isLoading: userLoading } = useQuery<User>(
        ['user', id],
        () => fetchUser(id!),
        { enabled: !!id }
    );

    const { data: posts, isLoading: postsLoading } = useQuery<Post[]>(
        ['posts', id],
        () => fetchUserPosts(id!),
        { enabled: !!id }
    );

    const { data: userTodos, isLoading: todosLoading } = useQuery<Todo[]>(
        ['todos', id],
        () => fetchUserTodos(id!),
        {
            enabled: !!id,
            onSuccess: (data) => {
                setTodos(data);
            }
        }
    );

    const currentTodos = todos.filter(todo => todo.userId === parseInt(id!));

    if (userLoading) return <div className="text-center py-8">Loading user...</div>;
    if (!user) return <div className="text-center py-8 text-red-600">User not found</div>;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <div>
                            <Link to="/dashboard" className="text-indigo-600 hover:text-indigo-500">
                                ← Back to Dashboard
                            </Link>
                            <h1 className="text-3xl font-bold text-gray-900 mt-2">{user.name}</h1>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    {/* User Info */}
                    <div className="bg-white overflow-hidden shadow rounded-lg mb-6">
                        <div className="px-4 py-5 sm:p-6">
                            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">User Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Name</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{user.name}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Username</dt>
                                    <dd className="mt-1 text-sm text-gray-900">@{user.username}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Email</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{user.email}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Phone</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{user.phone}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Website</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{user.website}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-gray-500">Company</dt>
                                    <dd className="mt-1 text-sm text-gray-900">{user.company.name}</dd>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Posts Section */}
                        <div className="bg-white overflow-hidden shadow rounded-lg">
                            <div className="px-4 py-5 sm:p-6">
                                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Posts</h3>
                                {postsLoading ? (
                                    <div className="text-center py-4">Loading posts...</div>
                                ) : (
                                    <div className="space-y-3 max-h-96 overflow-y-auto">
                                        {posts?.map((post) => (
                                            <div key={post.id} className="border border-gray-200 rounded-md p-3">
                                                <h4 className="font-medium text-gray-900 mb-2">{post.title}</h4>
                                                <p className="text-sm text-gray-600">{post.body}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Todos Section */}
                        <div className="bg-white overflow-hidden shadow rounded-lg">
                            <div className="px-4 py-5 sm:p-6">
                                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">To-dos</h3>
                                {todosLoading ? (
                                    <div className="text-center py-4">Loading todos...</div>
                                ) : (
                                    <div className="space-y-2 max-h-96 overflow-y-auto">
                                        {currentTodos.map((todo) => (
                                            <div
                                                key={todo.id}
                                                className={`flex items-center p-3 border rounded-md cursor-pointer transition-colors ${todo.completed
                                                    ? 'bg-green-50 border-green-200 text-green-800 line-through'
                                                    : 'bg-white border-gray-200 hover:bg-gray-50'
                                                    }`}
                                                onClick={() => toggleTodo(todo.id)}
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={todo.completed}
                                                    onChange={() => toggleTodo(todo.id)}
                                                    className="mr-3 h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                                                />
                                                <span className="text-sm">{todo.title}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default UserDetail;

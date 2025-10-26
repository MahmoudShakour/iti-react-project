import React, { useState } from 'react';
import { useNotes, Priority } from '../context/NoteContext';

const NoteManager: React.FC = () => {
    const { notes, addNote, deleteNote, updateNotePriority } = useNotes();
    const [newNote, setNewNote] = useState('');
    const [selectedPriority, setSelectedPriority] = useState<Priority>('normal');

    const handleAddNote = (e: React.FormEvent) => {
        e.preventDefault();
        if (newNote.trim()) {
            addNote(newNote.trim(), selectedPriority);
            setNewNote('');
        }
    };

    const getPriorityColor = (priority: Priority) => {
        switch (priority) {
            case 'important':
                return 'bg-red-100 border-red-300 text-red-800';
            case 'normal':
                return 'bg-blue-100 border-blue-300 text-blue-800';
            case 'delayed':
                return 'bg-yellow-100 border-yellow-300 text-yellow-800';
            default:
                return 'bg-gray-100 border-gray-300 text-gray-800';
        }
    };

    const getPriorityIcon = (priority: Priority) => {
        switch (priority) {
            case 'important':
                return '🔴';
            case 'normal':
                return '🔵';
            case 'delayed':
                return '🟡';
            default:
                return '⚪';
        }
    };

    const importantNotes = notes.filter(note => note.priority === 'important');
    const normalNotes = notes.filter(note => note.priority === 'normal');
    const delayedNotes = notes.filter(note => note.priority === 'delayed');

    return (
        <div className="space-y-4">
            {/* Add Note Form */}
            <form onSubmit={handleAddNote} className="space-y-3">
                <div>
                    <input
                        type="text"
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                        placeholder="Enter your note..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                <div className="flex space-x-3">
                    <select
                        value={selectedPriority}
                        onChange={(e) => setSelectedPriority(e.target.value as Priority)}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                        <option value="important">Important</option>
                        <option value="normal">Normal</option>
                        <option value="delayed">Delayed</option>
                    </select>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        Add Note
                    </button>
                </div>
            </form>

            {/* Notes by Priority */}
            <div className="space-y-4">
                {/* Important Notes */}
                {importantNotes.length > 0 && (
                    <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                            <span className="mr-2">🔴</span> Important ({importantNotes.length})
                        </h4>
                        <div className="space-y-2">
                            {importantNotes.map((note) => (
                                <div
                                    key={note.id}
                                    className={`p-3 border rounded-md ${getPriorityColor(note.priority)}`}
                                >
                                    <div className="flex justify-between items-start">
                                        <p className="text-sm">{note.text}</p>
                                        <div className="flex space-x-2 ml-3">
                                            <select
                                                value={note.priority}
                                                onChange={(e) => updateNotePriority(note.id, e.target.value as Priority)}
                                                className="text-xs px-2 py-1 border rounded bg-white"
                                            >
                                                <option value="important">Important</option>
                                                <option value="normal">Normal</option>
                                                <option value="delayed">Delayed</option>
                                            </select>
                                            <button
                                                onClick={() => deleteNote(note.id)}
                                                className="text-red-600 hover:text-red-800 text-xs"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Normal Notes */}
                {normalNotes.length > 0 && (
                    <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                            <span className="mr-2">🔵</span> Normal ({normalNotes.length})
                        </h4>
                        <div className="space-y-2">
                            {normalNotes.map((note) => (
                                <div
                                    key={note.id}
                                    className={`p-3 border rounded-md ${getPriorityColor(note.priority)}`}
                                >
                                    <div className="flex justify-between items-start">
                                        <p className="text-sm">{note.text}</p>
                                        <div className="flex space-x-2 ml-3">
                                            <select
                                                value={note.priority}
                                                onChange={(e) => updateNotePriority(note.id, e.target.value as Priority)}
                                                className="text-xs px-2 py-1 border rounded bg-white"
                                            >
                                                <option value="important">Important</option>
                                                <option value="normal">Normal</option>
                                                <option value="delayed">Delayed</option>
                                            </select>
                                            <button
                                                onClick={() => deleteNote(note.id)}
                                                className="text-red-600 hover:text-red-800 text-xs"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Delayed Notes */}
                {delayedNotes.length > 0 && (
                    <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                            <span className="mr-2">🟡</span> Delayed ({delayedNotes.length})
                        </h4>
                        <div className="space-y-2">
                            {delayedNotes.map((note) => (
                                <div
                                    key={note.id}
                                    className={`p-3 border rounded-md ${getPriorityColor(note.priority)}`}
                                >
                                    <div className="flex justify-between items-start">
                                        <p className="text-sm">{note.text}</p>
                                        <div className="flex space-x-2 ml-3">
                                            <select
                                                value={note.priority}
                                                onChange={(e) => updateNotePriority(note.id, e.target.value as Priority)}
                                                className="text-xs px-2 py-1 border rounded bg-white"
                                            >
                                                <option value="important">Important</option>
                                                <option value="normal">Normal</option>
                                                <option value="delayed">Delayed</option>
                                            </select>
                                            <button
                                                onClick={() => deleteNote(note.id)}
                                                className="text-red-600 hover:text-red-800 text-xs"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {notes.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                        No notes yet. Add your first note above!
                    </div>
                )}
            </div>
        </div>
    );
};

export default NoteManager;

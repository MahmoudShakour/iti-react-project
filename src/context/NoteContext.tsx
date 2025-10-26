import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Priority = 'important' | 'normal' | 'delayed';

export interface Note {
    id: string;
    text: string;
    priority: Priority;
    createdAt: Date;
}

interface NoteContextType {
    notes: Note[];
    addNote: (text: string, priority: Priority) => void;
    deleteNote: (id: string) => void;
    updateNotePriority: (id: string, priority: Priority) => void;
}

const NoteContext = createContext<NoteContextType | undefined>(undefined);

export const useNotes = () => {
    const context = useContext(NoteContext);
    if (context === undefined) {
        throw new Error('useNotes must be used within a NoteProvider');
    }
    return context;
};

interface NoteProviderProps {
    children: ReactNode;
}

export const NoteProvider: React.FC<NoteProviderProps> = ({ children }) => {
    const [notes, setNotes] = useState<Note[]>([]);

    const addNote = (text: string, priority: Priority) => {
        const newNote: Note = {
            id: Date.now().toString(),
            text,
            priority,
            createdAt: new Date(),
        };
        setNotes(prev => [...prev, newNote]);
    };

    const deleteNote = (id: string) => {
        setNotes(prev => prev.filter(note => note.id !== id));
    };

    const updateNotePriority = (id: string, priority: Priority) => {
        setNotes(prev =>
            prev.map(note =>
                note.id === id ? { ...note, priority } : note
            )
        );
    };

    const value: NoteContextType = {
        notes,
        addNote,
        deleteNote,
        updateNotePriority,
    };

    return (
        <NoteContext.Provider value={value}>
            {children}
        </NoteContext.Provider>
    );
};

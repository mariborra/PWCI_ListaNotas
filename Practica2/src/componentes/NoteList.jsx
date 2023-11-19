import React, { useState, useEffect } from 'react';
import Note from './Note';
import NoteEditor from './NoteEditor';
import '../css/NoteList.css';


function NoteList() 
{
    // Estados iniciales
    const [notes, setNotes] = useState(() => {
        const savedNotes = localStorage.getItem('notes');
        return savedNotes ? JSON.parse(savedNotes) : [];
    });

    const [searchTerm, setSearchTerm] = useState('');

    // Cargar notas de localStorage cuando el componente se monta
    useEffect(() => {
        const savedNotes = localStorage.getItem('notes');
        console.log('Notas cargadas de localStorage:', savedNotes);
        if (savedNotes) {
            setNotes(JSON.parse(savedNotes));
        }
    }, []);

    // Actualizar localStorage cada vez que las notas cambien
    useEffect(() => {
        console.log('Guardando notas en localStorage:', notes);
        localStorage.setItem('notes', JSON.stringify(notes));
    }, [notes]);

    // Función para añadir una nueva nota.
    const addNote = (newNote) => {
        setNotes((prevNotes) => {
            // Aquí usamos prevNotes, que es el estado actual de las notas antes de la actualización
            const noteToAdd = {
                ...newNote,
                id: Date.now(),
                timestamp: new Date().toISOString(),
                completed: false,
                important: false,
            };

            // Devolvemos el nuevo array de notas que incluye la nueva nota
            return [...prevNotes, noteToAdd];
        });
    };

    // Función para eliminar una nota.
    const deleteNote = (id) => {
        setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
    };

    // Función para marcar una nota como completada.
    const toggleComplete = (id) => {
        const updatedNotes = notes.map(note => {
            if (note.id === id) {
                return { ...note, completed: !note.completed };
            }
            return note;
        });
        setNotes(updatedNotes);
        localStorage.setItem('notes', JSON.stringify(updatedNotes));
    };

    // Función para marcar una nota como importante.
    const toggleImportant = (id) => {
        const updatedNotes = notes.map(note => {
            if (note.id === id) {
                return { ...note, important: !note.important };
            }
            return note;
        });
        setNotes(updatedNotes);
        localStorage.setItem('notes', JSON.stringify(updatedNotes));
    };

    // Función para actualizar el término de búsqueda
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    // Filtrar las notas según el término de búsqueda
    const filteredNotes = notes.filter(note =>
        note.title.toLowerCase().includes(searchTerm) || note.content.toLowerCase().includes(searchTerm)
    );

    return (
        <div className="note-list">
            {/* Campo de entrada para la búsqueda */}
            <input
                type="text"
                className="form-control mb-3"
                placeholder="Buscar nota..."
                value={searchTerm}
                onChange={handleSearchChange}
            />
            <p className="insert-note">Insertar Nota</p>
            <NoteEditor onSubmit={addNote} />
            {filteredNotes.map(note => (
                <Note
                    key={note.id}
                    {...note}
                    onDelete={deleteNote}
                    onToggleComplete={toggleComplete}
                    onToggleImportant={toggleImportant}
                />
            ))}
        </div>
    );
}

export default NoteList;

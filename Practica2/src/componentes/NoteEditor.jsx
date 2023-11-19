import React, { useState, useRef, useEffect } from 'react';
import '../css/NoteEditor.css'; 


// Define el componente 'NoteEditor' que acepta una función 'onSubmit' como prop.
function NoteEditor({ onSubmit }) 
{
    // Establece el estado para 'title' y 'content' de la nota.
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    // Creamos la referencia
    const titleRef = useRef(null); 

    useEffect(() => {
        // Enfoca el campo de título cuando el componente se monta
        titleRef.current.focus();
    }, []);

    // Actualiza el estado 'title' cuando el campo de texto del título cambia.
    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    // Actualiza el estado 'content' cuando el área de texto del contenido cambia.
    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    // Maneja el evento de clic del botón Guardar.
    const handleSave = () => {
        // Verifica si 'title' y 'content' no están vacíos antes de enviar.
        if (title && content) {
            onSubmit({ title, content }); // Llama a la función 'onSubmit' con el título y contenido de la nueva nota.
            setTitle(''); // Limpia el estado del título.
            setContent(''); // Limpia el estado del contenido.
        }
    };

    return (
        <div className="note-editor">
            {/* Grupo de entrada flotante para el título */}
            <div className="form-floating mb-3">
                <input
                    ref={titleRef} 
                    type="text"
                    className="form-control"
                    id="noteTitle"
                    placeholder="Título de la nota"
                    value={title}
                    onChange={handleTitleChange}
                />
                <label htmlFor="noteTitle">Título</label>
            </div>

            {/* Grupo de entrada flotante para el contenido */}
            <div className="form-floating mb-3">
                <textarea
                    className="form-control"
                    id="noteContent"
                    placeholder="Escribe tu nota aquí"
                    value={content}
                    onChange={handleContentChange}
                ></textarea>
                <label htmlFor="noteContent">Contenido</label>
            </div>
            
            {/* Botón para guardar la nota */}
            <div className="input-group mb-3">
                <button className="btn btn-outline-primary" type="button" onClick={handleSave}>Guardar</button>
            </div>
        </div>
    );    
}

export default NoteEditor;

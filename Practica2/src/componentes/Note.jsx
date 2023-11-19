import React from 'react';
import '../css/Note.css';

function Note({ id, title, content, onDelete, onToggleComplete, onToggleImportant, completed, important, timestamp }) 
{
    // Formatear la fecha para mostrarla de manera legible:
    const formattedDate = new Date(timestamp).toLocaleString();

    // Manejador de eventos que se dispara cuando se hace clic en el botón "Eliminar"
    const handleDeleteClick = (e) => {
        e.stopPropagation();
        onDelete(id);
    };

    // Se ejecuta cuando se hace clic en el botón "Importante"
    const handleImportantClick = (e) => {
        e.stopPropagation();
        onToggleImportant(id);
    };

    // Se llama cuando se desea marcar una nota como completada. 
    const handleCompleteClick = () => {
        onToggleComplete(id);
    };

    return (
        <div className={`card note-container ${completed ? 'completed' : ''} ${important ? 'important' : ''}`} onClick={handleCompleteClick}>
            <div className="card-body">
                {/* Fecha*/}
                <div className="note-timestamp">{formattedDate}</div>
                {/* Título*/}
                <h5 className={`card-title ${completed ? 'text-muted' : ''}`}>{title}</h5>
                {/* Contenido*/}
                <p className={`card-text ${completed ? 'text-muted' : ''}`}>{content}</p>
                {/* Botones*/}
                <div>
                    <button type="button" className="btn btn-outline-danger btn-sm" onClick={handleDeleteClick}>Eliminar</button>
                    <button type="button" className="btn btn-outline-warning btn-sm ms-2" onClick={handleImportantClick}>Importante</button>
                </div>
            </div>
        </div>
    );
}


export default Note;

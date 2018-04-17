import React, { Component } from 'react';
import NoteEditor from './organisms/NoteEditor.jsx';
import NotesGrid from './organisms/NotesGrid.jsx';

import './NotesApp.css';

class NotesApp extends Component {
    constructor() {
        super();

        this.state = {
            notes: JSON.parse(localStorage.getItem('notes')) || [],
            activeNote: {}
        };
    }

    componentDidUpdate() {
        this.updateLocalStorage();
    }

    handleNoteDelete = noteId => () => {
        const newNotes = this.state.notes.filter(note => note.id !== noteId);

        this.setState({ notes: newNotes });
    };

    handleNoteAdd = newNote => {
        const newNotes = this.state.notes.slice();

        newNotes.unshift(newNote);

        this.setState({ notes: newNotes });
    };

    handleNoteEdit = editedNote => () => {
        this.editor.focus();
        this.setState({ activeNote: editedNote });
    };

    handleSaveEditedNote = editedNote => {
        if (editedNote.text === '') {
            this.handleNoteDelete(editedNote.id)();
            this.setState({ activeNote: {} });
            return;
        }

        const newNotes = this.state.notes.map(note => {
            if (note.id === editedNote.id) {
                note.text = editedNote.text;
            }

            return note;
        });

        this.setState({ notes: newNotes, activeNote: {} });
    };

    /**
     * @private
     */
    updateLocalStorage() {
        const notes = JSON.stringify(this.state.notes);

        localStorage.setItem('notes', notes);
    }

    setRefEditor = element => {
        this.editor = element;
    };

    render() {
        return (
            <div className='notes-app'>
                <h2 className='app-header'>NotesApp</h2>
                <NoteEditor
                    setRef={this.setRefEditor}
                    activeNote={this.state.activeNote}
                    onNoteAdd={this.handleNoteAdd}
                    onSaveEditedNote={this.handleSaveEditedNote}
                />
                <NotesGrid
                    notes={this.state.notes}
                    activeNote={this.state.activeNote}
                    onNoteDelete={this.handleNoteDelete}
                    onNoteEdit={this.handleNoteEdit}
                />
            </div>
        );
    }
}

export default NotesApp;

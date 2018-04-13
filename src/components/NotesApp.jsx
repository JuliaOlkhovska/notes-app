import React, { Component } from 'react';
import NoteEditor from './NoteEditor.jsx';
import NotesGrid from './NotesGrid.jsx';

import './NotesApp.css';

class NotesApp extends Component {
    constructor() {
        super();

        this.state = {
            notes: [],
            activeNote: {}
        };
    }

    componentWillMount() {
        const localNotes = JSON.parse(localStorage.getItem('notes'));

        this.setState({ notes: localNotes });
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
        this.setState({ activeNote: editedNote });
    };

    handleSaveEditedNote = editedNote => {
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

    render() {
        return (
            <div className='notes-app'>
                <h2 className='app-header'>NotesApp</h2>
                <NoteEditor
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

import React, { Component } from 'react'
import NoteEditor from './NoteEditor.jsx'
import NotesGrid from './NotesGrid.jsx'

import './NotesApp.css';

class NotesApp extends Component{
    constructor () {
        super();

        this.state = {
            notes: [],
            activeNote: {}
        }
    }

    componentDidMount() {
        const localNotes = JSON.parse(localStorage.getItem('notes'));

        if (localNotes) {
            this.setState({ notes: localNotes });
        }
    }

    componentDidUpdate() {
        this._updateLocalStorage();
    }

    handleNoteDelete = (noteId) => {
        const newNotes = this.state.notes.filter(function(note) {
            return note.id !== noteId;
        });

        this.setState({ notes: newNotes });
    };

    handleNoteAdd = (newNote) => {
        let newNotes = this.state.notes.slice();

        newNotes.unshift(newNote);

        this.setState({ notes: newNotes });
    };

    handleNoteEdit = (editedNote) => {
        this.setState({ activeNote: editedNote });
    };

    handleSaveEditedNote = (editedNote) => {
        const newNotes = this.state.notes.map(note => {
            if (note.id === editedNote.id) {
                note.text = editedNote.text;
            }

            return note;
        });

        this.setState({notes: newNotes, activeNote: {}});
    };

    render() {
        return (
            <div className="notes-app">
                <h2 className="app-header">NotesApp</h2>
                <NoteEditor
                    activeNote={this.state.activeNote}
                    onNoteAdd={this.handleNoteAdd}
                    saveEditedNote={this.handleSaveEditedNote}
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

    _updateLocalStorage() {
        let notes = JSON.stringify(this.state.notes);

        localStorage.setItem('notes', notes);
    }
}

export default NotesApp;
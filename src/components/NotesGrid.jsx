import React, { Component } from 'react';
import Note from './Note.jsx';

import './NotesGrid.css';

class NotesGrid extends Component {
    componentDidMount() {
        const grid = this.refs.grid;

        this.msnry = new Masonry( grid, {
            itemSelector: '.note',
            columnWidth: 200,
            gutter: 10,
            isFitWidth: true
        });
    }

    componentDidUpdate(prevProps) {
        if (this.props.notes.length !== prevProps.notes.length) {
            this.msnry.reloadItems();
            this.msnry.layout();
        }
    }

    render() {
        const { notes, activeNote, onNoteDelete, onNoteEdit } = this.props;

        return (
            <div className="notes-grid" ref="grid">
                {
                    notes.map(note =>
                        (
                            <Note
                                note={note}
                                key={note.id}
                                activeNoteId={activeNote.id}
                                onDelete={onNoteDelete}
                                onEdit={onNoteEdit}
                            >
                                {note.text}
                            </Note>
                        )
                    )
                }
            </div>
        );
    }
}

export default NotesGrid;
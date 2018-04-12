import Masonry from 'masonry-layout';
import PropTypes from 'prop-types';
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

NotesGrid.defaultProps = {
    activeNote: {},
    notes: []
};

NotesGrid.propTypes = {
    activeNote: PropTypes.object,
    notes: PropTypes.array,
    onNoteDelete: PropTypes.func.isRequired,
    onNoteEdit: PropTypes.func.isRequired
};

export default NotesGrid;
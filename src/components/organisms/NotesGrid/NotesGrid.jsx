import Masonry from 'masonry-layout';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

import './NotesGrid.css';
import Note from '../../molecules/Note/Note.jsx';
import NoteType from '../../NoteTypes';

class NotesGrid extends PureComponent {
    componentDidMount() {
        this.msnry = new Masonry(this.grid, {
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

    setRef = node => {
        this.grid = node;
    };

    render() {
        const { notes, activeNote, onNoteDelete, onNoteEdit, onEditColorNote } = this.props;

        return (
            <div className='notes-grid' ref={this.setRef}>
                {
                    notes.map(note =>
                        (
                            <Note
                                note={note}
                                key={note.id}
                                activeNoteId={activeNote.id}
                                onSelectColor={onEditColorNote}
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
    activeNote: PropTypes.shape(NoteType),
    notes: PropTypes.arrayOf(PropTypes.shape(NoteType)),
    onNoteDelete: PropTypes.func.isRequired,
    onNoteEdit: PropTypes.func.isRequired,
    onEditColorNote: PropTypes.object.isRequired
};

export default NotesGrid;

import PropTypes from 'prop-types';
import React from 'react';

import './Note.css';

function Note(props) {
    const { activeNoteId, note, children, onEdit, onDelete } = props;
    const style = { backgroundColor: note.color };

    return (
        <div style={style} className={activeNoteId === note.id ? 'note active' : 'note'}>
            <button className='edit-note' onClick={onEdit(note)}> &#128393; </button>
            <button className='delete-note' onClick={onDelete(note.id)}> × </button>
            {children}
        </div>
    );
}

Note.defaultProps = {
    activeNoteId: null,
    note: {},
    children: []
};

Note.propTypes = {
    activeNoteId: PropTypes.number,
    note: PropTypes.object,
    children: PropTypes.array,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default Note;

import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

import './Note.css';
import NoteType from '../../NoteTypes';

const Note = ({ activeNoteId, note, children, onEdit, onDelete }) => {
    const style = { backgroundColor: note.color };

    return (
        <div
            style={style}
            className={classNames({
                note: true,
                active: activeNoteId === note.id
            })}
        >
            <button className='delete-note' onClick={onDelete(note.id)}> × </button>
            <div onClick={onEdit(note)}>
                {children}
            </div>
        </div>
    );
};

Note.propTypes = {
    activeNoteId: PropTypes.number,
    note: PropTypes.shape(NoteType).isRequired,
    children: PropTypes.node.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default Note;

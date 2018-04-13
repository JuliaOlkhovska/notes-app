import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

import './Note.css';

function Note({ activeNoteId, note, children, onEdit, onDelete }) {
    const style = { backgroundColor: note.color };

    return (
        <div
            style={style}
            className={classNames({
                note: true,
                active: activeNoteId === note.id
            })
            }
        >
            <button className='edit-note' onClick={onEdit(note)}> &#128393; </button>
            <button className='delete-note' onClick={onDelete(note.id)}> × </button>
            {children}
        </div>
    );
}

Note.propTypes = {
    activeNoteId: PropTypes.number,
    note: PropTypes.shape({
        id: PropTypes.number,
        text: PropTypes.string,
        color: PropTypes.string
    }).isRequired,
    children: PropTypes.node.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default Note;

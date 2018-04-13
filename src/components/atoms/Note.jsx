import React from 'react';
import classNames from 'classnames';

import './Note.css';

function Note({ activeNoteId, note, children, onEdit, onDelete } = this.props) {
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

export default Note;

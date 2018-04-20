import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

import './Note.css';
import Palette from '../../atoms/Palette/Palette.jsx';
import PaletteIcon from '../../atoms/Icons/PaletteIcon.jsx';
import NoteType from '../../NoteTypes';

const Note = ({ activeNoteId, note, children, onSelectColor, onEdit, onDelete }) => (
    <div
        style={{ backgroundColor: note.color }}
        className={classNames({
            note: true,
            active: activeNoteId === note.id
        })}
    >
        <button className='delete-note' onClick={onDelete(note.id)}> ×</button>
        <div onClick={onEdit(note)}>
            {children}
        </div>
        <div className='palette-wrapper'>
            <PaletteIcon />
            <Palette
                noteId={note.id}
                onSelectColor={onSelectColor}
            />
        </div>
    </div>
);

Note.propTypes = {
    activeNoteId: PropTypes.number,
    note: PropTypes.shape(NoteType).isRequired,
    children: PropTypes.node.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onSelectColor: PropTypes.object.isRequired
};

export default Note;

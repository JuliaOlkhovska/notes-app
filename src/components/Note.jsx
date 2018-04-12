import PropTypes from 'prop-types';
import React from 'react';

import './Note.css';

class Note extends PureComponent {
    render() {
        const {activeNoteId, note, children, onEdit, onDelete} = this.props;
        let style = {backgroundColor: note.color};

    return (
        <div style={style} className={activeNoteId === note.id ? 'note active' : 'note'}>
            <span className='edit-note' onClick={onEdit(note)}> &#128393; </span>
            <span className='delete-note' onClick={onDelete(note.id)}> × </span>
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
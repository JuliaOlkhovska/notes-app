import React, { PureComponent } from 'react';

import './Note.css';

class Note extends PureComponent {
    render() {
        const {activeNoteId, note, children, onEdit, onDelete} = this.props;
        let style = {backgroundColor: note.color};

        return (
            <div style={style} className={activeNoteId === note.id ? 'note active' : 'note'}>
                <span className="edit-note" onClick={onEdit.bind(null, note)}> &#128393; </span>
                <span className="delete-note" onClick={onDelete.bind(null, note.id)}> × </span>
                {children}
            </div>
        );
    }
}

export default Note;
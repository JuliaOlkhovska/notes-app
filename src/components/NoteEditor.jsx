import PropTypes from 'prop-types';
import React, { Component } from 'react';

import './NoteEditor.css';

class NoteEditor extends Component {
    constructor() {
        super();
        this.state = {
            text: ''
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.activeNote.id !== nextProps.activeNote.id) {
            this.setState({ text: nextProps.activeNote.text || '' });
        }
    }

    handleTextChange = event => {
        this.setState({ text: event.target.value });
    };

    handleNoteAdd = () => {
        const newNote = {
            text: this.state.text,
            color: 'yellow',
            id: Date.now()
        };

        this.props.onNoteAdd(newNote);
        this.setState({ text: '' });
    };

    handleNoteEdit = () => {
        const editedNote = {
            text: this.state.text,
            id: this.props.activeNote.id
        };

        this.props.onSaveEditedNote(editedNote);
    };

    render() {
        return (
            <div className='note-editor'>
                <textarea
                    placeholder='Enter your note here...'
                    rows={5}
                    className='textarea'
                    value={this.state.text}
                    onChange={this.handleTextChange}
                />
                {
                    this.props.activeNote.id ?
                        <button className='add-button' onClick={this.handleNoteEdit}>Edit</button> :
                        <button className='add-button' onClick={this.handleNoteAdd}>Add</button>
                }
            </div>
        );
    }
}

NoteEditor.defaultProps = {
    activeNote: {}
};

NoteEditor.propTypes = {
    activeNote: PropTypes.object,
    onNoteAdd: PropTypes.func.isRequired,
    onSaveEditedNote: PropTypes.object.isRequired
};

export default NoteEditor;

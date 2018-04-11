import React from 'react'
import { render } from 'react-dom'
import NotesApp from './components/NotesApp.jsx';

render(
    <NotesApp />,
    document.querySelector('#mount-point'),
);
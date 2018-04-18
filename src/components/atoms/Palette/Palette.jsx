import React, { PureComponent } from 'react';

import './Palette.css';

class Palette extends PureComponent {
    render() {
        return (
            <div className='colors'>
                <div className='select-color' />
                <div className='select-color' />
                <div className='select-color' />
                <div className='select-color' />
                <div className='select-color' />
                <div className='select-color' />
                <div className='select-color' />
                <div className='select-color' />
                <div className='select-color' />
                <div className='select-color' />
                <div className='select-color' />
                <div className='select-color' />
            </div>
        );
    }
}

export default Palette;

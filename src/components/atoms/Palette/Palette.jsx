import PropTypes from 'prop-types';
import React from 'react';

import './Palette.css';
import colors from './Colors';

const Palette = ({ noteId, onSelectColor } = this.props) => (
    <div className='palette'>
        {
            colors.map(color =>
                (
                    <button
                        className='select-color'
                        key={color.id}
                        style={{ backgroundColor: color.value }}
                        onClick={onSelectColor({ noteId, colorValue: color.value })}
                    />
                )
            )
        }
    </div>
);

Palette.PropTypes = {
    noteId: PropTypes.number,
    onSelectColor: PropTypes.object
};

export default Palette;

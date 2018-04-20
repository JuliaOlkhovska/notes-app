/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';
import React from 'react';

import './Palette.css';
import colors from './Colors';
import Tooltip from '../../molecules/Tooltip/Tooltip.jsx';

const Palette = ({ noteId, onSelectColor }) => (
    <div className='palette'>
        {
            colors.map(color =>
                (
                    <Tooltip key={color.id} hintText={color.name}>
                        <button
                            className='select-color'
                            style={{ backgroundColor: color.value }}
                            onClick={onSelectColor({ noteId, colorValue: color.value })}
                        />
                    </Tooltip>
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

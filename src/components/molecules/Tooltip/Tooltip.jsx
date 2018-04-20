/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';
import React from 'react';

import './Tooltip.css';

const Tooltip = ({ children, hintText }) => (
    <div className='tooltipWrapper'>
        {children}
        <div className='tooltipContainer'>
            <div className='tooltip'>{hintText}</div>
        </div>
    </div>
);

Tooltip.PropTypes = {
    children: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string,
        PropTypes.element
    ]),
    hintText: PropTypes.string
};

export default Tooltip;

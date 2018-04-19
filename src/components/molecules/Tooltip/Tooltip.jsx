import React from 'react';

import './Tooltip.css';

const Tooltip = ({ children, hintText } = this.props) => (
    <div className='tooltipWrapper'>
        {children}
        <div className='tooltipContainer'>
            <div className='tooltip'>{hintText}</div>
        </div>
    </div>
);

export default Tooltip;

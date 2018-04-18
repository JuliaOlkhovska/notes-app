/* <div className='palette-button'>
    <div className='palette'>
        {
            colors.map(color =>
                (
                    <div
                        className='select-color'
                        key={color.id}
                        style={{ backgroundColor: color.value }}
                        // color={color.name}
                        onClick={onChangeColor(color.id)}
                    />
                )
            )
        }
    </div>
</div> */

// handleChangeColor = colorId => () => {
//     let newColor = '';
//
//     this.state.colors.forEach(color => {
//         if (colorId === color.id) {
//             newColor += color.value;
//         }
//         return newColor;
//     });
//
//     this.setState({ colorValue: newColor });
//     console.log(this.state.colorValue);
// };

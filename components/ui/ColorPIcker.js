import React, {useState, useEffect, useRef} from "react";
import styled from "styled-components";
import {ChromePicker} from "react-color";

const StyledColorPicker = styled.div`
    position: relative;
`

const SelectColor = styled.div`
    width: 50px;
    height: 25px;
    background: ${props => props.backgroundColor};
    border: 1px solid #ccc;
`

const SketchContainer = styled.div`
    position: absolute;
    z-index: 2;
`

const SketchCover = styled.div`
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
`

const ColorPicker = ({color, onChangeComplete}) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <StyledColorPicker>
            <SelectColor backgroundColor={color} onClick={() => setIsOpen(true)} />
            {isOpen &&
                <SketchContainer>
                    <SketchCover onClick={() => setIsOpen(false)} />
                    <ChromePicker
                        color={color}
                        onChangeComplete={color => onChangeComplete(color.hex)}
                    />
                </SketchContainer>
            }
        </StyledColorPicker>
    )
}

export default ColorPicker;
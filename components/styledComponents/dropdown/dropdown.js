import React from 'react'
import * as Style from "./style/dropdown";

const dropdown = () => {
    return (
        <div>
            <Style.DropdownContainer>
                <Style.DropdownButton onClick={toggleMenu}>Dropdown</Style.DropdownButton>
                <Style.DropdownMenu>
                    <ul>
                        <li>Option 1</li>
                        <li>Option 2</li>
                        <li>Option 3</li>
                        <li>Option 4</li>
                    </ul>
                </Style.DropdownMenu>
            </Style.DropdownContainer>
        </div>
    )
}

export default dropdown

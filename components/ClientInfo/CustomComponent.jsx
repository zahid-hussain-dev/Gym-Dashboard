import React from 'react';
import * as Style from "../styledComponents/clientInfoStyles/CustomComponent";
import { Button } from "../styledComponents/clientInfoStyles/button"
const CustomComponent = () => {
    return (
        <div>
            <Style.Title>Custom Components Demo</Style.Title>
            <Style.CustomInputGroup>
                <Style.CustomLabel>Small Input  </Style.CustomLabel>
                <Style.SmallInput type="text" name="smallInput" placeholder='Small Input' />

            </Style.CustomInputGroup>
            <Style.CustomInputGroup>
                <Style.CustomLabel>Large Input  </Style.CustomLabel>
                <Style.LargeInput type="text" name="smallInput" placeholder='Large Input' />

            </Style.CustomInputGroup>
            <Style.CustomInputGroup>
                <Style.CustomLabel>Radio Buttons  </Style.CustomLabel>
                <Style.RadioField>
                    <Style.RadioInput type="radio" id='friend' value="One" name="relationship" />
                    <Style.RadioLabel htmlFor='friend'>One Person</Style.RadioLabel>
                </Style.RadioField>
                <Style.RadioField>
                    <Style.RadioInput type="radio" id='family' value="Two" name="relationship" />
                    <Style.RadioLabel htmlFor='family'>Two Person</Style.RadioLabel>
                </Style.RadioField>
                <Style.RadioField>
                    <Style.RadioInput type="radio" id='professional' value="Three" name="relationship" />
                    <Style.RadioLabel htmlFor='professional'>Three Person</Style.RadioLabel>
                </Style.RadioField>
            </Style.CustomInputGroup>

            <Style.CustomInputGroup>
                <Style.CustomLabel>Style Input  </Style.CustomLabel>
                <Style.LargeInput type="text" name="smallInput" placeholder='' />

            </Style.CustomInputGroup>

            <Style.CustomInputGroup>
                <Style.CustomLabel>DropDown  </Style.CustomLabel>
                <Style.Select>
                    <option value={""}>Select</option>
                    <option value={"Frank Jones"}>Frank Jones</option>
                    <option value={"Smith & Billy"}>Lisa & Anoty</option>
                    <option value={"Smith & Peggy"}>Smith & Peggy</option>
                </Style.Select>
            </Style.CustomInputGroup>

            <Style.CustomInputGroup>
                <Style.CustomLabel>Text Area  </Style.CustomLabel>
                <Style.CustomTextArea type="text" name="textarea" placeholder='Text Area' />

            </Style.CustomInputGroup>
            <Style.CustomInputGroup>

                <Button>Test Button</Button>
            </Style.CustomInputGroup>

        </div>
    )
}

export default CustomComponent

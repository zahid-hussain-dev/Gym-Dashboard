import React, { useState } from 'react';
import Image from "next/image";
import * as Style from '../../components/gymnast/Gymnast';

const AddUserForm = ({ closeModal }) => {
  // ... (rest of the code remains the same)
  // Use styled components from Gymnast.js
  const options = [
    { value: 'option1', label: 'Saim' },
    { value: 'option2', label: 'ahsan' },
    { value: 'option3', label: 'hammad' },
    // Add more options here as needed
  ];
  const option1 = [
    { value: 'option1', label: 'Wasiq' },
    { value: 'option2', label: 'Shekeel' },
    { value: 'option3', label: 'Zahid' },
    // Add more options here as needed
  ];
  const option2 = [
    { value: 'option1', label: '9 - 10' },
    { value: 'option2', label: '10 - 11' },
    { value: 'option3', label: '11 - 12' },
    // Add more options here as needed
  ];
  const [selectedOption, setSelectedOption] = useState('');

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <Style.FormContainer className="add-child-form">
      {/* Form content */}
      <div className="Add-child-main">
        <Style.AddChildWrapper className="Add-child">
          <div>
            <Style.Label className="label">Add New Child:</Style.Label>
            <Style.InputData
              className="input-dataa"
              type="text"
              id="message"
              name="message"
            />
          </div>
          <Style.AddChildButton onClick={closeModal} type="submit">
            Add Child
          </Style.AddChildButton>
        </Style.AddChildWrapper>
        <Style.SecondForm className="second-form">
          <Style.AddBookingHeading className="add-booking">Add Booking</Style.AddBookingHeading>
          <div>
            <Style.CenteredDropdownContainer className="dropdown-container">
              <div>
                <Style.Label className="label">Select New Child:</Style.Label>
                <Style.Select className="input-dataa" value={selectedOption} onChange={handleSelectChange}>
                  <option value="">Child</option>
                  {options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Style.Select>
              </div>
              <div>
                <Style.Label className="label">Select Coaches:</Style.Label>
                <Style.Select className="input-dataa" value={selectedOption} onChange={handleSelectChange}>
                  <option value="">Coaches</option>
                  {option1.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Style.Select>
              </div>
              <div>
                <Style.Label className="label">Select Time Slotes:</Style.Label>
                <Style.Select className="input-dataa" value={selectedOption} onChange={handleSelectChange}>
                  <option value="">Time Slotes</option>
                  {option2.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Style.Select>
              </div>
            </Style.CenteredDropdownContainer>
          </div>
          {/* Rest of the code */}
        </Style.SecondForm>
      </div>
    </Style.FormContainer>
  );
};

export default AddUserForm;

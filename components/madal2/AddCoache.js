import React, { useState } from 'react';
import * as Styled from '../../components/choaches/coaches';
import Image from "next/image";
import close from "../../../Gym-Dashboard/public/assests/SVGs/close-svgrepo-com (2).svg";

const AddUserForm = ({ closeModal }) => {
  const [formData, setFormData] = useState({
    name: '',
    detail: '',
    date: '',
    status: '',
  });
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
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setFormData({
      name: '',
      detail: '',
      date: '',
      status: '',
    });

    closeModal();
  };

  return (
    <Styled.PopupContainer>
      <Styled.PopupMainHeading>
        <Styled.PopupHeading>Add the Booking</Styled.PopupHeading>
        <Image src={close} className="close" onClick={closeModal} alt="close" width={20} height={20} />
      </Styled.PopupMainHeading>

      {/* Form content */}
      <form onSubmit={handleSubmit}>
        <Styled.MainForm>
          <div style={{display:"flex", marginTop:"20px"}}>
            <div>
              <Styled.Label>Enter Date:</Styled.Label>
              <Styled.InputData
                type="date"
                name="date"
                onChange={handleChange}
                value={formData.date}
              />
            </div>
            <div>
            <Styled.Label className="label">Select Time Slotes:</Styled.Label>
                <Styled.Select className="input-dataa" value={selectedOption} onChange={handleSelectChange}>
                  <option value="">Time Slotes</option>
                  {option2.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Styled.Select>
              </div>
          </div>
        </Styled.MainForm>
        <Styled.SubmitForm type="submit">
          Submit
        </Styled.SubmitForm>
      </form>
    </Styled.PopupContainer>
  );
};

export default AddUserForm;

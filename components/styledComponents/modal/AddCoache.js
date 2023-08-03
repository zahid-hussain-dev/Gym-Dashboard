import React, { useState } from 'react';
import * as Styled from '../choaches/coaches';
import Image from "next/image";
import close from "../../../public/assests/SVGs/close-svgrepo-com (2).svg";

const AddUserForm = ({ closeModal }) => {
  const [formData, setFormData] = useState({
    timeSlot: '',
    date: '',
    status: '',
  });
  const option2 = [
    { value: '9 - 10', label: '9 - 10' },
    { value: '10 - 11', label: '10 - 11' },
    { value: '11 - 12', label: '11 - 12' },
    // Add more options here as needed
  ];
  const option3 = [
    { value: 'Public', label: 'Public' },
    { value: 'Private', label: 'Private' },
  ];
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedOptionStatus, setSelectedOptionStatus] = useState('');

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleSelectChangeStatus = (event) => {
    setSelectedOptionStatus(event.target.value);
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
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
      timeSlot: '',
      date: '',
      status: '',
    });
    console.log("formData", formData)
    closeModal();
  };
  return (

    <Styled.PopupContainer>
      <Styled.PopupMainHeading>
        <Styled.PopupHeading>Add Schedule</Styled.PopupHeading>
        <Image src={close} className="close" onClick={closeModal} alt="close" width={20} height={20} />
      </Styled.PopupMainHeading>

      {/* Form content */}
      <form onSubmit={handleSubmit}>
        <Styled.MainForm style={{ display: "inherit" }}>
          <div style={{ display: "flex", marginTop: "20px" }}>
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
              <Styled.Select className="input-data" name="timeSlot" value={selectedOption} onChange={handleSelectChange}>
                <option value="">Time Slotes</option>
                {option2.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Styled.Select>
            </div>
          </div>
          <div style={{ display: "flex", marginTop: "20px" }}>
            <div>
              <Styled.Label className="label">Set Time:</Styled.Label>
              <Styled.Select className="input-data" name="status" value={selectedOptionStatus} onChange={handleSelectChangeStatus}>
                <option value="">Time Status</option>
                {option3.map((option) => (
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

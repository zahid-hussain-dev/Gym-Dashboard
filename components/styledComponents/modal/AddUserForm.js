import React, { useState } from 'react';
import * as Styled from '../../choaches/coaches';
import Image from "next/image";
import close from "../../../public/assests/SVGs/close-svgrepo-com (2).svg";

const AddUserForm = ({ closeModal }) => {
  const [formData, setFormData] = useState({
    name: '',
    detail: '',
    date: '',
    status: '',
  });

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
        <Styled.PopupHeading>Add the Coach</Styled.PopupHeading>
        <Image src={close} className="close" onClick={closeModal} alt="close" width={20} height={20} />
      </Styled.PopupMainHeading>

      {/* Form content */}
      <form onSubmit={handleSubmit}>
        <Styled.MainForm>
          <div>
            <div>
              <Styled.Label>Enter Name:</Styled.Label>
              <Styled.InputData
                type="text"
                name="name"
                onChange={handleChange}
                value={formData.name}
              />
            </div>
            <div>
              <Styled.Label>Enter Detail:</Styled.Label>
              <Styled.InputData
                type="text"
                name="detail"
                onChange={handleChange}
                value={formData.detail}
              />
            </div>
          </div>
          <div>
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
              <Styled.Label>Enter Status:</Styled.Label>
              <Styled.InputData
                type="text"
                name="status"
                onChange={handleChange}
                value={formData.status}
              />
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

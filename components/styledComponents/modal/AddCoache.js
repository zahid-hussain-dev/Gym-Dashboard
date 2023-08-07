import React, { useState } from 'react';
import * as Styled from '../choaches/coaches';
import Image from "next/image";
import close from "../../../public/assests/SVGs/close-svgrepo-com (2).svg";
import { axiosInterceptor } from '../../../axios/axiosInterceptor';
import swal from "sweetalert";

const  AddUserForm = ({ closeModal }) => {
  const [formData, setFormData] = useState({
    timeStart: '',
    timeEnd: '',
    date: '',
    type: '',
  });
  const option2 = [
    { value: '9 - 10', label: '9 - 10' },
    { value: '10 - 11', label: '10 - 11' },
    { value: '11 - 12', label: '11 - 12' },
    // Add more options here as needed
  ];
  const option3 = [
    { value: 'PUBLIC', label: 'PUBLIC' },
    { value: 'PRIVATE', label: 'PRIVATE' },
  ];
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedOptionStatus, setSelectedOptionStatus] = useState('');
  const [loading, setLoading] = useState(false);

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
    if (name === 'timeEnd') {
      const startTime = new Date(`2000-01-01T${formData.timeStart}`);
      const endTime = new Date(`2000-01-01T${value}`);
      if (endTime < startTime) {
        alert('End time should be greater than start time!');
      }else{
        console.log("good case")
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const Payload = {
      from: formData.date + " " + formData.timeStart,
      to: formData.date + " " + formData.timeEnd,
      type:formData.type,
  }
  console.log("Payload",Payload)
  try {
    setLoading(true)
    const res = await axiosInterceptor().post(
        `/api/coach/open/slots`,
        Payload,
    );
    console.log("responsse of login", res)
    swal('Success!', res.data.message, 'success')
    setLoading(false)
} catch (error) {
    setLoading(false)
    swal('Oops!', error.data.message, 'error')
    console.log(error)
}
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
              <Styled.Label className="label">Set Time:</Styled.Label>
              <Styled.Select className="input-dataa" name="type" value={selectedOptionStatus} onChange={handleSelectChangeStatus}>
                <option value="">Time Status</option>
                {option3.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Styled.Select>
            </div>
            
          </div>
          <div style={{ display: "flex", marginTop: "20px" }}>
          <div>
              <Styled.Label className="label">Time Start:</Styled.Label>
              <Styled.InputData
                type="time"
                name="timeStart"
                onChange={handleChange}
                value={formData.timeStart}
              />
            </div>
            <div>
              <Styled.Label className="label">Time End:</Styled.Label>
              <Styled.InputData
                type="time"
                name="timeEnd"
                onChange={handleChange}
                value={formData.timeEnd}
              />
            </div>
          </div>
          <div style={{ display: "flex", marginTop: "20px" }}>

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

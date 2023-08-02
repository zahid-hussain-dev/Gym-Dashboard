import React, { useState, useEffect } from 'react'
import { Button } from '../../components/styledComponents/button/Button';
import Image from "next/image";
import * as Style from '../../components/styledComponents/gymnast/Gymnast';
import { useRouter } from 'next/navigation';

const index = () => {
  const [role, setRole] = useState("");
  const [formData, setFormData] = useState({});
  const router = useRouter();

  useEffect(() => {
    // Perform localStorage action
    const userRole = JSON.parse(localStorage.getItem("Userrole"))
    setRole(userRole);
  }, [])
  const options = [
    { value: 'Saim', label: 'Saim' },
    { value: 'ahsan', label: 'ahsan' },
    { value: 'hammad', label: 'hammad' },
    // Add more options here as needed
  ];
  const option1 = [
    { value: 'Wasiq', label: 'Wasiq' },
    { value: 'Shekeel', label: 'Shekeel' },
    { value: 'Zahid', label: 'Zahid' },
    // Add more options here as needed
  ];
  const option2 = [
    { value: '9 - 10', label: '9 - 10' },
    { value: '10 - 11', label: '10 - 11' },
    { value: '11 - 12', label: '11 - 12' },
    // Add more options here as needed
  ];
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedOptionCoach, setSelectedOptionCoach] = useState('');
  const [selectedOptionTime, setSelectedOptionTime] = useState('');


  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleSelectChangeCoach = (event) => {
    setSelectedOptionCoach(event.target.value);
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleSelectChangeTime= (event) => {
    setSelectedOptionTime(event.target.value);
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    // event.preventDefault();
    console.log("formData", formData)
  };
  const tableCell = [
    {id:1, timeSlote: '9 - 10', child: 'wasiq', coach: 'mudasir' },
    {id:2, timeSlote: '10 - 11', child: 'shakeel', coach: 'rohab' },
  ];
  const tableCellAdmin = [
    {id:1,  client: 'wasiq', gym: 'Gym1' },
    {id:2,  client: 'shakeel', gym: 'Gym2' },
  ];
  return (
    <div>

      {role && role !== "admin" &&
        <Style.FormContainer className="add-child-form">
          {/* Form content */}
          <div className="Add-child-main">
            <Style.AddChildWrapper className="Add-child">
              <Style.Wrapper>
                <Style.LabelHeader className="label">Add New Child:</Style.LabelHeader>
                <Style.Header>
                  <Style.InputData
                    className="input-dataa"
                    type="text"
                    id="message"
                    name="child"
                  />
                  <Style.AddChildButton type="submit">
                    Add Child
                  </Style.AddChildButton>
                </Style.Header>
              </Style.Wrapper>
            </Style.AddChildWrapper>
            <Style.SecondForm className="second-form">
              <Style.AddBookingHeading className="add-booking">Add Booking</Style.AddBookingHeading>
              <div>
                <Style.CenteredDropdownContainer className="dropdown-container">
                  <div>
                    <Style.Label className="label">Select New Child:</Style.Label>
                    <Style.Select className="input-dataa" name='child' value={selectedOption} onChange={handleSelectChange}>
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
                    <Style.Select className="input-dataa" name='coach' value={selectedOptionCoach} onChange={handleSelectChangeCoach}>
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
                    <Style.Select className="input-dataa" name='time' value={selectedOptionTime} onChange={handleSelectChangeTime}>
                      <option value="">Time Slotes</option>
                      {option2.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Style.Select>
                  </div>
                </Style.CenteredDropdownContainer>
                <Button onClick={(e)=>handleSubmit(e)}>Submit</Button>
              </div>
              {/* Rest of the code */}
            </Style.SecondForm>
          </div>
        </Style.FormContainer>

      }
      {role && role==="admin" 
      ?
      <Style.TableContainer>
      <Style.TableWrapper>
        <thead>
          <Style.TableRow>
            <Style.TableHead>CLIENT</Style.TableHead>
            <Style.TableHead>GYM</Style.TableHead>
            <Style.TableHead>ACTIONS</Style.TableHead>

          </Style.TableRow>
        </thead>
        <tbody>
          {tableCellAdmin.map((data, index) => (
            <Style.TableRow key={index}>
              <Style.TableCell>{data.client}</Style.TableCell>
              <Style.TableCell>{data.gym}</Style.TableCell>
              <Style.TableCell>
              <button onClick={() => {router.push(`/gymnast/view/${data.id}`)}}>View</button></Style.TableCell>

            </Style.TableRow>
          ))}
        </tbody>
      </Style.TableWrapper>
    </Style.TableContainer>
      :
      <Style.TableContainer>
      <Style.TableWrapper>
        <thead>
          <Style.TableRow>
            <Style.TableHead>CHILD</Style.TableHead>
            <Style.TableHead>COACH</Style.TableHead>
            <Style.TableHead>TIME SLOT</Style.TableHead>
            <Style.TableHead>ACTIONS</Style.TableHead>

          </Style.TableRow>
        </thead>
        <tbody>
          {tableCell.map((data, index) => (
            <Style.TableRow key={index}>
              <Style.TableCell>{data.child}</Style.TableCell>
              <Style.TableCell>{data.coach}</Style.TableCell>
              <Style.TableCell>{data.timeSlote}</Style.TableCell>
              <Style.TableCell>
              <button onClick={() => {router.push(`/gymnast/view/${data.id}`)}}>View</button></Style.TableCell>

            </Style.TableRow>
          ))}
        </tbody>
      </Style.TableWrapper>
    </Style.TableContainer>
    }
      
    </div>
  )
}

export default index

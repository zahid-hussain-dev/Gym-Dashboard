import React, { useState, useEffect } from 'react'
import { Button } from '../../components/styledComponents/button/Button';
import Image from "next/image";
import * as Style from '../../components/styledComponents/gymnast/Gymnast';

const index = () => {
    const [role, setRole] = useState("");
    useEffect(() => {
        // Perform localStorage action
        const userRole = JSON.parse(localStorage.getItem("Userrole"))
        setRole(userRole);
    }, [])
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
      const tableCell = [
        { timeSlote: '9 - 10',child:'wasiq' ,coach:'mudasir' },
        { timeSlote: '10 - 11',child:'shakeel',coach:'rohab' },
      ];
    return (
        <div>

            {role && role === "coach" ?
                <Button style={{ width: "auto", marginBottom: "1rem" }}>Approve Private Booking</Button>
                : 

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
                        name="message"
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

            }
<Style.TableContainer>
        <Style.TableWrapper>
          <thead>
            <Style.TableRow>
              <Style.TableHead>CHILD</Style.TableHead>
              <Style.TableHead>COACH</Style.TableHead>
              <Style.TableHead>TIME SLOT</Style.TableHead>
            </Style.TableRow>
          </thead>
          <tbody>
            {tableCell.map((data, index) => (
              <Style.TableRow key={index}>
                <Style.TableCell>{data.child}</Style.TableCell>
                <Style.TableCell>{data.coach}</Style.TableCell>
                <Style.TableCell>{data.timeSlote}</Style.TableCell>
              </Style.TableRow>
            ))}
          </tbody>
        </Style.TableWrapper>
      </Style.TableContainer>
        </div>
    )
}

export default index

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
        { timeSlote: '9 - 10', client: 'wasiq' },
        { timeSlote: '10 - 11', client: 'shakeel' },
    ];
    return (
        <div>
            <Button style={{ width: "auto", marginBottom: "1rem" }}>Approve Private Booking</Button>
            <Style.TableContainer>
                <Style.TableWrapper>
                    <thead>
                        <Style.TableRow>
                            <Style.TableHead>Client</Style.TableHead>
                            <Style.TableHead>TIME SLOT</Style.TableHead>
                            <Style.TableHead>ACTIONS</Style.TableHead>

                        </Style.TableRow>
                    </thead>
                    <tbody>
                        {tableCell.map((data, index) => (
                            <Style.TableRow key={index}>
                                <Style.TableCell>{data.client}</Style.TableCell>
                                <Style.TableCell>{data.timeSlote}</Style.TableCell>
                                <Style.TableCell><button onClick={() => {
                                    console.log("child", data.client)

                                }}>Approve</button> <button onClick={() => {
                                    console.log("child", data.client)

                                }}>Reject</button></Style.TableCell>

                            </Style.TableRow>
                        ))}
                    </tbody>
                </Style.TableWrapper>
            </Style.TableContainer>
        </div>
    )
}

export default index

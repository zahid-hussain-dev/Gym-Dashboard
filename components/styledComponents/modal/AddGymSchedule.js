import React, { useState, useEffect } from 'react';
import * as Styled from '../choaches/coaches';
import Image from "next/image";
import close from "../../../public/assests/SVGs/close-svgrepo-com (2).svg";
import { axiosInterceptor } from '../../../axios/axiosInterceptor';
import swal from "sweetalert";

const AddGymSchedule = ({ closeModal }) => {
    const [formData, setFormData] = useState({
        datefrom: "",
        dateto: "",
        timefrom: "",
        timeto: "",
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        const Payload = {
            from: formData.datefrom + " " + formData.timefrom,
            to: formData.datefrom + " " + formData.timeto,
        }
        try {
            setLoading(true)
            const res = await axiosInterceptor().post(
                `/api/gym/schedule`,
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
        console.log("Payload", Payload)

        closeModal();
    };

    // useEffect(async() => {
    //     try {
    //         setLoading(true)
    //         const res = await axiosInterceptor().get(
    //             `/api/gym/schedule`,
    //         );
    //         console.log("responsse of login", res)
    //         setLoading(false)
    //     } catch (error) {
    //         setLoading(false)
    //         swal('Oops!', "Some Thing went Wrong", 'error')
    //         console.log(error)
    //     }
    // }, [])


    return (
        <Styled.PopupContainer>
            <Styled.PopupMainHeading>
                <Styled.PopupHeading>Add Gym Schedule</Styled.PopupHeading>
                <Image src={close} className="close" onClick={closeModal} alt="close" width={20} height={20} />
            </Styled.PopupMainHeading>

            {/* Form content */}
            <form onSubmit={handleSubmit}>
                <Styled.MainForm style={{ display: "inherit" }}>
                    <div style={{ display: "flex", marginTop: "20px" }}>
                        <div>
                            <Styled.Label>Start Date:</Styled.Label>
                            <Styled.InputData
                                // type="date"
                                type='date'
                                name="datefrom"
                                onChange={handleChange}
                                value={formData.datefrom}
                            />
                        </div>

                        <div>
                            <Styled.Label>Start:</Styled.Label>
                            <Styled.InputData
                                // type="date"
                                type='time'
                                name="timefrom"
                                onChange={handleChange}
                                value={formData.timefrom}
                            />
                        </div>
                    </div>
                    <div style={{ marginTop: "20px", width: "57%" }}>
                        <Styled.Label className="label">End:</Styled.Label>
                        <div>
                            <Styled.InputData
                                // type="date"
                                type='time'
                                name="timeto"
                                onChange={handleChange}
                                value={formData.timeto}
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

export default AddGymSchedule;
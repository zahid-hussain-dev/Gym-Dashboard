import React, { useState, useEffect } from 'react';
import * as Styled from '../choaches/coaches';
import Image from "next/image";
import close from "../../../public/assests/SVGs/close-svgrepo-com (2).svg";
import { axiosInterceptor } from '../../../axios/axiosInterceptor';
import swal from "sweetalert";
import moment from "moment";

const AddGymSchedule = ({ closeModal, id }) => {
    const [formData, setFormData] = useState({
        timefrom: moment().format("HH:mm"),
        timeto: moment().format("HH:mm"),
        date: new Date().toISOString().substring(0, 10),
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
        let Payload = {};
        if (id) {
            Payload = {
                from: formData.datefrom + " " + formData.timefrom,
                to: formData.datefrom + " " + formData.timeto,
                gym: id,
            }
        }
        else {
            Payload = {
                from: formData.datefrom + " " + formData.timefrom,
                to: formData.datefrom + " " + formData.timeto,
            }
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
                <Styled.PopupHeading  style={{marginRight: "5%" }}>Add Gym Schedule</Styled.PopupHeading>
                <Image src={close} className="close" onClick={closeModal} alt="close" width={20} height={20} />
            </Styled.PopupMainHeading>

            {/* Form content */}
            <form onSubmit={handleSubmit}>
                <Styled.MainForm style={{ display:"block" }}>
                    <div style={{ display: "flex", marginTop: "20px", justifyContent:"space-evenly",alignItems:"center" }}>
                        <div>
                            <Styled.Label>Start Date:</Styled.Label>
                            <Styled.InputData
                                // type="date"
                                type='date'
                                name="datefrom"
                                style={{ width:"70%" }}
                                id="date"
                                defaultValue={new Date().toISOString().substring(0, 10)}
                                onChange={handleChange}
                                value={formData.date && formData.date}
                            />
                        </div>

                        <div style={{     marginRight: "8%" }}>
                            <Styled.Label>Start:</Styled.Label>
                            <Styled.InputData
                                // type="date"
                                type='time'
                                name="timefrom"
                                onChange={handleChange}
                                defaultValue={new Date().getHours() + ":" + "00" + "00"}
                                value={formData.timefrom && formData.timefrom}
                                style={{ width:"90%" }}
                            />
                        </div>
                        <div >
                        <Styled.Label className="label">End:</Styled.Label>
                        <div>
                            <Styled.InputData
                                // type="date"

                                type="time"
                                name="timeto"
                                onChange={handleChange}
                                value={formData.timeto && formData.timeto}
                            />
                        </div>
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
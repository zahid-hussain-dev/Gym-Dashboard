import React, { useState, useEffect } from 'react';
import * as Styled from '../choaches/coaches';
import Image from "next/image";
import close from "../../../public/assests/SVGs/close-svgrepo-com (2).svg";
import { axiosInterceptor } from '../../../axios/axiosInterceptor';
import swal from "sweetalert";
import moment from "moment";
import Select from 'react-select';
import Loader from '../../../components/styledComponents/loader/loader';

const AddGymSchedule = ({ closeModal, id, }) => {
    const [formData, setFormData] = useState({
        timefrom: moment().format("HH:mm"),
        timeto: moment().format("HH:mm"),
        date: "",
    });
    const [loading, setLoading] = useState(false);
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };
    const handleSelectChange = (event) => {
        console.log(event);
        setFormData((prevFormData) => ({
            ...prevFormData,
            ["day"]: event.value,
        }));

    };
    const days = [{ name: "Monday", id: "1" }, { name: "Tuesday", id: "2" }, { name: "Wednesday", id: "3" }, { name: "Thursday", id: "4" }, { name: "Friday", id: "5" }, { name: "Saturday", id: "1" }]
    const handleSubmit = async (event) => {
        event.preventDefault();
        let Payload = {};
        if (id) {
            Payload = {
                from: formData.timefrom,
                to: formData.timeto,
                day: formData.day,
                gym: id,
                timeZone:Intl.DateTimeFormat().resolvedOptions().timeZone,
            }
        }
        else {
            Payload = {
                from: formData.timefrom,
                to: formData.timeto,
                day: formData.day,
                timeZone:Intl.DateTimeFormat().resolvedOptions().timeZone,
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
            closeModal();
        } catch (error) {
            setLoading(false)
            swal('Oops!', error.data.message, 'error')
            console.log(error)
        }
        console.log("formData", formData)
        console.log("Payload", Payload)
        // closeModal();
    };
    return (
        <Styled.PopupContainer>
            <Styled.PopupMainHeading>
                <Styled.PopupHeading  style={{marginRight: "5%" }}>Add Gym Schedule</Styled.PopupHeading>
                <Image src={close} className="close" onClick={closeModal} alt="close" width={20} height={20} />
            </Styled.PopupMainHeading>
            <form onSubmit={handleSubmit}>
                <Styled.MainForm style={{ display:"block" }}>
                    <div style={{ display: "flex", marginTop: "20px", justifyContent:"space-evenly",alignItems:"center",marginLeft:"20px" }}>
                    <div>
                        <div style={{height:"10%",marginBottom:"8%"}}>
                        <Styled.Labels>Select Day:</Styled.Labels>
                        </div>
                          <div style={{width:"10rem"}}>
                          <Select
                                name='days'
                                value={formData.days && formData.days}
                                onChange={handleSelectChange}
                                options={days && days.map(option => ({ value: option.name, label: option.name }))}
                                placeholder="Select Day"
                                isSearchable
                            />
                          </div>
                        </div>
                        {/* <div>
                            <Styled.Label>Start Date:</Styled.Label>
                            <Styled.InputData
                                type='date'
                                name="datefrom"
                                style={{ width:"70%" }}
                                id="date"
                                defaultValue={new Date().toISOString().substring(0, 10)}
                                onChange={handleChange}
                            />
                        </div> */}
                        <div style={{ marginTop:"10px" }}>
                            <Styled.Label>Start:</Styled.Label>
                            <Styled.InputData
                                type='time'
                                name="timefrom"
                                onChange={handleChange}
                                defaultValue={new Date().getHours() + ":" + "00" + "00"}
                                value={formData.timefrom && formData.timefrom}
                                style={{ width:"90%" }}
                            />
                        </div>
                        <div  style={{ marginTop:"10px" }}>
                        <Styled.Label className="label">End:</Styled.Label>
                        <div>
                            <Styled.InputData
                                type="time"
                                name="timeto"
                                onChange={handleChange}
                                value={formData.timeto && formData.timeto}
                                style={{ width:"9rem"}}
                            />
                        </div>
                    </div>
                    </div>
                </Styled.MainForm>
                <Styled.SubmitForm type="submit">
                    Submit
                </Styled.SubmitForm>
               
            </form>
            <Loader isLoading={loading}></Loader>
        </Styled.PopupContainer>
    );
};

export default AddGymSchedule;
import React, { useState, useEffect } from 'react';
import * as Styled from '../addGymModal/addGymModal';
import Image from "next/image";
import close from "../../../public/assests/SVGs/close-svgrepo-com (2).svg";
import { axiosInterceptor } from '../../../axios/axiosInterceptor';
import swal from "sweetalert";
import moment from "moment";
import Select from 'react-select';
import Loader from '../../../components/styledComponents/loader/loader';

const AddGymModal = ( {closeModal}) => {
 const [selectedOptionValue, setSelectedOptionValue] = useState('');
 const [selectedOptionValueID, setSelectedOptionValueID] = useState('');
 const [selectedOptionCity, setSelectedOptionCity] = useState('');
 const [state, setState] = useState([]);
 const [city, setCity] = useState([]);
 const [formData, setFormData] = useState({});
 const [loading, setLoading] = useState(false);
 const handleSelectChange = (event) => {
    console.log(event)
    // setSelectedOption(event.value);
    setSelectedOptionValue(event.name)
    setSelectedOptionValueID(event.value)
    setSelectedOptionCity(event.value)
  };
  const getAllGym = async () => {
    try {
      setLoading(true)
      console.log("api calling for all Gyms")
      const res = await axiosInterceptor().get(
        `/api/gym/`,
      );
      console.log("responsse of all Gyms", res)
      setAllGyms(res?.data?.data)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      // swal('Oops!', error.data.message, 'error')
      console.log(error)
    }
  }
  const getState = async () => {
    try {
      setLoading(true)
      const res = await axiosInterceptor().get(
        `/api/states`,
      );
      console.log("state data", res.data.data)
      setState(res?.data.data)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }
const getCity = async () => {
    try {
      setLoading(true)
      if (state && city) {
        const res = await axiosInterceptor().get(
          `/api/city?state=${selectedOptionValueID}`,
        );
        console.log("response of city", res?.data?.data);
  
        if (res.status === 200) {
            setCity(res?.data?.data)
        }
        setLoading(false)
      }
    } catch (error) {
      console.error("Error fetching city:", error);
      setLoading(false)

    }
  };
  

  useEffect(() => {
      getState();
    //   getCity();
    
  }, [closeModal])
  useEffect(() => {
    if (selectedOptionValueID ) {
        console.log("selectedOptionValueID",selectedOptionValueID);
        getCity();
    }
  }, [selectedOptionValueID])

//   const [selectedOption, setSelectedOption] = useState('');
  const handleChange = (event) => {
    const { name, value} = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleSelectChangeCity = (event) => {
    setSelectedOptionValue(event.name)
    setSelectedOptionValueID(event.value)
    setSelectedOptionCity(event.value)
    setFormData((prevFormData) => ({
        ...prevFormData,
        "cityId": event.value,
      }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("formData",formData)
    try {
        setLoading(true)
        const res = await axiosInterceptor().post(
          `/api/gym`,
          formData,
        );
        if(res.status===201){
        
        }
        console.log("responsse of submit", res)
        swal('Success!', res.data.message, 'success')
        AddGymModal();
        setLoading(false)
      } catch (error) {
        setLoading(false)
        // swal('Oops!', error.data.message, 'error')
        console.log(error)
      
    };

    console.log("formData", formData)
    getAllGym();

    closeModal();
  };
  
  return (

    <Styled.PopupContainer>
      <Styled.PopupMainHeading>
        <Styled.PopupHeading style={{ marginLeft: "42%" }}>Add Gym</Styled.PopupHeading>
        <Image src={close} className="close" onClick={closeModal} alt="close" width={20} height={20} />
      </Styled.PopupMainHeading>
      {/* Form content */}
      <form onSubmit={handleSubmit}>
        <Styled.MainGymForm >
        <div style={{marginTop: "1%", marginLeft:"5%"}}>
            <Styled.Label className="label">Gym Name:</Styled.Label>
              <Styled.InputData
                type="input"
                name="name"
                onChange={handleChange}
                placeholder="Gym Name"
                value={formData.Name}
                // value={selectedOption}
              />
            </div>
            <div style={{width:"30%", marginRight:"0%"}}>
               <div    style={{marginBottom: "5%"}}>
            <Styled.Labels className="label">Select State:</Styled.Labels>
            </div>
            <Select
                      name='childrenId'
                      value={formData.State}
                      onChange={handleSelectChange}
                      options={state && state.map(option => ({ value: option.id, label: option.name }))}
                      placeholder="Select State"
                      isSearchable
                    />
            </div>
            <div style={{margin:"20px",width:"30%"}}>
            <div  style={{marginBottom: "5%"}}>
            <Styled.Labels>Select City:</Styled.Labels>
            </div>
            <Select
                      name='cityId'
                      value={formData.City}
                      onChange={handleSelectChangeCity}
                      options={city.map(option => ({ value: option.id, label: option.name }))}
                      placeholder="Select City"
                      isSearchable
                    />
            </div>
        </Styled.MainGymForm>
        <Styled.SubmitForm type="submit">
          Submit
        </Styled.SubmitForm>
      </form>
      <Loader isLoading={loading}></Loader>
    </Styled.PopupContainer>
     
  );
};

export default AddGymModal;
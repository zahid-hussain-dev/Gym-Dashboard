import React, { useState, useEffect } from 'react';
import * as Styled from '../../styledComponents/add cities/AddCities';
import Image from "next/image";
import close from "../../../public/assests/SVGs/close-svgrepo-com (2).svg";
import { axiosInterceptor } from '../../../axios/axiosInterceptor';
import Loader from '../../../components/styledComponents/loader/loader';
import Select from 'react-select';
import { useDispatch, useSelector } from "react-redux";

const UpdateCities = ({ onClose, id, cityName,stateName }) => {
    const [selectedOptionValue, setSelectedOptionValue] = useState('');
    const [selectedOptionValueID, setSelectedOptionValueID] = useState('');
    const [selectedOptionCity, setSelectedOptionCity] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [stateData, setStateData] = useState({});
  const [selectedOption, setSelectedOption] = useState('');
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState([]);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
   
  });
  console.log("state-name#########", stateName)
  const handleSelectChange = (event) => {
    console.log(event)
    // setSelectedOption(event.value);
    setSelectedOptionValue(event.name)
    setSelectedOptionValueID(event.value)
    setSelectedOptionCity(event.value)
    setStateData((prevChildData) => ({
        ...prevChildData,
        "stateId": event.value,
      }));
    setFormData((prevFormData) => ({
        ...prevFormData,
        "stateId": event.value,
        id:id,
        
      }));
  };
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
  useEffect(() => {
    getState();
  
}, [onClose])

  const handleSelectState = (event) => {
    setSelectedOption(event.target.value);
    const { name, value } = event.target;
    updateButtonState(event.target.value);
    setStateData((prevChildData) => ({
      ...prevChildData,
      [name]: value,
    }));
  };

  const handleSubmitState = async (event) => {
    event.preventDefault();
    onClose();
    try {
      setLoading(true)
      const res = await axiosInterceptor().put(
        `/api/city?id=${id}`,
        stateData,
      );
      console.log("responsse of cities", res)
      // swal('Success!', res.data.message, 'success')
      setLoading(false)
     dispatch(setGetRequest(true));
    } catch (error) {
      setLoading(false)
      // swal('Oops!', error.data.message, 'error')
      console.log(error)
    }
    onClose();
  };
  const updateButtonState = (emailValue) => {
    setIsButtonDisabled(emailValue === '');
  };
  return (
    <Styled.PopupContainer>
      <Styled.PopupMainHeading>
        <Styled.PopupHeading style={{marginRight:"10%"}}>Update Cities</Styled.PopupHeading>
        <Image src={close} className="close" onClick={onClose} alt="close" width={20} height={20} />
      </Styled.PopupMainHeading>
      <form>
      <Styled.MainForm style={{width:'100%',display:"flex", justifyContent:"space-evenly",alignItems:"center"}}>
      <div style={{width:"30%"}}>
        <div style={{height:"30%",marginBottom:"8%"}}>
        <Styled.Label>Select State:</Styled.Label>
        </div>
            <Select
                      name='stateId'
                      value={formData.State}
                      defaultValue={stateName}
                      onChange={handleSelectChange}
                      options={state && state.map(option => ({ value: option.id, label: option.name }))}
                      placeholder={stateName? stateName:"Select State"}
                      isSearchable
                    />
                </div>
               <div style={{width:"30%",marginTop:"2%"}}>
               <Styled.Labels >Add Cities:</Styled.Labels>

                  <Styled.InputData
                    className="input-dataa"
                    type="add-cities"
                    id="message"
                    name="name"
                    placeholder="Add City"
                    onChange={handleSelectState}
                    defaultValue={cityName}
                  />
                </div>
               < div style={{marginBottom:"18px"}}>
                  <Styled.SubmitForm type="submit" onClick={(e) => handleSubmitState(e)} disabled={isButtonDisabled}>
                  Update Cities
                </Styled.SubmitForm>
                  </div>
              </Styled.MainForm>
      </form>
      <Loader isLoading={loading}></Loader>

    </Styled.PopupContainer>
  );
};

export default UpdateCities;

import React, { useState } from 'react';
import * as Styled from '../../styledComponents/choaches/coaches';
import Image from "next/image";
import close from "../../../public/assests/SVGs/close-svgrepo-com (2).svg";
import { axiosInterceptor } from '../../../axios/axiosInterceptor';
import Loader from '../../../components/styledComponents/loader/loader';
import swal from "sweetalert";

const UpdateState = ({ onClose, id,stateName }) => {
    console.log("new state",id)
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [stateData, setStateData] = useState({});
  const [selectedOption, setSelectedOption] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    detail: '',
    date: '',
    status: '',
  });


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
        `/api/states?id=${id}`,
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
    <Styled.PopupContainers>
      <Styled.PopupMainHeading>
        <Styled.PopupHeading style={{marginRight:"10%"}}>Update State</Styled.PopupHeading>
        <Image src={close} className="close" onClick={onClose} alt="close" width={20} height={20} />
      </Styled.PopupMainHeading>
      <form>
      <Styled.MainForm style={{width:'100%',display:"flex", justifyContent:"center",alignItems:"center"}}>

               <div style={{width:"50%"}}>
                  <Styled.InputData
                    className="input-dataa"
                    type="text"
                    id="message"
                    name="name"
                    onChange={handleSelectState}
                    defaultValue={stateName}
                  />
                </div>
               < div style={{marginBottom:"20px"}}>
                  <Styled.SubmitForm type="submit" onClick={(e) => handleSubmitState(e)} disabled={isButtonDisabled}>
                  Update State
                </Styled.SubmitForm>
                  </div>
              </Styled.MainForm>
              <Loader isLoading={loading}></Loader>
      </form>
    </Styled.PopupContainers>
  );
};

export default UpdateState;

import React, { useState } from 'react';
import * as Styled from '../../styledComponents/choaches/coaches';
import Image from "next/image";
import close from "../../../public/assests/SVGs/close-svgrepo-com (2).svg";
import { axiosInterceptor } from '../../../axios/axiosInterceptor';
import Loader from '../../../components/styledComponents/loader/loader';
import swal from "sweetalert";

const AddState = ({ onClose, id }) => {
    console.log("new state",id)
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [childrens, setChildrens] = useState([]);
  const [stateData, setStateData] = useState({});
  const [selectedOption, setSelectedOption] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    detail: '',
    date: '',
    status: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSelectState = (event) => {
    setSelectedOption(event.target.value);
    const { name, value } = event.target;
    updateButtonState(event.target.value);
    setStateData((prevChildData) => ({
      ...prevChildData,
      [name]: value,
      id:id,
    }));
  };

  const handleSubmitState = async (event) => {
    event.preventDefault();
    console.log("StateData", stateData)
    try {
      setLoading(true)
      const res = await axiosInterceptor().post(
        `/api/states`,
        stateData,
      );
      console.log("responsse of login", res)
      swal('Success!', res.data.message, 'success')
      AddChildrensModal();
      setLoading(false)
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
        <Styled.PopupHeading style={{marginRight:"10%"}}>Add State</Styled.PopupHeading>
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
                  />
                </div>
               < div style={{marginBottom:"20px"}}>
                  <Styled.SubmitForm type="submit" onClick={(e) => handleSubmitState(e)} disabled={isButtonDisabled}>
                  Add State
                </Styled.SubmitForm>
                  </div>
              </Styled.MainForm>
              <Loader isLoading={loading}></Loader>
      </form>
    </Styled.PopupContainers>
  );
};

export default AddState;

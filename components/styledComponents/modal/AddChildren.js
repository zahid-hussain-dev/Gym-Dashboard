import React, { useState } from 'react';
import * as Styled from '../../styledComponents/choaches/coaches';
import Image from "next/image";
import close from "../../../public/assests/SVGs/close-svgrepo-com (2).svg";
import { axiosInterceptor } from '../../../axios/axiosInterceptor';
import Loader from '../../../components/styledComponents/loader/loader';
import swal from "sweetalert";

const AddChildrensModal = ({ onClose, Id}) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [childrens, setChildrens] = useState([]);
  const [childData, setChildData] = useState({});

  const [selectedOption, setSelectedOption] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    detail: '',
    date: '',
    status: '',
  });
  console.log("this is id =======", Id)
  const getChildList = async (id) => {
    try {
      setLoading(true)
      console.log("api calling for child list")
      const res = await axiosInterceptor().get(
        `/api/gymnast/children?gymnast=${router.query.ViewId}`,
      );
      console.log("responsse of children ID", res)
      setLoading(false)
      setChildList(res?.data?.result)
    } catch (error) {
      setLoading(false)
      // swal('Oops!', error.data.message, 'error')
      console.log(error)
    }
  }
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSelectChild = (event) => {
    setSelectedOption(event.target.value);
    const { name, value } = event.target;
    updateButtonState(event.target.value);
    setChildData((prevChildData) => ({
      ...prevChildData,
      [name]: value,
    }));
  };

  const handleSubmitChild = async (event) => {
    event.preventDefault();
    onClose();
    getChildList()

    console.log("ChildData")
    // let Payload = {};
    // if (Id) {
    //   Payload = {
    //     // type: childData.type,
    //     name:childData.name,
    //     gymnastId:Id,
         
    //   }
    //   console.log("with id")
    // }
    // else {
    //   Payload = {
    //     name:childData.name,
    //   }
    //   console.log("without id")
    // }
    try {
      setLoading(true)
      // getChildList()
      if(Id){
        const res = await axiosInterceptor().post(
          `/api/gymnast/children?gymnastId=${Id}`,
          childData,
          // getChildList()
        );
      }
      else{
        const res = await axiosInterceptor().post(
          `/api/gymnast/children`,
          childData,
          // getChildList()
        );
      }
      
      console.log("responsse of login", res)
      swal('Success!', res.data.message, 'success')
      onClose();
      // getChildList()
      AddChildrensModal();
      setLoading(true)
      
    } catch (error) {
      setLoading(false)
      // swal('Oops!', error.data.message, 'error')
      console.log(error)
    }
  };
  const updateButtonState = (emailValue) => {
    setIsButtonDisabled(emailValue === '');
  };
  return (
    <Styled.PopupContainer>
      <Styled.PopupMainHeading>
        <Styled.PopupHeading>Add New Child</Styled.PopupHeading>
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
                    onChange={handleSelectChild}
                  />
                </div>
               < div style={{marginBottom:"20px"}}>
                  <Styled.SubmitForm type="submit" onClick={(e) => handleSubmitChild(e)} disabled={isButtonDisabled}>
                  Add Child
                </Styled.SubmitForm>
                  </div>
              </Styled.MainForm>
      </form>
      <Loader isLoading={loading}></Loader>

    </Styled.PopupContainer>
  );
};

export default AddChildrensModal;

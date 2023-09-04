import React, { useState } from 'react';
import * as Styled from '../../styledComponents/choaches/coaches';
import Image from "next/image";
import close from "../../../public/assests/SVGs/close-svgrepo-com (2).svg";
import { axiosInterceptor } from '../../../axios/axiosInterceptor';
import Loader from '../../../components/styledComponents/loader/loader';
import swal from "sweetalert";
import { useRouter } from 'next/router';
// childUpdate
const AddChildrensModal = ({ onClose, childUpdate }) => {
  // console.log("new child cild", id)
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [childData, setChildData] = useState({});
  const [selectedOption, setSelectedOption] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const id =  router.query.ViewId;
  const handleSelectChild = (event) => {
    setSelectedOption(event.target.value);
    const { name, value } = event.target;
    updateButtonState(event.target.value);
    setChildData((prevChildData) => ({
      ...prevChildData,
      [name]: value,
      id: id,
    }));
  };

  // const handleSubmitChild = async (event) => {
  //   event.preventDefault();
  //   console.log("routerrrrrr ", id)
  //   // const Payload = {
  //   //  id:id
  //   // }
  //   try {
  //     setLoading(true)
  //     onClose()
  //     if(id){
  //       const res = await axiosInterceptor().put(
  //         `/api/gymnast/children`,
  //         childData);
  //     }else{
  //       const res = await axiosInterceptor().put(
  //         `/api/gymnast/children`,
  //         childData,);
  //     }
  //     console.log("responsse of login", res)

  //     swal('Success!', res.data.message, 'success')
  //     AddChildrensModal();
  //     onClose();
  //     setLoading(false)
  //   } catch (error) {
  //     setLoading(false)
  //     // swal('Oops!', error.data.message, 'error')
  //     console.log(error)
  //   }
  //   onClose();
  // };
  const handleSubmitChild = async (event) => {
    event.preventDefault();
    console.log("routerrrrrr ", id);
    
    try {
      setLoading(true);
      onClose();
      
      const payload = {
        GymnastId: +id,
        name:childData.name,
        id:childData.id,
        // childData: childData
      };
  
      const res = await axiosInterceptor().put(
        `/api/gymnast/children`,
        payload
      );
  
      console.log("responsse of login", res);
  
      swal('Success!', res.data.message, 'success');
      AddChildrensModal();
      onClose();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      swal('Oops!', error.data.message, 'error')
      console.log(error);
    }
    onClose();
  };
  
  const updateButtonState = (emailValue) => {
    setIsButtonDisabled(emailValue === '');
  };
  return (
    <Styled.PopupContainer>
      <Styled.PopupMainHeading>
        <Styled.PopupHeading>Update Children</Styled.PopupHeading>
        <Image src={close} className="close" onClick={onClose} alt="close" width={20} height={20} />
      </Styled.PopupMainHeading>
      <form>
        <Styled.MainForm style={{ width: '100%', display: "flex", justifyContent: "center", alignItems: "center" }}>

          <div style={{ width: "50%" }}>
            <Styled.InputData
              className="input-dataa"
              type="text"
              id="message"
              name="name"
              onChange={handleSelectChild}
              defaultValue={childUpdate}
            />
          </div>
          < div style={{ marginBottom: "20px" }}>
            <Styled.SubmitForm type="submit" onClick={(e) => handleSubmitChild(e)} disabled={isButtonDisabled}>
              Update Child
            </Styled.SubmitForm>
          </div>
        </Styled.MainForm>
      </form>
      <Loader isLoading={loading}></Loader>

    </Styled.PopupContainer>
  );
};

export default AddChildrensModal;

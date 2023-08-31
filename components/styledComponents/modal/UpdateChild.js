import React, { useState } from 'react';
import * as Styled from '../../styledComponents/choaches/coaches';
import Image from "next/image";
import close from "../../../public/assests/SVGs/close-svgrepo-com (2).svg";
import { axiosInterceptor } from '../../../axios/axiosInterceptor';
import Loader from '../../../components/styledComponents/loader/loader';
import swal from "sweetalert";
// childUpdate
const AddChildrensModal = ({ onClose, id, childUpdate }) => {
  console.log("new child cild", id)
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

  // const handleChange = (event) => {
  //   const { name, value } = event.target;
  //   setFormData((prevFormData) => ({
  //     ...prevFormData,
  //     [name]: value,
  //   }));
  // };

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

  const handleSubmitChild = async (event) => {
    event.preventDefault();
    console.log("ChildData==========", childData)
    try {
      setLoading(true)
      const res = await axiosInterceptor().put(
        `/api/gymnast/children`,
        childData,
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

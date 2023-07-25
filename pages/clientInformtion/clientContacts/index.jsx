import React, { useState } from 'react'
import * as Style from "../../../components/styledComponents/form/Form"
const index = () => {
    const contactInfoObj = {
        firstName: "",
        lastName: "",
        company: "",
        addressLine1: "",
        addressLine2: "",
        cityDistrict: "",
        stateProvince: "",
        postalCode: "",
        country: "",
        phone: "",
        alternatePhone: "",
        relationship: "",
        profession: "",
        partTeam: "",
        email: "",
        notes: "",
    };

    const [clientData, setClientData] = useState(contactInfoObj);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Clientdata", clientData)
    }
    const handleContactInfo = (name, value) => {
        setClientData({
            ...clientData,
            [name]: value,
        });
    };

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        }}>
            <div style={{ fontFamily: "Roboto", fontSize: "20px", fontWeight: "700", textAlign: "center" }}>Contact Information</div>
            <Style.StyledForm onSubmit={handleSubmit} style={{ width: "66%" }} >
                <Style.StyledLabel>First Name:</Style.StyledLabel>
                <Style.StyledInput type="text" value={clientData.firstName} name="firstName" placeholder='First Name' onChange={(e) => {
                    handleContactInfo(e.target.name, e.target.value)
                }} />
                <Style.StyledLabel>Last Name:</Style.StyledLabel>
                <Style.StyledInput type="text" value={clientData.lastName} name="lastName" placeholder='Last Name' onChange={(e) => {
                    handleContactInfo(e.target.name, e.target.value)
                }} />
                <Style.StyledLabel>Company:</Style.StyledLabel>
                <Style.StyledInput type="text" value={clientData.company} name="company" placeholder='Company' onChange={(e) => {
                    handleContactInfo(e.target.name, e.target.value)
                }} /><Style.StyledLabel>Address:</Style.StyledLabel>
                <Style.StyledInput type="text" value={clientData.addressLine1} name="addressLine1" placeholder='Address Line 1' onChange={(e) => {
                    handleContactInfo(e.target.name, e.target.value)
                }} />
                <Style.StyledInput type="text" value={clientData.addressLine2} name="addressLine2" placeholder='Address Line 2' onChange={(e) => {
                    handleContactInfo(e.target.name, e.target.value)
                }} />
                <Style.StyledInput type="text" value={clientData.cityDistrict} name="cityDistrict" placeholder='City / District' onChange={(e) => {
                    handleContactInfo(e.target.name, e.target.value)
                }} />
                <Style.StyledInput type="text" value={clientData.stateProvince} name="stateProvince" placeholder='State / Province' onChange={(e) => {
                    handleContactInfo(e.target.name, e.target.value)
                }} />
                <Style.StyledInput type="text" value={clientData.postalCode} name="postalCode" placeholder='PostalCode' onChange={(e) => {
                    handleContactInfo(e.target.name, e.target.value)
                }} />
                <Style.StyledInput type="text" value={clientData.country} name="country" placeholder='Country' onChange={(e) => {
                    handleContactInfo(e.target.name, e.target.value)
                }} />
                <Style.StyledLabel>Phone:</Style.StyledLabel>
                <Style.StyledInput type="text" value={clientData.phone} name="phone" placeholder='Phone' onChange={(e) => {
                    handleContactInfo(e.target.name, e.target.value)
                }} />
                <Style.StyledLabel>Alternate Phone:</Style.StyledLabel>
                <Style.StyledInput type="text" value={clientData.alternatePhone} name="alternatePhone" placeholder='Alternate Phone' onChange={(e) => {
                    handleContactInfo(e.target.name, e.target.value)
                }} />


                <Style.StyledLabel>Relationship:</Style.StyledLabel>
                <Style.RadioGroup>
                    <Style.RadioField>
                        <input type="radio" id='friend' value="friend" name="relationship" onChange={(e) => {
                            handleContactInfo(e.target.name, e.target.value)
                        }} />
                        <Style.RadioLabel htmlFor='friend'>Friend</Style.RadioLabel>
                    </Style.RadioField>
                    <Style.RadioField>
                        <input type="radio" id='family' value="family" name="relationship" onChange={(e) => {
                            handleContactInfo(e.target.name, e.target.value)
                        }} />
                        <Style.RadioLabel htmlFor='family'>Family</Style.RadioLabel>
                    </Style.RadioField>
                    <Style.RadioField>
                        <input type="radio" id='professional' value="professional" name="relationship" onChange={(e) => {
                            handleContactInfo(e.target.name, e.target.value)
                        }} />
                        <Style.RadioLabel htmlFor='professional'>Professional</Style.RadioLabel>
                    </Style.RadioField>
                </Style.RadioGroup>

                <Style.StyledLabel>Profession:</Style.StyledLabel>
                <Style.StyledInput type="text" value={clientData.profession} name="profession" placeholder='Profession' onChange={(e) => {
                    handleContactInfo(e.target.name, e.target.value)
                }} />

                <Style.StyledLabel>Part of My Professional Team:</Style.StyledLabel>
                <Style.RadioGroup>
                    <Style.RadioField>
                        <input type="radio" id='yes' value="Yes" name="partTeam" onChange={(e) => {
                            handleContactInfo(e.target.name, e.target.value)
                        }} />
                        <Style.RadioLabel htmlFor='yes'>Yes</Style.RadioLabel>
                    </Style.RadioField>
                    <Style.RadioField>
                        <input type="radio" id='no' value="No" name="partTeam" onChange={(e) => {
                            handleContactInfo(e.target.name, e.target.value)
                        }} />
                        <Style.RadioLabel htmlFor='no'>No</Style.RadioLabel>
                    </Style.RadioField>
                </Style.RadioGroup>

                <Style.StyledLabel>Email:</Style.StyledLabel>
                <Style.StyledInput type="text" value={clientData.email} name="email" placeholder='Email' onChange={(e) => {
                    handleContactInfo(e.target.name, e.target.value)
                }} />
                <Style.StyledLabel>Notes:</Style.StyledLabel>
                <Style.StyledTextArea value={clientData.notes} name="notes" placeholder='Notes' onChange={(e) => {
                    handleContactInfo(e.target.name, e.target.value)
                }} />

                <Style.StyledButton type="submit" >Save</Style.StyledButton>
            </Style.StyledForm>
        </div>
    )
}

export default index

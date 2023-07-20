import React from "react";
import Modal from "../../styledComponents/modal/modal";
import * as Style from "../../styledComponents/dashboardStyles/ViewModal";
import Image from 'next/image';
import eye from "../../../public/assests/SVGs/eye.svg";
import cancel from "../../../public/assests/SVGs/cancel.svg";

function ViewUpdateModal({ show, close }) {
    const updateData = [
        { name: "Asset Planet has added new Asset to the list" },
        { name: "Asset Planet has developed a new category in the Inventory App" },
        { name: "Remember, Monday is a bank holiday. Enjoy the day off!" },
        {
            name: "Asset Planet has gifted another free month to you. Thank you for the referral!",
        },
        { name: "Update Inflation Projection" },
    ];

    return (
        <Modal show={show}>
            <div style={{ width: "35rem" }}>
                <Style.HeaderContainer>
                    <Image src={cancel} alt='cancel' style={{ cursor: "pointer" }} onClick={close} height={15} width={30} />
                    {/* <Icon type="close" onClick={close}></Icon> */}
                </Style.HeaderContainer>

                <Style.DataContainer
                >
                    <div style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Update</div>

                    <div>
                        {updateData.map((data, index) => (
                            <Style.RowContainer key={index}>
                                <div style={{ width: "90%" }}>{data.name}</div>
                                <div style={{ width: "10%", display: "flex", columnGap: "0.5rem" }}>
                                    <Image src={cancel} alt='cancel' height={15} width={30} />
                                    {/* <Icon type="close"></Icon>*/}
                                    <Image src={eye} alt='eye' height={15} width={30} />
                                    {/* <Icon type="eye"></Icon>*/}
                                </div>
                            </Style.RowContainer>
                        ))}
                    </div>
                </Style.DataContainer>



                <Style.DataContainer
                    style={{
                        paddingBottom: "1.5rem"
                    }}
                >
                    <div style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Snoozed Updates</div>

                    <div>
                        {updateData.map((data, index) => (
                            <Style.RowContainer key={index}>
                                <div style={{ width: "90%" }}>{data.name}</div>
                                <div style={{ width: "10%", display: "flex", columnGap: "0.5rem" }}>
                                    <Image src={cancel} alt='cancel' height={15} width={30} />
                                    {/* <Icon type="close"></Icon>*/}
                                    <Image src={eye} alt='eye' height={15} width={30} />
                                    {/* <Icon type="eye"></Icon>*/}
                                </div>
                            </Style.RowContainer>
                        ))}
                    </div>
                </Style.DataContainer>
            </div>
        </Modal>
    );
}

export default ViewUpdateModal;

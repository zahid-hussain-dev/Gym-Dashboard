import React from "react";
import { Text } from "../../clientInfoStyles/text";
import { defaultStyles } from "../../../../components/ClientInfo/style-constants/utils";
import Modal from "../modal";
import { Button } from "../../clientInfoStyles/button";
import * as Style from "./styles/update-modal";
import Image from "next/image";
import closeIcon from "../../../../public/assests/SVGs/cancel.svg"
import { InputGroup } from "../../IconInput/styles/input";

function UpdateModal({ show, close, fields, updateRow,modalTitle }) {
  const { styles } = defaultStyles;

  const handleUpdate = () => {
    updateRow();
    close();
  };
  return (
    <Modal show={show}>
      <Style.HeaderConatiner>
        <Text style={styles.text.formHeaderText}>{modalTitle}</Text>
        <Image src={closeIcon} alt="close" width={30} height={30} onClick={close}/>
      </Style.HeaderConatiner>

      <Style.FieldsContainer>
        {fields &&
          fields.map((data, index) => {
            const { value, Component, title, name, onChange,style } = data;
            return (
              <InputGroup key={index}>
                <Text style={styles.text.labelText} padding="2rem 0 1rem 0 ">
                  {title || value.title}
                </Text>

                <Component
                  key={index}
                  value={value}
                  name={name}
                  onChange={onChange}
                  style={style}
                />
              </InputGroup>
            );
          })}
      </Style.FieldsContainer>

      <Style.ButtonsContainer>
        <Button style={styles.button.smallButton} onClick={close}>
          Cancel
        </Button>
        <Button style={styles.button.smallButton} onClick={handleUpdate}>
          Update
        </Button>
      </Style.ButtonsContainer>
    </Modal>
  );
}

export default UpdateModal;

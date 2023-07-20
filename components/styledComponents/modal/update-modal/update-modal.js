import React from "react";
import { Text } from "../../text";
import { defaultStyles } from "../../../../constants/style-constants/utils";
import Modal from "../modal";
import { Button } from "../../button";
import * as Style from "./styles/update-modal";
import { Icon } from "antd";
import { InputGroup } from "../../input/styles/input";

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
        <Icon type="close" onClick={close}></Icon>
      </Style.HeaderConatiner>

      <Style.FieldsContainer>
        {fields &&
          fields.map((data, index) => {
            const { value, Component, title, name, onChange,style } = data;
            return (
              <InputGroup>
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

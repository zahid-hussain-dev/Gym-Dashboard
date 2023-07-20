import React from "react";
import { Text } from "../../text";
import { defaultStyles } from "../../../../constants/style-constants/utils";
import Modal from "../modal";
import { Button } from "../../button";
import * as Style from "./styles/add-modal";
import { Icon } from "antd";
import { InputGroup } from "../../input/styles/input";

function AddModal({ show, close, fields, submitData, modalTitle,obj }) {
  const { styles } = defaultStyles;

  const handleSubmit = () => {
    submitData();
    close();
  };

  // console.log("fieldssssss", fields);

  for (let i = 0; i < fields.length; i++) {
    console.log("fieldssssss", fields[i]);
  }
  return (
    <Modal show={show}>
      <Style.HeaderConatiner>
        <Text style={styles.text.formHeaderText}>{modalTitle}</Text>
        <Icon type="close" onClick={close}></Icon>
      </Style.HeaderConatiner>

      <Style.FieldsContainer>
        {fields &&
          fields.map((data, index) => {
            console.log("dataaa", data);
            if (obj==="nestedObj") {
              return (
                <div style={{ display: "flex", columnGap: "2rem" }}>
                  {Object.keys(data).map((key, index1) => {
                    console.log("keyyy", data[key]);
                    const { value, Component, title, onChange, name, style } =
                      data[key];
                    return (
                      <InputGroup>
                        <Text
                          style={styles.text.labelText}
                          padding="2rem 0 1rem 0 "
                        >
                          {title || value.title}
                        </Text>

                        <Component
                          key={index}
                          value={value}
                          name={name}
                          style={style}
                          index={index}
                          obj={obj}
                          onChange={(event)=>onChange(index,event.target)}
                        />
                      </InputGroup>
                    );
                  })}
                </div>
              );
            } else {
              const { value, Component, title, onChange, name, style } = data;
              return (
                <InputGroup>
                  <Text style={styles.text.labelText} padding="2rem 0 1rem 0 ">
                    {title || value.title}
                  </Text>

                  <Component
                    key={index}
                    value={value}
                    name={name}
                    style={style}
                    obj={obj}

                    onChange={onChange}
                  />
                </InputGroup>
              );
            }
          })}
      </Style.FieldsContainer>

      <Style.ButtonsContainer>
        <Button style={styles.button.smallButton} onClick={close}>
          Cancel
        </Button>
        <Button style={styles.button.smallButton} onClick={handleSubmit}>
          Ok
        </Button>
      </Style.ButtonsContainer>
    </Modal>
  );
}

export default AddModal;

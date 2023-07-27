import React from "react";
import { Input, InputGroupFlex, IconContainer } from "./styles/input";
// import { Icon } from "antd";

function IconInput(props) {
  const {
    onChange,
    name,
    style,
    iconPosition,
    iconType,
    icon,
    placeholder,
    value,
  } = props.value || props;

  const { index, obj } = props;

  return (
    <InputGroupFlex>
      {iconPosition === "start" ? (
        iconType ? (
          <IconContainer>
        {/*<Icon type="phone" />*/}
        phoneicon
          </IconContainer>
        ) : (
          <IconContainer>
            <div>{icon}</div>
          </IconContainer>
        )
      ) : null}
      <Input
        style={style}
        onChange={(event) => {
          if (obj == "nestedObj") {
            onChange(index, event.target);
          }
          else{
            onChange(event)
          }
        }}
        name={name}
        placeholder={placeholder}
        value={value}
      />
      {/* {iconPosition === "end" ? (
        <IconContainer>
          <Icon type="phone" />
        </IconContainer>
      ) : null} */}

      {iconPosition === "end" ? (
        iconType ? (
          <IconContainer>
        {/*<Icon type="phone" />*/}
        phone icon
          </IconContainer>
        ) : (
          <IconContainer>
            <div>{icon}</div>
          </IconContainer>
        )
      ) : null}
    </InputGroupFlex>
  );
}

export default IconInput;

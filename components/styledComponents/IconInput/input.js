import React,{useState} from "react";
import  * as Style from "./styles/input";
import { defaultStyles } from "../../../constants/style-constants/utils";

function Input(props) {
  const {setSelectedValue,type,selectedValue,onChange,value} = props.value || props
  const { styles } = defaultStyles;

  return (
    <div>
      <Style.Input
        style={styles.textInput.extraSmallTextInput}
        type={type ? type : "text"}
        value={value}
        onChange={onChange}
        // placeholder={"Enter Order Tracking ID..."}
      />
    </div>
  );
}

export default Input;

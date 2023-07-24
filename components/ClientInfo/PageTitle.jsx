import React from 'react'
import * as Style from "../styledComponents/clientInfoStyles/Pagetitle";
const PageTitle = (props) => {
  return (
    <Style.MainSection >

      <Style.MainTitle>{props.title}</Style.MainTitle>

    </Style.MainSection>
  )
}

export default PageTitle

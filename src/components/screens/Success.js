import { useContext, useEffect } from "react";
import { GlobalContext } from "../../context/global";
import { SectionHeading, SectionContent, FormGroup } from "../shared";
import confetti from "canvas-confetti";

const ScreenHeading = () => {
  return (<SectionHeading>Congratualations!</SectionHeading>)
}
const Content = () => {
  useEffect(()=>{
    confetti();
  })
  return (<SectionContent>
    <FormGroup>
      Congratualations on booking your appointment!
    </FormGroup>
  </SectionContent>)
}

export const config = 
{
  handle: "success",
  to: [
  ],
  heading: <ScreenHeading/>,
  content: <Content/>,
};
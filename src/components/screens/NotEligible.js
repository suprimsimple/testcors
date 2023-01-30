import { useContext, useEffect } from "react";
import { GlobalContext } from "../../context/global";
import { SectionHeading, SectionContent, FormGroup } from "../shared";

const ScreenHeading = () => {
  return (<SectionHeading>Sorry</SectionHeading>)
}
const Content = () => {
  return (<SectionContent>
    <FormGroup>
      You are not eligbable to book the appointment via the online tool.
    </FormGroup>
  </SectionContent>)
}

export const config = 
{
  handle: "notEligable",
  to: [
  ],
  heading: <ScreenHeading/>,
  content: <Content/>,
};
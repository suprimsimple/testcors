import { Button } from "baseui/button";
import { useContext } from "react";
import { GlobalContext } from "../../context/global";
import { SectionHeading, SectionContent, FormGroup } from "../shared";

const ScreenHeading = () => {
  return (<SectionHeading>Extra Information 1</SectionHeading>)
}
const Content = () => {
  const [, dispatch] = useContext(GlobalContext);
  return (<SectionContent>
    <FormGroup>
      You are on this page because your first name is blank.
    </FormGroup>
    <FormGroup>
      <Button onClick={() => dispatch({ type: "LAST_SCREEN"})}>Back</Button>
      <Button onClick={() => dispatch({ type: "NEXT_SCREEN"})}>Next</Button>
    </FormGroup>
  </SectionContent>)
}

export const config = 
{
  handle: "extraInfo1",
  to: [
    {
      handle: "notEligable",
      condition: (submission) => {
        return true;
      }
    },
  ],
  heading: <ScreenHeading/>,
  content: <Content/>,
};
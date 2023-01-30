import { ParagraphMedium } from "baseui/typography";
import { FormGroup, SectionContent, SectionHeading } from "../shared";
import { useContext, useEffect } from "react";
import { GlobalContext } from "../../context/global";

const ScreenHeading = () => {
  return (<SectionHeading withGoBack></SectionHeading>)
}
const Content = () => {
  const [global, dispatch] = useContext(GlobalContext);
	useEffect(() => {
		global.submission.screen = 10;
	});
  return (<SectionContent
    withNextButton
    nextButtonText="Create a new profile"
    >
    <FormGroup>
      <ParagraphMedium>
        Have you changed any of your personal details since your last breast screen? If so, please try again with your previous details.
      </ParagraphMedium>
    </FormGroup>
  </SectionContent>)
}

export const config =
{
  handle: "failExistingClient",
  to: [
    {
      handle: "newClientInformation",
      condition: submission => {
        return true;
      }
    }
  ],
  heading: <ScreenHeading />,
  content: <Content />,
};
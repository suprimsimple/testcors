import { ParagraphMedium } from "baseui/typography";
import { useContext, useEffect } from "react";
import { GlobalContext } from "../../context/global";
import { SectionHeading, SectionContent, FormGroup } from "../shared";

const ScreenHeading = () => {
  return (<SectionHeading withGoBack></SectionHeading>)
}
const Content = () => {
  const [global, dispatch] = useContext(GlobalContext);
	useEffect(() => {
		global.submission.screen = 15;
	});
  return (<SectionContent>
    <FormGroup>
      <ParagraphMedium>
      BreastScreen SA is unable to screen you if you are not an Australian citizen or resident. If you are unsure about the criteria for this, please phone us on 13 20 50.
      </ParagraphMedium>
    </FormGroup>
  </SectionContent>)
}

export const config =
{
  handle: "failNonResident",
  to: [
  ],
  heading: <ScreenHeading />,
  content: <Content />,
};
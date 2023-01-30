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
		global.submission.screen = 17;
	});
  return (<SectionContent>
    <FormGroup>
      <ParagraphMedium>
        Sorry, you need to provide proof of residency (Australian Driver's License or Australian Passport) to book with BreastScreen SA.
      </ParagraphMedium>
    </FormGroup>
  </SectionContent>)
}

export const config =
{
  handle: "failResidencyEvidence",
  to: [
  ],
  heading: <ScreenHeading />,
  content: <Content />,
};
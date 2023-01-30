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
		global.submission.screen = 26;
	});
  return (<SectionContent>
    <FormGroup>
      <ParagraphMedium>
      As you have a change in your breast that has not been checked by your doctor, you will need to see your doctor first before you can be screened with BreastScreen SA. 
      </ParagraphMedium>
      <ParagraphMedium>
      Screening mammograms are not an effective test for the investigation of breast changes, as more detailed tests are needed (such as diagnostic mammography and ultrasound). 
      </ParagraphMedium>
      <ParagraphMedium>
        If you are unsure, you can phone us on 13 20 50.
      </ParagraphMedium>
    </FormGroup>
  </SectionContent>)
}

export const config =
{
  handle: "failBreastLumps",
  to: [
  ],
  heading: <ScreenHeading />,
  content: <Content />,
};
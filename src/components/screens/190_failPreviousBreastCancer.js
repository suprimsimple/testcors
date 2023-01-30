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
		global.submission.screen = 19;
	});
  return (<SectionContent>
    <FormGroup>
      <ParagraphMedium>
        As you have had breast cancer previously, you must phone us on 13 20 50 to proceed with your booking. You will need to speak with one of our medical officers to ensure screening with BreastScreen SA is suitable for you.
      </ParagraphMedium>
    </FormGroup>
  </SectionContent>)
}

export const config =
{
  handle: "failPreviousBreastCancer",
  to: [
  ],
  heading: <ScreenHeading />,
  content: <Content />,
};
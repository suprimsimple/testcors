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
		global.submission.screen = 30;
	});
  return (<SectionContent>
    <FormGroup>
      <ParagraphMedium>
        As you are planning to have breast surgery in the next 2 months, we are unable to screen you.
      </ParagraphMedium>
      <ParagraphMedium>
       If you are unsure, you can phone us on 13 20 50.
      </ParagraphMedium>
    </FormGroup>
  </SectionContent>)
}

export const config =
{
  handle: "failBreastChanges",
  to: [
  ],
  heading: <ScreenHeading />,
  content: <Content />,
};
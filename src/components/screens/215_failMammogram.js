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
		global.submission.screen = 21;
	});
  return (<SectionContent>
    <FormGroup>
      <ParagraphMedium>
        As you have had a mammogram in the past 9 months,please phone us on 132050 to find out if screening with BreastScreen SA is suitable for you.
      </ParagraphMedium>
    </FormGroup>
  </SectionContent>)
}

export const config =
{
  handle: "failMammogram",
  to: [
  ],
  heading: <ScreenHeading />,
  content: <Content />,
};
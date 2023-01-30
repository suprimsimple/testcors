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
		global.submission.screen = 6;
	});
  return (<SectionContent>
    <FormGroup>
      <ParagraphMedium>
      If you are trans or gender diverse, breast screening may be of benefit depending on your individual circumstances. Please phone us on 13 20 50 to discuss your booking.
      </ParagraphMedium>
    </FormGroup>
  </SectionContent>)
}

export const config =
{
  handle: "failGender",
  to: [
  ],
  heading: <ScreenHeading />,
  content: <Content />,
};
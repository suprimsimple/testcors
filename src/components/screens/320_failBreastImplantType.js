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
    global.submission.screen = 32;
  });
  return (<SectionContent>
    <FormGroup>
      <ParagraphMedium>
      BreastScreen SA is unable to screen you if you have injectable silicone/macrolaine fillers.
      </ParagraphMedium>
      <ParagraphMedium>
      If you are unsure about which breast implants you have, you can phone us on 13 20 50.
      </ParagraphMedium>
    </FormGroup>
  </SectionContent>)
}

export const config =
{
  handle: "failBreastImplantType",
  to: [
  ],
  heading: <ScreenHeading />,
  content: <Content />,
};
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
  return (<SectionContent withNextButton>
    <FormGroup>
      Mammogram logic TBD
    </FormGroup>
  </SectionContent>)
}

export const config =
{
  handle: "mammogramNewClient",
  to: [
    {
      handle: `planningSurgery`,
      condition: submission => true
    }
  ],
  heading: <ScreenHeading />,
  content: <Content />,
};
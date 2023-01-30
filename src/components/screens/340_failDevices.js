import { ParagraphMedium } from "baseui/typography"
import { useContext, useEffect } from "react"
import { GlobalContext } from "../../context/global"
import { SectionHeading, SectionContent, FormGroup } from "../shared"

const ScreenHeading = () => {
  return <SectionHeading withGoBack></SectionHeading>
}
const Content = () => {
  const [global, dispatch] = useContext(GlobalContext);
  useEffect(() => {
    global.submission.screen = 34;
  });
  return (
    <SectionContent>
      <FormGroup>
        <ParagraphMedium>
          As you have a device implanted within your chest area, please phone us on 13 20 50 to proceed with your booking. 
        </ParagraphMedium>
        <ParagraphMedium>
          We will need to ask you some additional questions about your device to find out if we are able to screen you.
        </ParagraphMedium>
      </FormGroup>
    </SectionContent>
  )
}

export const config = {
  handle: "failDevices",
  to: [],
  heading: <ScreenHeading />,
  content: <Content />,
}

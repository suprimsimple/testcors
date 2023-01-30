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
		global.submission.screen = 28;
	});
  return (
    <SectionContent>
      <FormGroup>
        <ParagraphMedium>
          As you have reported nipple discharge that has not been checked by
          your doctor, you will need to see your doctor before you can be
          screened with BreastScreen SA.
        </ParagraphMedium>
        <ParagraphMedium>
          Screening mammograms are not an effective test for the investigation
          of symptoms including nipple discharge, as more detailed tests are
          needed (such as diagnostic mammography and ultrasound).
        </ParagraphMedium>
        <ParagraphMedium>
          If you are unsure, you can phone us on 13 20 50.
        </ParagraphMedium>
      </FormGroup>
    </SectionContent>
  )
}

export const config = {
  handle: "failBreastDischarge",
  to: [],
  heading: <ScreenHeading />,
  content: <Content />,
}

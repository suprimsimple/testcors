import { HeadingLevel, Heading } from "baseui/heading"
import { ParagraphMedium, ParagraphSmall } from "baseui/typography"
import { useContext, useEffect } from "react"
import { GlobalContext } from "../../context/global"
import { SectionHeading, SectionContent, FormGroup } from "../shared"
import { FormControl } from "baseui/form-control"
import { RadioGroup, Radio } from "baseui/radio"

const ScreenHeading = () => {
  return <SectionHeading withGoBack></SectionHeading>
}
const Content = () => {
  const [global, dispatch] = useContext(GlobalContext);
	useEffect(() => {
		global.submission.screen = 29;
	});
  const updateSubmission = (key, value) => {
    dispatch({ type: "UPDATE_SUBMISSION", payload: { [key]: value } })
  }

  return (
    <SectionContent withNextButton>
      <FormGroup>
        <ParagraphMedium>
          Please answer the questions below to confirm your eligibility.
        </ParagraphMedium>
      </FormGroup>

      <FormGroup>
        <HeadingLevel>
            <Heading styleLevel={3}>
                Have you noticed any other changes in your breasts?
              <span>*</span>
            </Heading>
        </HeadingLevel>
        <ParagraphSmall>
        For example, a change in the look and feel of your breasts, nipple changes, puckering of the skin, pain, or any other change you have noticed that is unusual for you.
        </ParagraphSmall>
        <FormControl>
          <RadioGroup
            value={global.submission.hasNoticeOtherBreastChange}
            onChange={e =>
              updateSubmission(`hasNoticeOtherBreastChange`, e.target.value)
            }
            name="hasNoticeOtherBreastChange"
          >
            <Radio value="no">No</Radio>
            <Radio value="yes">Yes</Radio>
          </RadioGroup>
        </FormControl>
      </FormGroup>
    </SectionContent>
  )
}
export const config = {
	handle: "breastChanges",
	to: [
		{
			handle: "failBreastChanges",
			condition: (submission) =>
				submission.hasNoticeOtherBreastChange === "yes",
		},
		{
			handle: "breastImplantType",
			condition: (submission) =>
				submission.hasNoticeOtherBreastChange !== "yes" &&
				submission.hasImplants,
		},
		{
			handle: "checkTravel",
			condition: (submission) =>
				submission.hasNoticeOtherBreastChange !== "yes" &&
				!submission.hasImplants,
		},
	],
	heading: <ScreenHeading />,
	content: <Content />,
};
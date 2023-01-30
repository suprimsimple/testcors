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
		global.submission.screen = 25;
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
              Have your breast lump/s been checked by a doctor? 
              <span>*</span>
            </Heading>
        </HeadingLevel>
        <FormControl>
          <RadioGroup
            value={global.submission.lumpDetails}
            onChange={e =>
              updateSubmission(`lumpDetails`, e.target.value)
            }
            name="lumpDetails"
          >
            <Radio value="investigatedNotChanged">My lump/s have been checked by a doctor and have not changed</Radio>
            <Radio value="investigatedChanged">My lump/s have been checked by a doctor but have changed</Radio>
            <Radio value="notInvestigated">My lump/s have not been checked by a doctor</Radio>
          </RadioGroup>
        </FormControl>
      </FormGroup>
    </SectionContent>
  )
}

export const config = {
	handle: "breastLumps",
	to: [
		{
			handle: "failBreastLump",
			condition: (submission) =>
				submission.lumpDetails === "notInvestigated",
		},
		{
			handle: "breastDischarge",
			condition: (submission) =>
				submission.lumpDetails !== "notInvestigated" &&
				submission.conditionHasDischarge,
		},
		{
			handle: "breastImplantType",
			condition: (submission) =>
				submission.lumpDetails !== "notInvestigated" &&
				!submission.conditionHasDischarge &&
				submission.hasImplants,
		},
		{
			handle: "checkTravel",
			condition: (submission) =>
				submission.lumpDetails !== "notInvestigated" &&
				!submission.conditionHasDischarge &&
				!submission.hasImplants,
		},
	],
	heading: <ScreenHeading />,
	content: <Content />,
};
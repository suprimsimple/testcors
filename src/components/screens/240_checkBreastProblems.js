import { HeadingLevel, Heading } from "baseui/heading"
import { ParagraphMedium, ParagraphSmall } from "baseui/typography"
import { useContext, useEffect, Fragment } from "react"
import { GlobalContext } from "../../context/global"
import { SectionHeading, SectionContent, FormGroup } from "../shared"
import { FormControl } from "baseui/form-control"
import { RadioGroup, Radio } from "baseui/radio"
import { Checkbox, STYLE_TYPE, LABEL_PLACEMENT } from "baseui/checkbox"

const ScreenHeading = () => {
  return <SectionHeading withGoBack></SectionHeading>
}
const Content = () => {
  const [global, dispatch] = useContext(GlobalContext);
	useEffect(() => {
		global.submission.screen = 24;
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
               Do you have any of the following
            <span>*</span>
          </Heading>
        </HeadingLevel>
        <ParagraphSmall>
        A short descriptive text to assist the user with completing their response to the question.
        </ParagraphSmall>
        <FormControl>
          <Fragment>
            <Checkbox
              checked={global.submission.conditionHasLumps}
              onChange={e =>
                updateSubmission("conditionHasLumps", e.target.checked)
              }
            >
              Lumps
            </Checkbox>
            <Checkbox
              checked={global.submission.conditionHasDischarge}
              onChange={e =>
                updateSubmission("conditionHasDischarge", e.target.checked)
              }
            >
              Discharge
            </Checkbox>
            <Checkbox
              checked={global.submission.conditionHasOther}
              onChange={e =>
                updateSubmission("conditionHasOther", e.target.checked)
              }
            >
              Other
            </Checkbox>
          </Fragment>
        </FormControl>
      </FormGroup>
    </SectionContent>
  )
}

export const config = {
	handle: "checkBreastProblems",
	to: [
		{
			handle: "breastLumps",
			condition: (submission) => submission.conditionHasLumps,
		},
		{
			handle: "breastDischarge",
			condition: (submission) =>
				!submission.conditionHasLumps &&
				submission.conditionHasDischarge,
		},
		{
			handle: "breastImplantType",
			condition: (submission) =>
				!submission.conditionHasLumps &&
				!submission.conditionHasDischarge &&
				submission.hasImplants,
		},
		{
			handle: "checkTravel",
			condition: (submission) =>
				!submission.conditionHasLumps &&
				!submission.conditionHasDischarge &&
				!submission.hasImplants,
		},
	],
	heading: <ScreenHeading />,
	content: <Content />,
};

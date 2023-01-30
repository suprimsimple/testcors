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
  const [global, dispatch] = useContext(GlobalContext)
  useEffect(() => {
		global.submission.screen = 22;
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
              Are you planning to have breast surgery in the next 2 months?
            <span>*</span>
          </Heading>
        </HeadingLevel>
        <ParagraphSmall>
             If we find an area of concern on your screening mammogram, we may need to recall you for further tests. It is important that you are available for this in the weeks following your breast screen appointment.
        </ParagraphSmall>
        <FormControl>
          <RadioGroup
            value={global.submission.surgeryNextTwoMonth}
            onChange={e =>
              updateSubmission(`surgeryNextTwoMonth`, e.target.value)
            }
            name="surgeryNextTwoMonth"
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
  handle: "planningSurgery",
  to: [
    {
      handle: "failPlanningSurgery",
      condition: submission => {
        return submission.surgeryNextTwoMonth === 'yes';
      }
    },
    {
      handle: "checkBreastProblems",
      condition: submission => {
        return submission.surgeryNextTwoMonth !== 'yes';
      }
    },
  ],
  heading: <ScreenHeading />,
  content: <Content />,
}

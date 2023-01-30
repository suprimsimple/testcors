import { ParagraphMedium } from "baseui/typography"
import { useContext, useEffect } from "react"
import { GlobalContext } from "../../context/global"
import { SectionHeading, SectionContent, FormGroup } from "../shared"
import { FormControl } from "baseui/form-control"
import { RadioGroup, Radio } from "baseui/radio"
import { HeadingLevel, Heading } from "baseui/heading"

const ScreenHeading = () => {
  return <SectionHeading withGoBack></SectionHeading>
}
const Content = () => {
  const [global, dispatch] = useContext(GlobalContext);
  useEffect(() => {
		global.submission.screen = 27;
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
              What colour is the discharge?
            </Heading>
        </HeadingLevel>
        <FormControl>
          <RadioGroup
            value={global.submission.dischargeColour}
            onChange={e =>
              updateSubmission(`dischargeColour`, e.target.value)
            }
            name="dischargeColour"
          >
            <Radio value="green">Green</Radio>
            <Radio value="white">White (milky)</Radio>
            <Radio value="yellow">Yellow</Radio>
            <Radio value="red">Red</Radio>
            <Radio value="brown">Brown</Radio>
            <Radio value="black">Black (blood stained)</Radio>
            <Radio value="clear">Clear</Radio>
          </RadioGroup>
        </FormControl>
      </FormGroup>
    </SectionContent>
  )
}
export const config =
{
  handle: "breastDischarge",
  to: [
    {
      handle: "failBreastDischarge",
      condition: submission => ['red','brown','black','clear'].find(c => c === submission.dischargeColour)
    },
    {
      handle: "breastChanges",
      condition: submission => ['green','white','yellow'].find(c => c === submission.dischargeColour)
    },
  ],
  heading: <ScreenHeading />,
  content: <Content />,
};
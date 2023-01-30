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
		global.submission.screen = 31;
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
            What type of breast implants do you have?
              <span>*</span>
            </Heading>
        </HeadingLevel>
        <FormControl>
          <RadioGroup
            value={global.submission.implantsType}
            onChange={e => updateSubmission(`implantsType`, e.target.value)}
            name="implantsType"
          >
            <Radio value="saline">Saline</Radio>
            <Radio value="silicone">Silicone</Radio>
            <Radio value="silicone">Unsure</Radio>
          </RadioGroup>
        </FormControl>
      </FormGroup>

      {global.submission.implantsType === "silicone" ? (
        <FormGroup>
          <HeadingLevel>
            <Heading styleLevel={3}>
              What type of silicone implants do you have?
              <span>*</span>
            </Heading>
        </HeadingLevel>
          <FormControl>
            <RadioGroup
              value={global.submission.siliconImplantsType}
              onChange={e =>
                updateSubmission(`siliconImplantsType`, e.target.value)
              }
              name="siliconImplantsType"
            >
              <Radio value="single">A single implant in the breast</Radio>
              <Radio value="series">A series of silicone/macrolaine injections into the breast (injectable fillers)</Radio>
            </RadioGroup>
          </FormControl>
        </FormGroup>
      ) : null}
    </SectionContent>
  )
}

export const config = {
	handle: "breastImplantType",
	to: [
		{
			handle: "failBreastImplantType",
			condition: (submission) =>
				submission.implantsType === "silicon" &&
				submission.siliconImplantsType === "series",
		},
		{
			handle: "checkTravel",
			condition: (submission) =>
				!(
					submission.implantsType === "silicon" &&
					submission.siliconImplantsType === "series"
				),
		},
	],
	heading: <ScreenHeading />,
	content: <Content />,
};

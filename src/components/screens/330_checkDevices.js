import { HeadingLevel, Heading } from "baseui/heading"
import { ParagraphMedium, ParagraphSmall } from "baseui/typography"
import { useContext, useEffect, Fragment } from "react"
import { GlobalContext } from "../../context/global"
import { SectionHeading, SectionContent, FormGroup } from "../shared"
import { FormControl } from "baseui/form-control"
import { RadioGroup, Radio } from "baseui/radio"
import {Checkbox, STYLE_TYPE, LABEL_PLACEMENT} from 'baseui/checkbox';

const ScreenHeading = () => {
  return <SectionHeading withGoBack></SectionHeading>
}
const Content = () => {
  const [global, dispatch] = useContext(GlobalContext);
  useEffect(() => {
		global.submission.screen = 33;
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
            Do you have any of the following medical devices implanted in your upper body? 
            <span>*</span>
          </Heading>
          <ParagraphSmall>
            Please select all that apply
          </ParagraphSmall>
        </HeadingLevel>
        <FormControl>
          <Fragment>
            {
              [
                ["Defibrillator","defibrillator"],
                ["Heart valve","heartValve"],
                ["Loop recorder or monitor","loopRecorderOrMinitor"],
                ["Pacemaker","pacemaker"],
                ["Stent","stent"],
                ["Peripheral nerve stimulator (on any part of your upper body)","peripheralNerveStimulator"],
                ["Gastric banding port","gastricBandingPort"],
                ["Infusaport/porta-a-cath/smart port","infusaportOrPortaACathOrSmartPort"],
                ["Permacath/Hickman catheter","permacathHickmanCatheter"],
                ["PICC line (peripherally inserted central catheter)","piccLine"],
                ["VP (ventriculoperitoneal) shunt","vpShunt"],
                ["Deep brain stimulators","deepBrainStimulators"],
                ["Nipple piercing","nipplePiercing"],
                ["Sternal piercing","sternalPiercing"],
                ["Other","other"],
              ].map(i => <Checkbox
                checked={global.submission[`deviceDetails.${i[1]}`]}
                onChange={e =>
                  updateSubmission(`deviceDetails.${i[1]}`, e.target.checked)
                }
              >
                {i[0]}
              </Checkbox>)
            }
            
          </Fragment>
        </FormControl>
      </FormGroup>

    </SectionContent>
  )
}

const deviceFail = submission => {
  let check = false;
  [
    "peripheralNerveStimulator",
    "gastricBandingPort",
    "permacathHickmanCatheter",
    "deepBrainStimulators",
    "sternalPiercing",
    "other"
  ].map(i => check || submission[`deviceDetails.${i}`])
  return check;
}
export const config = {
	handle: "checkTravel",
	to: [
		{
			handle: "failDevices",
			condition: (submission) => deviceFail(submission),
		},
		{
			handle: "checkTravel",
			condition: (submission) => !deviceFail(submission),
		},
	],
	heading: <ScreenHeading />,
	content: <Content />,
};
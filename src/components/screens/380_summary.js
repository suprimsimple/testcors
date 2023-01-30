import { HeadingLevel, Heading } from "baseui/heading"
import { ParagraphMedium, ParagraphSmall } from "baseui/typography"
import { useContext, useState } from "react"
import { GlobalContext } from "../../context/global"
import { SectionHeading, SectionContent, FormGroup } from "../shared"
import { Input } from "baseui/input"
import { DatePicker } from "baseui/datepicker"
import { Checkbox } from "baseui/checkbox"
import au from "date-fns/locale/en-AU"
import { Fragment, useEffect } from "react"
import { FormControl } from "baseui/form-control"
import { RadioGroup, Radio, ALIGN } from "baseui/radio"
import {Select, SIZE, TYPE} from 'baseui/select';

const ScreenHeading = () => {
  return <SectionHeading withGoBack></SectionHeading>
}
const Content = () => {
  const [global, dispatch] = useContext(GlobalContext);
  useEffect(() => {
		global.submission.screen = 38;
	});
  const updateSubmission = (key, value) => {
    dispatch({ type: "UPDATE_SUBMISSION", payload: { [key]: value } })
  }
  const validationMessage = () => {
    return ""
  }
  const validate = () => {
    if (false) {
      return false
    }
    return true
  }

  return (
    <SectionContent
      withNextButton
      withValidation
      validate={validate}
      validationMessage={validationMessage}
    >
      <FormGroup>
        <ParagraphMedium>
          Thanks { global.submission.firstName } - We are almost done booking your appointment for
        </ParagraphMedium>
        <ParagraphMedium>
          4:10pm Wednesday 23 Feb 2021
        </ParagraphMedium>
        <ParagraphMedium>
          One final question:
        </ParagraphMedium>
      </FormGroup>

      <FormGroup>
      <HeadingLevel>
        <Heading styleLevel={3}>
              What prompted you to make your booking
              <span>*</span>
        </Heading>
        <ParagraphSmall>
          Please tick all that apply
        </ParagraphSmall>
      </HeadingLevel>
        <FormControl>
          <RadioGroup
            value={global.submission.willBringCarer}
            onChange={e => updateSubmission(`willBringCarer`, e.target.value)}
            name="willBringCarer"
          >
            <Radio value="no">No</Radio>
            <Radio value="yes">Yes</Radio>
          </RadioGroup>
        </FormControl>
      </FormGroup>


      
    </SectionContent>
  )
}

export const config =
{
  handle: "summary",
  to: [
    {
      handle: "bookingConfirmation",
      condition: submission => true
    }
  ],
  heading: <ScreenHeading />,
  content: <Content />,
};
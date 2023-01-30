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
		global.submission.screen = 36;
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
        <HeadingLevel>
            <Heading styleLevel={3}>
              Do you need us to book an interpreter for you?
              <span>*</span>
            </Heading>
            <ParagraphSmall>
            You are welcome to bring a family member or friend with you to translate if you prefer.
            </ParagraphSmall>
        </HeadingLevel>
        <FormControl>
          <RadioGroup
            value={global.submission.isInterpreterRequired}
            onChange={e => updateSubmission(`isInterpreterRequired`, e.target.value)}
            name="isInterpreterRequired"
          >
            <Radio value="no">No</Radio>
            <Radio value="yes">Yes</Radio>
          </RadioGroup>
        </FormControl>
      </FormGroup>


      {global.submission.isInterpreterRequired === 'yes' ? (
        <Fragment>
          <FormGroup>
              <HeadingLevel>
                <Heading styleLevel={3}>
                  Which language do you speak?
                </Heading>
            </HeadingLevel>
            <ParagraphMedium>
              Please select your preferred language. 
              
              As the selected date and time for your booking is within 48 hours. we may be unable to book an interpreter for you. Would you like to change your appointment date and time (Change date or time)?
            </ParagraphMedium>
          <FormControl>
          <Select
            options={[
              { label: "Italian", id: "italian" },
              { label: "Mandarin", id: "madarin" },
            ]}
            value={global.submission.preferredLanguage}
            placeholder="Select a language"
            onChange={params => updateSubmission('preferredLanguage', params.value)}
          />
        </FormControl>
          </FormGroup>
        </Fragment>
      ) : null}
    </SectionContent>
  )
}
export const config =
{
  handle: "checkIntepreter",
  to: [
    {
      handle: "checkCarer",
      condition: submission => true
    }
  ],
  heading: <ScreenHeading />,
  content: <Content />,
};
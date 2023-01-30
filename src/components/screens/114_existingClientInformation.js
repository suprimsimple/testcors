import { HeadingLevel, Heading } from "baseui/heading"
import { ParagraphMedium, ParagraphSmall } from "baseui/typography"
import { useContext, useState, useEffect } from "react"
import { GlobalContext } from "../../context/global"
import { SectionHeading, SectionContent, FormGroup } from "../shared"
import { Input } from "baseui/input"
import { DatePicker } from "baseui/datepicker"
import { Checkbox } from "baseui/checkbox"
import au from "date-fns/locale/en-AU"
import { Fragment } from "react"
import {Select, SIZE, TYPE} from 'baseui/select';

const ScreenHeading = () => {
  return <SectionHeading withGoBack></SectionHeading>
}
const Content = () => {
  const [global, dispatch] = useContext(GlobalContext);
  useEffect(() => {
		global.submission.screen = 11;
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
          Please enter your personal details below. This information will be used
          for future bookings and identifying your profile with BreastScreenSA.
        </ParagraphMedium>
      </FormGroup>

      <FormGroup>
				<HeadingLevel>
					<Heading styleLevel={3}>
						Title
						<span>*</span>
					</Heading>
				</HeadingLevel>
				<Select options={[
					{ label: "Mr", id: "mr" },
					{ label: "Mrs", id: "mrs" },
					{ label: "Miss", id: "miss" },
					{ label: "Ms", id: "ms" },
					{ label: "Dr", id: "dr" },
					]}
					value={global.submission.preferredTitle}
					placeholder="Select title"
					onChange={params => updateSubmission('preferredTitle', params.value)}
				/>
			</FormGroup>

      <FormGroup>
        <HeadingLevel>
          <Heading styleLevel={3}>
            First Name
            <span>*</span>
          </Heading>
        </HeadingLevel>
        <Input
          value={global.submission.firstName}
          onChange={e => updateSubmission(`firstName`, e.target.value)}
          required
        />
      </FormGroup>

      <FormGroup>
        <HeadingLevel>
          <Heading styleLevel={3}>
            Surname
            <span>*</span>
          </Heading>
        </HeadingLevel>
        <Input
          value={global.submission.surname}
          onChange={e => updateSubmission(`surname`, e.target.value)}
          required
        />
      </FormGroup>

      <FormGroup>
        <HeadingLevel>
          <Heading styleLevel={3}>
            Date of Birth
            <span>*</span>
          </Heading>
        </HeadingLevel>
        <DatePicker
          value={[global.submission.dob ? global.submission.dob : null]}
          locale={au}
          formatString={"d/M/yyyy"}
          placeholder="d/m/yyyy"
          mask={null}
          minDate={new Date("1929-10-17T07:00:00.000Z")}
          maxDate={new Date()}
          onChange={({ date }) => updateSubmission("dob", date)}
        />
      </FormGroup>

      <FormGroup>
        <HeadingLevel>
          <Heading styleLevel={3}>
            Email
            <span>*</span>
          </Heading>
        </HeadingLevel>
        <Input
          type="email"
          value={global.submission.email}
          onChange={e => updateSubmission(`email`, e.target.value)}
          required
        />
      </FormGroup>

      <FormGroup>
        <HeadingLevel>
          <Heading styleLevel={3}>
            Mobile
            <span>*</span>
          </Heading>
        </HeadingLevel>
        <Input
          type="phone"
          value={global.submission.mobile}
          onChange={e => updateSubmission(`mobile`, e.target.value)}
          required
        />
      </FormGroup>

      <FormGroup>
	  	<div style={{ marginTop: "0.5rem" }} className="space-y-4">
        <HeadingLevel>
          <Heading styleLevel={3}>
            Postal Address
            <span>*</span>
          </Heading>
        </HeadingLevel>
        <Input
          placeholder="Address Line 1"
          value={global.submission.postalAddress1}
          onChange={e => updateSubmission(`postalAddress1`, e.target.value)}
        />
        <Input
          placeholder="Address Line 2"
          value={global.submission.postalAddress2}
          onChange={e => updateSubmission(`postalAddress2`, e.target.value)}
        />
        <Input
          placeholder="Suburb"
          value={global.submission.postalSuburb}
          onChange={e => updateSubmission(`postalSuburb`, e.target.value)}
        />
        <Input
          placeholder="Postcode"
          value={global.submission.postalPostcode}
          onChange={e => updateSubmission(`postalPostcode`, e.target.value)}
        />
        <Input
          placeholder="State"
          value={global.submission.postalState}
          onChange={e => updateSubmission(`postalState`, e.target.value)}
        />
		</div>
      </FormGroup>

      <FormGroup>
        <HeadingLevel>
          <Heading styleLevel={3}>
            Residential Address
            <span>*</span>
          </Heading>
        </HeadingLevel>

        <Checkbox
          checked={ global.submission.postalAddressIsResidential }
          onChange={e => {
            updateSubmission("postalAddressIsResidential", e.target.checked)
          }}
        >
          Same as postal address
        </Checkbox>
      </FormGroup>
      { !global.submission.postalAddressIsResidential ? (
          <FormGroup>
            <Input
              placeholder="Address Line 1"
              value={global.submission.address1}
              onChange={e => updateSubmission(`address1`, e.target.value)}
            />
            <Input
              placeholder="Address Line 2"
              value={global.submission.address2}
              onChange={e => updateSubmission(`address2`, e.target.value)}
            />
            <Input
              placeholder="Suburb"
              value={global.submission.suburb}
              onChange={e => updateSubmission(`suburb`, e.target.value)}
            />
            <Input
              placeholder="Postcode"
              value={global.submission.postcode}
              onChange={e => updateSubmission(`postcode`, e.target.value)}
            />
            <Input
              placeholder="State"
              value={global.submission.state}
              onChange={e => updateSubmission(`state`, e.target.value)}
            />
          </FormGroup>
        ) : null}
    </SectionContent>
  )
}

export const config =
{
  handle: "existingClientInformation",
  to: [
    {
      handle: "addMedicare",
      condition: submission => true
    }
  ],
  heading: <ScreenHeading />,
  content: <Content />,
};
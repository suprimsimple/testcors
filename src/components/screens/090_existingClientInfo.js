import { HeadingLevel, Heading } from "baseui/heading";
import { ParagraphMedium, ParagraphSmall } from "baseui/typography";
import { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../../context/global";
import { SectionHeading, SectionContent, FormGroup } from "../shared";
import { Input } from "baseui/input";
import { DatePicker } from "baseui/datepicker";
import { Checkbox } from "baseui/checkbox";
import au from "date-fns/locale/en-AU";
import { Fragment } from "react";
import { Select, SIZE, TYPE } from "baseui/select";

const ScreenHeading = () => {
	return <SectionHeading withGoBack></SectionHeading>;
};
const Content = () => {
	const [global, dispatch] = useContext(GlobalContext);
	useEffect(() => {
		global.submission.screen = 9;
	});
	const updateSubmission = (key, value) => {
		dispatch({ type: "UPDATE_SUBMISSION", payload: { [key]: value } });
	};
	const validationMessage = () => {
		return "";
	};
	const validate = () => {
		if (false) {
			return false;
		}
		return true;
	};

	return (
		<SectionContent
			withNextButton
			withValidation
			validate={validate}
			validationMessage={validationMessage}
		>
			<FormGroup>
				<ParagraphMedium>
					Please enter your details below. This information will be
					used to find your profile at BreastScreen SA.
				</ParagraphMedium>
			</FormGroup>

			{/* <FormGroup>
				<HeadingLevel>
					<Heading styleLevel={3}>
						Title
						<span>*</span>
					</Heading>
				</HeadingLevel>
				<Select
					options={[
						{ label: "Mr", id: "mr" },
						{ label: "Mrs", id: "mrs" },
						{ label: "Miss", id: "miss" },
						{ label: "Ms", id: "ms" },
						{ label: "Dr", id: "dr" },
					]}
					value={global.submission.preferredTitle}
					placeholder="Select title"
					onChange={(params) =>
						updateSubmission("preferredTitle", params.value)
					}
				/>
			</FormGroup> */}

			<FormGroup>
				<HeadingLevel>
					<Heading styleLevel={3}>
						First name
						<span>*</span>
					</Heading>
				</HeadingLevel>
				<Input
					value={global.submission.firstName}
					onChange={(e) =>
						updateSubmission(`firstName`, e.target.value)
					}
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
					onChange={(e) =>
						updateSubmission(`surname`, e.target.value)
					}
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
					value={[
						global.submission.dob ? global.submission.dob : null,
					]}
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
						Enter your Email
						<span>*</span>
					</Heading>
					<ParagraphSmall>
						Please enter your email address used at your last
						appointment so we can find your profile
					</ParagraphSmall>
				</HeadingLevel>
				<Input
					value={global.submission.email}
					onChange={(e) => updateSubmission(`email`, e.target.value)}
					required
				/>
			</FormGroup>

			<FormGroup>
				<HeadingLevel>
					<Heading styleLevel={3}>
						Enter your mobile number
						<span>*</span>
					</Heading>
					<ParagraphSmall>
						Please enter mobile phone number used at your last
						appointment so we can find your profile
					</ParagraphSmall>
				</HeadingLevel>
				<Input
					value={global.submission.mobile}
					onChange={(e) => updateSubmission(`mobile`, e.target.value)}
					required
				/>
			</FormGroup>

			<FormGroup>
				<HeadingLevel>
					<Heading styleLevel={3}>
						BreastScreen SA Client ID
						<span>*</span>
					</Heading>
					<ParagraphSmall>
						Please enter your BreastScreen SA Client ID. This is
						located on the bottom right of your letter.
					</ParagraphSmall>
				</HeadingLevel>
				<Input
					value={global.submission.clientId}
					onChange={(e) =>
						updateSubmission(`clientId`, e.target.value)
					}
					required
				/>
			</FormGroup>
		</SectionContent>
	);
};
export const config = {
	handle: "existingClientInfo",
	to: [
		{
			handle: "failExistingClient",
			condition: (submission) => {
				return !submission.clientId;
			},
		},
		{
			handle: "existingClientVerification",
			condition: (submission) => {
				return submission.clientId;
			},
		},
	],
	heading: <ScreenHeading />,
	content: <Content />,
};

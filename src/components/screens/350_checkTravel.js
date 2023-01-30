import { HeadingLevel, Heading } from "baseui/heading";
import { ParagraphMedium, ParagraphSmall } from "baseui/typography";
import { useContext, useState } from "react";
import { GlobalContext } from "../../context/global";
import { SectionHeading, SectionContent, FormGroup } from "../shared";
import { Input } from "baseui/input";
import { DatePicker } from "baseui/datepicker";
import { Checkbox } from "baseui/checkbox";
import au from "date-fns/locale/en-AU";
import { Fragment, useEffect } from "react";
import { FormControl } from "baseui/form-control";
import { RadioGroup, Radio, ALIGN } from "baseui/radio";

const ScreenHeading = () => {
	return <SectionHeading withGoBack></SectionHeading>;
};
const Content = () => {
	const [global, dispatch] = useContext(GlobalContext);
	useEffect(() => {
		global.submission.screen = 35;
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
					Please answer the questions below to confirm your
					eligibility
				</ParagraphMedium>
			</FormGroup>

			<FormGroup>
				<HeadingLevel>
					<Heading styleLevel={3}>
						Are you planning to travel interstate in the next 4-6
						weeks?
						<span>*</span>
					</Heading>
				</HeadingLevel>
				<FormControl>
					<RadioGroup
						value={global.submission.planToTravel}
						onChange={(e) =>
							updateSubmission(`planToTravel`, e.target.value)
						}
						name="planToTravel"
					>
						<Radio value="no">No</Radio>
						<Radio value="yes">Yes</Radio>
					</RadioGroup>
				</FormControl>
			</FormGroup>

			{global.submission.planToTravel === "yes" && (
				<FormGroup>
					<HeadingLevel>
						<Heading styleLevel={3}>
							Are we able to reach you on these contact details
							<span>*</span>
						</Heading>
					</HeadingLevel>
					<FormControl
						caption={() => (
							<div>
								<HeadingLevel>
									<Heading styleLevel={3}>
										{global.submission.email && (
											<div>
												Email: {global.submission.email}
											</div>
										)}
										{global.submission.mobile && (
											<div>
												Phone:{" "}
												{global.submission.mobile}
											</div>
										)}
									</Heading>
								</HeadingLevel>
							</div>
						)}
					>
						<RadioGroup
							value={global.submission.isContactDetailsReachable}
							onChange={(e) =>
								updateSubmission(
									`isContactDetailsReachable`,
									e.target.value
								)
							}
							name="isContactDetailsReachable"
						>
							<Radio value="yes">Yes</Radio>
							<Radio value="no">No</Radio>
						</RadioGroup>
					</FormControl>
				</FormGroup>
			)}

			{global.submission.planToTravel === "yes" &&
				global.submission.isContactDetailsReachable === "no" && (
					<Fragment>
						<FormGroup>
							<HeadingLevel>
								<Heading>
									How should we contact you while you are
									away?
								</Heading>
							</HeadingLevel>
							<ParagraphSmall>
								Please provide alternate contact details for
								while you are away.
							</ParagraphSmall>

							<FormControl label={() => `Email`}>
								<Input
									type="email"
									value={global.submission.alternativeEmail}
									onChange={(e) =>
										updateSubmission(
											`alternativeEmail`,
											e.target.value
										)
									}
									required
								/>
							</FormControl>

							<FormControl label={() => `Mobile`}>
								<Input
									type="phone"
									value={global.submission.alternativeMobile}
									onChange={(e) =>
										updateSubmission(
											`alternativeMobile`,
											e.target.value
										)
									}
									required
								/>
							</FormControl>
						</FormGroup>
					</Fragment>
				)}
			{global.submission.planToTravel === "yes" && (
				<>
					<HeadingLevel>
						<Heading styleLevel={3}>
							Will you be able to return to Adelaide for further
							tests if needed?
							<span>*</span>
						</Heading>
					</HeadingLevel>
					<FormControl>
						<RadioGroup
							value={global.submission.availableForFollowUp}
							onChange={(e) =>
								updateSubmission(
									`availableForFollowUp`,
									e.target.value
								)
							}
							name="availableForFollowUp"
						>
							<Radio value="yes">Yes</Radio>
							<Radio value="no">No</Radio>
						</RadioGroup>
					</FormControl>
				</>
			)}
		</SectionContent>
	);
};

export const config = {
	handle: "checkTravel",
	to: [
		{
			handle: "checkIntepreter",
			condition: (submission) => true,
		},
	],
	heading: <ScreenHeading />,
	content: <Content />,
};

import { DatePicker } from "baseui/datepicker";
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { Radio, RadioGroup } from "baseui/radio";
import { HeadingLevel, Heading } from "baseui/heading";
import { ParagraphMedium, ParagraphSmall } from "baseui/typography";
import { Fragment, useContext, useEffect } from "react";
import { GlobalContext } from "../../context/global";
import { FormGroup, SectionContent, SectionHeading } from "../shared";
import au from "date-fns/locale/en-AU";
import Moment from 'react-moment';

const ScreenHeading = () => {
	return <SectionHeading withGoBack></SectionHeading>;
};
const Content = () => {
	const [global, dispatch] = useContext(GlobalContext);
	useEffect(() => {
		global.submission.screen = 20;
	});
	const updateSubmission = (key, value) => {
		dispatch({ type: "UPDATE_SUBMISSION", payload: { [key]: value } });
	};

	const lastMammogramDate = new Date();
	lastMammogramDate.setMonth(new Date().getMonth() - 10);
	const isExistingClient = Math.random() < 1;
	return (
		<SectionContent withNextButton>
			<FormGroup>
				<ParagraphMedium>
					Please answer the questions below to confirm your
					eligibility.
				</ParagraphMedium>
			</FormGroup>
			<FormGroup>
				<HeadingLevel>
					<Heading styleLevel={3}>
					{global.submission.hasBookedBefore ? (
                            <>
                                Have you had a mammogram since you last attended
                                BreastScreen SA on{" "}
                                <Moment format="DD MMM YYYY">
                                    {lastMammogramDate.toLocaleDateString(
                                        "en-US"
                                    )}
                                </Moment>
                            </>
                        ) : (
                            "Have you had mammogram previously"
                        )}

						<span>*</span>
					</Heading>
				</HeadingLevel>
				{/* <ParagraphSmall>
					Have you had mammogram previously
				</ParagraphSmall> */}
				<FormControl>
					<RadioGroup
						value={global.submission.hasMammogramNotInRecord}
						onChange={(e) =>
							updateSubmission(
								`hasMammogramNotInRecord`,
								e.target.value
							)
						}
						name="hasMammogramNotInRecord"
					>
						<Radio value="yes">Yes</Radio>
						<Radio value="no">No</Radio>
					</RadioGroup>
				</FormControl>
			</FormGroup>
			{global.submission.hasMammogramNotInRecord === "yes" ? (
				<Fragment>
					<FormGroup>
						<HeadingLevel>
							<Heading styleLevel={3}>
							Where did you have the mammogram? Please enter the provider name e.g. Radiology SA, Benson Radiology, Dr Jones & Partners Medical Imaging
							</Heading>
						</HeadingLevel>
						<ParagraphSmall>
							For example: Bensons, Jones and Partners, Radiology
							SA, Etc
						</ParagraphSmall>
						<FormControl>
							<Input
								value={
									global.lastMammogramNotInRecordProviderName
								}
								onChange={(e) =>
									updateSubmission(
										`lastMammogramNotInRecordProviderName`,
										e.target.value
									)
								}
							/>
						</FormControl>
					</FormGroup>
					<FormGroup>
						<FormControl
							label={() => `When was the mammogram taken?`}
						>
							<DatePicker
								value={[
									global.submission
										.lastMammogramNotInRecordDate
										? global.submission
												.lastMammogramNotInRecordDate
										: null,
								]}
								locale={au}
								formatString={"dd/mm/yyyy"}
								placeholder="dd/mm/yyyy"
								mask={null}
								maxDate={new Date()}
								onChange={({ date }) =>
									updateSubmission(
										"lastMammogramNotInRecordDate",
										date
									)
								}
							/>
						</FormControl>
					</FormGroup>
					<FormGroup>
						<FormControl
							label={() =>
								`Do you give permission for BreastScreen SA to obtain a copy of your previous mammogram images for your ongoing care?`
							}
						>
							<RadioGroup
								value={
									global.submission
										.lastMammogramNotInRecordConsent
								}
								onChange={(e) =>
									updateSubmission(
										`lastMammogramNotInRecordConsent`,
										e.target.value
									)
								}
								name="lastMammogramNotInRecordConsent"
							>
								<Radio value="yes">Yes</Radio>
								<Radio value="no">No</Radio>
							</RadioGroup>
						</FormControl>
					</FormGroup>
				</Fragment>
			) : null}
		</SectionContent>
	);
};

const isFailMammogram = (submission) => {
	if (submission.hasMammogramNotInRecord === "yes") {
		let nineMonthAgo = new Date();
		nineMonthAgo.setMonth(new Date().getMonth() - 9);
		if (
			submission.lastMammogramNotInRecordDate.toISOString() >
			nineMonthAgo.toISOString()
		) {
			return true;
		}
	}
	return false;
};
export const config = {
	handle: "mammogramExistingClient",
	to: [
		{
			handle: `planningSurgery`,
			condition: (submission) => !isFailMammogram(submission),
		},
		{
			handle: `failMammogram`,
			condition: isFailMammogram,
		},
	],
	heading: <ScreenHeading />,
	content: <Content />,
};

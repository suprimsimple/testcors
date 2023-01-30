import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/global";
import { SectionHeading, SectionContent, FormGroup } from "../shared";
import { Input } from "baseui/input";
import { Heading, HeadingLevel } from "baseui/heading";
import { ParagraphSmall } from "baseui/typography";
import SlotSelector from "../SlotSelector";

const ScreenHeading = () => {
	return <SectionHeading withGoBack></SectionHeading>;
};
const Content = () => {
	const [global, dispatch] = useContext(GlobalContext);
	useEffect(() => {
		global.submission.screen = 3;
	});
	const [error, setError] = useState(null);
	const [clinics, setClinics] = useState();
	const updateSubmission = (key, value) => {
		dispatch({ type: "UPDATE_SUBMISSION", payload: { [key]: value } });
	};
	const validationMessage = () => {
		return "";
	};
	const validate = () => {
		return true;
	};

	useEffect(() => {
		fetch(
			`https://www.breastscreen.sa.gov.au/actions/simple/booking/clinic?id=1`
		)
			.then((data) => data.json())
			.then(
				(result) => {
					setClinics(result);
				},
				// Note: it's important to handle errors here
				// instead of a catch() block so that we don't swallow
				// exceptions from actual bugs in components.
				(error) => {
					setError(error);
				}
			);
	}, []);

	const clinicsList = [
		{
			id: 1,
			name: "Hyde Park Clinic",
			address: "292-294 Unley Road, Hyde Park",
		},
		{
			id: 2,
			name: "Adelaide Clinic",
			address: "100 Rundle Mall, Adelaide",
		},
		{
			id: 3,
			name: "Alva Clinic",
			address: "333 Test Road, Edwardstown",
		},
	];

	return (
		<SectionContent
			withNextButton
			withValidation
			validate={validate}
			validationMessage={validationMessage}
		>
			<section style={{ textAlign: "center" }}>
				<HeadingLevel>
					<Heading styleLevel={1}>Your Closest Locations</Heading>
					<ParagraphSmall>
						Select a location to see available times
					</ParagraphSmall>
				</HeadingLevel>
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						flexDirection: "row",
						gap: "0.5rem",
						flexWrap: "wrap",
						maxWidth: "628px",
						width: "100%",
						margin: "2rem auto",
					}}
				>
					{clinicsList.map((clinic) => (
						<a
							href={`#clinic-${clinic.id}`}
							key={clinic.id}
							style={{
								padding: "10px 16px",
								border: "1px solid #63313C",
								borderRadius: "999px",
								color: "#63313C",
								background: "transparent",
								cursor: "pointer",
								textDecoration: "none",
							}}
						>
							{clinic.name}
						</a>
					))}
				</div>
			</section>
			<FormGroup>
				{clinicsList?.map((clinic) => (
					<SlotSelector
						key={clinic.id}
						clinicName={clinic.name}
						clinicAddress={clinic.address}
						clinicId={clinic.id}
					></SlotSelector>
				))}
			</FormGroup>
			<FormGroup>
				<HeadingLevel>
					<Heading styleLevel={3}>
						Clinic ID
						<span>*</span>
					</Heading>
				</HeadingLevel>
				<Input
					value="1"
					onChange={(e) =>
						updateSubmission("clinicId", e.target.value)
					}
				/>
			</FormGroup>
			<FormGroup>
				<HeadingLevel>
					<Heading styleLevel={3}>
						Slot ID
						<span>*</span>
					</Heading>
				</HeadingLevel>
				<Input
					value="2"
					onChange={(e) => updateSubmission("slotID", e.target.value)}
				/>
			</FormGroup>
		</SectionContent>
	);
};

export const config = {
	handle: "slotSelectionClinicsDatesTimes",
	to: [
		{
			handle: "checkPreviousBooking",
			condition: (submission) => {
				return true;
			},
		},
	],
	heading: <ScreenHeading />,
	content: <Content />,
};

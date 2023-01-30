import React, { useReducer } from "react";
import { config as BasicInfoScreenConfig } from "../components/screens/BasicInfo";
import { config as ExtraInfo1ScreenConfig } from "../components/screens/ExtraInfo1";
import { config as ExtraInfo2ScreenConfig } from "../components/screens/ExtraInfo2";
import { config as SuccessScreenConfig } from "../components/screens/Success";
import { config as NotEligibleScreenConfig } from "../components/screens/NotEligible";

import { config as slotSelectionLocationDateMovement } from "../components/screens/010_slotSelectionLocationDateMovement.js";
import { config as failMovement } from "../components/screens/020_failMovement.js";
import { config as slotSelectionClinicsDatesTimes } from "../components/screens/030_slotSelectionClinicsDatesTimes.js";
import { config as checkPreviousBooking } from "../components/screens/040_checkPreviousBooking.js";
import { config as newClientGender } from "../components/screens/050_newClientGender.js";
import { config as failGender } from "../components/screens/060_failGender.js";
import { config as newClientInformation } from "../components/screens/070_newClientInformation.js";
import { config as newClientVerification } from "../components/screens/080_newClientVerification.js";
import { config as existingClientInfo } from "../components/screens/090_existingClientInfo.js";
import { config as failExistingClient } from "../components/screens/100_failExistingClient.js";
import { config as existingClientVerification } from "../components/screens/110_existingClientVerification.js";
import { config as existingClientInformation } from "../components/screens/114_existingClientInformation.js";
import { config as addMedicare } from "../components/screens/120_addMedicare.js";
import { config as confirmMedicare } from "../components/screens/130_confirmMedicare.js";
import { config as residencyType } from "../components/screens/140_residencyType.js";
import { config as failNonResident } from "../components/screens/150_failNonResident.js";
import { config as residencyConfirmEvidence } from "../components/screens/160_residencyConfirmEvidence.js";
import { config as failResidencyEvidence } from "../components/screens/170_failResidencyEvidence.js";
import { config as checkPreviousBreastCancer } from "../components/screens/180_checkPreviousBreastCancer.js";
import { config as failPreviousBreastCancer } from "../components/screens/190_failPreviousBreastCancer.js";
import { config as mammogramExistingClient } from "../components/screens/200_mammogramExistingClient.js";
import { config as mammogramNewClient } from "../components/screens/210_mammogramNewClient.js";
import { config as failMammogram } from "../components/screens/215_failMammogram";
import { config as planningSurgery } from "../components/screens/220_planningSurgery.js";
import { config as failPlanningSurgery } from "../components/screens/230_failPlanningSurgery.js";
import { config as checkBreastProblems } from "../components/screens/240_checkBreastProblems.js";
import { config as breastLumps } from "../components/screens/250_breastLumps.js";
import { config as failBreastLumps } from "../components/screens/260_failBreastLumps.js";
import { config as breastDischarge } from "../components/screens/270_breastDischarge.js";
import { config as failBreastDischarge } from "../components/screens/280_failBreastDischarge.js";
import { config as breastChanges } from "../components/screens/290_breastChanges.js";
import { config as failBreastChanges } from "../components/screens/300_failBreastChanges.js";
import { config as breastImplantType } from "../components/screens/310_breastImplantType.js";
import { config as failBreastImplantType } from "../components/screens/320_failBreastImplantType.js";
// import { config as checkDevices } from "../components/screens/330_checkDevices.js";
import { config as failDevices } from "../components/screens/340_failDevices.js";
import { config as checkTravel } from "../components/screens/350_checkTravel.js";
import { config as checkIntepreter } from "../components/screens/360_checkIntepreter.js";
import { config as checkCarer } from "../components/screens/370_checkCarer.js";
import { config as summary } from "../components/screens/380_summary.js";
import { config as editSlot } from "../components/screens/390_editSlot.js";
import { config as bookingConfirmation } from "../components/screens/400_bookingConfirmation.js";

const count = 0;
let tmrDate = new Date();
tmrDate.setDate(new Date().getDate() + 1);
const submission = {
	screen: 1,
	suburbOrPostCode: "",
	preferredDate: tmrDate,
	hasImplants: false,
	hasMobilityRestrictions: false,
	"hasMobilityRestrictions.wheelchairWithRemovableArms": false,
	"hasMobilityRestrictions.wheelchairWithoutRemovableArms": false,
	"hasMobilityRestrictions.withWalkingFrame": false,
	"hasMobilityRestrictions.withArmsDifficulty": false,
	"hasMobilityRestrictions.withDifficultyKeepStill": false,
	"hasMobilityRestrictions.withNeedForChair": false,
	hasBookedBefore: null,
	gender: null,
	postalAddressIsResidential: true,
	firstName: "",
	surname: "",
	dob: null,
	email: "",
	mobile: "",
	postalAddress1: "",
	postalAddress2: "",
	postalSuburb: "",
	postalPostcode: "",
	postalState: "",
	address1: "",
	address2: "",
	suburb: "",
	postcode: "",
	state: "",
	verificationCode: ["", "", "", ""],
	emailOrMobile: "",
	clientId: "",
	hasMedicareCard: null,
	medicareNumber: "",
	medicareExpiry: "",
	medicareReference: "",
	residencyType: null,
	provideResidencyDocument: null,
	breastCancerInThePast: null,
	hasMammogramNotInRecord: null,
	lastMammogramNotInRecordProviderName: "",
	lastMammogramNotInRecordDate: null,
	lastMammogramNotInRecordConsent: null,
	surgeryNextTwoMonth: null,
	conditionHasLumps: false,
	conditionHasDischarge: false,
	conditionHasOther: false,
	lumpDetails: null,
	dischargeColour: null,
	hasNoticeOtherBreastChange: null,
	implantsType: null,
	siliconImplantsType: null,
	"deviceDetails.defibrillator": false,
	"deviceDetails.heartValve": false,
	"deviceDetails.loopRecorderOrMinitor": false,
	"deviceDetails.pacemaker": false,
	"deviceDetails.stent": false,
	"deviceDetails.peripheralNerveStimulator": false,
	"deviceDetails.gastricBandingPort": false,
	"deviceDetails.infusaportOrPortaACathOrSmartPort": false,
	"deviceDetails.permacathHickmanCatheter": false,
	"deviceDetails.piccLine": false,
	"deviceDetails.vpShunt": false,
	"deviceDetails.deepBrainStimulators": false,
	"deviceDetails.nipplePiercing": false,
	"deviceDetails.sternalPiercing": false,
	"deviceDetails.other": false,
	planToTravel: null,
	isContactDetailsReachable: null,
	alternativeEmail: "",
	alternativeMobile: "",
	availableForFollowUp: null,
	isInterpreterRequired: null,
	preferredLanguage: null,
	preferredTitle: null,
	willBringCarer: null,
	selectedDate:null,
	selectedClinic:null,
};

const screens = [
	slotSelectionLocationDateMovement,
	failMovement,
	slotSelectionClinicsDatesTimes,
	checkPreviousBooking,
	newClientGender,
	failGender,
	newClientInformation,
	newClientVerification,
	existingClientInfo,
	failExistingClient,
	existingClientVerification,
	existingClientInformation,
	addMedicare,
	confirmMedicare,
	residencyType,
	failNonResident,
	residencyConfirmEvidence,
	failResidencyEvidence,
	checkPreviousBreastCancer,
	failPreviousBreastCancer,
	mammogramExistingClient,
	mammogramNewClient,
	failMammogram,
	planningSurgery,
	failPlanningSurgery,
	checkBreastProblems,
	breastLumps,
	failBreastLumps,
	breastDischarge,
	failBreastDischarge,
	breastChanges,
	failBreastChanges,
	breastImplantType,
	failBreastImplantType,
	// checkDevices,
	failDevices,
	checkTravel,
	checkIntepreter,
	checkCarer,
	summary,
	editSlot,
	bookingConfirmation,
];

// const activeScreen =  failMovement;
const activeScreen = slotSelectionLocationDateMovement;
const screenHistory = [];

const initialState = {
	screenHistory,
	activeScreen,
	screens,
	count,
	submission,
};

const reducer = (state, action) => {
	console.log(action.type);
	let payload = action.payload || {};
	switch (action.type) {
		case "INCREASE_COUNT":
			return {
				...state,
				...{
					count: state.count + 1,
				},
			};
		case "UPDATE_SUBMISSION":
			return {
				...state,
				...{
					submission: { ...state.submission, ...payload },
				},
			};
		case "NEXT_SCREEN":
			let nextScreenHandle;
			for (let to of state.activeScreen.to) {
				if (to.condition(state.submission)) {
					nextScreenHandle = to.handle;
				}
			}
			let nextScreen = state.screens.find(
				(s) => s.handle === nextScreenHandle
			);
			return {
				...state,
				...{
					screenHistory: [...state.screenHistory, state.activeScreen],
					activeScreen: nextScreen,
				},
			};
		case "LAST_SCREEN":
			return {
				...state,
				...{
					screenHistory: state.screenHistory.slice(
						0,
						state.screenHistory.length - 1
					),
					activeScreen:
						state.screenHistory[state.screenHistory.length - 1],
				},
			};
		default:
			return state;
	}
};

export const GlobalContext = React.createContext([initialState, reducer]);

export const GlobalProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	return (
		<GlobalContext.Provider value={[state, dispatch]}>
			{children}
		</GlobalContext.Provider>
	);
};

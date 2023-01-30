import { useContext, useEffect } from "react";
import { GlobalContext } from "../../context/global";
import { SectionHeading, SectionContent, FormGroup } from "../shared";

const ScreenHeading = () => {
	return <SectionHeading>editSlot</SectionHeading>;
};
const Content = () => {
	const [global, dispatch] = useContext(GlobalContext);
	useEffect(() => {
		global.submission.screen = 39;
	});
	return (
		<SectionContent>
			<FormGroup>Form group</FormGroup>
		</SectionContent>
	);
};

export const config = {
	handle: "editSlot",
	to: [],
	heading: <ScreenHeading />,
	content: <Content />,
};

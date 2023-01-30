import { HeadingLevel, Heading } from "baseui/heading";
import { RadioGroup, Radio } from "baseui/radio";
import { useContext, useEffect } from "react";
import { GlobalContext } from "../../context/global";
import { SectionHeading, SectionContent, FormGroup } from "../shared";



const ScreenHeading = () => {
  return (<SectionHeading withGoBack>newClientGender</SectionHeading>)
}
const Content = () => {
  const [global, dispatch] = useContext(GlobalContext)
	useEffect(() => {
		global.submission.screen = 5;
	});
  const updateSubmission = (key, value) => {
    dispatch({ type: "UPDATE_SUBMISSION", payload: { [key]: value } })
  }
  
  return (<SectionContent withNextButton>
    <FormGroup>
        <HeadingLevel>
          <Heading styleLevel={3}>
            What is your gender?
            <span>*</span>
          </Heading>
        </HeadingLevel>
        <RadioGroup
          value={global.submission.gender?global.submission.gender:null}
          onChange={e => updateSubmission(`gender`, e.target.value)}
          name="gender"
        >
          <Radio value="female">Female</Radio>
          <Radio value="male">Male</Radio>
          <Radio value="other">Other</Radio>
        </RadioGroup>
      </FormGroup>
  </SectionContent>)
}

export const config =
{
  handle: "newClientGender",
  to: [
    {
      handle: "failGender",
      condition: (submission) => {
        return submission.gender !== 'female';
      }
    },
    {
      handle: "newClientInformation",
      condition: (submission) => {
        return submission.gender === 'female';
      }
    }
  ],
  heading: <ScreenHeading />,
  content: <Content />,
};
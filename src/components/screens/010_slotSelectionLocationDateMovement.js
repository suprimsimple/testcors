import { BaseInput, Input } from "baseui/input";
import { Button } from "baseui/button";
import { debounce } from "lodash";
import { useContext, Fragment, useState, useEffect, forwardRef } from "react";
import { GlobalContext } from "../../context/global";
import { SectionHeading, SectionContent, FormGroup } from "../shared";
import { Heading, HeadingLevel } from "baseui/heading";
import { ParagraphMedium, ParagraphSmall } from "baseui/typography";
import { DatePicker } from "baseui/datepicker";
import { Checkbox, STYLE_TYPE, LABEL_PLACEMENT } from "baseui/checkbox";
import { FormControl } from "baseui/form-control";
import au from "date-fns/locale/en-AU";
import { CONSTANTS } from "../../constants/constants";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import { searchSuburbsOrPostCode } from "../../core/services/api";
const ScreenHeading = () => {
  return <SectionHeading></SectionHeading>;
};

const Content = () => {
  const [global, dispatch] = useContext(GlobalContext);
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);
  useEffect(() => {
    global.submission.screen = 1;
  });
  const updateSubmission = (key, value) => {
    dispatch({ type: "UPDATE_SUBMISSION", payload: { [key]: value } });
  };
  const [errorMessage, setErrorMessage] = useState("");
  const validate = () => {
    if (!global.submission.suburbOrPostCode) {
      setErrorMessage("Suburb or postcode is required");
      return false;
    }
    return true;
  };
  const handleSubmit = () => {
    if (validate()) {
      dispatch({ type: "NEXT_SCREEN" });
    }
  };

  // Check Devices
  const [cDevices, setCDevices] = useState(
    global.submission.hasDeviceImplanted || false
  );

  const ForwardedInput = forwardRef(function ForwardedInput(props, ref) {
    return <BaseInput {...props} inputRef={ref} />;
  });

  const handleSearch = debounce(async (query) => {
    setIsLoading(true);
    const data = await searchSuburbsOrPostCode(query);
    setOptions(data);
    setIsLoading(false);
  }, 350);

  return (
    <section style={{ maxWidth: "436px", margin: "0 auto" }}>
      <SectionContent>
        <HeadingLevel>
          <Heading styleLevel={3}>
            Enter your suburb or postcode
            <span style={{ color: "#CF5D5D" }}>*</span>
          </Heading>
          <ParagraphSmall>
            Enter the suburb or postcode of where you would like to make your
            booking.
          </ParagraphSmall>
        </HeadingLevel>
        <FormGroup>
          <div style={{ paddingTop: "1rem" }}>
            <AsyncTypeahead
              id="location"
              minLength={2}
              options={options}
              isLoading={isLoading}
              onSearch={handleSearch}
              renderInput={({
                inputRef,
                referenceElementRef,
                ...inputProps
              }) => {
                return (
                  <Input
                    {...inputProps}
                    ref={(input) => {
                      inputRef(input);
                      referenceElementRef(input);
                    }}
                    required
                  />
                );
              }}
            ></AsyncTypeahead>
          </div>
        </FormGroup>
        <HeadingLevel>
          <Heading styleLevel={3}>
            What is your preferred booking date?
            <span style={{ color: "#CF5D5D" }}>*</span>
          </Heading>
          <ParagraphSmall>
            Use the calendar to select your preferred booking date.
          </ParagraphSmall>
        </HeadingLevel>
        <FormGroup>
          <div style={{ paddingTop: "1rem" }}>
            <DatePicker
              value={[
                global.submission.preferredDate
                  ? new Date(global.submission.preferredDate)
                  : new Date(),
              ]}
              locale={au}
              formatString={"d/M/yyyy"}
              placeholder="d/m/yyyy"
              minDate={new Date()}
              onChange={({ date }) => {
                window.localStorage.setItem("preferredDate", date);
                updateSubmission("preferredDate", date);
              }}
              overrides={{
                Input: {
                  props: {
                    overrides: {
                      Input: {
                        component: ForwardedInput,
                      },
                    },
                  },
                },
              }}
            />
          </div>
        </FormGroup>
        <HeadingLevel>
          <Heading styleLevel={3}>Do you have any of the following?</Heading>
        </HeadingLevel>
        <FormGroup>
          <div style={{ paddingTop: "1rem" }}>
            <div
              style={{
                padding: "0.5rem",
                borderRadius: "999px",
                background: "#ffffff",
                marginTop: "0.5rem",
              }}
            >
              <Checkbox
                checked={global.submission.hasImplants}
                onChange={(e) =>
                  updateSubmission("hasImplants", e.target.checked)
                }
              >
                Breast implants
              </Checkbox>
            </div>
            <div
              style={{
                padding: "0.5rem",
                borderRadius: "999px",
                background: "#ffffff",
                marginTop: "0.5rem",
              }}
            >
              <Checkbox
                checked={global.submission.hasMobilityRestrictions}
                onChange={(e) => {
                  if (e.target.checked === false) {
                    CONSTANTS.MOBILITY_RESTRICTION.forEach(({ key }) => {
                      updateSubmission(key, false);
                    });
                  }
                  updateSubmission("hasMobilityRestrictions", e.target.checked);
                }}
              >
                Mobility restrictions
              </Checkbox>
            </div>
            <div
              style={{
                padding: "0.5rem",
                borderRadius: "999px",
                background: "#ffffff",
                marginTop: "0.5rem",
              }}
            >
              <Checkbox
                checked={cDevices || global.submission.hasDeviceImplanted}
                onChange={(e) => {
                  setCDevices(!cDevices);
                  if (e.target.checked === false) {
                    CONSTANTS.DEVICES_IMPLANTS.forEach((i) => {
                      updateSubmission(`deviceDetails.${i[1]}`, false);
                    });
                  }
                  updateSubmission("hasDeviceImplanted", e.target.checked);
                }}
              >
                Medical devices implanted in your upper body
              </Checkbox>
            </div>
          </div>
        </FormGroup>
        {cDevices && (
          <FormGroup>
            <HeadingLevel>
              <Heading styleLevel={3}>
                Do you have any of the following medical devices implanted in
                your upper body?
                <span>*</span>
              </Heading>
              <ParagraphSmall>Please select all that apply</ParagraphSmall>
            </HeadingLevel>
            <FormControl>
              <Fragment>
                {CONSTANTS.DEVICES_IMPLANTS.map((i) => (
                  <Checkbox
                    key={i}
                    checked={global.submission[`deviceDetails.${i[1]}`]}
                    onChange={(e) =>
                      updateSubmission(
                        `deviceDetails.${i[1]}`,
                        e.target.checked
                      )
                    }
                  >
                    {i[0]}
                  </Checkbox>
                ))}
              </Fragment>
            </FormControl>
          </FormGroup>
        )}

        {global.submission.hasMobilityRestrictions && (
          <Fragment>
            <HeadingLevel>
              <Heading styleLevel={3}>
                How is your movement restricted?
                <span>*</span>
              </Heading>
            </HeadingLevel>
            <FormGroup>
              {CONSTANTS.MOBILITY_RESTRICTION.map(({ key, label }) => (
                <div
                  key={key}
                  style={{
                    padding: "0.5rem",
                    borderRadius: "24px",
                    background: "#ffffff",
                    marginTop: "0.5rem",
                  }}
                >
                  <Checkbox
                    checked={global.submission[key]}
                    onChange={(e) => updateSubmission(key, e.target.checked)}
                  >
                    {label}
                  </Checkbox>
                </div>
              ))}
            </FormGroup>
          </Fragment>
        )}
        <div
          hidden={errorMessage === ""}
          style={{
            marginTop: "16px",
            background: "white",
            padding: "16px 12px 8px",
            borderRadius: "20px",
          }}
        >
          <FormGroup>
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "12px",
              }}
            >
              <svg
                style={{ height: "20px" }}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#CF5D5D"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <div>
                <ParagraphSmall>We found an error in the form:</ParagraphSmall>
                <ParagraphMedium>{errorMessage}</ParagraphMedium>
              </div>
            </div>
          </FormGroup>
        </div>
        <FormGroup>
          <div className="btn">
            <Button onClick={handleSubmit}>Next</Button>
          </div>
        </FormGroup>
      </SectionContent>
    </section>
  );
};

export const config = {
  handle: "slotSelectionLocationDateMovement",
  to: [
    {
      handle: "failMovement",
      condition: (submission) => {
        return (
          !!submission[
            `hasMobilityRestrictions.wheelchairWithoutRemovableArms`
          ] ||
          !!submission[`hasMobilityRestrictions.withArmsDifficulty`] ||
          !!submission[`hasMobilityRestrictions.withDifficultyKeepStill`]
        );
      },
    },
    {
      handle: "slotSelectionClinicsDatesTimes",
      condition: (submission) => {
        return !(
          !!submission[
            `hasMobilityRestrictions.wheelchairWithoutRemovableArms`
          ] ||
          !!submission[`hasMobilityRestrictions.withArmsDifficulty`] ||
          !!submission[`hasMobilityRestrictions.withDifficultyKeepStill`]
        );
      },
    },
  ],
  heading: <ScreenHeading />,
  content: <Content />,
};

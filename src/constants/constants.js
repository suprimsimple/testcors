export const MOBILITY_RESTRICTION = [
  {
    label: "Use a wheelchair (with removable sides/drop down arms)",
    key: "hasMobilityRestrictions.wheelchairWithRemovableArms",
  },
  {
    label: "Use a wheelchair with non-removable sides",
    key: "hasMobilityRestrictions.wheelchairWithoutRemovableArms",
  },
  {
    label: "Use a walking frame or other mobility aid",
    key: "hasMobilityRestrictions.withWalkingFrame",
  },
  {
    label:
      "Have difficulty lifting your arms to shoulder height and away from your body",
    key: "hasMobilityRestrictions.withArmsDifficulty",
  },
  {
    label: "Have difficulty remaining still for several seconds",
    key: "hasMobilityRestrictions.withDifficultyKeepStill",
  },
  {
    label: "Need a chair to sit in during your mammogram",
    key: "hasMobilityRestrictions.withNeedForChair",
  },
];
export const DEVICES_IMPLANTS = [
  ["Defibrillator", "defibrillator"],
  ["Heart valve", "heartValve"],
  ["Loop recorder or monitor", "loopRecorderOrMinitor"],
  ["Pacemaker", "pacemaker"],
  ["Stent", "stent"],
  [
    "Peripheral nerve stimulator (on any part of your upper body)",
    "peripheralNerveStimulator",
  ],
  ["Gastric banding port", "gastricBandingPort"],
  ["Infusaport/porta-a-cath/smart port", "infusaportOrPortaACathOrSmartPort"],
  ["Permacath/Hickman catheter", "permacathHickmanCatheter"],
  ["PICC line (peripherally inserted central catheter)", "piccLine"],
  ["VP (ventriculoperitoneal) shunt", "vpShunt"],
  ["Deep brain stimulators", "deepBrainStimulators"],
  ["Nipple piercing", "nipplePiercing"],
  ["Sternal piercing", "sternalPiercing"],
  ["Other", "other"],
];

export const CLINICSLIST = [
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

export const CONSTANTS = {
  MOBILITY_RESTRICTION,
  DEVICES_IMPLANTS,
  CLINICSLIST,
};

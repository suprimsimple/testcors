const { faker } = require('@faker-js/faker');
const authUser = [
  "/user-auth", (req, res) => {
    res.json("User Auth!");
  }
]

const sendSMS = [
  "/send-sms", (req, res) => {
    res.json("Done!");
  }
]

const clinicInfo = [
  "/clinic", (req, res) => {
    const id = parseInt(req.param('id'));
    const clinics = [
      {
        id: 1,
        name: "Hyde Park Clinic",
        address: "292-294 Unley Road, Hyde Park"
      },
      {
        id: 2,
        name: "Adelaide Clinic",
        address: "100 Rundle Mall, Adelaide"
      },
      {
        id: 3,
        name: "Alva Clinic",
        address: "333 Test Road, Edwardstown"
      },
    ]
    res.json(clinics.find(i => i.id === id))
  }
]

const clinicAvailability = [
  "/clinic-availability", (req, res) => {
    const start = req.param("start");
    const end = req.param("end");
    const clinicId = req.param("clinicId");

    const numberOfSlots = faker.datatype.number({
      max: 40,
      min: 0,
    })

    const slots = faker.date.betweens(start, end, numberOfSlots).map(d => {
      const from = d;
      let to = (new Date(d));
      to.setMinutes((new Date(d)).getMinutes() + 7);
      to = to.toISOString();
      return {
        id: faker.datatype.number(),
        from,
        to
      }
    })

    res.json(slots);
  }
]

const apiConfig = [
  authUser,
  sendSMS,
  clinicInfo,
  clinicAvailability
]

module.exports = apiConfig;
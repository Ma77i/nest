module.exports = {
  mongoConfig: {
    HOSTNAME: process.env.HOSTNAME_DB,
    SCHEMA: "mongodb+srv",
    DATABASE: process.env.DATABASE,
    OPTIONS: "retryWrites=true&w=majority",
    USER: process.env.USER,
    PASSWORD: process.env.PWD_DB
  },
  mail: {
    GMAIL_ADDRESS: process.env.GMAIL_ADDRESS,
    GMAIL_PWD: process.env.GMAIL_PWD
  },
  twilio: {
    TWILIO_AUTH: process.env.TWILIO_AUTH,
    TWILIO_PHONE: process.env.TWILIO_PHONE,
    TWILIO_SID: process.env.TWILIO_SID
  }
};

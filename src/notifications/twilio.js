const twilio = require("twilio");
const config = require("../config");

class TwilioSender {
  constructor() {
    this.client = twilio(config.twilio.TWILIO_SID, config.twilio.TWILIO_AUTH);
  }

  async sendSms(phone, firstName, email) {
    this.client.messages
      .create({
        body: `Nuevo pedido de ${firstName}, ${email} realizado con exito`,
        from: config.twilio.TWILIO_PHONE,
        to: phone
      })
      .then((res) => console.log("respuesta sms:\n", res));
  }

  async sendWhatsapp(phone, firstName, email) {
    const response = await this.client.messages.create({
      body: `Nuevo pedido de ${firstName}, ${email} realizado con exito ${phone}`,
      mediaUrl: [
        "https://920459.smushcdn.com/2298792/wp-content/uploads/2018/06/gato-feliz.jpg?lossy=1&strip=1&webp=1"
      ],
      from: "whatsapp:+14155238886",
      to: "whatsapp:+59899063761"
    });

    console.log("RESPUESTA wpp:\n", response);
  }
}

module.exports = new TwilioSender();

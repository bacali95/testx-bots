const {Gmail} = require('@nan-team/testx-utils')

module.exports = {
  'report appointment possibility': async () => {
    const element = testx.element('corona-test.sorryText');

    browser.sleep(5000);

    const isSorryMessagePresent = await element.isPresent();
    if (isSorryMessagePresent) {
      console.log("Appointments not open yet!")
      return;
    }

    const gmail = new Gmail();
    await gmail.login({
      clientId: process.env.GMAIL_CLIENT_ID,
      clientSecret: process.env.GMAIL_CLIENT_SECRET,
    }, {
      access_token: process.env.GMAIL_ACCESS_TOKEN,
      refresh_token: process.env.GMAIL_REFRESH_TOKEN,
      expiry_date: process.env.GMAIL_EXPIRY_DATE,
      token_type: "Bearer",
    });
    console.log("Successfully logged in to Gmail.")

    const sender = process.env.GMAIL_SENDER;
    const receivers = process.env.GMAIL_RECEIVERS?.split(',') ?? [];
    const subject = "Corona Vaccination is available now for your age";
    const message = "Go quickly and make an appointment here https://coronatest.nl/ik-wil-me-laten-vaccineren/een-online-afspraak-maken.";

    for (const receiver of receivers) {
      const messages = await gmail.getMessages(`is:sent to:(${receiver}) subject:(${subject})`);

      if (messages?.length) {
        console.log(`Email already sent to "${receiver}"!`);
        continue;
      }

      await gmail.sendMessage(sender, receiver, subject, message);
      console.log(`Successfully notified "${receiver}".`)
    }
  }
}

module.exports = {
  englishBtn: {
    locator: 'xpath',
    value: '//button[@title="English"]'
  },
  startBtn: {
    locator: 'xpath',
    value: '//button[@title="start"]'
  },
  nextBtn: {
    locator: 'xpath',
    value: '//button[@title="Next"]'
  },
  yesChoice: {
    locator: 'xpath',
    value: '//label[contains(text(), "Yes") or contains(text(), "Ja")]'
  },
  noChoice: {
    locator: 'xpath',
    value: '//label[contains(text(), "No") or contains(text(), "Nee")]'
  },
  yearOfBirthInput: {
    locator: 'xpath',
    value: '//*[@id="year-of-birth"]'
  },
  sorryText: {
    locator: 'xpath',
    value: '//app-appointment-not-possible'
  }
}

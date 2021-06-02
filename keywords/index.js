const {element, By} = require('protractor');

module.exports = {
  'get attribute': async (args, context) => {
    const element = element(By.xpath(args.xpath));
    context.attribute = await element.getAttribute(args.attribute);
  },
  'click': async (key) => {
    const element = testx.element(key);
    (await element.wait()).click();
  },
};

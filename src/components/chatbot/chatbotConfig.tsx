//
// configData - for chatterbot
//

const chatbotConfigData = {
  debugMode: false,
  brandingTitle: 'ChatterBot',
  version: '1.0',

  getUsername: false,
  allowScoring: true,
  showScoring: true,
  sendStats: true,
  // TODO these items to build:
  // this shows a 'typing' animation and slight delay before user gets response back
  instantResponse: true,
  allowBadLanguage: true,

  // TODO - add support for these toggles
  easterEggs: true,
  allowLocation: true,
  allowJokes: true,
};

export default chatbotConfigData;

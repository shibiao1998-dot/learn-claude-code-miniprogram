// app.js
const i18n = require('./utils/i18n');
const storage = require('./utils/storage');
const gameSave = require('./utils/game-save');
const gameAchievement = require('./utils/game-achievement');

App({
  globalData: {
    locale: 'zh',
    theme: 'dark',
  },

  onLaunch() {
    // Load saved locale
    const savedLocale = storage.getLocale();
    if (savedLocale) {
      this.globalData.locale = savedLocale;
    }
    // Initialize i18n
    i18n.init(this.globalData.locale);

    // Initialize game save (creates default if first launch)
    gameSave.load();

    // Check achievements on launch (e.g., first_login)
    gameAchievement.checkAndUnlock();
  },

  setLocale(locale) {
    this.globalData.locale = locale;
    storage.setLocale(locale);
    i18n.setLocale(locale);
  },
});

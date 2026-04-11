// app.js
const i18n = require('./utils/i18n');
const storage = require('./utils/storage');

App({
  globalData: {
    locale: 'zh',    // 默认语言
    theme: 'dark',
  },

  onLaunch() {
    // 读取已保存的语言设置
    const savedLocale = storage.getLocale();
    if (savedLocale) {
      this.globalData.locale = savedLocale;
    }
    // 初始化 i18n
    i18n.init(this.globalData.locale);
  },

  setLocale(locale) {
    this.globalData.locale = locale;
    storage.setLocale(locale);
    i18n.setLocale(locale);
  },
});

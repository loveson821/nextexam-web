import i18n from 'i18n-js';

import {zh, en} from './translations';

export class TranslateService implements IService {
  private inited = false;

  init = async () => {
    if (!this.inited) {
      this.setup();

      this.inited = true;
    }
  };

  do = i18n.t;

  setup = (): void => {
    // const {ui} = stores;
    // const lng = Localization.locale;   
     
    i18n.translations = {en, zh};
    i18n.fallbacks = true;
    i18n.locale = 'zh';
    // if (ui.isSystemLanguage) {
    //   i18n.locale = lng;
    // } else {
    //   i18n.locale = ui.language;
    // }
  };
}

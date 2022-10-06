import React, { useState } from 'react';
import { Dropdown, DropdownProps } from 'semantic-ui-react';
import { DEFAULT_LANGUAGE, AVAILABLE_LANGUAGES } from '../../../../config';
import { i18n, useTranslation } from '../../../../i18n';
import { isLanguageSupported } from '../../../../utils/i18n';

export const LanguagePicker = () => {
  const [currentLanguage, setCurrentLanguage] = useState(DEFAULT_LANGUAGE);
  const { t } = useTranslation();

  const changeLanguage = (
    event: React.SyntheticEvent<HTMLElement, Event>,
    { value: lang }: DropdownProps,
  ) => {
    if (typeof lang === 'string' && isLanguageSupported(lang)) {
      setCurrentLanguage(lang);
      i18n.changeLanguage(lang);
    }
  };

  const getLanguageOptionsForDropdown = () =>
    AVAILABLE_LANGUAGES.map((language) => {
      const translatedLanguage = t(`languages:locales.${language}`);

      return {
        value: language,
        key: translatedLanguage,
        text: translatedLanguage,
      };
    });

  return (
    <Dropdown
      data-testid='language-picker-dropdown'
      button
      className='icon'
      floating
      icon='world'
      value={currentLanguage}
      onChange={changeLanguage}
      options={getLanguageOptionsForDropdown()}
      text={currentLanguage.toUpperCase()}
    />
  );
};

import { useContext } from 'react'
import { localeCtx } from '../context/LocaleCtx'

import strings from '../localization/locales/strings'
import { defaultLocale } from '../localization/config'

export default function useTranslation() {
    const { locale } = useContext(localeCtx);

    function t(key) {
        if (!strings[locale][key]) {
            console.warn(`Translation ${key} for locale ${locale} not found!`);
        }
        return strings[locale][key] || strings[defaultLocale][key] || key;
    }

    return {
        t,
        locale,
    };
}



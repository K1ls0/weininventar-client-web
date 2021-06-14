import { defaultLocale, locales } from './config';

export function isLocale(tested) {
    return locales.some((locale) => locale === tested);
}

export function getInitLocale() {
    const locSetting = localStorage.getItem('locale');
    if (locSetting && isLocale(locSetting)){
        return locSetting;
    }

    const [browserSetting] = navigator.language.split('-');
    if (isLocale(browserSetting)) {
        return browserSetting;
    }

    return defaultLocale;
}

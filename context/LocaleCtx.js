import React from 'react'

import { useRouter } from 'next/router';

export function isLocale(tested) {
    return locales.some((locale) => locale === tested);
}

export const LocaleCtx = React.createContext({
    locale: 'de',
    setLocale: () => null,
});

export const LocaleProvider = ({lang, children}) => {
    const [ locale, setLocale ] = React.useState(lang);
    const { query } = useRouter();

    React.useEffect(() => {
        if (locale !== localStorage.getItem('locale')) {
            localStorage.setItem('locale', locale);
        }
    }, [ locale ]);

    React.useEffect(() => {
        if (typeof query.lang === 'string' && isLocale(query.lang) && locale !== query.lang) {
            setLocale(query.lang);
        }
    }, [query.lang, locale]);

    return <LocaleCtx.Provider value={{locale, setLocale}}>
        {children}
        </LocaleCtx.Provider>
}

import React from 'react';
import { useRouter } from 'next/router';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { isLocale } from './initLocale.js';

import locales from './locales/strings';
//import defaults from './locales/de';

export const LangCtx = React.createContext({
    localization: {
        locale: 'de',
        translations: locales,
        namespace: 'common',
    },
    setLocale: () => null,
});

export function LangProvider({localization, children}) {
    console.warn('localization: ', localization);
    const [locState, setLocState] = React.useState(localization);

    const [ getStoredLocale, setStoredLocale ] = useLocalStorage('locale');
    const { query } = useRouter();

    React.useEffect(() => {
        if (locState && locState.locale !== getStoredLocale) {
            setStoredLocale(locState.locale);
        }
    }, [locState]);

    React.useEffect(() => {
        if (typeof query.lang === 'string' &&
            isLocale(query.lang) &&
            localization.locale !== query.lang) {

            setLocState(localization);
        }
    }, [query.lang, locState]);

    return (
        <LangCtx.Provider value={{localization, setLocale: setLocState}}>
            {children}
        </LangCtx.Provider>
    );
};

export function getLocalizationProps(ctx, namespace) {
    const lang = ctx.params.lang || 'de';
    const locale = locales[lang];
    const strings = locale[namespace];

    const translations = {
        common: locales[lang].common,
        ...strings,
    };

    return {
        locale: ctx.params.lang || 'de',
        translations,
        namespace,
    }
}

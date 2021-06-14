import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import {
    CssBaseline
} from '@material-ui/core'

import theme from '../src/theme';

// remove server-side-injected css

function MyApp({ Component, pageProps }) {

    React.useEffect( () => {
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) jssStyles.parentElement.removeChild(jssStyles);
    } , []);


    return <>
            <Head>
                <meta name="description" content="" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <Component {...pageProps} />
            </ThemeProvider>
        </>
}

MyApp.propTypes = {
    Component: PropTypes.elementType.isRequired,
    pageProps: PropTypes.object.isRequired,
}

export default MyApp



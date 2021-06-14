import React from 'react'
import Document, {
    Html,
    Head,
    Main,
    NextScript
} from 'next/document'
import { ServerStyleSheets } from '@material-ui/core/styles'

import theme from '../src/theme'

class Doc extends Document {

    render() {
        return (
            <Html lang="de">
                <Head>
                    <meta name="theme-color" content={theme.palette.primary.main} />
                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

Doc.getInitialProps = async function getInitialProps(ctx) {
        const sheets = new ServerStyleSheets();
        const originalRenderPage = ctx.renderPage;


        ctx.renderPage = () =>
            originalRenderPage({
                // eslint-disable-next-line react/jsx-props-no-spreading
                enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
            });

        const initProps = await Document.getInitialProps(ctx);

        return {
            ...initProps,
            styles: [
                ...React.Children.toArray(initProps.styles),
                sheets.getStyleElement()
            ],
        };
    }

export default Doc;


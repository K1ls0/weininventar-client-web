import { createMuiTheme } from '@material-ui/core/styles'

import { red } from '@material-ui/core/colors'

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#59191f',
        },
        secondary: {
            main: '#c39393',
        },
        error: {
            main: red.A400,
        },
        background: {
            main: '#444444',
        },
    },
})

export default theme

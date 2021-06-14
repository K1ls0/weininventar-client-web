import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'

import {
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Button,
    AppBar,
    Toolbar,
    Drawer,
    IconButton,
    Typography,
    Divider,
} from '@material-ui/core'

import MenuIcon from '@material-ui/icons/Menu'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import CreateIcon from '@material-ui/icons/Create';
import StorageIcon from '@material-ui/icons/Storage';
import ArchiveIcon from '@material-ui/icons/Archive';
import DashboardIcon from '@material-ui/icons/Dashboard';

import { getLocalizationProps, LangProvider } from '../src/localization/languageCtx';

//import Dashboard from '../src/components/app'
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },

    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },

    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        //width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(7) + 1,
        },
    },

    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    hide: {
        display: 'none',
    }
}));

export function Home({ localization }) {
    const [open, setOpen] = React.useState(false);

    const classes = useStyles();

    const handleDrawerOpen = () => setOpen(true);
    const handleDrawerClose = () => setOpen(false);

    return (
        <LangProvider localization={localization}>
            <div className={classes.root}>
                <AppBar
                    color="primary"
                    className={clsx(classes.appBar, {[classes.appBarShift]: open})}
                >
                    <Toolbar>
                        <IconButton 
                            onClick={handleDrawerOpen} 
                            position="fixed"
                            edge="start"
                            className={clsx(classes.menuButton, {
                                [classes.hide]: open,
                            })}
                            color="inherit"
                            aria-label="menu"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h5" className={classes.title}>Weininventar</Typography>
                        <IconButton edge="end" color="inherit" aria-label="menu">
                            <ExitToAppIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    color="secondary"
                    className={clsx(classes.drawer, {
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    })}
                    classes={{
                        paper: clsx({
                            [classes.drawerOpen]: open,
                            [classes.drawerClose]: !open,
                        }),
                    }}
                >
                    <div className={classes.toolbar}>
                        <IconButton
                            color="inherit"
                            aria-label="drawer-open"
                            onClick={handleDrawerClose}
                            edge="start"
                            className={clsx(
                                classes.menuButton,
                                {[classes.hide]: !open}
                            )}
                        >
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        <ListItem button key="dashboard">
                            <ListItemIcon><DashboardIcon/></ListItemIcon>
                            <ListItemText primary={'Übersicht'} />
                        </ListItem>
                        <ListItem button key="create-entry">
                            <ListItemIcon><CreateIcon/></ListItemIcon>
                            <ListItemText primary={'Neuer Eintrag'} />
                        </ListItem>
                        <ListItem button key="stock-all">
                            <ListItemIcon><StorageIcon/></ListItemIcon>
                            <ListItemText primary={'Gesamtbestand'} />
                        </ListItem>
                        <ListItem button key="archive">
                            <ListItemIcon><ArchiveIcon/></ListItemIcon>
                            <ListItemText primary={'Archiv'} />
                        </ListItem>
                    </List>
                </Drawer>
            </div>

            <Button color="primary">Hello World</Button>
        </LangProvider>
    )

}
export const GetStaticProps = async function(ctx) {
    const localization = getLocalizationProps(ctx, 'home');
    return {
        props: {
            localization
        }
    }
}

export const GetStaticPaths = async function() {
    return {
        paths: ['de'].map((l) => ({params: { l }})),
        fallback: false,
    }
}


export default Home;


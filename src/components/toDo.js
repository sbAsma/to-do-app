import React from 'react'
import { makeStyles } from "@material-ui/core";
import { 
	Grid, 
	Typography,
	Box,
    IconButton,
	
} from "@material-ui/core";
import Brightness3Icon from '@material-ui/icons/Brightness3';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
// import "./App.css";

const useStyles = makeStyles((theme) => ({
    root: {
		backgroundImage: theme.palette.background.bgDesktop,
		backgroundRepeat: "no-repeat",
		backgroundSize: "100% 270px",
        backgroundColor: theme.palette.background.default,
		height: "100vh",
        width: "100%",
		display: 'flex',
    },
	content: {
		backgroundColor: theme.palette.background.paper,
		height: "auto",
        width: "630px",
		display: 'flex',
		flexDirection: 'column',
		margin: '170px auto 130px auto',
	},
    title: {
		backgroundColor: "green",
		display: 'flex',
		flexDirection: 'row',
		width: '100%',
		height: '50px',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: 'auto',
	},
	titleText: {
		fontWeight: '700',
	},
	[theme.breakpoints.down('xs')]: {
		root: {
			backgroundImage: theme.palette.background.bgMobile,
		},
		content: {
			width: '80%',
		},
	},
	[theme.breakpoints.between('sm', 'md')]: {
		content: {
			width: '480px',
		},
	},
}));
export default function ToDo({theme, changeTheme}) {
    const classes = useStyles();
    return (
        <div  component="main" className={classes.root}>
            <Grid container className={classes.content}>
                <Box className={classes.title} xs={12} >
                    <Typography 
                        variant="h4"
                        component="h1"
                        className={classes.titleText}
                    >
                        To Do
                    </Typography>
                    <IconButton
                        onClick={() => changeTheme()}
                    >
                        {theme==='light'? <Brightness3Icon/> : <WbSunnyIcon/>}
                    </IconButton>
                </Box>
            </Grid>
        </div>
    )
}

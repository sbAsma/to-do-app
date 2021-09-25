import React from "react";
import { makeStyles } from "@material-ui/core";
import { ThemeProvider, createTheme } from '@material-ui/core/styles'
import { 
	Grid, 
	Typography,
	Box,
	
} from "@material-ui/core";
import Brightness3Icon from '@material-ui/icons/Brightness3';
import "./App.css";

const font =  "'Josefin Sans', sans-serif";
const theme = createTheme({
  typography: {
    fontFamily: font,
  },
});

const useStyles = makeStyles((theme) => ({
    root: {
		backgroundImage: "url(/images/bg-desktop-light.jpg)",
		backgroundRepeat: "no-repeat",
		backgroundSize: "100% 270px",
        backgroundColor: "hsl(0, 0%, 98%)",
		height: "100vh",
        width: "100%",
		display: 'flex',
    },
	content: {
		backgroundColor: "red",
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
			backgroundImage: "url(/images/bg-mobile-light.jpg)",
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

function App() {
    const classes = useStyles();
    return (
		<ThemeProvider theme={theme}>
        <div className="App">
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
						<Brightness3Icon/>
					</Box>
				</Grid>
			</div>
        </div>
		</ThemeProvider>
    );
}

export default App;

import React, {useState} from 'react'
import { makeStyles } from "@material-ui/core";
import { 
	Grid, 
	Typography,
	Box,
    IconButton,
    FormControlLabel,
    Checkbox,
    TextField,
} from "@material-ui/core";
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import DoneIcon from '@material-ui/icons/Done';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
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
		// backgroundColor: theme.palette.background.paper,
		height: "auto",
        width: "570px",
		display: 'flex',
		flexDirection: 'column',
		margin: '70px auto 130px auto',
	},
    title: {
		// backgroundColor: "green",
		display: 'flex',
		flexDirection: 'row',
		width: '100%',
		height: '50px',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: '25px',
	},
	titleText: {
		fontWeight: '700',
        color: "white",
        letterSpacing: "1.5rem",
	},
    inputTodo: {
        display: 'flex',
		flexDirection: 'row',
        alignItems: 'left',
        // justifyContent: 'space-between',
		marginBottom: '50px',
        borderRadius: '5px',
		width: '100%',
		height: '55px',
        backgroundColor: theme.palette.background.paper,
    },
    inputTodoText: {
        paddingTop: '5px',
        justifyContent: 'center',
        marginRight: '15px',
        marginLeft: '0',
    },
    inputTodoIcon: {
        width: '60px',
        justifyContent: 'center',
        margin: 'auto',
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
    const [todo, setTodo] = useState({
        text: '',
        checked: false,
    })
    const handleNewTodo = (e) =>{
        console.log(e.target.name)
        if(e.target.name === "checked") setTodo({...todo, checked: !todo.checked,})
        else setTodo({...todo, [e.target.name]: e.target.value,})
    }
    return (
        <div  component="main" className={classes.root}>
            <Grid container className={classes.content}>
                <Box className={classes.title} xs={12} >
                    <Typography 
                        variant="h4"
                        component="h1"
                        className={classes.titleText}
                    >
                        TODO
                    </Typography>
                    <IconButton
                        onClick={() => changeTheme()}
                        style={{
                            color: 'white',
                            paddingRight: '0px',
                        }}
                        disableRipple={true}
                    >
                        {theme==='light'? <Brightness3Icon/> : <WbSunnyIcon/>}
                    </IconButton>
                </Box>
                <Box className={classes.inputTodo} xs={12} >
                    <FormControlLabel
                        className={classes.inputTodoIcon}
                        control={
                            <Checkbox 
                                icon={<RadioButtonUncheckedIcon 
                                        style={{
                                            fontSize: '30px',
                                        }}
                                    />} 
                                checkedIcon={<DoneIcon 
                                                style={{
                                                    color: "white",
                                                    fontSize: '15px',
                                                }}
                                            />}
                                style={
                                    todo.checked?{
                                        background: 'linear-gradient(to right bottom, hsl(192, 100%, 67%), hsl(280, 87%, 65%))',
                                        width: '4px',
                                        height: '4px',
                                    }: {}
                                }
                                name="checked" 
                                checked={todo.checked}
                                onChange={handleNewTodo}
                                disableRipple={true}
                            />
                        }
                    />
                    <TextField 
                        type="text" 
                        name="text"
                        value={todo.text} 
                        onChange={handleNewTodo} 
                        // variant= "outlined"
                        fullWidth
                        focused={false}
                        InputProps={{disableUnderline: true}}
                        className= {classes.inputTodoText}
                    />
                </Box>
            </Grid>
        </div>
    )
}

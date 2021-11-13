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
    Icon,
} from "@material-ui/core";
import DoneIcon from '@material-ui/icons/Done';

import ToDoList from './toDoList';

const useStyles = makeStyles((theme) => ({
    root: {
		backgroundImage: theme.palette.background.bgDesktop,
		backgroundRepeat: "no-repeat",
		backgroundSize: "100% 270px",
        backgroundColor: theme.palette.background.default,
		height: "100vh", // changed from "100%"
        [theme.breakpoints.down('xs')]: {
            height: "100%",
        },
        width: "100%",
		display: 'flex',
    },
	content: {
		height: "auto",
        width: "570px",
		display: 'flex',
		flexDirection: 'column',
		margin: '70px auto 130px auto',
	},
    title: {
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
		marginBottom: '50px',
        borderRadius: '5px',
		width: '100%',
		height: '55px',
        backgroundColor: theme.palette.background.paper,
    },
    inputTodoTextField: {
        paddingTop: '5px',
        justifyContent: 'center',
        marginRight: '15px',
        marginLeft: '0', 
        color: theme.palette.text.primary,
    },
    // inputTodoText: {
    //     color: "red",
    // },
    inputTodoIcon: {
        width: '60px',
        justifyContent: 'center',
        margin: 'auto',
    },
    imageIcon: {
        height: '100%',
    },
    iconRoot: {
        textAlign: 'center'
    },
    radioButtonUncheckedIcon: {
        width: "20px",
        height: "20px",
        borderRadius: "11px",
        borderStyle: 'solid',
        borderWidth: 'thin',
        color: theme.palette.border.primary,
    },
    checkBox: {
        "&:hover": {
            "& div": {
                width: "20px",
                height: "20px",
                border: '1px solid transparent',
                backgroundImage: 'linear-gradient('+theme.palette.background.paper
                                +', '+theme.palette.background.paper
                                +'), radial-gradient(circle at top left,' 
                                +'hsl(192, 100%, 67%),hsl(280, 87%, 65%))',
                backgroundOrigin: 'border-box',
                backgroundClip: 'content-box, border-box',
            }
        }
    },
    reorderMsgBox: {
        marginTop: '50px',
        display: 'flex',
		flexDirection: 'row',
        justifyContent: 'center',
    },
    reorderMsg: {
        fontWeight: 700,
        fontSize: '0.7em',
        color: theme.palette.text.secondary,
    },
	[theme.breakpoints.down('xs')]: {
		root: {
			backgroundImage: theme.palette.background.bgMobile,
		},
		content: {
			width: '90%',
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
        isSubmit: false,
        text: '',
        checked: false,
    })
    const handleNewTodo = (e) =>{
        if(e.target.name === "checked") setTodo({...todo, checked: !todo.checked,})
        else setTodo({...todo, [e.target.name]: e.target.value,})
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        setTodo({...todo, isSubmit: true})
    }
    const afterSubmit = () => {
        setTodo({
            isSubmit: false,
            text: '',
            checked: false,
        })
    }
    return (
        <div  component="main" className={classes.root}>
            <Grid  className={classes.content}>
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
                            background: "none",
                        }}
                        disableRipple={true}
                    >
                        {theme==='light'? <Icon classes={{root: classes.iconRoot}}>
                                            <img 
                                                className={classes.imageIcon} 
                                                src="/images/icon-moon.svg"
                                                alt="moon icon"
                                            />
                                        </Icon>
                                        : <Icon classes={{root: classes.iconRoot}}>
                                            <img 
                                                className={classes.imageIcon} 
                                                src="/images/icon-sun.svg"
                                                alt="sun icon"
                                            />
                                        </Icon>
                        }
                    </IconButton>
                </Box>
                <Box  xs={12} >
                    <form  className={classes.inputTodo} onSubmit={handleSubmit}>
                        <FormControlLabel
                            className={classes.inputTodoIcon}
                            control={
                                <Checkbox 
                                    icon={
                                        <div className={classes.radioButtonUncheckedIcon} />
                                    }
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
                                        }: {background: 'none'}
                                    }
                                    name="checked" 
                                    checked={todo.checked}
                                    onChange={handleNewTodo}
                                    disableRipple={true}
                                    className={classes.checkBox}
                                />
                            }
                        />
                        <TextField 
                            type="text" 
                            name="text"
                            value={todo.text} 
                            onChange={handleNewTodo} 
                            fullWidth
                            focused={false}
                            InputProps={{
                                disableUnderline: true,
                                classes: {
                                    input: classes.inputTodoTextField
                                }
                            }}
                            className= {classes.inputTodoTextField}
                        />
                    </form>
                </Box>
                <ToDoList
                    isSubmit={todo.isSubmit}
                    text={todo.text}
                    checked={todo.checked}
                    afterSubmit={afterSubmit}
                />
                <Box className={classes.reorderMsgBox}>
                    <Typography className={classes.reorderMsg}>
                        drag and drop to reorder list
                    </Typography>
                </Box>
            </Grid>
        </div>
    )
}

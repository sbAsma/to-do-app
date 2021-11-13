import React, { useState } from 'react'
import { Draggable } from 'react-beautiful-dnd';
import { makeStyles } from '@material-ui/core'
import {
	Typography,
	Box,
    IconButton,
    FormControlLabel,
    Checkbox,
    Icon,
} from '@material-ui/core'
import DoneIcon from '@material-ui/icons/Done';

const useStyles = makeStyles((theme) => ({
    todoBox: {
        minHeight: '48px',
        // borderBottom: '1px solid '+theme.palette.text.secondary+'',
    },
    todo: {
        display: 'flex',
		flexDirection: 'row',
        alignItems: 'left',
		width: '100%',
		height: '100%',
    },
    todoText: {
        marginTop: '15px',
        marginBottom: '15px',
        width: '100%',
        height: 'auto',
        color: theme.palette.text.primary,
        '&:hover': {
            cursor: 'pointer',
        },
    },
    todoIcon: {
        width: '60px',
        justifyContent: 'center',
        margin: 'auto',
    },
    clearIconButton: {
        width: '60px',
        justifyContent: 'center',
        margin: 'auto',
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
    hr: {
        margin: "0px",
        border: "none",
        height: '1px',
        backgroundColor: theme.palette.text.secondary,
    },
}))

export default function ToDoItem({index, todo, handleUpdateTodo, deleteTodo}) {
    const classes = useStyles()
    const [hoverId,sethoverId]=useState(0);
    const iconCheckedStyle = {
        background: 'linear-gradient(to right bottom, hsl(192, 100%, 67%), hsl(280, 87%, 65%))',
        width: '4px',
        height: '4px',
    }
    return (
        <Draggable 
            
            draggableId={todo.text} 
            index={index}
        >
            {(provided, snapshot) => (
                <Box 
                    ref={provided.innerRef} 
                    {...provided.draggableProps} 
                    {...provided.dragHandleProps}
                    className={classes.todoBox} 
                    xs={12} 
                    
                >
                    <div className={classes.todo}>
                        <FormControlLabel
                            className={classes.todoIcon}
                            control={
                                <Checkbox 
                                    icon={
                                        <div 
                                            className={classes.radioButtonUncheckedIcon} 
                                        />
                                    }
                                    checkedIcon={<DoneIcon 
                                                    style={{
                                                        color: "white",
                                                        fontSize: '15px',
                                                    }}
                                                />}
                                    style={
                                        todo.checked? 
                                            iconCheckedStyle 
                                            : {background: "none"}
                                    }
                                    name="checked" 
                                    checked={todo.checked}
                                    onChange={() => handleUpdateTodo(todo.id)}
                                    disableRipple={true}
                                    className={classes.checkBox}
                                />
                            }
                        />
                        <div
                            className={classes.todo}
                            onMouseOver={()=>sethoverId(todo.id)} 
                            onMouseOut={()=>sethoverId(0)}
                        >
                            <Typography
                                className= {classes.todoText}
                                style={ 
                                    todo.checked? {
                                        textDecoration: 'line-through',
                                        color: 'gray',
                                    }: {}
                                }
                            >
                                {todo.text}
                            </Typography>
                            <IconButton
                                className={classes.clearIconButton}
                                style={{
                                    visibility: (hoverId!==todo.id) && 'hidden',
                                    background:"none",
                                }}
                                disableRipple={true}
                                disableFocusRipple={true}
                                onClick={() => deleteTodo(todo.id)}
                            >
                                <Icon classes={{root: classes.iconRoot}}>
                                    <img 
                                        src="/images/icon-cross.svg"
                                        alt="cross icon"
                                    />
                                </Icon>
                            </IconButton>
                        </div>
                    </div>  
                    <hr 
                        className={classes.hr}
                        style={{
                            display: snapshot.isDragging && 'none',
                        }}
                    />
                </Box>  
            )}
        </Draggable>
    )
}

import React, { useEffect, useState } from 'react'
import { 
    DragDropContext, 
    Droppable,
    Draggable,
} from 'react-beautiful-dnd';
import { makeStyles } from '@material-ui/core'
import {
	Typography,
	Box,
    IconButton,
    FormControlLabel,
    Checkbox,
    Button,
    Icon,
    ListItem,
} from '@material-ui/core'
import DoneIcon from '@material-ui/icons/Done';

const useStyles = makeStyles((theme) => ({
    root: {
        borderRadius: '5px',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[20],
    },
    todoBox: {
        minHeight: '48px',
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
    actionButtons: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        height: '55px',   
        position: 'relative', // for mobile disp 
    },
    hr: {
        margin: "0px",
        border: "none",
        height: '1px',
        backgroundColor: theme.palette.text.secondary,
    },
    nbItemsLeft: {
        margin: 'auto auto auto 20px',
        color: theme.palette.text.secondary,
    },
    buttonGroup: {
        display: 'flex',
        margin: 'auto',
        height: '100%',
        justifyContent: 'center',
        [theme.breakpoints.down('xs')]: {
            zIndex: 1,
            position: 'absolute',
            top: '75px',
            height: '55px',
            width: '100%',
            borderRadius: '5px',
            backgroundColor: theme.palette.background.paper,
        },
    },
    button: {
        textTransform: 'capitalize',
        fontWeight: 700,
        color: theme.palette.text.secondary,
        '&:hover':{
            color: theme.palette.text.hover,
            backgroundColor: 'transparent',
        },
    },
}))

const todosarray = [
    {
        'id': 1,
        'text': 'Complete online JavaScript course',
        'checked': true,
    },
    {
        'id': 2,
        'text': 'Jog around the park 3x',
        'checked': false,
    },
    {
        'id': 3,
        'text': '10 minutes meditation',
        'checked': false,
    },
    {
        'id': 4,
        'text': 'Read for 1 hour',
        'checked': false,
    },
]

export default function ToDoList({isSubmit, text, checked, afterSubmit}) {
    const classes = useStyles()
    const [todos, updateTodos] = useState(todosarray)
    const [filterBy, setFilterBy] = useState('all')
    const [hoverId,sethoverId]=useState(0);
    useEffect(() =>{
        console.log("useEffect is being called")
        if(isSubmit === true){
            if(todos.length===0){
                const newTodo = {
                    'id': 1,
                    'text': text,
                    'checked': checked,
                }
                const newTodoList = [newTodo]
                updateTodos(newTodoList)
                
            }else{
                const id = todos[todos.length -1].id
                const newTodo = {
                    'id': id + 1,
                    'text': text,
                    'checked': checked,
                }
                const newTodoList = [...todos, newTodo]
                updateTodos(newTodoList)
            }
            afterSubmit()
        }
    }, [isSubmit])
    const handleUpdateTodo = (id) => {
        const updatedTodos = todos.map((todo) =>{
            if(todo.id===id){
                return {
                    ...todo,
                    'checked': !todo.checked,
                }
            } else return todo
        })
        updateTodos(updatedTodos)
    }
    const deleteTodo = (id) => {
        const newTodoList = todos.filter((todo) => {
            if(todo.id !== id) return todo
            else return null
        })
        updateTodos(newTodoList)
    }
    const handleAllClick = () => {
        setFilterBy('all')
    }
    const handleActiveClick = () => {
        setFilterBy('active')
    }
    const handleCompltedClick = () => {
        setFilterBy('completed')
    }
    const handleClearClick = () => {
        const clearTodos = todos.map((todo) =>{
            if(todo.checked === true) {
                return {
                    ...todo,
                    'checked': !todo.checked,
                }
            }else return todo
        })
        updateTodos(clearTodos)
    }
    const countTodos = () => {
        var cpt = 0
        todos.map((todo) =>{
            if(todo.checked===false){ cpt++ }
            return null
        })
        return cpt
    }
    const handleOnDragEnd = (result) => {
        if (!result.destination) return;
        const items = Array.from(todos);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        updateTodos(items);
    }
    const iconCheckedStyle = {
        background: 'linear-gradient(to right bottom, hsl(192, 100%, 67%), hsl(280, 87%, 65%))',
        width: '4px',
        height: '4px',
    }
    // const iconCheckedStyle = classes.
    if(todos.length === 0) return <div></div>
    else return (
        <div className={classes.root}>
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="todos">
                    {(provided) => (
                        <div 
                            className="todos" 
                            {...provided.droppableProps} 
                            ref={provided.innerRef}
                        >
                            {todos.map((todo, index) => {
                                if(filterBy==='active' && todo.checked === true) {
                                    return <div key={todo.id}></div>
                                }
                                else if(filterBy==='completed' && todo.checked === false) {
                                    return <div key={todo.id}></div>
                                }
                                else return(
                                    <Draggable 
                                        key={todo.id} 
                                        draggableId={todo.text} 
                                        index={index}
                                    >
                                        {(provided) => (
                                            <div>
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
                                                                            className={
                                                                                classes.radioButtonUncheckedIcon
                                                                            } 
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
                                                </Box>
                                                <hr className={classes.hr}/>
                                            </div>
                                        )}
                                    </Draggable>
                                )
                            })}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
            < Box className={classes.actionButtons} xs={12} >
                <Typography className={classes.nbItemsLeft} >
                    {countTodos()} items left
                </Typography>
                <div className={classes.buttonGroup} >
                    <Button 
                        className={classes.button}
                        onClick={handleAllClick} 
                        style ={
                            filterBy==='all'? {
                                color: 'hsl(220, 98%, 61%)'
                            }: {}
                        }
                    >
                        All
                    </Button>
                    <Button 
                        className={classes.button}
                        onClick={handleActiveClick} 
                        style ={
                            filterBy==='active'? {
                                color: 'hsl(220, 98%, 61%)'
                            }: {}
                        }
                    >
                        Active
                    </Button>
                    <Button 
                        className={classes.button} 
                        onClick={handleCompltedClick}
                        style ={
                            filterBy==='completed'? {
                                color: 'hsl(220, 98%, 61%)'
                            }: {}
                        }
                    >
                        Completed
                    </Button>
                </div>
                <Button 
                    className={classes.button}
                    onClick={handleClearClick} 
                    style={{paddingRight: '20px',}}
                >
                    Clear Completed
                </Button>
            </Box>
        </div>
    )
}

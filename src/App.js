import React, {useState, useMemo} from "react";
import { ThemeProvider, createTheme } from '@material-ui/core/styles'
import ToDo from "./components/toDo";

const font =  "'Josefin Sans', sans-serif";

function App() {
    const [theme, setTheme] = useState('light')
	const changeTheme = () => {
		if(theme==='light') { console.log("changed to dark"); setTheme('dark')}
		else {console.log("changed to light"); setTheme('light')}
	}
	const customTheme = useMemo(
		() =>
		  	createTheme({
				palette: {
					type: theme,
					background:{
						bgDesktop: theme==='light'? "url(/images/bg-desktop-light.jpg)": 
													"url(/images/bg-desktop-dark.jpg)",
						bgMobile: theme==='light'?  "url(/images/bg-mobile-light.jpg)":
													"url(/images/bg-mobile-dark.jpg)",
						default: theme==='light'? "hsl(0, 0%, 98%)": "hsl(235, 21%, 11%)",
						paper: theme==='light'? "white": "hsl(235, 24%, 19%)",
					},
					border:{
						primary: theme==='light'?   "hsl(233, 11%, 84%)":
													  "hsl(233, 14%, 35%)",
					},
					text:{
						primary: theme==='light'?   "hsl(235, 19%, 35%)":
													"hsl(234, 39%, 85%)",
						secondary: theme==='light'?   "hsl(236, 9%, 61%)":
													  "hsl(234, 11%, 52%)",
						hover: theme==='light'?   "hsl(235, 19%, 35%)":
													  "hsl(236, 33%, 92%)",
					},
				},
				typography: {
					fontFamily: font,
				},
		  	}),
			[theme],
	);
    return (
		<ThemeProvider theme={customTheme}>
			<ToDo
				theme={theme}
				changeTheme={changeTheme}
			/>
		</ThemeProvider>
    );
}

export default App;

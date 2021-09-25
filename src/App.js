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
					}
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

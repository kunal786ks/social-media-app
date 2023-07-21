import { createBrowserRouter } from "react-router-dom";
import Login from "component/auth/Login";
import Register from "component/auth/Register";
import Layout from "component/layout";

export const ROOT='/';
export const LOGIN='/login';
export const REGISTER='/register';


export const PROTECTED='/protected'
export const DASHBOARD='/protected/dashboard'


export const router=createBrowserRouter([
    	{path: ROOT,element:"Public Root"},
    	{path: LOGIN,element:<Login/>},
    	{path: REGISTER,element:<Register/>},
    	{path: PROTECTED,element:<Layout/>,children:[
			{path:DASHBOARD,
				element:"dashboard"
			}
		]},
]);
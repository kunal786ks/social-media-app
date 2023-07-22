import { createBrowserRouter } from "react-router-dom";
import Login from "component/auth/Login";
import Register from "component/auth/Register";
import Layout from "component/layout";
import Dashboard from "component/dashboard";
import Comments from "component/comments";
import Profile from "component/profile";
import Users from "component/users";

export const ROOT='/';
export const LOGIN='/login';
export const REGISTER='/register';


export const PROTECTED='/protected'
export const DASHBOARD='/protected/dashboard'
export const USERS='/protected/users'
export const PROFILE='/protected/profile/:id'
export const COMMENTS='/protected/comments/:id'

export const router=createBrowserRouter([
    	{path: ROOT,element:"Public Root"},
    	{path: LOGIN,element:<Login/>},
    	{path: REGISTER,element:<Register/>},
    	{path: PROTECTED,element:<Layout/>,children:[
			{path:DASHBOARD,
				element:<Dashboard/>
			},
			{path:USERS,
				element:<Users/>
			},
			{path:PROFILE,
				element:<Profile/>
			},
			{path:COMMENTS,
				element:<Comments/>
			}
		]},
]);

import { LOGIN } from 'lib/routes';
import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from 'hooks/auth';
import Navbar from 'component/navbar';
const Layout = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { user, isLoading } = useAuth();

    
    useEffect(() => {
        console.log(user)
        if (!isLoading && pathname.startsWith('/protected') && !user) {
            navigate(LOGIN)
        }
    }, [pathname,user,isLoading])
    
    if(isLoading)return 'loading.....'

    return (
        <>
        <Navbar/>
             <Outlet />
        </>
    )
}

export default Layout

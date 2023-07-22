
import { LOGIN } from 'lib/routes';
import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from 'hooks/auth';
import Navbar from 'component/navbar';
import Sidebar from './Sidebar';
import { Box, Flex } from '@chakra-ui/react';
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
        <Flex pt='16' pb='12' mx='auto' w='full' maxW='1200px'>
            <Box w='900px'>
             <Outlet />
            </Box>
        <Sidebar/>

        </Flex>
        </>
    )
}

export default Layout

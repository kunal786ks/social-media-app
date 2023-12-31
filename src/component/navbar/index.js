import React from 'react'
import { Button, Flex } from '@chakra-ui/react'
import { DASHBOARD } from 'lib/routes'
import { Link as RouterLink } from 'react-router-dom'
import { Link } from '@chakra-ui/react'
import { useLogout } from 'hooks/auth'
const Navbar = () => {
    const {logout,isLoading}=useLogout();



    return (
        <Flex
            shadow='sm'
            pos='fixed'
            width='full'
            borderTop='6px solid'
            borderTopColor='teal.400'
            height='16'
            zIndex='3'
            justify='center'
            bg='white'
        >
            <Flex px='4' w='full' align='center' maxW='1200px'>
                <Link
                    as={RouterLink}
                    to={DASHBOARD}
                    color="teal.800"
                    fontWeight="medium"
                    textDecor="underline"
                    _hover={{ background: "teal.100" }}
                >
                    Home
                </Link>
                <Button 
                 ml='auto'
                 colorScheme='teal'
                 size='sm'
                 onClick={logout}
                 isLoading={isLoading}
                >
                    logout
                </Button>
            </Flex>
        </Flex>
    )
}

export default Navbar

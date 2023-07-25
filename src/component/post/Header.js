import {  Flex,Text,Box } from '@chakra-ui/react'
import React from 'react'
import Avatar from 'component/profile/Avatar'
import { useUser } from 'hooks/users';
import { formatDistanceToNow } from 'date-fns';
import UsernameButton from 'component/profile/UsernameButton';
const Header = ({post}) => {
    const {uid,date}=post;
    const {user,isLoading}=useUser(uid);

    if(isLoading)return "loading..."

  return (
   <Flex
    alignItems='center'
    borderColor='teal.100'
    borderBottom='2px solid'
    p='3'
    bg='gray.40'
   >
    <Avatar user={user} size='md'/>
    <Box ml='4'>
        <UsernameButton user={user}/>
        <Text fontSize='sm' color='gray.500'>
            {formatDistanceToNow(date)} ago
        </Text>
    </Box>
   </Flex>
  )
}

export default Header

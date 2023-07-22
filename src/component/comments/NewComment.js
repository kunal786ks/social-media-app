import { Box, Button, Flex, Input } from '@chakra-ui/react'
import Avatar from 'component/profile/Avatar'
import { useAuth } from 'hooks/auth'
import { useAddComment } from 'hooks/comments'
import React from 'react'
import { useForm } from 'react-hook-form'

const NewComment = ({post}) => {
    const {id:postId}=post;
    const {user,isLoading:authLoading}=useAuth();
    const {register,handleSubmit,reset}=useForm();
    const {addComment,isLoading:commentLoading}=useAddComment({postId,uid:user?.id});
    function handleAddComment(data){
        addComment(data.text);
        reset();
    }

    if(authLoading)return 'loading...'
  return (
    <Box maxW='600px' mx='auto' py='6'>
      <Flex padding='4'>
        <Avatar user={user} size='sm'/>
        <Box flex='1' ml='4'>
            <form onSubmit={handleSubmit(handleAddComment)}>
                <Box>
                    <Input 
                        size='sm'
                        variant='flushed'
                        placeholder='Write Comment..'
                        autoComplete='off'
                        {...register('text',{required:true})}
                    />
                    <Box>
                        <Flex pt='2'>
                            <Button
                            isLoading={commentLoading || authLoading}
                            type='submit'
                            colorScheme='teal'
                            size='xs'
                            ml='auto'
                            >
                                Add Comment

                            </Button>
                        </Flex>
                    </Box>
                </Box>
            </form>
        </Box>
      </Flex>
    </Box>
  )
}

export default NewComment

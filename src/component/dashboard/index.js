import { Box, Button, HStack, Heading, Textarea } from "@chakra-ui/react";
import PostsLists from "component/post/PostsLists";
import { useAuth } from "hooks/auth";
import { useAddPost, usePosts } from "hooks/posts";
import React from "react";
import { useForm } from "react-hook-form";

function NewPost() {
  const { register, handleSubmit, reset } = useForm();
  const { addPost, isLoading: addingPost } = useAddPost();
  const { user, isLoading: authLoading } = useAuth();
  
  function handleAddPost(data) {
    addPost({
      uid: user.id,
      text: data.text,
    });
    reset();
  }
  return (
    <Box maxW="600px" mx="auto" py="10">
      <form onSubmit={handleSubmit(handleAddPost)}>
        <HStack justify="space-between">
          <Heading size="lg">New Post</Heading>
          <Button
            colorScheme="teal"
            type="submit"
            isLoading={authLoading || addingPost}
            loadingText="loading"
          >
            Post
          </Button>
        </HStack>
        <Textarea
          resize="none"
          mt="5"
          placeholder="Create a new post..."
          minRows={10}
          {...register("text", { required: true })}
        />
      </form>
    </Box>
  );
}

const Dashboard = () => {
  const {posts,isLoading}=usePosts();
  if(isLoading)return "loading posts....."
  return(
    <>
    <NewPost/>
    <PostsLists posts={posts}/>
  </>
    ) 
};

export default Dashboard;

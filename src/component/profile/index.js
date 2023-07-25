import {
  Button,
  Divider,
  Flex,
  HStack,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import PostsLists from "component/post/PostsLists";
import { usePosts } from "hooks/posts";
import React from "react";
import { useParams } from "react-router-dom";
import Avatar from "./Avatar";
import { useUser } from "hooks/users";
import { format } from "date-fns";
import EditProfile from "./EditProfile";
import { useAuth } from "hooks/auth";

const Profile = () => {
  const { id } = useParams();
  const { posts, isLoading: postsLoading } = usePosts(id);
  const { user, isLoading: userLoading } = useUser(id);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {user:authUser,isLoading:authLoading}=useAuth();

  if (userLoading) return "loading";
  return (
    <Stack spacing="5">
      <Flex p={["4", "6"]} pos="relative" align="center">
        <Avatar size="xl" user={user} />
        {!authLoading && (authUser.id===user.id) && <Button
          pos="absolute"
          mb="2"
          top="6"
          right="6"
          colorScheme="teal"
          onClick={onOpen}
        >
          Change Avatar
        </Button>}
        <Stack ml="10">
          <Text fontSize="2xl">{user.username}</Text>
          <HStack spacing="10">
            <Text color="gray.700" fontSize={["sm", "lg"]}>
              posts:{posts.length}
            </Text>
            <Text color="gray.700" fontSize={["sm", "lg"]}>
              Joined : {format(user.date, "MMMM yyyy")}
            </Text>
          </HStack>
        </Stack>
        {/* Add a modal here */}
        <EditProfile isOpen={isOpen} onClose={onClose} />
      </Flex>
      <Divider />

      {postsLoading ? <Text>Loading.....</Text> : <PostsLists posts={posts} />}
    </Stack>
  );
};

export default Profile;

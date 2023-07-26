import { Flex, IconButton } from "@chakra-ui/react";
import { useAuth } from "hooks/auth";
import React from "react";
import { FaRegHeart, FaHeart, FaComment, FaRegComment, FaTrash } from "react-icons/fa";
import { useToggleLike, useDeletePost } from 'hooks/posts'
import { PROTECTED } from "lib/routes";
import { Link } from "react-router-dom";
import { useComments } from "hooks/comments";


const Action = ({ post }) => {
  const { id, likes, uid } = post;
  const { user, isLoading: userLoading } = useAuth();
  const isLiked = likes.includes(user?.id);


  const configObg = {
    id,
    isLiked,
    uid: user?.id,
  }
  const { toggleLike, isLoading: likeLoading } = useToggleLike(configObg)
  const { deletePost, isLoading: deleteLoading } = useDeletePost(id);
  const { comments, isLoading: commentsLoading } = useComments(id);
  return (
    <Flex p="2">
      <Flex alignItems="center">
        <IconButton
          size="md"
          onClick={toggleLike}
          isLoading={likeLoading || userLoading}
          colorScheme="red"
          variant="ghost"
          icon={isLiked ? <FaHeart /> : <FaRegHeart />}
          isRound
        />
        {likes.length}
      </Flex>
      <Flex alignItems="center" ml='2'>
        <IconButton
          size="md"
          as={Link}
          to={`${PROTECTED}/comments/${id}`}
          colorScheme="teal"
          variant="ghost"
          icon={comments?.length === 0 ? <FaRegComment /> : <FaComment />}
          isRound
        />
        {comments?.length}
      </Flex>
      {!userLoading && user.id === uid &&
        <IconButton
          ml='auto'
          size="md"
          onClick={deletePost}
          isLoading={deleteLoading}
          colorScheme="red"
          variant="ghost"
          icon={<FaTrash />}
          isRound
        />
      }

    </Flex>
  );
};

export default Action;

import React from "react";
import { Link } from "react-router-dom";
import { Avatar as ChakraAvatar } from "@chakra-ui/react";
import {  PROTECTED } from "lib/routes";
const Avatar = ({ user, size = "xl", overrideAvatar = null }) => {
  if (!user) return "loading";
  return (
    <ChakraAvatar
      as={Link}
      to={`${PROTECTED}/profile/${user.id}`}
      name={user.username}
      size={size}
      src={overrideAvatar || user.avatar}
      _hover={{ cursor: "pointer", opacity: "80%" }}
    />
  );
};

export default Avatar;

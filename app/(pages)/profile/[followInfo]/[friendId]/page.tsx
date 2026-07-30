"use client";

import { Profile } from "../../page";
import { useParams } from "next/navigation";
import { getProfileUserByUsername } from "@/features/users/selectors/profile-meta";

export default function FriendProfilePage() {
  const params = useParams<{ friendId: string }>();
  const friendUsername = params.friendId;

  const friendId = getProfileUserByUsername(friendUsername)?.id;

  return <Profile userId={friendId} />;
}

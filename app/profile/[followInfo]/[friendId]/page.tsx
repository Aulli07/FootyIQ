"use client"

import { users } from "@/app/data/users";
import { Profile } from "../../page"
import { useParams } from "next/navigation";

export default function FriendProfilePage() {
  const params = useParams<{friendId: string}>();
  const friendUsername = params.friendId; // Assuming the URL is /profile/[friendId], where friendId is the username

  const friendId = users.find(user => user.username === friendUsername)?.id
  return (
    <Profile userId={friendId} />
  )
}
import { UserType } from "../types/users";
import { getStoredUsers } from "../data/user-storage";


export function findUserFromHistory(user: UserType): UserType | null {
  const currentHistory = getStoredUsers();

  if (currentHistory[user.id]) {
    return currentHistory[user.id];
  }

  return null;
}
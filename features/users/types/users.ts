export type UserType = {
  id: string;
  name: string;
  username: string;
  avatarUrl: string;
  bio: string;
  nationality: string;
  verified: boolean;
  role: string;
  dateJoined: string;
};

export type userType = UserType;

export type UserMappedType = Record<string, UserType>;
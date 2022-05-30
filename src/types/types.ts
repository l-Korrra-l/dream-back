import { Role } from 'src/enums/role.enum';

export type SaveImageInfo = {
  imageUrl: string;
  imageId: string;
};

export type CurrentUserInfo = {
  userId: string;
  email: string;
  role: Role;
};

/**
 * count - count of all reviews for this record
 * sum - sum of all raitings for this record
 */
export type StatsInfo = {
  count: number;
  sum: number;
};

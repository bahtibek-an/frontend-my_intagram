import { getOnlyOneUser } from './getOnlyOneUser';

export const getAllComments = async (
   _userComments: {
      _id: string;
      _userId: string;
      _username?: string;
      _content: string;
   }[]
) => {
   const _comments = _userComments.map(async (_user) => {
      const user = await getOnlyOneUser('userId', _user._userId);
      return {
         ..._user,
         _username: user?.username as string,
      };
   });

   return await Promise.all(_comments);
};

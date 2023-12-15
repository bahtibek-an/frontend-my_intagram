import { getOnlyOneUser } from './getOnlyOneUser';

export const getMemberInConversation = async (
   listMemberId: Array<{ _userId: string }>
) => {
   const promiseUserMember = listMemberId.map(async ({ _userId }) => {
      return await getOnlyOneUser('userId', _userId);
   });

   return Promise.all(promiseUserMember);
};

import { IUser } from 'shared';

export const uppercaseFirstLetter = (str: string) => {
   return str.charAt(0).toUpperCase() + str.slice(1);
};

export const getConversationName = (
   members: IUser[],
   currentUserId: string
): string => {
   if (members.length === 2) {
      return members.find((_member) => _member.userId !== currentUserId)
         ?.username as string;
   }
   return members
      .map((_member) =>
         _member.userId === currentUserId ? 'You' : _member.username
      )
      .join(', ');
};

export const compareArrMember = (
   members1: {
      _userId: string;
   }[],
   members2: {
      _userId: string;
   }[]
) => {
   if (
      !Array.isArray(members1) ||
      !Array.isArray(members2) ||
      members1.length !== members2.length
   ) {
      return false;
   }
   const members1Sorted = [...members1].sort((a, b) =>
      a._userId.localeCompare(b._userId)
   );
   const members2Sorted = [...members2].sort((a, b) =>
      a._userId.localeCompare(b._userId)
   );

   for (let i = 0; i < members1Sorted.length; i++) {
      if (members1Sorted[i]._userId !== members2Sorted[i]._userId) {
         return false;
      }
   }
   return true;
};

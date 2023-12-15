import { doc, getDoc } from 'firebase/firestore';
import { db } from 'lib/firebase';
import { IConversation } from 'shared';

export const getConversation = async (
   conversationDocId: string
): Promise<IConversation | null> => {
   const snap = await getDoc(doc(db, 'conversations', conversationDocId));
   if (snap.exists()) {
      return {
         ...snap.data(),
         _conversationDocId: conversationDocId,
      } as IConversation;
   }
   return null;
};

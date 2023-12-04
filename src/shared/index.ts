import {
   ActionCreatorWithoutPayload,
   ActionCreatorWithPayload,
   createAction,
} from '@reduxjs/toolkit';

export interface IUser {
   avatar: string;
   description: string;
   email: string;
   followers: string[];
   following: string[];
   fullName: string;
   userId: string;
   username: string;
   docId?: string;
}

export interface IPost {
   _image: string;
   _location: string;
   _user: {
      _userId: string;
      _username?: string;
      _avatar?: string;
   };
   _userComments: {
      _id: string;
      _userId: string;
      _username?: string;
      _content: string;
   }[];
   _userLikes: {
      _userId: string;
      _isFollowing: boolean;
   }[];
   _content: string;
   postId: string;
   createdAt: string;
   docId?: string;
}

export interface LoadingState {
   loading: boolean;
   error: Error | null;
}

export interface IUserLiked {
   _userId: string;
   _username: string;
   _isFollowing: boolean;
}

interface LoadingAction<T> {
   pending: ActionCreatorWithoutPayload;
   fulfilled: ActionCreatorWithPayload<T, string>; // this is implement T will have any type when declare here
   rejected: ActionCreatorWithPayload<Error, string>;
}
export const createLoadingActions = <T>(prefix: string) => {
   return {
      pending: createAction(`${prefix}/pending`),
      fulfilled: createAction(`${prefix}/fulfilled`),
      rejected: createAction(`${prefix}/rejected`),
   } as LoadingAction<T>;
};

export interface IConversation {
   _conversationId: string;
   _conversationDocId?: string;
   _lastMessage: null | {
      _createAt: string;
      _message: string;
      _type: IMessageType;
   };

   _userDeleted: string[];
   _member: {
      _userId: string;
   }[];
   _createdAt: string;
}

export interface IMessage {
   _createAt: string;
   _message: string;
   _type: IMessageType;
   _sender: {
      _id: string;
      _username: string;
      _avatar: string;
   };
   _userReactions: {
      _username: string;
      _avatar: string;
      _react: string;
   }[];
   _docId?: string;
}

export enum IMessageType {
   FILE = 'FILE',
   IMG = 'IMG',
   AUDIO = 'AUDIO',
   IMG_ICON = 'IMG_ICON',
   VIDEO = 'VIDEO',
   GIF = 'GIF',
   TEXT = 'TEXT',
}

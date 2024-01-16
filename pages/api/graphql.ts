import axios from 'axios';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import { gql } from 'graphql-tag';
import { createSchema, createYoga } from 'graphql-yoga';
import { verifyToken } from '@/server/verifyToken';
import { firestore } from 'firebase-admin';
import { Playgrounds, User } from '@/generated/graphql';

export interface Friend {
  username: string
  email: string
}

export interface Player {
  username: string
  email: string
  friendList: Array<Friend>
  gamesSaved: Array<SavedGame>
}

export interface SavedGame {
  date: string
  playground: string
  gameShotsList: Array<gameShots>
  players: Array<string>
}

export interface gameShots {
  shots: Array<number>
}

export interface Playground {
  holesNumber: number
  isPublic: boolean
  name: string
  length: number
  parSum: number
}

export interface friendRequest {
  state: string
  sender: string
  username: string
}

type Context = {
  user?: DecodedIdToken | undefined;
};

const typeDefs = gql`
type Query {
  users: [User!]!
  playgrounds: [Playgrounds!]!
}
type FriendRequestType { 
  state: String
  sender: String
  username: String
}
input FriendRequestInput {
  state: String
  sender: String
  username: String
}
type FriendType { 
  username: String
  email: String
}
input FriendInput {
  username: String
  email: String
}
type Mutation {
  createUser(username: String!, email: String!, friendList: [FriendInput], pendingRequests: [FriendRequestInput], gamesSaved: [String] ): User
}
type User {
  email: String
  username: String
  friendList: [FriendType]
  pendingRequests: [FriendRequestType]
  gamesSaved: [String]
}

type Playgrounds {
  holesNumber: Int
  isPublic: Boolean
  name: String
  length: Int
  parSum: Int
}
`;

const db = firestore();

const resolvers = {
Mutation: {
  createUser: async (_: any, { email, username, friendList, pendingRequests, gamesSaved }: User, __: any) => {
    const userRef = db.collection('users').doc();
    const user = { email, username, friendList, pendingRequests, gamesSaved };
    await userRef.set(user);
    return "User created successfully."
  },
},
Query: {
  users: async () => {
      const usersRef = db.collection(
        'users',
      ) as FirebaseFirestore.CollectionReference<User>;
      const docsRefs = await usersRef.listDocuments();
      const docsSnapshotPromises = docsRefs.map((doc) => doc.get());
      const docsSnapshots = await Promise.all(docsSnapshotPromises);
      const docs = docsSnapshots.map((doc) => doc.data()!);
      return docs.map((doc) => ({
        email: `${doc.email}`,
        username: `${doc.username}`,
        friendlist: `${doc.friendList}`,
        pendingRequests: `${doc.pendingRequests}`,
        gamesSaved: `${doc.gamesSaved}`,
      }));
    },
    playgrounds: async () => {
      const playgroundsRef = db.collection(
        'playgrounds',
      ) as FirebaseFirestore.CollectionReference<Playgrounds>;
      const docsRefs = await playgroundsRef.listDocuments();
      const docsSnapshotPromises = docsRefs.map((doc) => doc.get());
      const docsSnapshots = await Promise.all(docsSnapshotPromises);
      const docs = docsSnapshots.map((doc) => doc.data()!);
        return docs.map((doc) => ({
          name: `${doc.name}`,
          holesNumber: `${doc.holesNumber}`,
          isPublic: doc.isPublic,
          parSum: `${doc.parSum}`,
          length: `${doc.length}`,
        }));
    },
  },
};

const schema = createSchema({
typeDefs,
resolvers,
});

export const config = {
api: {
  // Disable body parsing (required for file uploads)
  bodyParser: false,
},
};

export default createYoga({
  schema,
  // Needed to be defined explicitly because our endpoint lives at a different path other than `/graphql`
  graphqlEndpoint: '/api/graphql',
  context: async (context) => {
    const auth = context.request.headers.get('authorization');
    return {
      user : auth
        ? await verifyToken(auth) : undefined
    } as Context;
  }
});

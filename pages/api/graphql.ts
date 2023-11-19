import axios from 'axios';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import { gql } from 'graphql-tag';
import { createSchema, createYoga } from 'graphql-yoga';
import { verifyToken } from '@/server/verifyToken';
import { firestore } from 'firebase-admin';
import { Playgrounds, User } from '@/generated/graphql';

type Context = {
user?: DecodedIdToken | undefined;
};

const typeDefs = gql`
type Query {
  users: [User!]!
  playgrounds: [Playgrounds!]!
}
type Mutation {
  createUser(username: String!, email: String!): User
}
type User {
  email: String
  username: String
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
  createUser: async (_: any, { email, username}: User, __: any) => {
    const userRef = db.collection('users').doc();
    const user = { email, username };
    await userRef.set(user);
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
    console.log(auth);
    return {
      user : auth
        ? await verifyToken(auth) : undefined
    } as Context;
  }
});

import axios from 'axios';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import { gql } from 'graphql-tag';
import { createSchema, createYoga } from 'graphql-yoga';
import { verifyToken } from '@/server/verifyToken';
import { firestore } from 'firebase-admin';
import { User } from '@/generated/graphql';

type Context = {
  user?: DecodedIdToken | undefined;
};

const typeDefs = gql`
  type Query {
    users: [User!]!
  }
  type User {
    name: String
    username: String
    admin: Boolean
  }
`;

const db = firestore();

const resolvers = {
  Query: {
    users: async () => {
        const usersRef = db.collection(
          'users',
        ) as FirebaseFirestore.CollectionReference<User>;
        const docsRefs = await usersRef.listDocuments();
        const docsSnapshotPromises = docsRefs.map((doc) => doc.get());
        const docsSnapshots = await Promise.all(docsSnapshotPromises);
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const docs = docsSnapshots.map((doc) => doc.data()!);
        // console.log(docs);
        // console.log('a');
        // return [{ docs }];
        return docs.map((doc) => ({
          name: `${doc.name}`,
          username: `${doc.username}`,
          admin: `${doc.admin}`,
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

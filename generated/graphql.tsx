import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type FriendRequestInput = {
  sender?: InputMaybe<Scalars['String']>;
  state?: InputMaybe<Scalars['String']>;
};

export type FriendRequestType = {
  __typename?: 'FriendRequestType';
  sender?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addFriend?: Maybe<Scalars['String']>;
  createUser?: Maybe<User>;
};


export type MutationAddFriendArgs = {
  currentUserId: Scalars['String'];
  targetEmail: Scalars['String'];
};


export type MutationCreateUserArgs = {
  email: Scalars['String'];
  friendList?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  pendingRequests?: InputMaybe<Array<InputMaybe<FriendRequestInput>>>;
  username: Scalars['String'];
};

export type Playgrounds = {
  __typename?: 'Playgrounds';
  holesNumber?: Maybe<Scalars['Int']>;
  isPublic?: Maybe<Scalars['Boolean']>;
  length?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  parSum?: Maybe<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  playgrounds: Array<Playgrounds>;
  users: Array<User>;
};

export type User = {
  __typename?: 'User';
  email?: Maybe<Scalars['String']>;
  friendList?: Maybe<Array<Maybe<Scalars['String']>>>;
  pendingRequests?: Maybe<Array<Maybe<FriendRequestType>>>;
  username?: Maybe<Scalars['String']>;
};

export type UsersQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQueryQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', username?: string | null, email?: string | null, friendList?: Array<string | null> | null }> };

export type PlaygroundsQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type PlaygroundsQueryQuery = { __typename?: 'Query', playgrounds: Array<{ __typename?: 'Playgrounds', holesNumber?: number | null, isPublic?: boolean | null, name?: string | null, length?: number | null, parSum?: number | null }> };

export type CreateUserMutationMutationVariables = Exact<{
  email: Scalars['String'];
  username: Scalars['String'];
  friendList?: InputMaybe<Array<InputMaybe<Scalars['String']>> | InputMaybe<Scalars['String']>>;
  pendingRequests?: InputMaybe<Array<InputMaybe<FriendRequestInput>> | InputMaybe<FriendRequestInput>>;
}>;


export type CreateUserMutationMutation = { __typename?: 'Mutation', createUser?: { __typename?: 'User', email?: string | null, username?: string | null, friendList?: Array<string | null> | null, pendingRequests?: Array<{ __typename?: 'FriendRequestType', state?: string | null, sender?: string | null } | null> | null } | null };

export type AddFriendMutationVariables = Exact<{
  currentUserId: Scalars['String'];
  targetEmail: Scalars['String'];
}>;


export type AddFriendMutation = { __typename?: 'Mutation', addFriend?: string | null };


export const UsersQueryDocument = gql`
    query UsersQuery {
  users {
    username
    email
    friendList
  }
}
    `;

/**
 * __useUsersQueryQuery__
 *
 * To run a query within a React component, call `useUsersQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQueryQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersQueryQuery(baseOptions?: Apollo.QueryHookOptions<UsersQueryQuery, UsersQueryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsersQueryQuery, UsersQueryQueryVariables>(UsersQueryDocument, options);
      }
export function useUsersQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersQueryQuery, UsersQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsersQueryQuery, UsersQueryQueryVariables>(UsersQueryDocument, options);
        }
export type UsersQueryQueryHookResult = ReturnType<typeof useUsersQueryQuery>;
export type UsersQueryLazyQueryHookResult = ReturnType<typeof useUsersQueryLazyQuery>;
export type UsersQueryQueryResult = Apollo.QueryResult<UsersQueryQuery, UsersQueryQueryVariables>;
export const PlaygroundsQueryDocument = gql`
    query PlaygroundsQuery {
  playgrounds {
    holesNumber
    isPublic
    name
    length
    parSum
  }
}
    `;

/**
 * __usePlaygroundsQueryQuery__
 *
 * To run a query within a React component, call `usePlaygroundsQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `usePlaygroundsQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePlaygroundsQueryQuery({
 *   variables: {
 *   },
 * });
 */
export function usePlaygroundsQueryQuery(baseOptions?: Apollo.QueryHookOptions<PlaygroundsQueryQuery, PlaygroundsQueryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PlaygroundsQueryQuery, PlaygroundsQueryQueryVariables>(PlaygroundsQueryDocument, options);
      }
export function usePlaygroundsQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PlaygroundsQueryQuery, PlaygroundsQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PlaygroundsQueryQuery, PlaygroundsQueryQueryVariables>(PlaygroundsQueryDocument, options);
        }
export type PlaygroundsQueryQueryHookResult = ReturnType<typeof usePlaygroundsQueryQuery>;
export type PlaygroundsQueryLazyQueryHookResult = ReturnType<typeof usePlaygroundsQueryLazyQuery>;
export type PlaygroundsQueryQueryResult = Apollo.QueryResult<PlaygroundsQueryQuery, PlaygroundsQueryQueryVariables>;
export const CreateUserMutationDocument = gql`
    mutation CreateUserMutation($email: String!, $username: String!, $friendList: [String], $pendingRequests: [FriendRequestInput]) {
  createUser(
    email: $email
    username: $username
    friendList: $friendList
    pendingRequests: $pendingRequests
  ) {
    email
    username
    friendList
    pendingRequests {
      state
      sender
    }
  }
}
    `;
export type CreateUserMutationMutationFn = Apollo.MutationFunction<CreateUserMutationMutation, CreateUserMutationMutationVariables>;

/**
 * __useCreateUserMutationMutation__
 *
 * To run a mutation, you first call `useCreateUserMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutationMutation, { data, loading, error }] = useCreateUserMutationMutation({
 *   variables: {
 *      email: // value for 'email'
 *      username: // value for 'username'
 *      friendList: // value for 'friendList'
 *      pendingRequests: // value for 'pendingRequests'
 *   },
 * });
 */
export function useCreateUserMutationMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutationMutation, CreateUserMutationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutationMutation, CreateUserMutationMutationVariables>(CreateUserMutationDocument, options);
      }
export type CreateUserMutationMutationHookResult = ReturnType<typeof useCreateUserMutationMutation>;
export type CreateUserMutationMutationResult = Apollo.MutationResult<CreateUserMutationMutation>;
export type CreateUserMutationMutationOptions = Apollo.BaseMutationOptions<CreateUserMutationMutation, CreateUserMutationMutationVariables>;
export const AddFriendDocument = gql`
    mutation AddFriend($currentUserId: String!, $targetEmail: String!) {
  addFriend(currentUserId: $currentUserId, targetEmail: $targetEmail)
}
    `;
export type AddFriendMutationFn = Apollo.MutationFunction<AddFriendMutation, AddFriendMutationVariables>;

/**
 * __useAddFriendMutation__
 *
 * To run a mutation, you first call `useAddFriendMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddFriendMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addFriendMutation, { data, loading, error }] = useAddFriendMutation({
 *   variables: {
 *      currentUserId: // value for 'currentUserId'
 *      targetEmail: // value for 'targetEmail'
 *   },
 * });
 */
export function useAddFriendMutation(baseOptions?: Apollo.MutationHookOptions<AddFriendMutation, AddFriendMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddFriendMutation, AddFriendMutationVariables>(AddFriendDocument, options);
      }
export type AddFriendMutationHookResult = ReturnType<typeof useAddFriendMutation>;
export type AddFriendMutationResult = Apollo.MutationResult<AddFriendMutation>;
export type AddFriendMutationOptions = Apollo.BaseMutationOptions<AddFriendMutation, AddFriendMutationVariables>;
import { GraphQLResolveInfo } from 'graphql';
import { ApolloContext } from '../../server';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Community = {
  __typename?: 'Community';
  _id: Scalars['ID'];
  createdAt: Scalars['String'];
  createdBy: Scalars['ID'];
  description?: Maybe<Scalars['String']>;
  members: Array<Maybe<CommunityMember>>;
  membersCount: Scalars['Int'];
  name: Scalars['String'];
};

export type CommunityMember = {
  __typename?: 'CommunityMember';
  role: CommunityRole;
  user: Scalars['ID'];
};

export enum CommunityRole {
  Admin = 'ADMIN',
  User = 'USER'
}

export type CreateCommunityInput = {
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
};

export type InviteCommunityMemberInput = {
  communityId: Scalars['ID'];
  role?: InputMaybe<CommunityRole>;
  userId: Scalars['ID'];
};

export type InviteCommunityMemberResult = {
  __typename?: 'InviteCommunityMemberResult';
  invited?: Maybe<Scalars['Boolean']>;
};

export type JoinComminityWithInvitationInput = {
  token: Scalars['String'];
};

export type JoinComminityWithInvitationResult = {
  __typename?: 'JoinComminityWithInvitationResult';
  success: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  authenticateUser?: Maybe<User>;
  createCommunity?: Maybe<Community>;
  inviteCommunityMember: InviteCommunityMemberResult;
  joinCommunityWithInvitation: JoinComminityWithInvitationResult;
  newUser: NewUserResult;
  signIn: SignInResult;
};


export type MutationCreateCommunityArgs = {
  input: CreateCommunityInput;
};


export type MutationInviteCommunityMemberArgs = {
  input: InviteCommunityMemberInput;
};


export type MutationJoinCommunityWithInvitationArgs = {
  token?: InputMaybe<Scalars['String']>;
};


export type MutationNewUserArgs = {
  input: NewUserInput;
};


export type MutationSignInArgs = {
  input: SignInInput;
};

export type NewUserInput = {
  avatar?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  country: Scalars['String'];
  dateOfBirth: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
  passwordConfirmation: Scalars['String'];
};

export type NewUserResult = {
  __typename?: 'NewUserResult';
  authToken: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  communities: Array<Maybe<Community>>;
  users: Array<Maybe<User>>;
};

export type SignInInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type SignInResult = {
  __typename?: 'SignInResult';
  authToken: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID'];
  avatar?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  country: Scalars['String'];
  dateOfBirth: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Community: ResolverTypeWrapper<Community>;
  CommunityMember: ResolverTypeWrapper<CommunityMember>;
  CommunityRole: CommunityRole;
  CreateCommunityInput: CreateCommunityInput;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  InviteCommunityMemberInput: InviteCommunityMemberInput;
  InviteCommunityMemberResult: ResolverTypeWrapper<InviteCommunityMemberResult>;
  JoinComminityWithInvitationInput: JoinComminityWithInvitationInput;
  JoinComminityWithInvitationResult: ResolverTypeWrapper<JoinComminityWithInvitationResult>;
  Mutation: ResolverTypeWrapper<{}>;
  NewUserInput: NewUserInput;
  NewUserResult: ResolverTypeWrapper<NewUserResult>;
  Query: ResolverTypeWrapper<{}>;
  SignInInput: SignInInput;
  SignInResult: ResolverTypeWrapper<SignInResult>;
  String: ResolverTypeWrapper<Scalars['String']>;
  User: ResolverTypeWrapper<User>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: Scalars['Boolean'];
  Community: Community;
  CommunityMember: CommunityMember;
  CreateCommunityInput: CreateCommunityInput;
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  InviteCommunityMemberInput: InviteCommunityMemberInput;
  InviteCommunityMemberResult: InviteCommunityMemberResult;
  JoinComminityWithInvitationInput: JoinComminityWithInvitationInput;
  JoinComminityWithInvitationResult: JoinComminityWithInvitationResult;
  Mutation: {};
  NewUserInput: NewUserInput;
  NewUserResult: NewUserResult;
  Query: {};
  SignInInput: SignInInput;
  SignInResult: SignInResult;
  String: Scalars['String'];
  User: User;
}>;

export type CommunityResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['Community'] = ResolversParentTypes['Community']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdBy?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  members?: Resolver<Array<Maybe<ResolversTypes['CommunityMember']>>, ParentType, ContextType>;
  membersCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CommunityMemberResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['CommunityMember'] = ResolversParentTypes['CommunityMember']> = ResolversObject<{
  role?: Resolver<ResolversTypes['CommunityRole'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type InviteCommunityMemberResultResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['InviteCommunityMemberResult'] = ResolversParentTypes['InviteCommunityMemberResult']> = ResolversObject<{
  invited?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type JoinComminityWithInvitationResultResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['JoinComminityWithInvitationResult'] = ResolversParentTypes['JoinComminityWithInvitationResult']> = ResolversObject<{
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  authenticateUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  createCommunity?: Resolver<Maybe<ResolversTypes['Community']>, ParentType, ContextType, RequireFields<MutationCreateCommunityArgs, 'input'>>;
  inviteCommunityMember?: Resolver<ResolversTypes['InviteCommunityMemberResult'], ParentType, ContextType, RequireFields<MutationInviteCommunityMemberArgs, 'input'>>;
  joinCommunityWithInvitation?: Resolver<ResolversTypes['JoinComminityWithInvitationResult'], ParentType, ContextType, Partial<MutationJoinCommunityWithInvitationArgs>>;
  newUser?: Resolver<ResolversTypes['NewUserResult'], ParentType, ContextType, RequireFields<MutationNewUserArgs, 'input'>>;
  signIn?: Resolver<ResolversTypes['SignInResult'], ParentType, ContextType, RequireFields<MutationSignInArgs, 'input'>>;
}>;

export type NewUserResultResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['NewUserResult'] = ResolversParentTypes['NewUserResult']> = ResolversObject<{
  authToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  communities?: Resolver<Array<Maybe<ResolversTypes['Community']>>, ParentType, ContextType>;
  users?: Resolver<Array<Maybe<ResolversTypes['User']>>, ParentType, ContextType>;
}>;

export type SignInResultResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['SignInResult'] = ResolversParentTypes['SignInResult']> = ResolversObject<{
  authToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  avatar?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  city?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  country?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  dateOfBirth?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = ApolloContext> = ResolversObject<{
  Community?: CommunityResolvers<ContextType>;
  CommunityMember?: CommunityMemberResolvers<ContextType>;
  InviteCommunityMemberResult?: InviteCommunityMemberResultResolvers<ContextType>;
  JoinComminityWithInvitationResult?: JoinComminityWithInvitationResultResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  NewUserResult?: NewUserResultResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  SignInResult?: SignInResultResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
}>;


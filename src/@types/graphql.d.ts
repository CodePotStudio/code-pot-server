import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { Context } from './context';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: Date;
};

export type Challange = {
  __typename?: 'Challange';
  id: Scalars['Int'];
  thumbnail: Scalars['String'];
  name: Scalars['String'];
  remarks: Scalars['String'];
  status: ChallangeStatus;
  startDateTime: Scalars['Date'];
  endDateTime: Scalars['Date'];
};

export type ChallangeFilter = {
  statuses?: Maybe<Array<ChallangeStatus>>;
};

export type ChallangeStatus =
  | 'PREPARING'
  | 'RECRUITING'
  | 'RECRUITMENT_CLOSED'
  | 'INPROGRESS'
  | 'CLOSED';


export type Enroll = {
  __typename?: 'Enroll';
  id: Scalars['Int'];
  userId: Scalars['Int'];
  challangeId: Scalars['Int'];
  status: EnrollStatus;
  createdAt: Scalars['Date'];
  updatedAt: Scalars['Date'];
  challange?: Maybe<Challange>;
};

export type EnrollStatus =
  | 'PROCESSING'
  | 'COMPLETED'
  | 'CANCELED';

export type Mutation = {
  __typename?: 'Mutation';
  activateUser: User;
  createUser: CreateUserResponse;
  enrollChallange: Enroll;
  registerRefundAccount: User;
};


export type MutationActivateUserArgs = {
  mobile: Scalars['String'];
  name: Scalars['String'];
};


export type MutationCreateUserArgs = {
  email: Scalars['String'];
  avatar?: Maybe<Scalars['String']>;
  githubId: Scalars['Int'];
};


export type MutationEnrollChallangeArgs = {
  challangeId: Scalars['Int'];
};


export type MutationRegisterRefundAccountArgs = {
  bankCode: Scalars['String'];
  bankAccount: Scalars['String'];
};

export type MyEnrollFillter = {
  challangeStatuses?: Maybe<Array<ChallangeStatus>>;
  statuses?: Maybe<Array<EnrollStatus>>;
};

export type Profile = {
  __typename?: 'Profile';
  avatar?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  findChallanges: Array<Challange>;
  getChallange?: Maybe<Challange>;
  me?: Maybe<Me>;
  myEnrolls: Array<Enroll>;
};


export type QueryFindChallangesArgs = {
  filter: ChallangeFilter;
};


export type QueryGetChallangeArgs = {
  id: Scalars['Int'];
};


export type QueryMyEnrollsArgs = {
  filter: MyEnrollFillter;
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  email: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  mobile?: Maybe<Scalars['String']>;
  isActive: Scalars['Boolean'];
  RBankAccount?: Maybe<Scalars['String']>;
  RBankCode?: Maybe<Scalars['String']>;
};

export type AccessToken = {
  __typename?: 'accessToken';
  token: Scalars['String'];
};

export type CreateUserResponse = {
  __typename?: 'createUserResponse';
  token: Scalars['String'];
  user: User;
};

export type Me = {
  __typename?: 'me';
  user: User;
  profile?: Maybe<Profile>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

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
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

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
export type ResolversTypes = {
  Challange: ResolverTypeWrapper<Challange>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  String: ResolverTypeWrapper<Scalars['String']>;
  ChallangeFilter: ChallangeFilter;
  ChallangeStatus: ChallangeStatus;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  Enroll: ResolverTypeWrapper<Enroll>;
  EnrollStatus: EnrollStatus;
  Mutation: ResolverTypeWrapper<{}>;
  MyEnrollFillter: MyEnrollFillter;
  Profile: ResolverTypeWrapper<Profile>;
  Query: ResolverTypeWrapper<{}>;
  User: ResolverTypeWrapper<User>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  accessToken: ResolverTypeWrapper<AccessToken>;
  createUserResponse: ResolverTypeWrapper<CreateUserResponse>;
  me: ResolverTypeWrapper<Me>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Challange: Challange;
  Int: Scalars['Int'];
  String: Scalars['String'];
  ChallangeFilter: ChallangeFilter;
  Date: Scalars['Date'];
  Enroll: Enroll;
  Mutation: {};
  MyEnrollFillter: MyEnrollFillter;
  Profile: Profile;
  Query: {};
  User: User;
  Boolean: Scalars['Boolean'];
  accessToken: AccessToken;
  createUserResponse: CreateUserResponse;
  me: Me;
};

export type ChallangeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Challange'] = ResolversParentTypes['Challange']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  thumbnail?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  remarks?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['ChallangeStatus'], ParentType, ContextType>;
  startDateTime?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  endDateTime?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type EnrollResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Enroll'] = ResolversParentTypes['Enroll']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  challangeId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['EnrollStatus'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  challange?: Resolver<Maybe<ResolversTypes['Challange']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  activateUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationActivateUserArgs, 'mobile' | 'name'>>;
  createUser?: Resolver<ResolversTypes['createUserResponse'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'email' | 'githubId'>>;
  enrollChallange?: Resolver<ResolversTypes['Enroll'], ParentType, ContextType, RequireFields<MutationEnrollChallangeArgs, 'challangeId'>>;
  registerRefundAccount?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationRegisterRefundAccountArgs, 'bankCode' | 'bankAccount'>>;
};

export type ProfileResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Profile'] = ResolversParentTypes['Profile']> = {
  avatar?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  bio?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  findChallanges?: Resolver<Array<ResolversTypes['Challange']>, ParentType, ContextType, RequireFields<QueryFindChallangesArgs, 'filter'>>;
  getChallange?: Resolver<Maybe<ResolversTypes['Challange']>, ParentType, ContextType, RequireFields<QueryGetChallangeArgs, 'id'>>;
  me?: Resolver<Maybe<ResolversTypes['me']>, ParentType, ContextType>;
  myEnrolls?: Resolver<Array<ResolversTypes['Enroll']>, ParentType, ContextType, RequireFields<QueryMyEnrollsArgs, 'filter'>>;
};

export type UserResolvers<ContextType = Context, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  mobile?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  isActive?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  RBankAccount?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  RBankCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AccessTokenResolvers<ContextType = Context, ParentType extends ResolversParentTypes['accessToken'] = ResolversParentTypes['accessToken']> = {
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateUserResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['createUserResponse'] = ResolversParentTypes['createUserResponse']> = {
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['me'] = ResolversParentTypes['me']> = {
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  profile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = Context> = {
  Challange?: ChallangeResolvers<ContextType>;
  Date?: GraphQLScalarType;
  Enroll?: EnrollResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Profile?: ProfileResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  accessToken?: AccessTokenResolvers<ContextType>;
  createUserResponse?: CreateUserResponseResolvers<ContextType>;
  me?: MeResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = Context> = Resolvers<ContextType>;

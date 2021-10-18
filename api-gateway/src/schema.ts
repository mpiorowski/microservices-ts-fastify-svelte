export const schema = `
  scalar Date

  type Query {
    userSession: UserSession
  }

  type Mutation {

    createUserSession(
      email: String!
      password: String!
    ): UserSession

    createUser(
      email: String!
      password: String!
    ): UserSession
    
  }

  type User {
    id: ID!
    email: String!
  }

  type UserSession {
    createdAt: Date!
    updatedAt: Date!
    expiredAt: Date!
    id: ID!
    userId: String!
    user: User
  }
`;

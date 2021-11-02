export const schema = `
  scalar Date

  type Query {
    logout: ID
    userSession: UserSession
    chat(userId: ID!): [Chat]
  }

  type Mutation {

    createUserSession(
      email: String!
      password: String!
    ): UserSession

    createUser(
      email: String!
      password: String!
    ): User

    createChat(
      message: String!
      userId: ID!
    ): Chat
    
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

  type Chat {
    id: ID!
    message: String!
    userId: String!
    user: User!
    createdAt: Date!
    updatedAt: Date!
  }
`;

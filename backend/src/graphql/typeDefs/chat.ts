import { gql } from "apollo-server-express";

export default gql`
    extend type Subscription {
        messageSent: ChatMessage
    }

    type ChatMessage {
        id: ID!
        from: User!
        to: User!
        message: String!
        isSeen: Boolean!
        createdAt: String!
        updatedAt: String!
    }

    type PaginatedChatMessages {
        totalCount: Int!
        messages: [ChatMessage]!
    }

    input SendMessageInput {
        toUserId: ID!
        messageBody: String!
    }

    extend type Query {
        getChatHistory(otherUserId: ID!, page: Int): PaginatedChatMessages!
        getUnseenMessages(page: Int): PaginatedChatMessages!
    }

    extend type Mutation {
        sendMessage(message: SendMessageInput!): ChatMessage!
        setMessageSeen(messageId: ID!): Boolean!
    }
`;
import { gql } from '@apollo/client';

export const GET_SINGLE_TWEET = gql`
query tweet ($tweetId:ID!  $isSFW:Boolean){
  tweet(id:$tweetId isSFW:$isSFW) {
    totalCount
    tweets{
      user{
        id
        imageURL
        name
        userName
      }
      originalTweet{
        id 
        text
        likesCount
        retweetsCount
        repliesCount
        state
        createdAt
        isLiked
        user{
          id
          userName
          name
          imageURL
                 }
          originalTweet{id}
                    }
      repliedToTweet{
        id 
        state
        user{
          id
          userName
          name
          imageURL 
                 }
                     }
      id
      text 
      likesCount
      retweetsCount
      quotedRetweetsCount
      repliesCount
      state
      createdAt
      isLiked
    }
        
      }
    }
`

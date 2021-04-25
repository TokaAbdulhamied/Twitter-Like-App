import React from "react"
import { useQuery } from '@apollo/client';
import { Tweets } from "../../common/queries/TweetQuery";
import { parseJwt } from '../../common/decode';
import { InMemoryCache } from "@apollo/client";
import Feed from "./feed";
import { VariablesAreInputTypesRule, VariablesInAllowedPositionRule } from "graphql";


export interface TweetFilter {
  filter: string
}
// var limit = 0 ;

const  Profilewallpage: React.FC<TweetFilter> = (props) => {
  var profile;
  var initPage = 1;

  if (localStorage.getItem('token') !== "LOGOUT") {
    profile = parseJwt(localStorage.getItem('token'))
  }

  const cache = new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          feed: {
            // read(existing) {
            //   return existing && existing ;
            // },
            merge(existing = [], incoming) {
              return {...existing, ...incoming};
            }
            },
        },
      },
    },
  });

  const { loading, data, fetchMore } = useQuery(Tweets,
    {
      variables: {
        userId: profile.id,
        filter: props.filter ,
        page : initPage
      }
    });

  if (loading) return <p>'Loading .. '</p>

  return (
    < Feed
      tweet = {data.tweets.tweets || []}
      onLoadMore = {() =>
        fetchMore({
          variables: {
            page : initPage +1
          } , 
          // updateQuery: (prev = [], { fetchMoreResult }) => fetchMoreResult
 
          updateQuery: (prev:any , { fetchMoreResult }) => {
            if (!fetchMoreResult) return prev;
            else{
          console.log("updateQuary")
          //  return Object.assign( prev , fetchMoreResult  );       
           return {...prev , ...fetchMoreResult }  ;
            }
 
          }
          
        })
        
      }  
    />
      
  );
}


export default Profilewallpage;
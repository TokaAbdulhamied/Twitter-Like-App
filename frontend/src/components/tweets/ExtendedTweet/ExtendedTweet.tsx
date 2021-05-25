import React, { Fragment } from 'react';
import '../../../styles/layout.css'
import Tweet from '../Tweet';
import { TweetData } from '../TweetData_interface'
import { SideBar } from '../../sideBar/sideBar';
import TrendsBar from '../../TrendsBar/TrendsBar';
import { useQuery } from '@apollo/client';
import { GET_SINGLE_TWEET } from '../../../common/queries/GET_SINGLE_TWEET';
import { Get_SFW } from '../../../common/queries/GET_SFW';
import { useLocation } from 'react-router';
import Loading from '../../../UI/Loading';
import FoF from '../../../UI/FoF/FoF';
import { Link } from 'react-router-dom';
import Replies from '../ListofReplies';

const ExtendedTweet: React.FC = () => {

  const sfw = useQuery(Get_SFW).data;
  const location = useLocation()
  let urlId = location.pathname.substr(7)

  const { data, loading, error } = useQuery(GET_SINGLE_TWEET, {
    variables: {
      tweetId: urlId,
      isSFW: sfw.SFW.value,
    }
  })
  if (loading) return (<div className="mt-8" ><Loading /></div>)
  if (error) return <FoF
    msg="This tweet doesn’t exist"
  />

  const tweet: TweetData = data.tweet
  return (
    <Fragment>

      <main className="main-container">
        <aside className="sb-left">< SideBar /></aside>
        <article className="wall">

          <header className="top-bar px-3 py-2">
            <span className=" m-3">
              <Link to="/">
                <i className="fa fa-arrow-left  p--main-color" aria-hidden="true"></i>
              </Link>

            </span>
            <div>
              <p className="font-extrabold text-lg ">{tweet.user?.name}'s awosome Tweet</p>
              {/* featch front tweet */}

            </div>
          </header>

          <Tweet
            id={tweet.id}
            text={tweet.text}
            repliesCount={tweet.repliesCount}
            createdAt={tweet.createdAt}
            isLiked={tweet.isLiked}
            isRetweeted={tweet.isRetweeted}
            user={tweet.user}
            likesCount={tweet.likesCount}
            quotedRetweetsCount={tweet.quotedRetweetsCount}
            retweetsCount = {tweet.retweetsCount}
            state={tweet.state}
            originalTweet={tweet.originalTweet}
            repliedToTweet={tweet.repliedToTweet}
          />
          <div className="pl-6"><Replies id={tweet.id} /></div>

        </article>

        <aside className="sb-right">< TrendsBar /></aside>
      </main>
    </Fragment>
  );
}

export default ExtendedTweet ;
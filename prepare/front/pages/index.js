import React from 'react';
import AppLayout from '../components/AppLayout';
import Head from 'next/head';
import {useSelector} from "react-redux";

import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";

const Home = () => {
  const { me } = useSelector((state) => state.user);
  const { mainPosts } = useSelector((state) => state.post);

  return (
    <>
      <Head>
        <title>홈</title>
      </Head>
      <AppLayout>
        {me && <PostForm/>}
        {mainPosts.map((post) => <PostCard key={post.id} post={post} />)}
      </AppLayout>
    </>
  );
};

export default Home;
 
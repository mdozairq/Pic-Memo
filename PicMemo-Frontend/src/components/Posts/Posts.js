import React from 'react'
import { useSelector } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import PostCard from './Post/Post';

const Posts = ({setCurrentId}) => {
  const posts = useSelector(state => state.posts)
  console.log(posts)

  return (
      !posts.length ? <CircularProgress /> : (
        <Grid container justify="space-between" alignItems="stretch" spacing={2}>
            { posts.map((post, index)=>{
              return(
                <Grid key={index} item xs={12} sm={6} >
                <PostCard id={post._id} creator={post.creator} name={post.name} date={post.createdAt} likes={post.likes} title={post.title} tags={post.tags} message={post.message} selectedFile={post.selectedFile} setCurrentId={setCurrentId}/>
                </Grid>
              )}
          )}
          </Grid>
      )
  )
}

export default Posts

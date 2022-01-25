import React,{useState, useEffect} from 'react'
import { Container, Grid } from '@material-ui/core';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import {useDispatch} from 'react-redux'
import {getPosts} from '../../actions/posts'


const Home = () => {

    const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch])

  const [currentId, setCurrentId] = useState(null)
  
    return (
        <div>
        <Container justify="space-between" maxWidth="xl">
          <Grid container justify="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={8}>
              <Posts setCurrentId={setCurrentId}/>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId}/>
            </Grid>
          </Grid>
        </Container>
        </div>
    )
}

export default Home

import React from 'react';
import { useStyles } from './styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteIcon from '@material-ui/icons/Delete'
import moment from 'moment';
import {useDispatch} from 'react-redux';
import { deletePost,likePost } from '../../../actions/posts';


export default function PostCard({id, creator, name, date, likes, title, message, tags, selectedFile, setCurrentId }) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const user = JSON.parse(localStorage.getItem('profile'));
    const dispatch = useDispatch();

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    
    console.log(creator);
    console.log(user?.result?.googleId);
    console.log(user?.result?._id);
    

    const Likes = () => {
        if (likes.length > 0) {
          return likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
            ? (
              <><FavoriteIcon  fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}` }</>
            ) : (
              <><FavoriteIcon fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
            );
        }
    
        return <><FavoriteIcon fontSize="small" />&nbsp;Like</>;
      };

    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        {name.charAt(0)}
                    </Avatar>
                }
                action={
                    (user?.result?.googleId === creator || user?.result?._id === creator) && (
                    <IconButton aria-label="settings" onClick={() => {setCurrentId(id)}}>
                        <MoreVertIcon />
                    </IconButton>
                    )
                }
                title={name}
                subheader={moment(date).fromNow()}
            />
            <CardMedia
                className={classes.media}
                image={selectedFile}
                title={title}
            />
            <CardContent>
                <Typography variant="h6" color="textPrimary">
                    {title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {tags.map((tag) => `#${tag} `)}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites" onClick={() => {dispatch(likePost(id))}}>
                    <Likes/>
                </IconButton>
                {(user?.result?.googleId === creator || user?.result?._id === creator) && (
                <IconButton aria-label="share" onClick={() => {dispatch(deletePost(id))}}>
                    <DeleteIcon />
                </IconButton>
                )}
                <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>Details:</Typography>
                    <Typography paragraph>
                        {message}
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    )
}

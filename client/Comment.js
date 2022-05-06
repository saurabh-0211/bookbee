import Rating from '@mui/material/Rating';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Avatar } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  avatar: {
    display: 'flex',
    flexDirection: 'row'
  },
  msg: {
    alignItems: 'center',
    margin: 'auto',
    padding: '32px 56px'
  }
}));

const Comment = ({ reviews }) => {
  const classes = useStyles();
  console.log(reviews.length);
  return (
    <Card sx={{ width: '50%' }}>
      {reviews.length ? (
        reviews.map((review) => (
          <CardContent key={review.user}>
            <div className={classes.avatar}>
              <Avatar alt={review.name} src="/static/images/avatar/2.jpg" />
              <Typography sx={{ margin: '5px ' }} variant="h5" component="span">
                {review.name}
              </Typography>
            </div>
            <Rating name="simple-controlled" size="small" value={review.rating} readOnly />
            <Typography variant="body2" color="text.secondary">
              {review.comment}
            </Typography>
          </CardContent>
        ))
      ) : (
        <h1 className={classes.msg}>No Reviews Yet.</h1>
      )}
    </Card>
  );
};

export default Comment;

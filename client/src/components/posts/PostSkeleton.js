import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Card, CardContent, CardHeader, CardActions } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

const styles = theme => ({
  ...theme.custom(theme),
  card: {
    minWidth: 300,
    maxWidth: 700,
    margin: "0 auto 2rem",
    "& .handle": {
      fontSize: "1rem"
    },
    "& .expand": {
      marginLeft: "auto"
    }
  }
});
const useStyles = makeStyles(styles);

const PostSkeleton = () => {
  const classes = useStyles();

  const content = Array.from({ length: 5 }).map((item, index) => (
    <Card className={classes.card} key={index}>
      <CardHeader
        avatar={<Skeleton variant="circle" width={40} height={40} />}
        title={<Skeleton height={6} width={50} />}
        subheader={<Skeleton height={6} width={70} />}
      />
      <CardContent>
        <Skeleton width="80%" />
        <Skeleton width="50%" />
      </CardContent>
      <CardActions>
        <Skeleton variant="circle" width={30} height={30} />
        <Skeleton width={50} height={12} />
        <Skeleton variant="circle" width={30} height={30} />
        <Skeleton width={50} height={12} />
        <Skeleton variant="circle" width={30} height={30} className="expand" />
      </CardActions>
    </Card>
  ));

  return <>{content}</>;
};

export default PostSkeleton;

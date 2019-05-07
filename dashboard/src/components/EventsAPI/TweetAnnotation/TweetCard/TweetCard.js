import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { styles } from "./styles";
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { defaultProfileImage } from "../profileBase64";
import { Grid, GridList, GridListTile, Link } from "@material-ui/core";
import ReactTimeAgo from "react-time-ago/commonjs/ReactTimeAgo";
import LocationCityIcon from "@material-ui/icons/LocationCity"
import LinkIcon from "@material-ui/icons/Link"




class TweetCard extends Component {


  addDefaultSrc(ev) {
    ev.target.src = defaultProfileImage
  }

  render() {

    const { classes, tweet } = this.props;
    let currentTweet = tweet;
    if (currentTweet.retweeted_status) {
      currentTweet = currentTweet.retweeted_status;
    }
    const text = currentTweet.extended_tweet ? currentTweet.extended_tweet.full_text : currentTweet.text;

    let media = currentTweet.extended_entities ? currentTweet.extended_entities.media : [];
    const extended_media = currentTweet.extended_tweet && currentTweet.extended_tweet.extended_entities ? currentTweet.extended_tweet.extended_entities.media : []
    media.push(...extended_media);

    let mentions = currentTweet.entities ? currentTweet.entities.user_mentions : [];
    const extended_mentions = currentTweet.extended_tweet && currentTweet.extended_tweet.entities.user_mentions ? currentTweet.extended_tweet.entities.user_mentions : []
    mentions.push(...extended_mentions);

    return (
      <Grid container spacing={24} className={classes.root}>
        <Grid item xs={12} md={6}>

          <Link variant="h6" href={`https://twitter.com/${currentTweet.user.screen_name}/status/${currentTweet.id_str}`} target="_blank">
            Tweet details
          </Link>

          <Typography color="textSecondary"  variant="caption">
            <i>{tweet.retweeted_status ? "Retweeted " : "Tweeted "}
              on {new Date(parseInt(tweet.timestamp_ms, 10)).toLocaleString()} 
            </i>
          </Typography>
          <Typography color="textSecondary" gutterBottom variant="caption">
             <i>Tweet id: {currentTweet.id_str}</i>
          </Typography>
          <Typography variant="body2" dangerouslySetInnerHTML={{ __html: text }}>
          </Typography>
          <Typography color="textSecondary" gutterBottom variant="caption" dangerouslySetInnerHTML={{ __html: currentTweet.source }}>
          </Typography>
          {media.length > 0 &&
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              Media
            </Typography>
          }
          <GridList cellHeight={160} className={classes.gridList} cols={Math.max(media.length, 3)}>
            {media.map(tile => (
              <GridListTile key={tile.id_str} cols={1}>
                <img src={tile.media_url} alt="Media in tweet. No description from Twitter" />
              </GridListTile>
            ))}
          </GridList>

            
          
        </Grid>
        <Grid item xs={12} md={6}>
        <a href={`https://twitter.com/${currentTweet.user.screen_name}`} className={classes.tableCell}>
                    <img className={classes.avatar}
                        onError={this.addDefaultSrc}
                        src={currentTweet.user.profile_image_url_https}
                        alt="Avatar" />
                </a>
          <div className={classes.tableCell}>
          <Link variant="h6" href={`https://twitter.com/${currentTweet.user.screen_name}`} target="_blank">
            {currentTweet.user.name}
          </Link>
          <Typography color="textSecondary"  variant="caption">
            <i>Account @{currentTweet.user.screen_name} created <ReactTimeAgo date={new Date(Date.parse(currentTweet.user.created_at.replace(/( \+)/, ' UTC$1')))} /> 
            </i>
          </Typography>
          <Typography color="textSecondary" gutterBottom variant="caption">
            <i>User id: {currentTweet.user.id_str}</i>
          </Typography>
          </div>

          <Typography paragraph variant="body2">
            {currentTweet.user.description}
          </Typography>
          <Grid container spacing={24} >
            <Grid item xs={3} md={2}>
              <Typography color="textSecondary" variant="caption">
                <i>Tweets</i>
              </Typography>
              <Typography variant="h6" gutterBottom >
                {currentTweet.user.statuses_count}
              </Typography>
            </Grid>
            <Grid item xs={3} md={2}>
              <Typography color="textSecondary"  variant="caption">
                <i>Favourites</i>
              </Typography>
              <Typography variant="h6" gutterBottom >
                {currentTweet.user.favourites_count}
              </Typography>
            </Grid>
            <Grid item xs={3} md={2}>
              <Typography color="textSecondary"  variant="caption">
                <i>Followers</i>
              </Typography>
              <Typography variant="h6" gutterBottom >
                {currentTweet.user.followers_count}
              </Typography>
            </Grid>
            <Grid item xs={3} md={2}>
              <Typography color="textSecondary"  variant="caption">
                <i>Following</i>
              </Typography>
              <Typography variant="h6" gutterBottom >
                {currentTweet.user.friends_count}
              </Typography>
            </Grid>

          </Grid>
          {currentTweet.user.location ?
          <Typography variant="body2">
            <LocationCityIcon className={classes.alignIcon} />
            {currentTweet.user.location} {currentTweet.user.time_zone ? `(${currentTweet.user.time_zone})` : null}
          </Typography>
          :null}
          {currentTweet.user.url ?
            <Link color="inherit" variant="body2" href={currentTweet.user.url} target="_blank">
              <LinkIcon className={classes.alignIcon} />
              {currentTweet.user.url}
            </Link>
            : null}
        </Grid>
        
      </Grid>
      
    );
  }
}

TweetCard.propTypes = {
  classes: PropTypes.object.isRequired,
  tweet: PropTypes.object
};

export default connect(null, null)(withStyles(styles)(TweetCard));
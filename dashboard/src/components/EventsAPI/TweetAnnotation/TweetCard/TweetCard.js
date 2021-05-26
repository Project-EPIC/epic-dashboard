import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { styles } from "./styles";
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { defaultProfileImage } from "../profileBase64";
import { Grid, GridList, GridListTile, Link, Tooltip } from "@material-ui/core";
import ReactTimeAgo from "react-time-ago/commonjs/ReactTimeAgo";
import LocationCityIcon from "@material-ui/icons/LocationCity"
import LinkIcon from "@material-ui/icons/Link"
import DoneAllIcon from "@material-ui/icons/DoneAll"
import TranslateIcon from "@material-ui/icons/Translate"
import Button from '@material-ui/core/Button';
import firebase from "firebase";
import fetch from 'cross-fetch';

import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';


const initialState = {
  translation: "",
  processing_translation: false,
  lighbox: false,
  photoIndex:0

}
class TweetCard extends Component {

  constructor(props) {
    super(props);
    this.state = initialState;
    this.translateTweet = this.translateTweet.bind(this)
  }

  translateTweet(text, source) {
    this.setState({
      processing_translation: true,
    })
    firebase.auth().currentUser.getIdToken(/* forceRefresh */ false).then(idToken => {
      fetch(`https://epicapi.gerard.space/tweets/translate`, {
          method: 'POST',
          headers: {
              'Authorization': `Bearer ${idToken}`,
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({text,source})
      })
          .then(res => res.json())
          .then(tweet => {
            this.setState({
              translation: tweet.translated,
              processing_translation: false,
            })
          })
          .catch(function (error) {
            this.setState({
              processing_translation: false,
            })
              console.log('There has been a problem with your fetch operation: ', error.message);
          });;
  });
  }

  addDefaultSrc(ev) {
    ev.target.src = defaultProfileImage
  }

  render() {

    const { classes, tweet } = this.props;
    const {lightbox, photoIndex} = this.state;
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
      <Grid container spacing={3} className={classes.root}>
        <Grid item xs={12} md={6}>

          <Link variant="h6" href={`https://twitter.com/${currentTweet.user.screen_name}/status/${currentTweet.id_str}`} target="_blank">
            Tweet details
          </Link>

          <Typography color="textSecondary" variant="caption" style={{display: 'block'}}>
            <i>{tweet.retweeted_status ? "Retweeted " : "Tweeted "}
              on {new Date(parseInt(tweet.timestamp_ms, 10)).toLocaleString()} 
            </i>
          </Typography>
          <Typography color="textSecondary" gutterBottom variant="caption" style={{display: 'block'}}>
             <i>Tweet id: {currentTweet.id_str}</i>
          </Typography>
          <Typography variant="body1" dangerouslySetInnerHTML={{ __html: text }} >
          </Typography>
          <Typography color="textSecondary" gutterBottom variant="caption" dangerouslySetInnerHTML={{ __html: currentTweet.source }}>
          </Typography>
          {(tweet.lang !== "en" && !this.state.translation) ? 
            <Button variant="contained" color="primary" className={classes.button} onClick={() => this.translateTweet(text,tweet.lang)} disabled={this.state.processing_translation}>
              {this.state.processing_translation ? "Translating..." :"Translate to English"}
              <TranslateIcon className={classes.rightIcon} />
            </Button> 
            :
            null}
            {this.state.translation ? 
            <div>
              <Typography className={classes.title} color="textSecondary" gutterBottom>
                Translated tweet
              </Typography>
              <Typography variant="body1" dangerouslySetInnerHTML={{ __html: this.state.translation }}></Typography>
            </div>
            :
            null}
          {media.length > 0 &&
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              Media
            </Typography>
          }
          <GridList cellHeight={160} className={classes.gridList} cols={Math.max(media.length, 3)}>
            {media.map((tile, index) => (
              <GridListTile key={tile.id_str} cols={1}>
                <img onClick={()=> this.setState({lightbox: true, photoIndex:index})} src={tile.media_url} alt="Media in tweet. No description from Twitter" />
              </GridListTile>
            ))}
          </GridList>

          {lightbox && (
            <Lightbox
              reactModalStyle={{overlay:{"zIndex":2000}}}
              mainSrc={media[photoIndex].media_url}
              onCloseRequest={() => this.setState({ lightbox: false })}
              nextSrc={media.length >1 && media[(photoIndex + 1) % media.length].media_url}
              prevSrc={media.length >1 && media[(photoIndex + media.length -1 ) % media.length].media_url}
              onMovePrevRequest={() =>
                this.setState({
                  photoIndex: (photoIndex + media.length -1 ) % media.length,
                })
              }
              onMoveNextRequest={() =>
                this.setState({
                  photoIndex: (photoIndex +1) % media.length,
                })
              }
          />
          )}
          
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
          {currentTweet.user.verified ? 
          <Tooltip title="User Verified">
            <DoneAllIcon style={{paddingTop:8}}/>
          </Tooltip>
          :null}
          <Typography color="textSecondary"  variant="caption" style={{display: 'block'}}>
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
          <Grid container spacing={3} >
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
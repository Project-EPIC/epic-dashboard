import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { styles } from "./styles";
import { connect } from 'react-redux';
import firebase from "firebase";
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { defaultErrorImage } from './errorBase64';


let pageCounter = 1;

class ListMedia extends Component {

  constructor(props) {
    super(props);

    this.state = {
      error: false,
      hasMore: true,
      isLoading: false,
      photoIndex: 0,
      isOpen: false,
      data: null,
      media: [],
    };
  }

  componentDidMount() {

    window.addEventListener('scroll', this.handleScroll);
    const { eventId } = this.props;
    pageCounter = 1;

    fetch(`http://localhost:8080/media/${eventId}/?page=1&count=51`)
      .then(response => response.json())
      .then(data => this.setState({ media: data.media }));
  }

  handleScroll = () => {
    //console.log("ENTER HANDLE SCROLL\n");
    const {
      loadImages,
      state: {
        error,
        isLoading,
        hasMore,
      },
    } = this;

    // Bails early if:
    // * there's an error
    // * it's already loading
    // * there's nothing left to load
    if (error || isLoading || !hasMore) return;

    // console.log("WINDOW INNER HEIGHT: " + window.innerHeight + "\n");
    // console.log("DOCUMENT ELEMENT SCROLL TOP: " + document.documentElement.scrollTop + "\n");
    // console.log("DOCUMENT ELEMENT OFFSET HEIGHT: " + document.documentElement.offsetHeight + "\n");
    // console.log("INNER HEIGHT + SCROLL TOP: " + (window.innerHeight + document.documentElement.scrollTop) + "\n");

    if (
      window.innerHeight + document.documentElement.scrollTop
      >= document.documentElement.offsetHeight
    ) {
      console.log("ENTER LOAD IMAGES\n");
      loadImages();
    }
  };

  loadImages = () => {
    const { eventId } = this.props;
    pageCounter++;
    console.log("PAGE COUNTER: " + pageCounter +"\n");

    this.setState({ isLoading: true }, () => {
        fetch(`http://localhost:8080/media/${eventId}/?page=${pageCounter}&count=51`)
        .then(response => response.json())
        .then(
            data => {
            console.log("STATE MEDIA LENGHT: " + this.state.media.length + "\n");
            this.setState(state => ({
                hasMore: (state.media.length >= 1),
                isLoading: false,
                media: [...state.media, ...data.media],
            }))
            })
            .catch((err) => {
            this.setState({
                error: err.message,
                isLoading: false,
            });
            })
    });
  }

  addDefaultSrc(ev) {
    ev.target.src = defaultErrorImage
  }

  render() {
    const { eventId } = this.props;
    const { error, hasMore, isLoading, media, lightbox, photoIndex, isOpen } = this.state;

    return (
      <Grid container spacing={24}>
        <Grid item xs={12} >
          <GridList cellHeight={300} width={100} height={100} cols={3}>
            {media.map((media, index) => (
              <GridListTile key={media.image_link} cols={1}>
                <img onError={this.addDefaultSrc} style={{width: '100%'}} onClick={()=> this.setState({lightbox: true, photoIndex:index})} src={media.image_link} alt={media.tweet_url} />
                <a href={"https://www.twitter.com/" + media.user} target="_blank">
                  <GridListTileBar
                    title={"@" + media.user}
                    titlePosition="top"
                    actionIcon={
                      <IconButton aria-label={`account ${media.tweet_url}`} style={{color: 'white'}}>
                        <AccountCircleIcon />
                      </IconButton>
                    }
                    actionPosition="left"
                    style={{background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' + 'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',}}
                  />
                </a>
              </GridListTile>
            ))}
          </GridList>
          <div>
            {error &&
            <div style={{ color: '#900' }}>
              {error}
            </div>
            }
            {isLoading &&
              <div style={{ textAlign: 'center' , marginTop: '2%' }}>
                <CircularProgress />
              </div>
            }
            {!hasMore &&
              <Typography style={{ fontSize: '150%', fontWeight: 'bold', textAlign: 'center' , marginTop: '2%' }}>No more elements to load</Typography>
            }
          </div>

          {lightbox && (
            <Lightbox
              reactModalStyle={{overlay:{"zIndex":2000}}}
              mainSrc={media[photoIndex].image_link}
              onCloseRequest={() => this.setState({ lightbox: false })}
              nextSrc={media.length >1 && media[(photoIndex + 1) % media.length].image_link}
              prevSrc={media.length >1 && media[(photoIndex + media.length -1 ) % media.length].image_link}
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
      </Grid>

    )
  }
}

ListMedia.propTypes = {
  classes: PropTypes.object.isRequired,
};



export default connect(null, null)(withStyles(styles)(ListMedia));

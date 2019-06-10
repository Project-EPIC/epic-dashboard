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

import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

class ListMedia extends Component {

  constructor(props) {
    super(props);

    this.state = {
      photoIndex: 0,
      isOpen: false,
      data: null,
      media: [],
    };
  }

  componentDidMount() {

    const { eventId } = this.props;

    fetch(`http://localhost:8080/media/${eventId}/?page=1&count=50`)
      .then(response => response.json())
      .then(data => this.setState({ media: data.media }));
  }

  onScroll = () => {
    if (
      (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 500) &&
      this.props.list.length
    ) {
      this.props.onPaginatedSearch();
      console.log("keloke chavales");
    }
  }

  render() {
    const { eventId } = this.props;
    const { media, lightbox, photoIndex, isOpen } = this.state;

    return (
      <Grid container spacing={24}>
        <Grid item xs={12} >
          <GridList cellHeight={300} width={100} height={100} cols={3}>
            {media.map((media, index) => (
              <GridListTile key={media.image_link} cols={1}>
                <img onClick={()=> this.setState({lightbox: true, photoIndex:index})} src={media.image_link} alt={media.tweet_url} />
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

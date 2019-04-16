import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import ChipInput from 'material-ui-chip-input'
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

const styles = {
  card: {
    maxWidth: 555, // should be set to this.     
    // maxWidth: '100%',
  },
  media: {
    height: 140,
  },
};




class TweetCard extends Component {
  constructor() {
    super();
    this.state = {
      tags: []
    }
  }
  handleAdd(...chips) {
    this.setState({
      tags: [...this.state.tags, ...chips]
    })
  }
  
  handleAddChip = (tag) => {
    let tags = this.state.tags;
    tags.push(tag)
    this.setState({ tags })
  }
  
  handleDeleteChip = (tag, index) => {
    let tags = this.state.tags;
    tags.splice(index, 1);
    this.setState({ tags })
  }

  
  render() {
    const { classes } = this.props;
    const { tweet } = this.props;
    // console.log(`This is the prop that I got: ${JSON.stringify(tweet)}`)
    const { user } = tweet;
    console.log(`user is ${JSON.stringify(tweet.extended_entities)}`)
    const media = tweet.extended_entities ? tweet.extended_entities.media : null
    const media_url = media ? media[0].media_url : null;
    if(media) {
      console.log(`Media is present here: ${tweet.text}`)
    }
    const cardMedia = tweet.extended_entities ?   (<CardMedia
      className={classes.media}
      image={media_url}
      title="Contemplative Reptile"
    /> ) : null;
    return (
      <Card className={classes.card} >
        <CardActionArea>  
          {cardMedia}       
          <CardContent>
            <Avatar alt="Remy Sharp" src={user.profile_image_url} className={classes.avatar} />
            <Typography gutterBottom variant="h5" component="h2">
              {user.name}              
            </Typography>
            <Typography component="p">
            {tweet.text}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
        <ChipInput                  
                  value={this.state.tags}
                  onAdd={(chip) => this.handleAddChip(chip)}
                  onDelete={(chip, index) => this.handleDeleteChip(chip, index)}                  
                  helperText={this.state.tagsError !== "" ? this.state.tagsError : "annotations to annotate tweets"}
                  error={this.state.tagsError !== ""}
                  placeholder={"Enter annotation followed by an Enter"}
                  fullWidth
                  newChipKeyCodes={[13, 188]}
                  margin="dense"
                  onPaste={(event) => {

                    const clipboardText = event.clipboardData.getData('Text')

                    event.preventDefault()

                    this.handleAdd(...clipboardText.split(/(\n|,)/).filter((t) => t !== ',' && t !== '\n' && t.length > 0))

                    if (this.props.onPaste) {
                      this.props.onPaste(event)
                    }
                  }}
          />
        </CardActions>
      </Card>
    );
  }
}

TweetCard.propTypes = {
  classes: PropTypes.object.isRequired,
  tweet: PropTypes.object
};

export default withStyles(styles)(TweetCard);
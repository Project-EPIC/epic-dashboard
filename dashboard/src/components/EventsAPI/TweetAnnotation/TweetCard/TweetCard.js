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
import { connect } from 'react-redux';
import { fetchTags, updateAnnotation, addTag } from "../../../../actions/eventActions"
import { defaultProfileImage } from "../profileBase64";

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
    console.log(`in gerards method`)
    this.setState({
      tags: [...this.state.tags, ...chips]
    })
  }
  
  handleAddChip = (tag) => {
    console.log(`inside handleAddChip ${tag}`)
    let tags = this.state.tags;
    tags.push(tag)
    this.setState({ tags })
    this.props.addTag(tag, this.props.tweet, this.props.tweet.tweetid, this.props.eventName)
  }
  
  handleDeleteChip = (tag, index) => {
    console.log(`in handleDeleteChip`)
    let tags = this.state.tags;
    tags.splice(index, 1);
    this.setState({ tags })
  }

  _submitAnnotation = (e) => {    
    var { tags } = this.state;
    var { tweet, eventName, initialTags } = this.props;
    this.props.updateAnnotation(tweet, initialTags, tags, eventName);
    this.props.fetchTags(tweet.id);
  }

  componentDidMount() {    
    this.props.fetchTags(this.props.tweet.id, this.props.eventName);         
  }
  componentDidUpdate(prevProps) {    
    if(this.props.initialTags !== prevProps.initialTags) {
      this.setState({tags:this.props.initialTags.tags})
    }
  }

  addDefaultSrc(ev){
    ev.target.src = defaultProfileImage
  }
  
  render() {  
        
    const { classes, tweet } = this.props;
    const { tags } = this.state
    console.log(`in render::$$:: ${JSON.stringify(tags)}`)    
    const { user, text } = tweet; // TODO the text field needs to be changed later on based on what needs to be set
    const media = tweet.extended_entities ? tweet.extended_entities.media : null
    const media_url = media ? media[0].media_url : null;
    
    const cardMedia = tweet.extended_entities ?   ( <CardMedia
      className={classes.media}
      image={media_url}
      title="Contemplative Reptile"
    /> ) : null;
    return (
      <Card className={classes.card} >
        <CardActionArea>  
          {cardMedia}       
          <CardContent>
            <Avatar alt="Avatar"  onError={this.addDefaultSrc} src={user.profile_image_url} className={classes.avatar} />
            <Typography gutterBottom variant="h5" component="h2">
              {user.name}              
            </Typography>
            <Typography component="p">
            {text}
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
          }
          }
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

const mapStateToProps = state => ({
  initialTags:  state.eventsReducer.initialTags,
})
const mapDispatchToProps = {
  updateAnnotation: updateAnnotation,   
  fetchTags: fetchTags,
  addTag: addTag
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TweetCard));
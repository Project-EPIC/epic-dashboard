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
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { fetchTags, updateAnnotation } from "../../../../actions/eventActions"
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

  _submitAnnotation = (e) => {    
    var { tags, initialTags } = this.state;
    var { tweet, eventName } = this.props;
    this.props.updateAnnotation(tweet, initialTags, tags, eventName);
    this.props.fetchTags(tweet.id);
  }

  componentDidMount() {    
    this.props.fetchTags(this.props.tweet.id);         
  }
  componentDidUpdate(prevProps) {
    console.log(`in Component Did Update: ${this.props.initialTags}`)
    if(this.props.initialTags !== prevProps.initialTags) {
      this.setState({tags:this.props.initialTags.tags})
    }
  }

  addDefaultSrc(ev){
    ev.target.src = defaultProfileImage
  }
  
  render() {  
        
    const { classes } = this.props;
    const { tweet } = this.props;
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
          <Button size="small" color="primary" onClick={(e) => {e.preventDefault(); this._submitAnnotation()}}>          
            Annotate
          </Button>
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
  fetchTags: fetchTags
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TweetCard));
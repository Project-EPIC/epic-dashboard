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
import Chip from '@material-ui/core/Chip'

import { connect } from 'react-redux';
import { fetchTags, addAnnotation, deleteTag } from "../../../../actions/annotationActions"
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
  
  handleAdd(...chips) {  
    chips.forEach(tag =>  this.props.addAnnotation(tag, this.props.tweet, this.props.eventName))
  }

  hashCode(str) { // java String#hashCode
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
  } 

  intToRGB(i){
      var c = (i & 0x00FFFFFF)
          .toString(16)
          .toUpperCase();
          
      return "00000".substring(0, 6 - c.length) + c;
  }
  
  handleAddChip = (tag) => {       
    this.props.addAnnotation(tag, this.props.tweet, this.props.eventName)    
  }
  
  handleDeleteChip = (tag, index) => {    
    this.props.deleteTag(tag.tag, this.props.tweet.id_str, this.props.eventName)
  }

  componentDidMount() {    
    this.props.fetchTags(this.props.tweet.id_str, this.props.eventName);         
  }
  

  addDefaultSrc(ev){
    ev.target.src = defaultProfileImage
  }
  
  render() {    
    const tweet_id = this.props.tweet.id_str;
    const event_name =this.props.eventName;
    const annotations = this.props.annotations.filter(item => (item.tweet_id === tweet_id && item.event_name === event_name) );
    const { classes, tweet } = this.props;           
    const { user, text } = tweet; // TODO the text field needs to be changed later on based on what needs to be set
    const media = tweet.extended_entities ? tweet.extended_entities.media : null
    const media_url = media ? media[0].media_url : null;
    
    const cardMedia = tweet.extended_entities ?   ( <CardMedia
      className={classes.media}
      image={media_url}
      title="This is your media"
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
            value={annotations}
            onAdd={(chip) => this.handleAddChip(chip)}
            onDelete={(chip, index) => this.handleDeleteChip(chip, index)}                  
            helperText={"annotations to annotate tweets"}
            placeholder={"Enter annotation followed by an Enter"}
            fullWidth
            chipRenderer = {(
              {
                value,
                handleClick,
                handleDelete,
                className
              },
              key
            ) => (
              <Chip
                key={key}
                className={className}
                style={value.auth_user ? {
                  backgroundColor: "#"+this.intToRGB(this.hashCode(value.auth_user))
                }: null}
                onClick={handleClick}
                onDelete={handleDelete}
                label={value.tag}
                
              />
            )}

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
  annotations:  state.annotationReducer.annotations,
})
const mapDispatchToProps = {
  fetchTags: fetchTags,
  addAnnotation: addAnnotation,
  deleteTag: deleteTag
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TweetCard));
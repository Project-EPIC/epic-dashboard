import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { styles } from "./styles";
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { defaultProfileImage } from "../profileBase64";
import { Link } from "@material-ui/core";
import ReactTimeAgo from 'react-time-ago'
import { Chip, Tooltip } from '@material-ui/core';
import CloseIcon from "@material-ui/icons/Close"
import {  deleteTag } from "../../../../actions/annotationActions"
import {colorFromText,contrastColorForText} from "../colorChip"
import DoneAllIcon from "@material-ui/icons/DoneAll"

class TweetItem extends Component {

    handleDelete = (tag) => {    
        debugger;
        this.props.deleteTag(tag, this.props.tweet.id_str, this.props.eventId)
    }

    addDefaultSrc(ev) {
        ev.target.src = defaultProfileImage
    }

    render() {
        const { tweet, classes, eventId } = this.props;
        const currentTags = this.props.annotations.filter(item => (item.tweet_id === tweet.id_str && item.event_name === eventId))


        return (
            <div>
                <div className={classes.chipArraySmall} >
                    {currentTags.map(tag =>
                    <Tooltip key={`${tag.tag} ${tag.tweet_id}`}  title={`Owner ${tag.auth_user}`}>
                        <Chip label={tag.tag} style={{backgroundColor: colorFromText(tag.tag), color: contrastColorForText(tag.tag) }} className={classes.chip} onDelete={(e)=>this.handleDelete(tag.tag)} deleteIcon={<CloseIcon />} />
                    </Tooltip>
                    )}
                </div>
                <Link href={`https://twitter.com/${tweet.user.screen_name}`} target="_blank" className={classes.tableCell}>
                    <img className={classes.avatar}
                        onError={this.addDefaultSrc}
                        src={tweet.user.profile_image_url_https}
                        alt="Avatar" />
                </Link>

                <div className={classes.tableCell} style={{ width:"100%"}}>
                    <div className={classes.titleChips} >
                        <Link paragraph color="inherit" className={classes.profileLink} href={`https://twitter.com/${tweet.user.screen_name}`} target="_blank">
                            <Typography style={{display: 'inline-block'}} variant="body1"><b>{tweet.user.name}</b></Typography>
                        </Link>
                        {tweet.user.verified ? 
                            <Tooltip title="User Verified">
                                <DoneAllIcon color="primary" style={{paddingTop:8}}/>
                            </Tooltip>
                            :null}
                        <span> </span>
                        <Typography style={{display: 'inline-block'}} paragraph inline variant="caption" color="textSecondary">
                            <Link href={`https://twitter.com/${tweet.user.screen_name}`} color="inherit" target="_blank">@{tweet.user.screen_name}</Link> <span className={classes.mediumReady}>- <Link color="inherit" href={`https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`} target="_blank"><ReactTimeAgo timeStyle="twitter" date={parseInt(tweet.timestamp_ms, 10)} /></Link></span>
                        </Typography>
                        <div className={classes.chipArrayMedium} >
                            {currentTags.map(tag =>
                            <Tooltip key={`${tag.tag} ${tag.tweet_id}`}  title={`Owner ${tag.auth_user}`}>
                                <Chip label={tag.tag} style={{backgroundColor: colorFromText(tag.tag),color: contrastColorForText(tag.tag)}} className={classes.chip} onDelete={(e)=>this.handleDelete(tag.tag)} deleteIcon={<CloseIcon style={{color: contrastColorForText(tag.tag)}} />} />
                            </Tooltip>
                            )}
                        </div>
                    </div>
                    
                    <Typography variant="body2" className={classes.mediumReady}>
                        {tweet.text}
                    </Typography>
                </div>
                <Typography variant="body2" className={classes.smallReady}>
                    {tweet.text}
                </Typography>
            </div>


        );
    }
}

TweetItem.propTypes = {
    classes: PropTypes.object.isRequired,
    tweet: PropTypes.object
};

const mapStateToProps = state => ({
    annotations: state.annotationReducer.annotations,
})

const mapDispatchToProps = {
    deleteTag: deleteTag
}


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TweetItem));
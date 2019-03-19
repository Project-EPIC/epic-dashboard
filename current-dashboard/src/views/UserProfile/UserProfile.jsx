import React, { Component } from "react";
import CreateEvent from "components/CreateEvent/CreateEvent";
import ListEvents from "components/ListEvents/ListEvents";
// import Posts from "components/Posts/Posts";
// import Postform from "../../components/PostForm/Postform";
class UserProfile extends Component {
  render() {
    return (
      <div className="content">
      <CreateEvent/>
      <ListEvents />
      </div>
    );
  }
}

export default UserProfile;

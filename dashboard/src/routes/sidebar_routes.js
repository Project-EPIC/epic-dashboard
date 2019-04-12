import React from "react";
import PeopleIcon from "@material-ui/icons/People";

const sidebarRoutes = [
    {
      id: "Epic Collect APIs",
      children: [
        { id: "Events API", icon: <PeopleIcon />, targetUrl: "/eventsapi"},
        { id: "Tweet Annotation", icon: <PeopleIcon />, targetUrl: "/tweetannotation" },
        
      ]
    },
    {
      id: "Users",
      children: [
        { id: "Manage users", icon: <PeopleIcon />, targetUrl: "/users" },
      ]
    }
  ];

  export default sidebarRoutes;
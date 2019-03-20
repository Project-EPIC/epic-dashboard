import React from "react";
import PeopleIcon from "@material-ui/icons/People";

const sidebarRoutes = [
    {
      id: "Epic Collect APIs",
      children: [
        { id: "Events API", icon: <PeopleIcon />, targetUrl: "/eventsapi", active: true },
        { id: "Tweet Annotation", icon: <PeopleIcon />, targetUrl: "/tweetannotation" }
      ]
    }
  ];

  export default sidebarRoutes;
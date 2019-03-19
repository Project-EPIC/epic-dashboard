import React from "react";
import PeopleIcon from "@material-ui/icons/People";

const sidebarRoutes = [
    {
      id: "Epic Collect APIs",
      children: [
        { id: "Events API", icon: <PeopleIcon />, targetUrl: "/eventsapi", active: true }
      ]
    }
  ];

  export default sidebarRoutes;
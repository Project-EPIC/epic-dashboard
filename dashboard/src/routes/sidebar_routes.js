import React from "react";
import PeopleIcon from "@material-ui/icons/People";
import WarningIcon from "@material-ui/icons/Warning";
import CollectionsBookmarkIcon from "@material-ui/icons/CollectionsBookmark";

const sidebarRoutes = [
    {
      id: "Epic Collect APIs",
      children: [
        { id: "Events", icon: <CollectionsBookmarkIcon />, targetUrl: "/events/"}, 
      ]
    },
    {
      id: "Users",
      children: [
        { id: "Manage users", icon: <PeopleIcon />, targetUrl: "/users/" },
      ]
    },
    {
      id: "National Weather Service",
      children: [
        { id: "NWS Active Alerts", icon: <WarningIcon />, targetUrl: "/alerts/" },
      ]
    }

  ];

  export default sidebarRoutes;
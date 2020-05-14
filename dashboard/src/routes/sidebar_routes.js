import React from "react";
import PeopleIcon from "@material-ui/icons/People";
import WarningIcon from "@material-ui/icons/Warning";
import CollectionsBookmarkIcon from "@material-ui/icons/CollectionsBookmark";

const sidebarRoutes = [
    {
      id: "Epic Collect APIs",
      children: [
        { id: "Keyword Events", icon: <CollectionsBookmarkIcon />, targetUrl: "/events/keywords/"},
        { id: "Follow Events", icon: <CollectionsBookmarkIcon />, targetUrl: "/events/follows/"},
        { id: "Covid19 Events", icon: <CollectionsBookmarkIcon />, targetUrl: "/events/covid19/"}
      ]
    },
    {
      id: "National Weather Service",
      children: [
        { id: "NWS Active Alerts", icon: <WarningIcon />, targetUrl: "/alerts/" },
      ]
    },
    {
      id: "Users",
      children: [
        { id: "Manage users", icon: <PeopleIcon />, targetUrl: "/users/" },
      ]
    },
  ];

  export default sidebarRoutes;
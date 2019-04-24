import React from "react";
import PeopleIcon from "@material-ui/icons/People";
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
    }

  ];

  export default sidebarRoutes;
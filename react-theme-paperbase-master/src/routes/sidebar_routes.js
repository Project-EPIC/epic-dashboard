import React from "react";
import PeopleIcon from "@material-ui/icons/People";

const categories = [
    {
      id: "Links Category 1",
      children: [
        { id: "Events API", icon: <PeopleIcon />, targetUrl: "/component1", active: true }
      ]
    }
  ];

  export default categories;
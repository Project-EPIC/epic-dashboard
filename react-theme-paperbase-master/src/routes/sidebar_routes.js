import PeopleIcon from "@material-ui/icons/People";
import DnsRoundedIcon from "@material-ui/icons/DnsRounded";
import PermMediaOutlinedIcon from "@material-ui/icons/PhotoSizeSelectActual";
import PublicIcon from "@material-ui/icons/Public";
import SettingsEthernetIcon from "@material-ui/icons/SettingsEthernet";
import SettingsInputComponentIcon from "@material-ui/icons/SettingsInputComponent";
import TimerIcon from "@material-ui/icons/Timer";
import SettingsIcon from "@material-ui/icons/Settings";
import PhonelinkSetupIcon from "@material-ui/icons/PhonelinkSetup";
import React from "react";

const categories = [
    {
      id: "Links Category 1",
      children: [
        { id: "Component 1", icon: <PeopleIcon />, targetUrl: "/component1", active: true },
        { id: "Component 2", icon: <DnsRoundedIcon />, targetUrl: "/component2" },
        { id: "Storage", icon: <PermMediaOutlinedIcon />, targetUrl: "/storage" },
        { id: "Hosting", icon: <PublicIcon />, targetUrl: "/hosting" },
        { id: "Functions", icon: <SettingsEthernetIcon />, targetUrl: "/functions" },
        { id: "ML Kit", icon: <SettingsInputComponentIcon />, targetUrl: "/mlkit" }
      ]
    },
    {
      id: "Links Category 2",
      children: [
        { id: "Analytics", icon: <SettingsIcon />, targetUrl: "/analytics" },
        { id: "Performance", icon: <TimerIcon />, targetUrl: "/performance" },
        { id: "Test Lab", icon: <PhonelinkSetupIcon />, targetUrl: "/testlab" }
      ]
    }
  ];

  export default categories;
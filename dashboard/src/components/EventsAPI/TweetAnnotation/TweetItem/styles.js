export const styles = theme => ({
    avatar: {
        marginTop: 5,
        width: 40,
        height: 40,
        borderRadius: '50%',
        [theme.breakpoints.down('sm')]: {
            width: 30,
            height: 30,
        }
      },
      tableCell: {
        display: "table-cell",
        verticalAlign: "top",
        paddingRight: 10,
      },
      profileLink: {
        width: "auto",
        textDecoration: "none",
        color: theme.palette.text
      },
      chip: {
        marginRight: theme.spacing(1),
        marginBottom: theme.spacing(1),
        borderRadius:"5%",
        height: 20,
      },
      titleChips: {
        width:"auto",
        height: 20 + theme.spacing(1),
      },
      chipArraySmall:{
        [theme.breakpoints.up('md')]: {
            display: "none"
        }
      },
      chipArrayMedium:{
        float: "right",
        [theme.breakpoints.down('sm')]: {
            display: "none"
        }
      },
      smallReady: {
          display: "none",
          [theme.breakpoints.down('sm')]: {
            display: "inherit",
          }
      },
      mediumReady: {
        display: "none",
        [theme.breakpoints.up('md')]: {
          display: "inherit",
        }
    }
     
  });
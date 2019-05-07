export const styles = theme => ({
   root:{
       padding:theme.spacing.unit
   },
   alignIcon: {
   
    verticalAlign: "bottom",
  },
  rootInput: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: "100%",
  },
  tableCell: {
    display: "table-cell",
    verticalAlign: "top",
    paddingRight: 10,
  },
  avatar: {
    marginTop:5,
    width: 50,
    height: 50,
    borderRadius: '50%',
    [theme.breakpoints.down('sm')]: {
        width: 40,
        height: 40,
    }
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4,
  },
});
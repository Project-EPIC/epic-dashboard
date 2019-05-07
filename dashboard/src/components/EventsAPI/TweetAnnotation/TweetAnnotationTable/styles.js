export const styles = theme => ({
    root: {
      width: '100%',
      marginBottom: theme.spacing.unit * 3,
      
    },
    chip: {
      margin: theme.spacing.unit * 0.5,
    },
    popOver: {
      padding: theme.spacing.unit,
    },
    chartPaper: {
      width: '100%',
      ...theme.mixins.gutters(),
      marginBottom: theme.spacing.unit * 3,
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 1,
    },
    table: {
      minWidth: 500,
    },
    tableWrapper: {
      overflowX: 'auto',
      
    },
    input: {
      marginLeft: 8,
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    rootInput: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: "100%",
    },
  });
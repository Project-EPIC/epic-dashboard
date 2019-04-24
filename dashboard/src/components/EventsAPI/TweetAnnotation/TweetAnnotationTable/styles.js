export const styles = theme => ({
    root: {
      width: '100%',
      marginBottom: theme.spacing.unit * 3,
      
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
  });
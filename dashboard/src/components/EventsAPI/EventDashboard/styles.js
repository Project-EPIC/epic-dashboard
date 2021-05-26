export const styles = theme => ({
  chartPaper: {
    width: '100%',
    ...theme.mixins.gutters(),
    marginBottom: theme.spacing(3),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1),
  },
  leftIcon: {
    marginRight: theme.spacing(1),
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
  iconSmall: {
    fontSize: 20,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
});
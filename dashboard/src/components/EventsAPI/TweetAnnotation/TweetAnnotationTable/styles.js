export const styles = theme => ({
  root: {
    width: '100%',
    marginBottom: theme.spacing(3),

  },
  chip: {
    margin: theme.spacing(0.5),
  },
  popOver: {
    padding: theme.spacing(1),
  },
  chartPaper: {
    width: '100%',
    ...theme.mixins.gutters(),
    marginBottom: theme.spacing(3),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(1),
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
  MTableToolbarContainer: {
    display: "flex",
    justifyContent: "space-between",
    padding: "1em 1em 0.25em 0.5em"
  },
  noFloatButton: {
    boxShadow: "none",
    height: "100%",
  },
  modalContainer: {
    display: "flex",
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    height: "70vh"
  },
  fetchMessage: {
    margin: "0 5px 0 0",
    verticalAlign: "middle"
  }
});
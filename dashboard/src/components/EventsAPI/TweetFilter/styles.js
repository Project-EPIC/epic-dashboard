export const styles = theme => ({
  cardContainer: {
    height: "100%",
    width: "100%",
    minWidth: 600,
  },
  card: {
    overflowY: "auto",
    overflowX: "hidden",
    height: "97%"
  },
  dateContainer: {
    display: "flex",
    justifyContent: "space-evenly",
  },
  languageContainer: {
    margin: theme.spacing.unit,
    minWidth: 200,
  },
  buttonContainer: {
    position: "fixed",
    right: 0,
    bottom: 0,
    padding: "5px"
  }
});
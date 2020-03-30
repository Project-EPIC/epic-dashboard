export const styles = (theme) => ({
    root: {
        width: "100%"
    },
    expressionTextContainer: {
        margin: "0 10px 0 10px"
    },
    expressionTextChip: {
        maxWidth: "35vw",
        "& span": {
            display: "block",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "100%",       
        }
    },
    predicateCard: {
        height: "99%",
        width: "99%"
    },
    predicateDeleteContainer: {
        textAlign: "end"
    }
});
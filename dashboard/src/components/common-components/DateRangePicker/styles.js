export const styles = theme => ({
    day: {
        width: 36,
        height: 36,
        fontSize: theme.typography.caption.fontSize,
        margin: "0 2px",
        color: "inherit",
    },
    nonCurrentMonthDay: {
        color: theme.palette.text.disabled,
    },
    highlightNonCurrentMonthDay: {
        color: "#676767",
    },
    highlight: {
        background: theme.palette.primary.main,
        color: theme.palette.common.white,
    },
    firstHighlight: {
        borderTopLeftRadius: "50%",
        borderBottomLeftRadius: "50%",
    },
    endHighlight: {
        borderTopRightRadius: "50%",
        borderBottomRightRadius: "50%",
    },
    bothHighlight: {
        borderRadius: "50%"
    }
});
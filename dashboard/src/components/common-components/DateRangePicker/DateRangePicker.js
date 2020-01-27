import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { InlineDatePicker } from "material-ui-pickers";
// import { styles } from "./styles";
import { IconButton } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';

class DateRangePicker extends Component {
	handleDateStartChange = (newDate) => {
		if (newDate.isSameOrBefore(this.props.dateRangeEnd)) {
			this.props.setDateRangeStart(newDate);
		}
	}

	handleDateEndChange = (newDate) => {
		if (newDate.isSameOrAfter(this.props.dateRangeStart)) {
			this.props.setDateRangeEnd(newDate);
		}
	}

	renderWrappedRange = (date, selectedDate, dayInCurrentMonth) => {
		const {classes} = this.props
		const isWithin = date.isBetween(this.props.dateRangeStart, this.props.dateRangeEnd, null, "()")
		const isStart = date.isSame(this.props.dateRangeStart)
		const isEnd = date.isSame(this.props.dateRangeEnd)

		var wrapperClassName = "";
		if (dayInCurrentMonth) {
			if (isWithin) {
				wrapperClassName = classes.highlight
			}
			else if (isStart) {
				wrapperClassName = `${classes.highlight} ${classes.firstHighlight}`
			}
			else if (isEnd) {
				wrapperClassName = `${classes.highlight} ${classes.endHighlight}`
			}
		}

		const outOfMinMaxBounds = !date.isBetween(this.props.dateStart.startOf("day"), this.props.dateEnd.startOf("day"), null, "[]")
		var dayClassName = "";
		if (outOfMinMaxBounds) {
			dayClassName = classes.nonCurrentMonthDay
		}
		else if (!dayInCurrentMonth && isWithin) {
			dayClassName = classes.highlightNonCurrentMonthDay
		}

		return (
			<div className={wrapperClassName}>
				<IconButton className={`${classes.day} ${dayClassName}`}>
					<span>{dayInCurrentMonth ? date.date() : ""}</span>
				</IconButton>
			</div>
		)
	}

	render() {
		return (
			<React.Fragment>
				<InlineDatePicker
					variant="outlined"
					label="Start Date"
					minDate={this.props.dateStart}
					minDateMessage={"There is no event data before this date."}
					maxDate={this.props.dateEnd}
					maxDateMessage={"There is no event data after this date."}
					value={this.props.dateRangeStart}
					onChange={this.handleDateStartChange}
					renderDay={this.renderWrappedRange}
					format={"MM/DD/YYYY"}
					mask={[/\d/,/\d/,"/",/\d/,/\d/,"/",/\d/,/\d/,/\d/,/\d/]}
				/>
				<InlineDatePicker
					variant="outlined"
					label="End Date"
					minDate={this.props.dateStart}
					minDateMessage={"There is no event data before this date."}
					maxDate={this.props.dateEnd}
					maxDateMessage={"There is no event data after this date."}
					value={this.props.dateRangeEnd}
					onChange={this.handleDateEndChange}
					renderDay={this.renderWrappedRange}
					format={"MM/DD/YYYY"}
					mask={[/\d/,/\d/,"/",/\d/,/\d/,"/",/\d/,/\d/,/\d/,/\d/]}
				/>
			</React.Fragment>
		)
	}
}

const styles = theme => ({
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
});

DateRangePicker.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DateRangePicker);
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DatePicker } from "@material-ui/pickers";
import { styles } from "./styles";
import { IconButton } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';

class DateRangePicker extends Component {
	handleDateStartChange = (newDate) => {
		if (newDate.isSameOrBefore(this.props.dateRangeEnd)) {
			this.props.setStartDate(newDate);
		}
	}

	handleDateEndChange = (newDate) => {
		if (newDate.isSameOrAfter(this.props.dateRangeStart)) {
			this.props.setEndDate(newDate);
		}
	}

	renderWrappedRange = (date, selectedDate, dayInCurrentMonth) => {
		const { classes } = this.props;
		const isWithin = date.isBetween(this.props.dateRangeStart, this.props.dateRangeEnd, null, "()");
		const isStart = date.isSame(this.props.dateRangeStart.startOf("day"));
		const isEnd = date.isSame(this.props.dateRangeEnd.startOf("day"));

		var wrapperClassName = "";
		if (dayInCurrentMonth) {
			if (isWithin) {
				wrapperClassName = classes.highlight;
			}
			else if (isStart && isEnd) {
				wrapperClassName = `${classes.highlight} ${classes.bothHighlight}`;
			}
			else if (isStart) {
				wrapperClassName = `${classes.highlight} ${classes.firstHighlight}`;
			}
			else if (isEnd) {
				wrapperClassName = `${classes.highlight} ${classes.endHighlight}`;
			}
		}

		const outOfMinMaxBounds = !date.isBetween(this.props.dateStart.startOf("day"), this.props.dateEnd.startOf("day"), null, "[]");
		var dayClassName = "";
		if (outOfMinMaxBounds) {
			dayClassName = classes.nonCurrentMonthDay;
		}
		else if (!dayInCurrentMonth && isWithin) {
			dayClassName = classes.highlightNonCurrentMonthDay;
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
				<DatePicker
					variant="inline"
					label="Start Date"
					minDate={this.props.dateStart.startOf("day")}
					minDateMessage={"There is no event data before this date."}
					maxDate={this.props.dateEnd.endOf("day")}
					maxDateMessage={"There is no event data after this date."}
					value={this.props.dateRangeStart}
					onChange={this.handleDateStartChange}
					renderDay={this.renderWrappedRange}
					format={"MM/DD/YYYY"}
					mask={[/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/]}
				/>
				<DatePicker
					variant="inline"
					label="End Date"
					minDate={this.props.dateStart.startOf("day")}
					minDateMessage={"There is no event data before this date."}
					maxDate={this.props.dateEnd.endOf("day")}
					maxDateMessage={"There is no event data after this date."}
					value={this.props.dateRangeEnd}
					onChange={this.handleDateEndChange}
					renderDay={this.renderWrappedRange}
					format={"MM/DD/YYYY"}
					mask={[/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/]}
				/>
			</React.Fragment>
		)
	}
}

DateRangePicker.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DateRangePicker);
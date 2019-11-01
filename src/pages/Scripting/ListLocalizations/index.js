import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

import api from '../../../services/api';


const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
		boxSizing: `border-box`,
		border: `1px solid transparent`,
		height: `100%`,
		borderRadius: `3px`,
		// boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
		fontSize: `14px`,
		outline: `none`,
		textOverflow: `ellipses`,
		overflow: 'auto',
	},
}));


export default function ListLocalizations({ localizations, handleLocalizationChange }) {
	const classes = useStyles();
	const [checkeds, setCheckeds] = useState([]);
	const [options, setOptions] = useState([]);

	useEffect(() => {
		api.get('api/v1/localization')
			.then(res => setOptions(res.data.results));

		localizations && setCheckeds(localizations.map(item => item.id ? item.id : item));
	}, [])

	const getItemInList = (item, listItems) => listItems.indexOf(item);

	const handleToggle = valueItem => () => {
		const item = valueItem.id ? valueItem.id : valueItem;
		const currentIndex = getItemInList(item, checkeds)

		let newChecked = [...checkeds];

		if (currentIndex === -1) {
			newChecked.push(item);
		} else {
			newChecked.splice(currentIndex, 1);
		};

		setCheckeds(newChecked);

		let newLocalizations = [];

		options.map(item_option => {
			newChecked.map(item_checked => {
				if (item_option.id === item_checked) {
					newLocalizations.push(item_option);
				};

				return item_checked;
			});

			return item_option;
		});

		handleLocalizationChange(newLocalizations);
	};

	return (
		<List dense className={classes.root} subheader={<b>Localizações</b>}>
			{options.map(option => {
				const labelId = `checkbox-list-secondary-label-${option.id}`;

				return (
					<ListItem key={option.id}>
						<ListItemText
							id={labelId}
							primary={<div style={{ fontSize: 11 }}>{option.code} - {option.description} / {option.address}</div>}
						/>
						<ListItemSecondaryAction>
							<Checkbox
								edge="end"
								onChange={handleToggle(option.id)}
								checked={getItemInList(option.id, checkeds) > -1}
								inputProps={{ 'aria-labelledby': labelId }}
							/>
						</ListItemSecondaryAction>
					</ListItem>
				);
			})}
		</List>
	);
};
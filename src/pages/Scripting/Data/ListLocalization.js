import React, { useEffect, useState } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

import api from '../../../services/api';
import { StyledSubList, StyledTitleLocalization } from '../styled';



export default function ListLocalizations({ localizations, handleLocalizationChange }) {
	const [checkeds, setCheckeds] = useState([]);
	const [options, setOptions] = useState([]);

	useEffect(() => {
		api.get('v1/localization')
			.then(res => setOptions(res.data.results));
	}, []);

	useEffect(() => {
		localizations && setCheckeds(
			localizations.map(item => item.id ? item.id : item)
		);

		return () => setCheckeds([]);
	}, [localizations, setCheckeds]);

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
		<>
			<StyledTitleLocalization children="Localizações" />

			<StyledSubList dense>
				{options.map(option => {
					const labelId = `checkbox-list-secondary-label-${option.id}`;

					return (
						<ListItem key={option.id}>
							<ListItemText
								id={labelId}
								primary={
									<div style={{ fontSize: 11 }}>
										{option.code} - {option.description}
									</div>
								}
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
			</StyledSubList>
		</>
	);
};

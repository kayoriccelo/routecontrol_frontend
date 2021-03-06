import React from 'react';
import { compose, withProps, lifecycle } from "recompose";
import { withScriptjs } from "react-google-maps";
import { StandaloneSearchBox } from "react-google-maps/lib/components/places/StandaloneSearchBox";

import key from '../key';


const PlacesWithStandaloneSearchBox = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=" + key.apiKey + "&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
    }),
    lifecycle({
        componentWillMount() {
            const refs = {}

            this.setState({
                places: [],
                value: this.props.valueInput,
                onSearchBoxMounted: ref => {
                    refs.searchBox = ref;
                },
                onPlacesChanged: () => {
                    const places = refs.searchBox.getPlaces();

                    this.setState({
                        places: places,
                        value: places[0].formatted_address
                    });

                    this.props.handleChangeLatitude({
                        target: { value: places[0].geometry.location.lat() }
                    })
                    
                    this.props.handleChangeLongitude({
                        target: { value: places[0].geometry.location.lng() }
                    })

                    this.props.handleChangeAddress({
                        target: { value: places[0].formatted_address }
                    })
                },
                onChangeSearch: event => {
                    this.setState({
                        value: event.target.value
                    })
                }
            })
        },
    }),
    withScriptjs
)(props =>
    <div>
        <StandaloneSearchBox
            ref={props.onSearchBoxMounted}
            bounds={props.bounds}
            onPlacesChanged={props.onPlacesChanged}
        >
            <input
                type="text"
                placeholder={props.label}
                style={{
                    boxSizing: `border-box`,
                    border: `1px solid transparent`,
                    width: `100%`,
                    height: `32px`,
                    padding: `0 12px`,
                    borderRadius: `3px`,
                    boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                    fontSize: `14px`,
                    outline: `none`,
                    textOverflow: `ellipses`
                }}
                value={props.value}
                onChange={props.onChangeSearch}
            />
        </StandaloneSearchBox>
    </div>
);

export default function SearchLocalizationMap(props) {
    return (
        <PlacesWithStandaloneSearchBox {...props} />
    )
}
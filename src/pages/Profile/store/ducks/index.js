import { setTitle } from '../../../../components/Route/store/ducks';
import { showMessage } from '../../../../components/Message/store/ducks';
import { loadUser } from '../../../../auth/store/ducks';
import { loadDefault, saveDefault } from '../../../../commons/store/ducks/actions';


export { setTitle, showMessage, loadUser };

export const Types = {
    GET: 'profile/GET',
    PUT: 'profile/PUT',
};

export const load = () => loadDefault('-1', 'profile', Types.GET);

export const update = (profile, history) => saveDefault(profile, 'profile', Types.PUT, history, '/dashboard');

export const initialState = {
    instance: null
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case Types.GET:
            return { ...state, instance: action.payload };

        case Types.PUT:
            return { ...state, instance: action.payload };

        default:
            return state;
    };
};

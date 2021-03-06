import { setTitle } from '../../../../components/Route/store/ducks';
import { getListDefault, loadDefault, saveDefault, removeDefault } from '../../../../commons/store/ducks/actions';
import { setPages } from '../../../../components/List/Pagination/store/ducks';


export { setTitle };

export const Types = {
    LIST: 'employee/LIST',
    GET: 'employee/GET',
    PUT: 'employee/PUT',
    POST: 'employee/POST',
    DELETE: 'employee/DELETE'
};

export function createInstance() {
    return {
        cpf: '',
        name: '',
        email: '',
        phone: ''
    };
};

export const getList = (page, pageSize, search = '') =>
    getListDefault(search, page, pageSize, 'employee', Types.LIST);

export const load = id => loadDefault(id, 'employee', Types.GET);

export const save = (employee, history) =>
    saveDefault(employee, 'employee', Types.POST, history, '/registration/employee');

export const remove = (id, page, pageSize) =>
    removeDefault(id, 'employee', [getList(page, pageSize), setPages(page, pageSize)]);

export const initialState = {
    data: { itens: [], count: 0 },
    instance: null,
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case Types.LIST:
            return {
                ...state, data: {
                    itens: action.payload.results,
                    count: action.payload.count
                }
            };

        case Types.GET:
            return { ...state, instance: action.payload };

        case Types.POST:
            return { ...state, instance: action.payload };

        case Types.PUT:
            return { ...state, instance: action.payload };

        case Types.DELETE:
            return { ...state };

        default:
            return state;
    };
};

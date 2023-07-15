
const initialState = {
    email: '',
    token: '',
   password: '',

    passRequest: false,
    passFailed: false,
    passError: null,

    newPassRequest: false,
    newPassFailed: false,
    newPassError: null,

}
export const getPass =  (state = initialState, action) => {
    switch (action.type) {

        case 'GET_PASS_REQUEST': {
            return {
                ...state,
                passRequest: true,
                passFailed: false
            };
        }
        case  'GET_PASS_SUCCESS': {
            return {
                ...state,
                email: action.payload.email,
                passRequest: false

            }
        }
        case 'GET_PASS_FAILED': {
            return {
                ...state,
                passFailed: true,
                passRequest: false,
                passError: action.payload
            };
        }

        case 'GET_NEW_PASSWORD_REQUEST': {
            return {
                ...state,
                newPassRequest: true,
                newPassFailed: false
            };
        }
        case  'GET_NEW_PASSWORD_SUCCESS': {
            return {
                ...state,
                password: action.payload,
                token: action.payload,
                newPassRequest: false

            }
        }
        case 'GET_NEW_PASSWORD_FAILED': {
            return {
                ...state,
                newPassFailed: true,
                newPassRequest: false,
                newPassError: action.payload
            };
        }

        default: {
            return state;
        }

    }
}

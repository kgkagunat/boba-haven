import { useMutation } from '@apollo/client';
import { LOGIN, ADD_USER } from '../graphQL/mutations';

const AuthService = () => {
    const [login, { data: loginData }] = useMutation(LOGIN);
    const [signup, { data: signupData }] = useMutation(ADD_USER);

    const logUserIn = async (email, password) => {
        try {
            const { data } = await login({ variables: { email, password } });
            return data.login;  // { token, user }
        } catch (error) {
            console.error("Error logging in:", error);
            throw error;
        }
    };

    const signUpUser = async (name, email, password) => {
        try {
            const { data } = await signup({ variables: { name, email, password } });
            return data.addUser;  // { token, user }
        } catch (error) {
            console.error("Error signing up:", error);
            throw error;
        }
    };

    return {
        logUserIn,
        signUpUser,
        loginData,
        signupData
    };
};

export default AuthService;

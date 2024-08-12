import { useMutation } from 'react-query';
import { useCallback } from 'react';
import { UserAppService } from '../../../services/UserService';
import { useUserContext } from '../../../contexts/UserContext';
import { InUser } from '../../../services/UserService/Models/Input/InUser';

export const useSignIn = () => {
    const userAppService = new UserAppService();
    const { setUser } = useUserContext();

    const { mutate, isLoading, isError, error, status, isSuccess } = useMutation(
        (user: InUser) => userAppService.login(user),
        {
            onSuccess: ({ data }) => {
                setUser({
                    email: data.email,
                    password: '',
                    id: data.id
                });
            }
        }
    );

    const mutateSubmitLogin = useCallback(
        (user: InUser) => {
            mutate(user);
        },
        [mutate]
    );

    return {
        mutateSubmitLogin,
        isLoading,
        isError,
        error,
        status,
        isSuccess
    };
};

export default useSignIn;

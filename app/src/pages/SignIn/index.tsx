import { Formik, Field, Form } from 'formik';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import { useEffect, useState } from 'react';
import { UserFormValues } from './types';
import useSignIn from './hooks/useSignIn';
import validationSchema from './validate';
import { SignInViewModel } from './SignInViewModel';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';


const SignIn = () => {
    const [loginError, setLoginError] = useState<string>('');
    const { mutateSubmitLogin, isLoading, isError, error, status, } = useSignIn();
    const navigate = useNavigate();

    const initialValues: UserFormValues = {
        email: '',
        password: '',
    };

    const handleSubmit = (values: UserFormValues) => {
        const viewModel = new SignInViewModel({
            email: values.email,
            password: values.password,
            id: 0,
        });

        if (viewModel.email() === '' || viewModel.password() === '') {
            setLoginError('Erro no login. Por favor, verifique suas credenciais.');
            return;
        }

        setLoginError('');

        mutateSubmitLogin(viewModel.user)
    };

    useEffect(() => {
        if (status === 'success') {
            navigate('/todo');
        }
        if (isError) {
            setLoginError(`Erro: ${error instanceof AxiosError ? error.response?.data : 'Erro desconhecido'}`);
        }
    }, [isError, error, status, navigate]);

    return (
        <Formik<UserFormValues>
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
        >
            {({ values, handleChange, handleSubmit, touched, errors }) => (
                <Box width={400}>

                    <Form onSubmit={handleSubmit}>
                        <Box mt={2}>
                            <Typography variant="h4">Login</Typography>
                        </Box>
                        {loginError && (
                            <Alert severity="error" onClose={() => setLoginError('')}>
                                {loginError}
                            </Alert>
                        )}
                        <Box mt={2}>
                            <Field
                                as={TextField}
                                name="email"
                                label="Email"
                                value={values.email}
                                onChange={handleChange}
                                error={touched.email && !!errors.email}
                                helperText={touched.email && errors.email ? errors.email : ''}
                                fullWidth
                            />
                        </Box>
                        <Box mt={2}>
                            <Field
                                as={TextField}
                                name="password"
                                label="Password"
                                type="password"
                                value={values.password}
                                onChange={handleChange}
                                error={touched.password && !!errors.password}
                                helperText={touched.password && errors.password ? errors.password : ''}
                                fullWidth
                            />
                        </Box>
                        <Box mt={2}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                disabled={isLoading}
                            >
                                {isLoading ? 'Entrando...' : 'Entrar'}
                            </Button>
                        </Box>
                    </Form>
                </Box>
            )}
        </Formik>
    );
};

export default SignIn;

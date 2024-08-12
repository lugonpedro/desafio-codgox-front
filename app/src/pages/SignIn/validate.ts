import * as yup from 'yup';

const mensagemRequired = 'Obrigatório';

const validationSchema = yup.object().shape({
  email: yup.string()
    .email('Email inválido')
    .required(mensagemRequired),
  password: yup.string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'A senha deve conter pelo menos uma letra, um número, um símbolo e ter no mínimo 8 caracteres'
    )
    .required(mensagemRequired),
});

export default validationSchema;

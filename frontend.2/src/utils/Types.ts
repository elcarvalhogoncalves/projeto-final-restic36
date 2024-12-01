export type VagaProps = {
    id: number;
    title: String;
    description: String;
    date: String;
    phone: String;
    company: String;
};

export type UserProps = {
    id: number;
    nome: String;
    email: String;
    senha: String;
};

export type RootStackParamList = {
    Login: undefined;
    FormScreen: undefined;
    Home: undefined;
    Profile: undefined;
    Details: {id: number};
};
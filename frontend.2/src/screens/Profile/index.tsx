import React, { useContext, useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { 
    Wrapper,
    Container, 
    Header, 
    HeaderButtonContainer, 
    ButtonIcon, 
    ButtonText,
    ContentContainer,
} from '../Profile/styles';
import Logo from '../../components/Logo';
import theme from '../../theme';
import Input from '../../components/Input'
import { Button } from '../../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../services/api';
import { Text } from 'react-native';
import { AppContext } from '../../utils/context';

export default function Profile({navigation }) {
    const {user, isLoggedIn} = useContext(AppContext);
    const [id, setId] = useState(0);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState(false);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if(!isLoggedIn){
            navigation.navigate('Login');
            return;
          }
        setSuccess(false);
        setErro(false);
        const getUser = async () => {
            try {
                const jsonValue = await AsyncStorage.getItem('user');
                const user = jsonValue != null ? JSON.parse(jsonValue) : null;
                if (user) {
                    setLoading(false);
                    setId(user.id);
                    setNome(user.nome);
                    setEmail(user.email);
                    setSenha(user.senha);
                }
            } catch (e) {
                console.log(e);
            }
        }
        getUser();
    }, []);

    const handleChange = async () => {
        setErro(false);
        setSuccess(false);
        try {
            if(nome !== user.nome || email !== user.email || senha !== user.senha){
                const user = { nome, email, senha };
                const response = await api.put(`/usuarios/${id}`, user);
                if (response.status !== 200) {
                    setErro(true);
                    return;
                }
                const jsonValue = JSON.stringify(user);
                await AsyncStorage.setItem('user', jsonValue);
                setSuccess(true);
            }
        } catch (error) {
            console.log(error);
        }
    }

    if(loading){
        return <Text>Carregando...</Text>
    } else {
        return (
            <Wrapper>
                <Header>
                    <HeaderButtonContainer onPress={() => navigation.goBack()}>
                        <ButtonIcon>
                            <Feather size={16} name="chevron-left" color={theme.COLORS.BLUE} />
                        </ButtonIcon>
                        <ButtonText>
                            Voltar
                        </ButtonText>
                    </HeaderButtonContainer>
                    <Logo />
                </Header>
    
                <Container>
                    <ContentContainer>
                        <Input onChangeText={setNome} value={nome} label='Nome' placeholder='digite seu nome'/>
                        <Input onChangeText={setEmail} value={email} label='E-mail' placeholder='digite seu e-mail'/>
                        <Input onChangeText={setSenha} value={senha} label='Senha' placeholder='digite sua senha'/>
                    </ContentContainer>
                        {erro && <Text>Erro ao salvar informações</Text>}
                        {success && <Text>Informações salvas com sucesso</Text>}
                    <Button 
                        onPress={handleChange}
                        title="Salvar informações" 
                        noSpacing={true} 
                        variant='primary'
                        />
                </Container>
            </Wrapper>
        );
    }
    
}

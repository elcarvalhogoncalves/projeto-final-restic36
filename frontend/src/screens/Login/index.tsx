import { Image } from 'react-native';
import {useContext, useEffect, useState} from 'react';
import api from '../../services/api';
import { Wrapper,Container, Form, TextContainer, TextBlack, TextLink, TextLinkContainer } from './styles';


import BGTop from '../../assets/BGTop.png';
import Logo from '../../components/Logo';
import Input from '../../components/Input';
import { Button } from '../../components/Button';
import { AppContext } from '../../utils/context';
import { Text } from 'react-native';

export default function Login({ navigation }) {
    const {login, user} = useContext(AppContext);
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState(false);

    useEffect(() => {
        if( user ){
            navigation.navigate('Auth', {screen:'Home'})
        }
    }, []);


    const handleLogin = async () => {
        try{
            const response = await api.get('/usuarios')
            const users = response.data;
            const user = users.find(u => u.email===email && u.senha===senha);
            if(user){
                login(user);
                navigation.navigate('Auth', {screen:'Home'})

            }else{
                setErro(true);
                console.log("Falha no login.")
            }
        } catch(error){
            console.log(error);
        }
    }
    return (
        <Wrapper>
            <Image source={BGTop} />

            <Container>

                <Form>
                    <Logo />
                    {erro && <Text>Usuário ou senha inválidos</Text>}
                    <Input 
                        label='E-mail' 
                        placeholder='digite seu e-mail'
                        value={email}
                        onChangeText={setEmail}
                    />
                    <Input 
                        label='Senha' 
                        placeholder='digite sua senha'
                        value={senha}
                        onChangeText={setSenha}
                    />
                    <Button 
                    title="Entrar" 
                    noSpacing={true} 
                    variant='primary'
                    onPress={handleLogin}
                    />
                    <TextContainer>
                        <TextBlack>Não tem uma conta?</TextBlack>
                        <TextLinkContainer onPress={() => navigation.navigate('FormScreen')}>
                            <TextLink>
                                    Crie agora mesmo.
                            </TextLink>
                        </TextLinkContainer>
                    </TextContainer>
                </Form>

            </Container>
        </Wrapper>
    );
}

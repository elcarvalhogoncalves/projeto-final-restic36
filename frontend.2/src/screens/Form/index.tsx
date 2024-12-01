import { Image, Text } from 'react-native';
import { Wrapper,Container, Form, TextContainer, TextBlack, TextLink, TextLinkContainer } from './styles';
import BGTop from '../../assets/BGTop.png';
import Logo from '../../components/Logo';
import Input from '../../components/Input';
import { Button } from '../../components/Button';
import api from '../../services/api';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../utils/context';

export default function FormScreen({navigation}) {
    const {user} = useContext(AppContext);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState(false);

    useEffect(() => {
        if( user ){
            navigation.navigate('Auth', {screen:'Home'})
        }
    }, []);

    const handleRegister = async () => {
        try{
            const response = await api.post('/usuarios', {
                nome, 
                email, 
                senha
            });
            if(response.status === 201){
                navigation.navigate('Login');
                console.log("Cadastro realizado com sucesso!")
            }else{
                setErro(true);
                console.log("Falha no cadastro.")
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
                    {erro && <Text>Erro no cadastro</Text>}
                    <Input value={nome} onChangeText={setNome} label='Nome' placeholder='digite seu nome'/>
                    <Input value={email} onChangeText={setEmail} label='E-mail' placeholder='digite seu e-mail'/>
                    <Input value={senha} onChangeText={setSenha} label='Senha' placeholder='digite sua senha'/>
                    <Button onPress={handleRegister} title="Entrar" noSpacing={true} variant='primary'/>
                    <TextContainer>
                        <TextBlack>Já tem uma conta?</TextBlack>
                        <TextLinkContainer onPress={() => navigation.navigate('Login')}>
                            <TextLink>
                                    Faça seu login.
                            </TextLink>
                        </TextLinkContainer>
                    </TextContainer>
                </Form>

            </Container>
        </Wrapper>
    );
}

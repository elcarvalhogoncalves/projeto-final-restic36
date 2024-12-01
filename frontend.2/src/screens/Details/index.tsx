import React,{useState, useEffect, useContext} from 'react';
import { Feather } from '@expo/vector-icons';
import api from '../../services/api';
import { Alert, Linking } from 'react-native';
import { 
    Wrapper,
    Container, 
    Header, 
    HeaderButtonContainer, 
    ButtonIcon, 
    ButtonText,
    ContentContainer,
    Title,
    Description
} from '../Details/styles';
import Logo from '../../components/Logo';
import theme from '../../theme';
import { Button } from '../../components/Button';

import { VagaProps } from '../../utils/Types';
import { AppContext } from '../../utils/context';

export default function Details({route, navigation }) {
    useEffect(()=>{
        if(!route.params.id){
            navigation.goBack();
        }
        if(!isLoggedIn){
            navigation.navigate('Login');
        }
    }, []);

    const[id, setId] = useState(route.params.id);
    const[vaga, setVaga] = useState<VagaProps>(null);
    const [url, setUrl] = useState('');
    const {isLoggedIn} = useContext(AppContext);

    const fetchVaga = async ()=> {
        try{
            const response = await api.get(`/vagas/${id}`);
                const data = response.data;
                setVaga({
                id: data.id,
                title: data.titulo,
                date: data.dataCadastro,
                description: data.descricao,
                phone: data.telefone,
                company: data.empresa
                })
        }catch(error){
            console.log(error);
        }
    };

    useEffect(()=>{
        fetchVaga();
        setUrl(`https://wa.me/?text=Olá,%20gostaria%20de%20demonstrar%20interesse%20na%20vaga%20de%20%disponível%20no%20app%20VagaCerta.`);
    }, [id]);

    

    const openLink = () => {
        Linking.canOpenURL(url)
          .then((supported) => {
            if (supported) {
              Linking.openURL(url);
            } else {
              Alert.alert('Erro', 'Não foi possível abrir o link.');
            }
          })
          .catch(() => Alert.alert('Erro', 'Ocorreu um problema ao abrir o link.'));
      };

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

            {vaga?(
                <Container>
                <ContentContainer>
                    <Title>{vaga.title}</Title>
                    <Description>{vaga.description}</Description>
                </ContentContainer>

                <Button 
                    onPress={openLink}
                    title="Entrar em contato" 
                    noSpacing={true} 
                    variant='primary'
                    />
            </Container>
            ):(
             <Title>Não encontramos essa vaga :/</Title>
            )}

            
        </Wrapper>
    );
}

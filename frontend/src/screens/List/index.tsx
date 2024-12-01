import React, {useState, useEffect, useContext} from 'react';
import { Image, FlatList, View, Text } from 'react-native';
import api from '../../services/api';
import { Wrapper,Container, ListContainer, TextVagas } from './styles';
import BGTop from '../../assets/BGTop.png';
import Logo from '../../components/Logo';
import VagaCard from '../../components/VagaCard';
import { AppContext } from '../../utils/context';


export default function List({navigation}) {
    const {isLoggedIn, user} = useContext(AppContext);
    const [vagas, setVagas] = useState([]);
    const[isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const fetchVagas = async()=>{
        try{
          const response = await api.get('/vagas');
          setVagas(response.data); 
        }catch(error){
          console.log(error);
        }finally{
          setIsLoading(false);
        }
      };

      fetchVagas();
    }, []);

    return (
        <Wrapper>
            <Image source={BGTop} style={{maxHeight: 86}}/>

            <Container>

                <Logo />
                <TextVagas>{vagas.length} vagas encontradas!</TextVagas>
                <ListContainer>
                  {isLoading?(
                    <Text>Carregando...</Text>
                  ):(
                    <FlatList
                    data={vagas}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => 
                        <VagaCard
                            id={item.id}
                            title={item.titulo} 
                            dataCreated={item.dataCadastro}
                            company={item.empresa}
                        />
                    }
                    showsVerticalScrollIndicator={true}
                    ListEmptyComponent={() => (
                        <View>
                            <Text>
                                Sem vagas cadastradas :/
                            </Text>
                            <Text>
                                Crie vagas!!
                            </Text>
                        </View>
                     )}
                    />
                  )}
                    
                </ListContainer>
            </Container>
        </Wrapper>
    );
}

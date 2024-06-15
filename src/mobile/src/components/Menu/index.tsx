import { Container, Link } from "./styles"
import { Text } from "react-native"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from "@react-navigation/native"

export default function FooterMenu() {
    const navigation = useNavigation<any>()
    
    return (
        <Container>
            <Link onPress={() => navigation.navigate('Home')}>
                <Icon name='home' size={30}></Icon>
            </Link>
            <Link  onPress={() => navigation.navigate('Perfil')}>
                <Icon name='account' size={30}></Icon>
            </Link>
            <Link>
                <Icon name='home' size={30}></Icon>
            </Link>
            <Link>
                <Icon name='home' size={30}></Icon>
            </Link>


        </Container>
    )
}
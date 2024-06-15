import { Container, Link } from "./styles"
import { Text } from "react-native"
import Icon from 'react-native-vector-icons/Entypo'
import { useNavigation } from "@react-navigation/native"

export default function FooterMenu() {
    const navigation = useNavigation<any>()
    
    return (
        <Container>
            <Link>
                <Icon name='home' size={30}></Icon>
            </Link>
            <Link  onPress={() => navigation.navigate('User')}>
                <Icon name='home' size={30}></Icon>
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
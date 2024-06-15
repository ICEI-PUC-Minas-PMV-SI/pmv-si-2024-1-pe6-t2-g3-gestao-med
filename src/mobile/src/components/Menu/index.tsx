import { Container, Link } from "./styles"
import { useNavigation } from "@react-navigation/native"
import { House, Pill, User } from "phosphor-react-native"

export default function FooterMenu() {
    const navigation = useNavigation<any>()
    
    return (
        <Container>
            <Link onPress={() => navigation.navigate('Home')}>
                <House size={30} />
            </Link>
            <Link  onPress={() => navigation.navigate('Perfil')}>
                <User size={30} />
            </Link>
            <Link onPress={() => navigation.navigate('Medicamentos')}>
                <Pill size={30} />
            </Link>
        </Container>
    )
}
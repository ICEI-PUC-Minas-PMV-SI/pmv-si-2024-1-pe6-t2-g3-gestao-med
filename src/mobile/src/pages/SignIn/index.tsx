import { ActivityIndicator, Platform } from "react-native";

import {
    Background,
    Container,
    Logo,
    AreaInput,
    Input,
    SubmitButton,
    SubmitText,
    Link,
    LinkText
} from "./styles";

import { useNavigation } from '@react-navigation/native'
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/auth";

export default function SignIn() {

    const { signIn, loadingAuth } = useContext(AuthContext)

    const navigation = useNavigation<any>()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState("")

    const handleLogin = () => {
        signIn(email, password)
    }
    return (
        <Background>
            <Container
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                enabled
            >
                <Logo
                    source={require('../../assets/logotipo.png')}
                />

                <AreaInput>
                    <Input
                        placeholder="Seu email"
                        value={email}
                        onChangeText={(text) => setEmail(text)}

                    />
                </AreaInput>

                <AreaInput>
                    <Input
                        placeholder="Sua senha"
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry={true}
                    />
                </AreaInput>

                <SubmitButton activeOpacity={.8} onPress={handleLogin}>

                    {loadingAuth ? (
                        <ActivityIndicator size={20} color="#FFF" />
                    ) : (
                        <SubmitText>Cadastrar</SubmitText>
                    )}
                </SubmitButton>

                <Link onPress={() => navigation.navigate('SignUp')}>
                    <LinkText>Criar uma conta!</LinkText>
                </Link>
            </Container>
        </Background>
    )
}

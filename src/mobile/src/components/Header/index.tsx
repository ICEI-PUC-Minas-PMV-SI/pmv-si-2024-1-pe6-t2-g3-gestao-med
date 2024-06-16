import React from 'react'
import { Container, Title, ButtonMenu } from './styles'
import Icon from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native'

type HeaderProps = {
    title: string | null
}
export default function Header(props: HeaderProps){
    const navigation = useNavigation()
    return(
        <Container>
            <ButtonMenu onPress={() => navigation.openDrawer()}>
                <Icon name='menu' size={35} color="#FFF"></Icon>
            </ButtonMenu>
            { props.title && (
                <Title>{props.title}</Title>
            )}
        </Container>
    )
}
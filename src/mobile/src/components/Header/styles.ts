import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
    align-items: center;
    flex-direction: row;
    justify-content: flex-start;
    background-color: '#2585C0';
    margin-top: 30px;
    margin-left: 15px;
    margin-bottom: 15px;
    width: 100%;
    max-height: 60px;
    gap: 15px;
`

export const Title = styled.Text`
    font-size: 22px;
`

export const ButtonMenu = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
`
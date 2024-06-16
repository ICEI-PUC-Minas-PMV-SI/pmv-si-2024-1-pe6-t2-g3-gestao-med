import {  ActivityIndicator, GestureResponderEvent, Platform, Text, View } from "react-native"
import DateTimePicker from "@react-native-community/datetimepicker";

import FooterMenu from "../../components/Menu"
import Header from "../../components/Header";
import { 
    Background, 
    Screen,
    Label,
    Logo,
    AreaInput,
    Input,
    SubmitButton,
    SubmitText,
} from "./styles"
import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/auth";
import { MedicationsDTO } from "../Medications"; 
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";


export default function EditMedicate(){

    return(
        <Background>
            <KeyboardAwareScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                enableOnAndroid={true}
                extraScrollHeight={20}
                keyboardShouldPersistTaps='handled'
            >
            <Screen>
                <Header title="Editar Medicamentos" />
                <Logo source={require('../../assets/logotipo.png')}></Logo>
                <AreaInput>
                    {/* <Label>{data.name}</Label> */}
                    <Label>Nome do Medicamento:</Label>
                    <Input placeholder="Nome">
                    </Input>
                </AreaInput>

                <AreaInput>
                    <Label>Descrição:</Label>
                    <Input placeholder="Descrição">
                    </Input>
                </AreaInput>

                
                <AreaInput>
                    <Label>Estoque</Label>
                    <Input keyboardType='numeric' placeholder="Estoque">
                    </Input>
                </AreaInput>
               
                <AreaInput>
                    <Label>Período de Uso</Label>
                    <Input placeholder="Período de Uso">
                    </Input>
                </AreaInput>
                
                <SubmitButton>
                <SubmitText>Atualizar Dados</SubmitText>
                </SubmitButton>

                
            </Screen>
            
            <FooterMenu></FooterMenu>
            </KeyboardAwareScrollView>
        </Background>
    )
}
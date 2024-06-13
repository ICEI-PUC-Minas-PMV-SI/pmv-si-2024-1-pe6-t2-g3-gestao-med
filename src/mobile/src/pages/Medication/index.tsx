import React, { useContext, useState } from "react";
import { Platform, ActivityIndicator } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

import { AuthContext } from "../../contexts/auth";

import { Picker } from "@react-native-picker/picker";

import {
    Background,
    Container,
    AreaInput,
    Input,
    SubmitButton,
    SubmitText,
    Logo,
    StyledPicker
} from '../SignIn/styles'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";


export default function Medication() {

    let name: string;
    let description: string;
    let stock: number;
    let timeToTake: string;

    const handleSave = async () => {
        /*if (!name || !email || !password || !confirmPassword || !gender || !dateOfBirth) {
            alert("Preencha todos os campos");
            return;
        }
*/
        // verificar como enviar para o backend
    }

   
    return (
        <Background>
            <KeyboardAwareScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                enableOnAndroid={true}
                extraScrollHeight={20}
                keyboardShouldPersistTaps='handled'
            >
                <Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'} enabled>
                    <Logo source={require('../../assets/logotipo.png')}/>

                    <AreaInput>
                        <Input
                            placeholder="Nome"
                           // value={name}
                        />
                    </AreaInput>

                    <AreaInput>
                        <Input
                            placeholder="Descrição"
                            //value={description}
                        />
                    </AreaInput>

                    <AreaInput>
                        <Input
                            placeholder="Estoque inicial - opcional"
                           // value={stock}
                        />
                    </AreaInput>

                    <AreaInput>
                        <Input
                            placeholder="Período de uso"
                           // value={timeToTake}
                        />
                    </AreaInput>

                    <SubmitButton onPress={handleSave}>
                        <SubmitText>Cadastrar</SubmitText>
                    </SubmitButton>
                </Container>
            </KeyboardAwareScrollView>
        </Background>

    )
}

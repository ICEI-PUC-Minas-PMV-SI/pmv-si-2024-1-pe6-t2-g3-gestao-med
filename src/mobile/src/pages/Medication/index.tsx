import React, { useContext, useState } from "react";
import { Platform, ActivityIndicator } from "react-native";

import { AuthContext } from "../../contexts/auth";


import {
    Background,
    Container,
    AreaInput,
    Input,
    SubmitButton,
    SubmitText,
    Logo
} from '../SignIn/styles'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";


export default function Medication() {

    const [name, onChangeName] = React.useState('');
    const [description, onChangeDescription] = React.useState('');
    const [stock, onChangeStock] = React.useState('');
    const [timeToTake, onChangeTimeToTake] = React.useState('');

    const handleSave = async () => {
        if (!name || !description || !timeToTake) {
            alert("Preencha os campos obrigatórios");
            return;
        }

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
                            value={name}
                        />
                    </AreaInput>

                    <AreaInput>
                        <Input
                            placeholder="Descrição"
                            value={description}
                        />
                    </AreaInput>

                    <AreaInput>
                        <Input
                            placeholder="Estoque inicial - opcional"
                            keyboardType="numeric"
                            value={stock}
                        />
                    </AreaInput>

                    <AreaInput>
                        <Input
                            placeholder="Período de uso"
                            value={timeToTake}
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

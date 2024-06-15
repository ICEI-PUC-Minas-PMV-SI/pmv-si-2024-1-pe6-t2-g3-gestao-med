import React, { useContext, useState } from "react";
import { Platform, ActivityIndicator } from "react-native";

import { api } from "../../services/api";

import AsyncStorage from "@react-native-async-storage/async-storage";


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

    const [loadingAuth, setLoadingAuth] = useState(false)

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
        try {
            const storageUser = await AsyncStorage.getItem('@medToken')
            
            api.defaults.headers['Authorization'] = `Bearer ${storageUser}`

            setLoadingAuth(true)
            const response = await api.post("/medication", {
                name,
                description,
                stock: parseInt(stock),
                time_to_take: timeToTake
            })
            console.log(response.data)
            setLoadingAuth(false)
            

        } catch (err: any) {
            setLoadingAuth(false)

            console.log("Erro ao cadastrar", err)
        }
        setLoadingAuth(false)
       

        
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
                            onChangeText={(name => onChangeName(name))}
                        />
                    </AreaInput>

                    <AreaInput>
                        <Input
                            placeholder="Descrição"
                            value={description}
                            onChangeText={(description => onChangeDescription(description))}
                        />
                    </AreaInput>

                    <AreaInput>
                        <Input
                            placeholder="Estoque inicial - opcional"
                            keyboardType="numeric"
                            value={stock}
                            onChangeText={(stock => onChangeStock(stock))}
                        />
                    </AreaInput>

                    <AreaInput>
                        <Input
                            placeholder="Período de uso"
                            value={timeToTake}
                            onChangeText={(timeToTake => onChangeTimeToTake(timeToTake))}
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

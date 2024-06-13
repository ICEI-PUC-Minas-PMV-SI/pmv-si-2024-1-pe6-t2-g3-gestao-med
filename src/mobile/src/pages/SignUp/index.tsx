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
    StyledPicker,
} from '../SignIn/styles'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export enum Gender {
    MALE,
    FEMALE,
    OTHER,
}
export default function SignUp() {

    const { signUp, loadingAuth } = useContext(AuthContext)

    const [name, setName] = useState<string>('')
    const [surname, setSurname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [gender, setGender] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);
    const [showDatePicker, setShowDatePicker] = useState(false);

    const handleSignUp = async () => {
        if (!name || !email || !password || !confirmPassword || !gender || !dateOfBirth) {
            alert("Preencha todos os campos");
            return;
        }

        if (password !== confirmPassword) {
            alert("As senhas não coincidem")
            return
        }

        // Format the dateOfBirth as desired (e.g., "YYYY-MM-DD")
        //const formattedDateOfBirth = dateOfBirth?.toISOString().split('T')[0];

        signUp(name, email, password, gender, dateOfBirth.toString())
    }

    const handleDateChange = (event: any, selectedDate: Date | undefined) => {
        const currentDate = selectedDate || dateOfBirth;
        setShowDatePicker(Platform.OS === 'ios');
        setDateOfBirth(currentDate);
    };

    const showDatepicker = () => {
        setShowDatePicker(true);
    };

    // Function to format date for display in "DD-MM-YYYY" format
    const formattedDisplayDate = (date: Date | null) => {
        if (!date) return '';
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        // Ensure month and day are two digits
        const formattedMonth = month < 10 ? `0${month}` : `${month}`;
        const formattedDay = day < 10 ? `0${day}` : `${day}`;

        return `${formattedDay}/${formattedMonth}/${year}`;
    };

    return (

        <Background>
            <KeyboardAwareScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                enableOnAndroid={true}
                extraScrollHeight={20}
                keyboardShouldPersistTaps='handled'
            >
                <Container
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    enabled
                >
                    <Logo
                        source={require('../../assets/logotipo.png')}
                    />
                  
                    <AreaInput>
                        <Input
                            placeholder="Nome"
                            value={name}
                            onChangeText={(text) => setName(text)}
                        />
                    </AreaInput>
                    <AreaInput>
                        <Input
                            placeholder="Sobrenome"
                            value={surname}
                            onChangeText={(text) => setSurname(text)}
                        />
                    </AreaInput>
                    <AreaInput>
                        <Input
                            placeholder="Seu email"
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                        />
                    </AreaInput>



                    <AreaInput>
                        <Input
                            onPress={showDatepicker}
                            placeholder="Data de Nascimento"
                            value={formattedDisplayDate(dateOfBirth)}
                            onFocus={showDatepicker}
                        />

                        {showDatePicker && (
                            <DateTimePicker
                                value={dateOfBirth || new Date()}
                                mode="date"
                                display="default"
                                onChange={handleDateChange}
                                locale="pt-BR"
                            />
                        )}
                    </AreaInput>

                    <AreaInput>
                        <StyledPicker
                            selectedValue={gender}
                            onValueChange={(itemValue) => setGender(itemValue as string)}
                        >
                            <Picker.Item label="Selecionar" value="" />
                            <Picker.Item label="Masculino" value="MALE" />
                            <Picker.Item label="Feminino" value="FEMALE" />
                            <Picker.Item label="Outro" value="OTHER" />
                        </StyledPicker>
                    </AreaInput>

                    <AreaInput>
                        <Input
                            placeholder="Sua senha"
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                            secureTextEntry={true}
                        />
                    </AreaInput>

                    <AreaInput>
                        <Input
                            placeholder="Confirme sua senha"
                            value={confirmPassword}
                            onChangeText={(text) => setConfirmPassword(text)}
                            secureTextEntry={true}
                        />
                    </AreaInput>

                    <SubmitButton onPress={handleSignUp}>
                        
                            {loadingAuth ? (
                                <ActivityIndicator size={20} color="#FFF"/>
                            ): (
                                <SubmitText>Cadastrar</SubmitText>
                            )}
                       
                    </SubmitButton>
                </Container>
            </KeyboardAwareScrollView>
        </Background>

    )
}

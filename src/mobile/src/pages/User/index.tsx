import React, { useContext, useState } from "react";
import { Platform, ActivityIndicator } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
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
} from './styles'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Header from "../../components/Header";
import { Label } from "./styles";
import { api } from "../../services/api";
import FooterMenu from "../../components/Menu";

export enum Gender {
    MALE,
    FEMALE,
    OTHER,
}
export default function User() {
    const navigation = useNavigation<any>()

    const { user } = useContext(AuthContext)

    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState('')
    const [gender, setGender] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [buttonIsDisabled, setButtonIsDisabled] = useState(true)

    const handleUpdateUser = async () => {

        try {
            const response = await api.put("/user/update", {
                name: name ? name : undefined,
                email: email ? email : undefined,
                gender: gender ? gender : undefined,
                dateOfBirth: dateOfBirth ? dateOfBirth : undefined
            })

            if (response.status === 201) {
                navigation.navigate("User")
            }
        } catch (err: any) {

        }


    }

    const handleDateChange = (event: any, selectedDate: Date | undefined) => {
        setButtonIsDisabled(false)
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
            <Header title="Meu Perfil" />
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
                    <Logo source={require('../../assets/logotipo.png')} />

                    <AreaInput>
                        <Label>Nome: </Label>
                        <Input
                            placeholder={user?.name}
                            value={name}
                            onChangeText={
                                (text) => {
                                    setName(text)
                                    setButtonIsDisabled(false)
                                }
                            }
                            placeholderTextColor="#171717"

                        />
                    </AreaInput>

                    <AreaInput>
                        <Label>Email:</Label>
                        <Input
                            placeholder={user?.email}
                            value={email}
                            onChangeText={
                                (text) => {
                                    setName(text)
                                    setButtonIsDisabled(false)
                                }
                            }
                            placeholderTextColor="#171717"

                        />
                    </AreaInput>

                    <AreaInput>
                        <Label>Data de Nascimento: </Label>
                        <Input
                            onPress={showDatepicker}
                            placeholder={formattedDisplayDate(new Date(user!.date_of_birth))}
                            value={formattedDisplayDate(dateOfBirth)}
                            onFocus={showDatepicker}
                            placeholderTextColor="#171717"
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
                        <Label>Gênero: </Label>
                        <StyledPicker
                            selectedValue={gender}
                            onValueChange={(itemValue) => {
                                setGender(itemValue as string)
                                setButtonIsDisabled(false)
                            }}
                            placeholder={user?.gender}
                        >
                            <Picker.Item label={user?.gender === "MALE" ? "Masculino" : user?.gender === "FEMALE" ? "Feminino" : "Outro"} value={user?.gender} />
                            <Picker.Item label="Masculino" value="MALE" />
                            <Picker.Item label="Feminino" value="FEMALE" />
                            <Picker.Item label="Outro" value="OTHER" />
                        </StyledPicker>
                    </AreaInput>


                    <SubmitButton onPress={handleUpdateUser} disabled={buttonIsDisabled}>


                        <SubmitText>Atualizar Dados</SubmitText>


                    </SubmitButton>
                </Container>

            </KeyboardAwareScrollView>
            <FooterMenu />
        </Background>

    )
}

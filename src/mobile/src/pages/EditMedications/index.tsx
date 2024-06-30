import React, { useEffect, useState } from "react";
import { Platform, ActivityIndicator } from "react-native";
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import { api } from "../../services/api";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  AddTimeButton,
  AreaInput,
  Background,
  Container,
  FormArea,
  Input,
  Label,
  Logo,
  RemoveTimeButton,
  SubmitButton,
  SubmitText,
  TimeInput,
  TimeInputContainer,
} from "./styles";
import Header from "../../components/Header";
import FooterMenu from "../../components/Menu";


type EditMedicationRouteProp = RouteProp<{ params: { medicationId: string } }, 'params'>;
export default function EditMedication() {
    
  const navigation = useNavigation();
  const route = useRoute<EditMedicationRouteProp>();
  const  { medicationId }  = route.params;

  const [loading, setLoading] = useState(false);

  const [name, onChangeName] = useState("");
  const [description, onChangeDescription] = useState("");
  const [stock, onChangeStock] = useState("");
  const [timeToTake, setTimeToTake] = useState([""]);

  useEffect(() => {
    setLoading(true);

    const loadMedication = async () => {
      try {
        const response = await api.get(`/medication?medicationId=${medicationId}`);
        const medication = response.data;

        onChangeName(medication.name);
        onChangeDescription(medication.description);
        onChangeStock(medication.stock.toString());
        setTimeToTake(medication.time_to_take.split(","));
        
      } catch (err: any) {
        // console.log("Erro ao carregar medicamento", err.response.data);
      } finally {
        setLoading(false);
      }
    };

    loadMedication();
  }, [medicationId]);

  const handleAddTimeField = () => {
    setTimeToTake([...timeToTake, ""]);
  };

  const handleRemoveTimeField = (index: number) => {
    const newTimeToTake = timeToTake.filter((_, i) => i !== index);
    setTimeToTake(newTimeToTake);
  };

  const handleTimeChange = (index: number, value: string) => {
    const newTimeToTake = [...timeToTake];
    newTimeToTake[index] = value;
    setTimeToTake(newTimeToTake);
  };

  const handleSave = async () => {
    if (
      !name ||
      !description ||
      !timeToTake.find((time) => {
        return time.length > 0;
      }) ||
      !stock
    ) {
      alert("Preencha os campos obrigatórios");
      return;
    }

    try {
      setLoading(true);
      await api.put(`/medication/edit`, {
        id: medicationId,
        name,
        description,
        stock: parseInt(stock),
        time_to_take: timeToTake
          .filter((time) => {
            return time.length > 0;
          })
          .join(","),
      });
      alert("Medicamento atualizado com sucesso!");
      navigation.goBack();
    } catch (err) {
      console.log("Erro ao atualizar medicamento", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Background>
      <Header title="Editar medicamento" />
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        enableOnAndroid={true}
        extraScrollHeight={20}
        keyboardShouldPersistTaps="handled"
      >
        <Container
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          enabled
        >
          <Logo source={require("../../assets/logotipo.png")} />

          <FormArea>
            <AreaInput>
              <Label>Nome: </Label>
              <Input
                placeholder="Ex: Dipirona"
                value={name}
                onChangeText={(name) => onChangeName(name)}
              />
            </AreaInput>
            <AreaInput>
              <Label>Descrição: </Label>
              <Input
                placeholder="Ex: Como administrar a medicação"
                value={description}
                onChangeText={(description) => onChangeDescription(description)}
              />
            </AreaInput>
            <AreaInput>
              <Label>Estoque inicial: </Label>
              <Input
                placeholder="Ex: 10"
                keyboardType="numeric"
                value={stock}
                onChangeText={(stock) => onChangeStock(stock)}
              />
            </AreaInput>
            <AreaInput>
              <Label>Horário de administração: </Label>
              {timeToTake.map((time, index) => (
                <TimeInputContainer key={index}>
                  <TimeInput
                    placeholder="HH:MM"
                    value={time}
                    onChangeText={(value) => handleTimeChange(index, value)}
                  />
                  {index > 0 && (
                    <RemoveTimeButton
                      title="Remover"
                      onPress={() => handleRemoveTimeField(index)}
                    />
                  )}
                </TimeInputContainer>
              ))}
              <AddTimeButton
                title="Adicionar horário"
                onPress={handleAddTimeField}
              />
            </AreaInput>
          </FormArea>

          <SubmitButton onPress={() => !loading && handleSave()}>
            {loading ? (
              <ActivityIndicator size={20} color="#FFF" />
            ) : (
              <SubmitText>Atualizar</SubmitText>
            )}
          </SubmitButton>
        </Container>
      </KeyboardAwareScrollView>
      <FooterMenu />
    </Background>
  );
}

import React, { useState } from "react";
import { Platform, ActivityIndicator } from "react-native";

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

export default function Medication() {

  const [loading, setLoading] = useState(false);

  const [name, onChangeName] = React.useState("");
  const [description, onChangeDescription] = React.useState("");
  const [stock, onChangeStock] = React.useState("");
  const [timeToTake, setTimeToTake] = React.useState([""]);

  

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
      await api.post("/medication", {
        name,
        description,
        stock: parseInt(stock),
        time_to_take: timeToTake
          .filter((time) => {
            return time.length > 0;
          })
          .join(","),
      });
      onChangeName("");
      onChangeDescription("");
      onChangeStock("");
      setTimeToTake([""]);
    } catch (err: any) {
      console.log("Erro ao cadastrar", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Background>
      <Header title="Cadastrar medicamento" />
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
                placeholder="Nome"
                value={name}
                onChangeText={(name) => onChangeName(name)}
              />
            </AreaInput>
            <AreaInput>
              <Label>Descrição: </Label>
              <Input
                placeholder="Descrição"
                value={description}
                onChangeText={(description) => onChangeDescription(description)}
              />
            </AreaInput>
            <AreaInput>
              <Label>Estoque inicial: </Label>
              <Input
                placeholder="Estoque inicial"
                keyboardType="numeric"
                value={stock}
                onChangeText={(stock) => onChangeStock(stock)}
              />
            </AreaInput>
            <AreaInput>
              <Label>Período de uso: </Label>
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
              <SubmitText>Cadastrar</SubmitText>
            )}
          </SubmitButton>
        </Container>
      </KeyboardAwareScrollView>
      <FooterMenu />
    </Background>
  );
}



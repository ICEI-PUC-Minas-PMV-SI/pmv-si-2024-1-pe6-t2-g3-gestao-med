import styled from "styled-components/native";
import { Picker } from "@react-native-picker/picker";

export const Background = styled.View`
    flex: 1;
    background-color: #2585c0;
   
`;

export const Container = styled.KeyboardAvoidingView`
    flex: 1;
    justify-content: center;
    align-items: center;

    
`

export const Logo = styled.Image`
    width: 150px;
    height: 150px;
    margin-bottom: 15px;
`
export const AreaInput = styled.View`
    flex-direction: row;

`
export const DatePickerContainer = styled.View`
    width: 90%;
    margin-bottom: 1px;
    background-color: #FFF;
    border-radius: 8px;
    padding: 10px;
`;

export const Input = styled.TextInput`
    background-color: #FFF;
    width: 90%;
    font-size: 17px;
    padding: 10px;
    border-radius: 8px;
    color: #054d5f;
    margin-bottom: 15px;
`
export const StyledPicker = styled(Picker)`
    width: 90%;
    height: 45px;
    background-color: #FFF;
    border-radius: 8px;
    color:  #075281;
    margin-bottom: 15px;
`;

export const SubmitButton = styled.TouchableOpacity`
  width: 90%;
  height: 45px;
  border-radius: 8px;
  background-color: #075281;
  margin: 10px 0 20px 0;
  align-items: center;
  justify-content: center;
`;
export const SubmitText = styled.Text`
  font-size: 20px;
  color: #fff;
`;
export const Link = styled.TouchableOpacity`
    margin-top: 10px;
    margin-bottom: 10px;
`
export const LinkText = styled.Text`
    color: #FFF;
`
import styled from "styled-components/native";

export const Background = styled.View`
  flex: 1;
  background-color: #2585c0;
`;

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const FormArea = styled.View`
  width: 90%;
  margin-bottom: 10px;
`;

export const AreaInput = styled.View`
  width: 100%;
  align-items: center;
  align-items: flex-start;
  gap: 5px;
  flex-direction: column;
`;

export const Input = styled.TextInput`
  background-color: #fff;
  width: 90%;
  font-size: 17px;
  padding: 10px;
  border-radius: 8px;
  color: #054d5f;

  margin-bottom: 15px;
  margin-left: 15px;
`;

export const Label = styled.Text`
  align-items: flex-start;
  font-size: 18px;
  color: #fff;
  margin-left: 15px;
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

export const Logo = styled.Image`
  width: 150px;
  height: 150px;
  margin-top: -80px;
`;

export const TimeInputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  width: 90%;
  margin-bottom: 4px;
  margin-left: 15px;
  gap: 16px;
`;

export const TimeInput = styled.TextInput`
  background-color: #fff;
  font-size: 17px;
  padding: 10px;
  border-radius: 8px;
  color: #054d5f;
  flex: 1;
`;

export const RemoveTimeButton = styled.Button``;

export const AddTimeButton = styled.Button`
    align-items: center;  
    background-color: #075281;
    color: #fff;
    margin-top: 23px;
`;

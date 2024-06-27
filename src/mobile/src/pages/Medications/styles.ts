import styled from "styled-components/native";

export const Background = styled.View`
    flex: 1;
    background-color: #2585C0;
`;

export const Container = styled.KeyboardAvoidingView`
    flex: 1;
    padding: 24px; 
`

export const LoadingBox = styled.View`
  align-items: center;
`;

export const LoadingOrEmptyMessage = styled.Text`
  color: #ffffff;
  text-align: center;
  font-size: 18px;
  font-weight: 500;
  margin-top: 20px;
`;

export const MedicationsList = styled.ScrollView`
    flex: 1;
`
export const MedicationBox = styled.View`
  flex-direction: row;
  margin-bottom: 14px;
  padding: 10px;
  border-radius: 10px;
  background-color: #f0f0f0;
`;

export const MedicationIcon = styled.View`
  width: 80px;
  height: 80px;
  background-color: #FFF;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  color: #28a745;
  margin-right: 20px;
`;

export const MedicationData = styled.View`
  flex: 1;
  justify-content: space-between;
`;

export const MedicationNameEdit = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const MedicationName = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;

export const EditIcon = styled.TouchableOpacity``;

export const Recurrence = styled.Text`
  font-size: 18px;
`;

export const Stock = styled.Text`
  font-size: 14px;
`;

export const LearnMoreAndRemove = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Bold = styled.Text`
  font-weight: bold;
`;

export const Remove = styled.Text`
  text-decoration: underline;
  font-size: 14px;
  font-weight: 500;
  color: #d9534f;
`;

export const Link = styled.TouchableOpacity`
`
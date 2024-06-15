import styled from "styled-components/native";

export const Background = styled.SafeAreaView`
    flex: 1;
    background-color: #2585C0;
`

export const ListMedications = styled.View`
    flex: 1;
    scroll-behavior: auto;
    padding: 5px 15px;
    height: 300px;
    
`

export const TimeBox = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
`

export const MedicationBox = styled.View`
    display: flex;
    flex-direction: row;
`

export const Divider = styled.View`
    width: 100%;
    height: 2px;
    background-color: black;
`

export const Label = styled.Text`
    font-size: 20px;
    color: #fff;
`

export const HighlightedLabel = styled.Text`
    font-size: 25px;
    background-color: lightgreen
`

export const HighlightedDivider = styled.View`
    width: 100%;
    height: 2px;
    background-color: lightgreen;
`
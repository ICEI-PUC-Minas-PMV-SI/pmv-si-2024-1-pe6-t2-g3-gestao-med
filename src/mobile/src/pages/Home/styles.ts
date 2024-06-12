import styled from "styled-components/native";

export const Background = styled.SafeAreaView`
    flex: 1;
    background-color: #2585C0;
    padding: 0 5px 5px 5px;
`

export const ListMedications = styled.View`
    flex: 1;
    scroll-behavior: auto;
    
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
    font-size: 25px;
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
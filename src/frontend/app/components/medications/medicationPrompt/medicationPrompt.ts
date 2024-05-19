
export default async function generateMedicationPrompt(medicationName: string){

    return(
        `
        Forneça informações bastante resumidas e em poucas palavras sobre o 
        medicamento ${medicationName}, com o seu respetivo nome, indicação de uso, a forma de 
        administração do medicamento, recomendações de uso, contraindicações, efeitos 
        colaterais e o que fazer após a ingestão de uma quantidade maior do que a indicada 
        desse medicamento. 

        Na seguinte sequência e formato: 

        Nome do medicamento: ${medicationName}
        Para que serve e como usar: (Por exemplo, Este medicamento é indicado para 
        tratar as seguintes dores: Dor de cabeça, febre, dor nos dentes. Doses indicadas 
        500mg)
        Como devo tomar: (Por exemplo, Este medicamento deverá ser administrado por 
        via oral/retal.) 
        Recomendações: (Por exemplo, Este medicamento requer a ingestão com 
        alimentos, evitar o uso de álcool.)
        Contraindicações: (Por exemplo, Este medicamento está contraindicado a 
        pacientes que apresentam hipersensibilidade aos medicamentos que contenham 
        dipirona sódica, propifenazona, fenazona, fenilbutazona, oxifembutazona ou aos 
        demais componentes da formulação, em casos de porfiria hepática aguda 
        intermitente.)
        Efeitos colaterais: (Por exemplo, Este medicamento pode trazer os seguintes 
        efeitos colaterais: Náusea ou vômito, febre, sensação de cansaço, perda de apetite, 
        urina de cor escura, fezes de cor clara, aparecimento de cor amarelada na pele ou 
        na parte branca dos olhos, coceira, erupção na pele ou dor na parte superior do 
        estômago.) 
        O que fazer se alguém usar uma quantidade maior do que a indicada deste 
        medicamento? (Por exemplo, Em caso de uso de grande quantidade deste 
        medicamento, procure rapidamente socorro médico e leve a embalagem ou bula do 
        medicamento, se possível.)
        
        Retorne a resposta em formato HTML
        `
    )
}
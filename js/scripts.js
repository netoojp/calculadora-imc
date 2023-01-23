// IMC DATA



const data = [
    {
        min: 0,
        max: 18.4,
        classification: "Menor que 18,5",
        info: "Magreza",
        obesity: "0",
    },
    {
        min: 18.5,
        max: 24.9,
        classification: "Entre 18,5 e 24,9",
        info: "Normal",
        obesity: "0",
    },
    {
        min: 25,
        max: 29.9,
        classification: "Entre 25,0 e 29,9",
        info: "Sobrepeso",
        obesity: "I",
    },
    {
        min: 30,
        max: 39.9,
        classification: "Entre 30,0 e 39,9",
        info: "Obesidade",
        obesity: "II",
    },
    {
        min: 40,
        max: 99,
        classification: "Maior que 40,0",
        info: "Obesidade grave",
        obesity: "III",
    },
];



// Seleção de elementos



const imcTable = document.querySelector("#imc-table");

const heightInput = document.querySelector("#height");
const weightInput = document.querySelector("#weight");
const calcBtn = document.querySelector("#calc-btn");
const clearBtn = document.querySelector("#clear-btn");

const calcContainer = document.querySelector("#calc-container");
const resultContainer = document.querySelector("#result-container");

const imcNumber = document.querySelector("#imc-number span");
const imcInfo = document.querySelector("#imc-info span");

const backBtn = document.querySelector("#back-btn");




// Funções



//função que vai receber dados - vai criar colunas a cada dado que recebe   
function createTable(data) {
    data.forEach((item) => {

        //criar div
        const div = document.createElement("div");
        div.classList.add("table-data");

        //inserir paragáfo com informações dentro das div
        const classification = document.createElement("p");
        classification.innerText = item.classification;

        const info = document.createElement("p");
        info.innerText = item.info;

        const obesity = document.createElement("p");
        obesity.innerText = item.obesity;

        //incluir esses paragrafos na div
        div.appendChild(classification);
        div.appendChild(info);
        div.appendChild(obesity);

        //colocar na tabela cada uma delas - as divs
        imcTable.appendChild(div);
    });
}

//deixar digitar só número e vírgula - dígitos permitidos
function validDigits(text) {
    return text.replace(/[^0-9,]/g, ""); //g é do global
}

//calcular IMC
function calcImc(height, weight) {
    const imc = (weight / (height * height)).toFixed(1);
    return imc;
}

//limpeza de valores - zerando valores
function cleanInputs() {
    heightInput.value = "";
    weightInput.value = "";
    imcNumber.className = "";
    imcInfo.className = "";
}

//função pra exibir reultado
function showOrHideResults() {
    calcContainer.classList.toggle("hide");
    resultContainer.classList.toggle("hide");
}



// Inicialização


createTable(data);



// Eventos



//sempre que o usuário digitar, limpar de dígitos não permitidos
[heightInput, weightInput].forEach((el) => {
    el.addEventListener("input", (e) => {
        const updatedValue = validDigits(e.target.value);

        e.target.value = updatedValue;
    });
});

//cáculo
calcBtn.addEventListener("click", (e) => {
    e.preventDefault();

    //coneverter valores para numbers - conversao , em .
    const weight = +weightInput.value.replace(",", ".");
    const height = +heightInput.value.replace(",", ".");

    console.log(weight, height);

    //validação 
    if (!weight || !height) return;

    //Calculo valor IMC
    const imc = calcImc(height, weight);
    let info;

    data.forEach((item) => {
        if (imc >= item.min && imc <= item.max) {
            info = item.info;
        }
    });

    if (!info) return;

    imcNumber.innerText = imc;
    imcInfo.innerText = info;

    //feedback visual - cores
    switch (info) {
        case "Magreza":
            imcNumber.classList.add("low");
            imcInfo.classList.add("low");
            break;
        case "Normal":
            imcNumber.classList.add("good");
            imcInfo.classList.add("good");
            break;
        case "Sobrepeso":
            imcNumber.classList.add("low");
            imcInfo.classList.add("low");
            break;
        case "Obesidade":
            imcNumber.classList.add("medium");
            imcInfo.classList.add("medium");
            break;
        case "Obesidade grave":
            imcNumber.classList.add("high");
            imcInfo.classList.add("high");
            break;
    }

    //vai exibir resultado
    showOrHideResults();
});

//executando limpeza de valores através do click do botão
clearBtn.addEventListener("click", (e) => {
    e.preventDefault();

    cleanInputs();
});

//função de voltar para o início
backBtn.addEventListener("click", (e) => {
    cleanInputs();
    showOrHideResults();
});



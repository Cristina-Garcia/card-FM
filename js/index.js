const card = document.querySelector("#card"),
  btnOpenForm = document.querySelector("#btn-open-form"),
  form = document.querySelector("#form-card"),
  numberCard = document.querySelector("#card .number"),
  nameCard = document.querySelector("#card .name"),
  logoMarca = document.querySelector("#logo-marca"),
  signature = document.querySelector("#card .signature p"),
  monthExpiration = document.querySelector("#card .month"),
  yearExpiration = document.querySelector("#card .year"),
  ccvCard = document.querySelector("#card .ccv");

const showFront = () => {
  if (card.classList.contains("active")) {
    card.classList.toggle("active");
  }
};
// Rotacion de tarjeta

card.addEventListener("click", () => {
  card.classList.toggle("active");
});
// boton de abrir formulario

btnOpenForm.addEventListener("click", () => {
  btnOpenForm.classList.toggle("active");
  form.classList.toggle("active");
});

//Select del mes generado dinamicamente
for (let i = 1; i <= 12; i++) {
  let option = document.createElement("option");
  option.value = i;
  option.innerHTML = i;
  form.selectMonth.appendChild(option);
}

//Select del año generado dinamicamente

const yearActual = new Date().getFullYear();
for (let i = yearActual; i <= yearActual + 8; i++) {
  let option = document.createElement("option");
  option.value = i;
  option.innerHTML = i;
  form.selectYear.appendChild(option);
}

//input numero de tarjeta
form.inputNumber.addEventListener("keyup", (e) => {
  let valorInput = e.target.value;

  form.inputNumber.value = valorInput
    //Eliminamos espacios en blanco
    .replace(/\s/g, "")
    //eliminar letras
    .replace(/\D/g, "")
    //PONEMOS ESPACIOS CADA CUATRO NUMEROS
    .replace(/([0-9]{4})/g, "$1 ")
    //Elimina el ultimo espaciado
    .trim();
  //insertar texto en inout vacio
  numberCard.textContent = valorInput;
  if (valorInput == "") {
    numberCard.textContent = "#### #### #### ####";

    logoMarca.innerHTML = "";
  }
  // reconocimiento de tipo de tarjeta
  if (valorInput[0] == 4) {
    logoMarca.innerHTML = "";
    const image = document.createElement("img");
    image.src = "../image/logos/visa.png";
    logoMarca.appendChild(image);
  } else if (valorInput[0] == 5) {
    logoMarca.innerHTML = "";
    const image = document.createElement("img");
    image.src = "../image/logos/mastercard.png";
    logoMarca.appendChild(image);
  }
  //girar la tarjeta para   que el usuario vea los datos ingresados
  showFront();
});

//input nombre de tarjeta
form.inputName.addEventListener("keyup", (e) => {
  let valorInput = e.target.value;

  form.inputName.value = valorInput.replace(/[0-9]/g, "");
  nameCard.textContent = valorInput;
  signature.textContent = valorInput;
  if (valorInput == "") {
    nameCard.textContent = "Jhon Doe";
  }
  showFront();
});

//seleccion mes
form.selectMonth.addEventListener("change", (e) => {
  monthExpiration.textContent = e.target.value;
  showFront();
});

//seleccion año
form.selectYear.addEventListener("change", (e) => {
  yearExpiration.textContent = e.target.value.slice(2);

  showFront();
});

// ingresando ccv
form.inputCCV.addEventListener("keyup", () => {
  if (!card.classList.contains("active")) {
    card.classList.toggle("active");
  }

  form.inputCCV.value = form.inputCCV.value
    .replace(/\s/g, "")
    .replace(/\D/g, "");
  ccvCard.textContent = form.inputCCV.value;
});

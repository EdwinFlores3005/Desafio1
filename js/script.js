/*Funcion para agregar mes actual documento*/
const date = new Date()
const month = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agost", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
var nameMonth = month[date.getMonth()]
var year = date.getFullYear()

document.getElementById('date').innerText = `Presupuesto de ${nameMonth} ${year}`

/* */

/*TRANSACCIONES*/
/*lista para ingresos y egresos*/
let ingresosList = []
let egresosList = []
/*ingreso y egreso total que se muestra en el sitio*/
let ingresoTotal = 0
let egresoTotal = 0
let cantidadActual = 0 /*no estoy seguro si uso esta variable*/
let currentView = "ingreso" /*La view a mostrar para ingresos o egresos*/
let porcenGastos = 0
let porcenEgreso = 0

const listContainer = document.getElementById('details-display')
const ingresoLbl = document.getElementById('ingresoTotal')
const egresoLbl = document.getElementById('egresoTotal')
const current = document.getElementById('current')
const porcen = document.getElementById('porcenGastos')
const list = document.createElement("ul")


/*clase para cada transaccion*/
class Transaccion{
    constructor(tipo, descripcion, monto){
        this.tipo = tipo
        this.descripcion = descripcion
        this.monto = monto
    }
}

/*una funcion para mostrar cada transaccion*/
function ShowList(arrayList){

    for(let i = 0; i < arrayList.length; i++)
    {
        const ulist = document.createElement("li")
        ulist.classList.add("d-flex", "justify-content-between", "align-items-center", "p-2", "m-2", "border", "border-2", "w-75", "rounded")

        ulist.innerHTML = `
        <p class="roboto-medium m-0">${arrayList[i].descripcion}</p>
        <p class="roboto-medium m-0">+${arrayList[i].monto}</p>
        `
        list.appendChild(ulist)
        
    }
    console.log(ingresoTotal)
    listContainer.appendChild(list)
}

/* la funcion para agregar cada transaccion a cada lista*/
const addBtn = document.getElementById('addBtn')
addBtn.addEventListener("click", () =>{

    /* se mandan a llamar los inputs para llenar el objeto*/
    let descripcion = document.getElementById('desc-input').value
    let amount = parseFloat(document.getElementById('monto-input').value)
    const typeId = document.getElementById('type-trans')
    const typeValue = typeId.value
    const type = typeId.options[typeId.selectedIndex].text


    const newTransaction = new Transaccion(type, descripcion, amount)

    /* si el tipo es ingreso va a la lista de ingresos*/
    if(typeValue == "ingreso"){
        ingresosList.push(newTransaction)

        ingresoTotal = ingresosList.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.monto
        }, 0) 
        /* se actualiza los ingresos totales*/

        ingresoLbl.innerText = `+${ingresoTotal}`

        /* Si el boton activo es el de ingresos, solo se actualiza sin tener que cambiar de vista*/
        if(currentView == "ingreso"){
            list.innerHTML = ""
            ShowList(ingresosList)
        }
    }
        
    /* si no, va a egresos*/
    else {

       if(ingresoTotal == 0){
        alert("No se ha ingresado ningun ingreso o no hay fondos.")
       }
       else{
         egresosList.push(newTransaction)

        egresoTotal = egresosList.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.monto
        }, 0) 

        egresoLbl.innerText = `-${egresoTotal}`

        if(currentView == "egreso"){
            list.innerHTML = ""
            ShowList(egresosList)
        }
       }
    }
 
    current.innerHTML = (ingresoTotal - egresoTotal).toFixed(2)
    porcenGastos = egresoTotal/ingresoTotal * 100
    porcen.innerHTML = `${porcenGastos.toFixed(0)}%`

})

//

/* Para mostrar cada lista se tiene dos botones*/
const ingresoBtn = document.getElementById('ingresoBtn')
const egresoBtn = document.getElementById('egresoBtn')


ingresoBtn.addEventListener("click", () =>  {
    list.innerHTML = ""
    ShowList(ingresosList) // Se llama la funcion para correr la lista con un for
    currentView = "ingreso" 

    ingresoBtn.classList.add("btn-dark")
    ingresoBtn.classList.remove("btn-outline-secondary")
    egresoBtn.classList.add("btn-outline-secondary")
    egresoBtn.classList.remove("btn-dark")
})

egresoBtn.addEventListener("click", () =>{
    list.innerHTML = ""
    ShowList(egresosList)
    currentView = "egreso"

    egresoBtn.classList.add("btn-dark")
    egresoBtn.classList.remove("btn-outline-secondary")
    ingresoBtn.classList.add("btn-outline-secondary")
    ingresoBtn.classList.remove("btn-dark")
})

//




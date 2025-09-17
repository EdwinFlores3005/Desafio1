/*Funcion para agregar mes actual documento*/
const date = new Date()
const month = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agost", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
var nameMonth = month[date.getMonth()]
var year = date.getFullYear()

document.getElementById('date').innerText = `Presupuesto de ${nameMonth} ${year}`

/*TRANSACCIONES*/
/*lista para ingresos y egresos*/
let ingresosList = []
let egresosList = []
/*ingreso y egreso total que se muestra en el sitio*/
let ingresoTotal = 0
let egresoTotal = 0
let currentView = "ingreso" /*La view a mostrar para ingresos o egresos*/
let porcenGastos = 0
let porcenEgreso = 0
let detEgreso = 0

const listContainer = document.getElementById('details-display')
const ingresoLbl = document.getElementById('ingresoTotal')
const egresoLbl = document.getElementById('egresoTotal')
const porcen = document.getElementById('porcenGastos')
const current = document.getElementById('current')
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

    /* Se recorre la lista*/
    for(let i = 0; i < arrayList.length; i++)
    {
        
        const ulist = document.createElement("li")
        ulist.classList.add("d-flex", "justify-content-between", "align-items-center", "p-2", "m-2", "border", "border-2", "w-75", "rounded")

        /* Se crean los elementos para mostrar la informacion de cada objeto*/
        const desc = document.createElement("p")
        const mont = document.createElement("p")
        const detEgre = document.createElement("p")

        /* Clases para cada elemento*/
        desc.classList.add("roboto-medium", "m-0", "p-1")
        mont.classList.add("roboto-medium", "m-0", "p-1")
        detEgre.classList.add("roboto-medium", "m-0", "bg-dark", "text-white", "p-1", "rounded")

        /*El porcentaje de cada egreso*/
        detEgreso = (arrayList[i].monto/ingresoTotal * 100).toFixed(0)

        desc.textContent = `${arrayList[i].descripcion}`
        mont.textContent = `${arrayList[i].monto}`
        detEgre.textContent = `${detEgreso}%`

        /* Se agregan los elementos p a cada linea dentro de la lista*/
        ulist.appendChild(desc)
        ulist.appendChild(mont)
        if(arrayList[i].tipo == "Egreso")
            ulist.appendChild(detEgre)

        list.appendChild(ulist)
        
    }
    listContainer.appendChild(list)
}

/* la funcion para agregar cada transaccion a cada lista*/
const addBtn = document.getElementById('addBtn')
addBtn.addEventListener("click", () =>{

    /* se mandan a llamar los inputs para llenar el objeto*/
    let descripcion = document.getElementById('desc-input')
    let amount = document.getElementById('monto-input')
    const typeId = document.getElementById('type-trans')
    const typeValue = typeId.value
    const type = typeId.options[typeId.selectedIndex].text

    /* Se crea el objeto de transaccion*/
    const newTransaction = new Transaccion(type, descripcion.value, parseFloat(amount.value))

    /* Si los valores estan vacios, no se puede crear la transaccion*/
    if(descripcion.value == "" || amount.value == "")
        alert("Por favor llena ambos campos con la informacion requerida")
    else{ /* Si ambos inputs fueron llenados correctamente, se procede a evaluar el tipo de transaccion*/

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
        /* Si no hay ingresos o el monto de la transaccion es mayor a los ingresos totales, no permite hacer egresos*/
       if(ingresoTotal == 0 || newTransaction.monto > ingresoTotal){
        alert("No se ha ingresado ningun ingreso o no hay fondos.")
       }
       else{
         egresosList.push(newTransaction)

            egresoTotal = egresosList.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.monto
        }, 0) /* se actualiza los egresos totales*/

        egresoLbl.innerText = `-${egresoTotal}`
        /* Si el boton activo es el de egresos, solo se actualiza sin tener que cambiar de vista*/
        if(currentView == "egreso"){
            list.innerHTML = ""
            ShowList(egresosList)
        }
       }
    }
    }

    current.innerHTML = (ingresoTotal - egresoTotal).toFixed(2) /* ingresos disponibles actuales*/
    porcenGastos = egresoTotal/ingresoTotal * 100
    porcen.innerHTML = `${porcenGastos.toFixed(0)}%`

    descripcion.value = ""
    amount.value = ""

})

//

/* Para mostrar cada lista se tiene dos botones*/
const ingresoBtn = document.getElementById('ingresoBtn')
const egresoBtn = document.getElementById('egresoBtn')


ingresoBtn.addEventListener("click", () =>  {
    list.innerHTML = ""
    ShowList(ingresosList) // Se llama la funcion para correr la lista con un for
    currentView = "ingreso" 

    /* Clases para cada elemento y confirmar la vista activa*/
    ingresoBtn.classList.add("btn-dark")
    ingresoBtn.classList.remove("btn-outline-secondary")
    egresoBtn.classList.add("btn-outline-secondary")
    egresoBtn.classList.remove("btn-dark")
})

egresoBtn.addEventListener("click", () =>{
    list.innerHTML = ""
    ShowList(egresosList) // Se llama la funcion para correr la lista con un for
    currentView = "egreso"

     /* Clases para cada elemento y confirmar la vista activa*/
    egresoBtn.classList.add("btn-dark")
    egresoBtn.classList.remove("btn-outline-secondary")
    ingresoBtn.classList.add("btn-outline-secondary")
    ingresoBtn.classList.remove("btn-dark")
})





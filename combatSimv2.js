



// Arrays
    // Arrays Vacios
    const battleAux=[]
    const pokemonEnemigo=[]
    const miPokemon = []
    const battleLog = []


    //Arrays    
    const pociones = {cantidad:5 , vidaCurada:40}
    let dadoCastigo = 0
    const todosLosPokemons = [
    new Pokemon (`Pikachu`, `Electrico`, 250, 200, `./images/characters/pikachuAliado.png`,`./images/characters/pikachuEnemigo.png` ),
    new Pokemon (`Charmander`, `Fuego`, 250, 150,`./images/characters/charmanderAliado.png`,`./images/characters/charmanderEnemigo.png`),
    new Pokemon (`Bulbasaur`, `Planta`, 300, 300,`./images/characters/bulbasaurAliado.png`,`./images/characters/bulbasaurEnemigo.png`),
    new Pokemon (`Squirtle`,`Agua`, 280, 200,`./images/characters/squirtleAliado.png`,`./images/characters/squirtleEnemigo.png`),
    ]
    //json y local storage
    const pokeJSON = JSON.stringify(todosLosPokemons);
    localStorage.setItem("todosLosPokemons", pokeJSON);
    storedPokeJSON = localStorage.getItem("todosLosPokemons")
    storedPoke = JSON.parse(storedPokeJSON)



// Elementos
    //BattlefieldUI
    const infoBatalla = document.getElementById('infoDeBatalla')
    const campoBatalla = document.getElementById('campoDeBatalla')
    const imgAliado= document.getElementById('imgAliado')
    const imgEnemigo= document.getElementById('imgEnemigo')
    const nombreEnemigo = document.getElementById('nombreEnemigo')
    const nombreAliado = document.getElementById('nombreAliado')
    const textoBatalla = document.getElementById('textoBatalla')
    const infoAux = document.getElementById('infoAux')

    //MenuButtons
    const menuDeAcciones = document.getElementById('menuDeAcciones')
    const menuDeBatalla = document.getElementById('menuDeBatalla')

    //FightButtons
    const botonVolver = document.getElementById('botonVolver')
    const botonRapido = document.getElementById('botonRapido')
    const botonEspecial = document.getElementById('botonEspecial')

    //actionButtons
    const botonEscapar = document.getElementById('botonEscapar')
    const botonMenuAtaque = document.getElementById('botonMenuAtaque')
    const botonCurarse = document.getElementById('botonCurarse')

    //Pokemon Selection
    const callToAction = document.getElementById('callToAction')
    const btnBulbasaur = document.getElementById ('btnBulbasaur')
    const btnCharmander = document.getElementById('btnCharmander')
    const btnPikachu = document.getElementById('btnPikachu')
    const btnSquirtle = document.getElementById('btnSquirtle')
    const selectorPokemon = document.getElementById('selectorPokemon')
    //Sidebar
    const iniciarPartida = document.getElementById('iniciarPartida')
    const reiniciarPartida = document.getElementById('reiniciarPartida')
    const tienda = document.getElementById('tienda')


//Event Listeners

    //Pokemon Seleccion
    btnBulbasaur.addEventListener('click', elegirPokemonAliado)
    btnCharmander.addEventListener('click', elegirPokemonAliado)
    btnPikachu.addEventListener('click', elegirPokemonAliado)
    btnSquirtle.addEventListener('click', elegirPokemonAliado)

    
    //ActionButtons
    botonMenuAtaque.addEventListener('click', changeBattleMenu)
    //FightButtons
    botonVolver.addEventListener('click', changeBattleMenu)

    botonRapido.addEventListener('click', () =>
    {
    ataqueNormal('10',pokemonEnemigo, miPokemon)
    console.log(battleLog)
    devolverAtaque()  
    checkAlive()  
    })

    botonEspecial.addEventListener('click', ()=>
    {
    ataqueEspecial("30",pokemonEnemigo,miPokemon)
    console.log(battleLog)
    devolverAtaque()
    checkAlive()
    })
    botonEscapar.addEventListener('click', ()=>{location.reload()})
    botonCurarse.addEventListener('click', ()=>
    {
        curarse(miPokemon)
    })

    //Sidebar
    iniciarPartida.addEventListener('click',toggleActiveOption)
    reiniciarPartida.addEventListener('click',toggleActiveOption)
    tienda.addEventListener('click',toggleActiveOption)
    
//Funciones


    function checkAlive(){
    checkMine = miPokemon[0].vida
    checkTheirs = pokemonEnemigo[0].vida
    if (checkMine < 1 ){
        alert('Haz perdido el duelo, ¿por que no lo intentas nuevamente?')
        location.reload()
    } 
    else if (checkTheirs < 1){
        alert('¡Felicidades, haz ganado el duelo!')
        location.reload()
    }
    }

    function elegirPokemonAliado() {
    let elegido = storedPoke.findIndex((storedPoke)=> {return storedPoke.nombre == this.innerText})
    miPokemon.push(storedPoke[elegido])
    storedPoke.splice(elegido,1)
    elegirPokemonEnemigo()
    imgChange(imgAliado, miPokemon[0].urlFotoAliado)
    textChange(nombreAliado, miPokemon[0].nombre)
    makeSeleccionDissapear()
    console.log(miPokemon)
    console.log(textoBatalla.innerText)
    return miPokemon
    }   
    function elegirPokemonEnemigo() 
    {
        
        pokemonEnemigo.push(storedPoke[Math.floor(Math.random()*storedPoke.length)])
        if(pokemonEnemigo.length != 0)
            {
            imgChange(imgEnemigo, pokemonEnemigo[0].urlFotoEnemigo)
            textChange(nombreEnemigo, pokemonEnemigo[0].nombre)
            return pokemonEnemigo
            }
    }


    function devolverAtaque() {
    battleLogFunc(`¡Cuidado! El enemigo esta intentando atacarte.`)
    dadoCastigo= randomInt(0,100)
    if(dadoCastigo > 60)
        {
            battleLogFunc(`¡El enemigo logro devolverte un ataque!`)
            ataqueNormal('50',miPokemon,pokemonEnemigo)
        }
    else if(dadoCastigo > 80){
        battleLogFunc(`¡El enemigo logro devolverte un ataque ESPECIAL!`)
        ataqueEspecial('50',miPokemon,pokemonEnemigo)
    }
    else{ battleLogFunc(`Logras interceptar y cancelar su ataque. ¡Aprovecha!`)}
    }

    function textChange(id, string){
    id.innerHTML = string
    }

    function imgChange(id, string){
    id.src = string
    }

    function changeBattleMenu (){
    menuDeAcciones.classList.toggle('d-none')
    menuDeBatalla.classList.toggle('d-none')
    }

    function makeSeleccionDissapear(){
        selectorPokemon.classList.replace('contenedor','d-none')
        infoBatalla.classList.remove('d-none')
        campoBatalla.classList.remove('d-none')
    }

    function toggleActiveOption(){
    iniciarPartida.classList.remove('active')
    reiniciarPartida.classList.remove('active')
    tienda.classList.remove('active')
    this.classList.toggle('active')
    }



function ataqueNormal(hitChance,victima ,victimario) {
    let dado = randomInt(0, 100);
    console.log(`resultado del dado: ` + dado);
    if (dado > hitChance) {
    battleLogFunc(`${victimario[0].nombre } genera un ataque de tipo Fisico, no pierde puntos de energia`);
    recibirAtaque('25','50', victima,)
    } else {
    let dado2 = randomInt(0, 100);
    console.log(`resultado del dado: ` + dado2);
    if (dado2 < 50) {
        battleLogFunc(`¡El ataque ha fallado!`);
    }
    }
}
function curarse (victima) {
    if (pociones.cantidad !== 0) {
        battleLogFunc(`${victima[0].nombre} recibe ${pociones.vidaCurada} puntos de vida por una pocion.`);
        victima[0].vida = victima[0].vida + pociones.vidaCurada;
        pociones.cantidad = pociones.cantidad - 1;
        battleAuxFunc(`Quedan ${pociones.cantidad} pociones.`);
    } else {
        battleLogFunc(`No quedan mas pociones...`);
    }
}


function ataqueEspecial(hitChance, victima, victimario) {
    let dado = randomInt(0, 100);
    console.log(`resultado del dado2: ` + dado);
    if (dado > hitChance) {
        let energiaPerdida = randomInt(50, 80);
        battleLogFunc(`${victimario[0].nombre} genera un ataque de tipo ${victimario[0].tipo} Pierde ${energiaPerdida} puntos de energia`);
        victimario[0].energia = victimario[0].energia - energiaPerdida;
        recibirAtaque('25','50', victima)
    } else {
        battleLogFunc(`¡El ataque ha fallado!`);
    }
}

function recibirAtaque(min, max,victima ) {
    let danoRecibido = randomInt(min, max);
    battleLogFunc(`${victima[0].nombre} recibe un ataque con un daño de ${danoRecibido}`);
    victima[0].vida = victima[0].vida - danoRecibido;
}


function randomInt(min, max)
    {
    return Math.round(Math.random() * (max- min) + min )
}

function battleLogFunc(string){
    textoBatalla.innerText = ''
    battleLog.push (string)

    textoBatalla.innerText = battleLog.join('\n')
    textoBatalla.scrollTo({
        top: textoBatalla.scrollHeight,
        behavior: 'smooth'
    });
}

function battleAuxFunc(string){
    infoAux.innerText = ''
    battleAux.unshift (string)

    infoAux.innerText = battleAux.join('\n')
    infoAux.scrollTo({
        top: textoBatalla.scrollHeight,
        behavior:'smooth'
    })
}


function listarPokemons(listadoDePokemons) {
    return listadoDePokemons.map((listadoDePokemons) => { return `\n ${listadoDePokemons.nombre}`; })
}


function datosPokemon (arrayPokemons){
    arrayPokemons.forEach(arrayPokemons => {
        alert(`Estadisticas del Pokemon: \n\n\nNombre: ${arrayPokemons.nombre} \nVida: ${arrayPokemons.vida} \nTipo: ${arrayPokemons.tipo} \nEnergia: ${arrayPokemons.energia}`)
    });
}




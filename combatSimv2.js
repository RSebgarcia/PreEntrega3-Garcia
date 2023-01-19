//Defino la clase
class Pokemon {
    nombre;
    tipo;
    vida;
    energia;
//contructora
    constructor(nombre, tipo, vida, energia, ) {
        this.nombre = nombre;
        this.tipo = tipo;
        this.vida = vida;
        this.energia = energia;
    }
    /// Aca van los metodos
    ataqueNormal = function(hitChance, victima) { //hacer numero random que entregue este valor
        //hit chance para jugador sera de 10 (90% de probabilidad), hitchance para el bot sera de 30 (70% de probabilidad)
        let dado =randomInt(0,100)
        console.log(`resultado del dado: ` + dado)
        if (dado > hitChance)
            {
            alert(`${this.nombre } genera un ataque de tipo Fisico, no pierde puntos de energia`)
            victima[0].recibirAtaque(25,50)
            }
        else{
            let dado2= randomInt(0,100)
            console.log(`resultado del dado: ` + dado2)
                if(dado2 < 50){alert(`¡El ataque ha fallado!`)}
                else{alert(`El enemigo logro esquivar el ataque`)}
            }
        }

    ataqueEspecial = function(hitChance, victima) { //hacer numero random que entregue este valor
        //hit chance para jugador sera del 30 (70% de probabilidad), hitchance para el bot sera de 60(40% de probabilidad)
        let dado =randomInt(0,100)
        console.log(`resultado del dado2: ` + dado)
        if (dado > hitChance)
            {
            let energiaPerdida = randomInt (50,80)
            alert(`${this.nombre } genera un ataque de tipo ${this.tipo} Pierde ${energiaPerdida} puntos de energia`)
            this.energia = this.energia - energiaPerdida
            victima[0].recibirAtaque(40,100)
            }
        else{
            alert(`¡El ataque ha fallado!`)
            }
        }
    curarse= function(){
        if (pociones.cantidad !=0 ){
        console.log(`${this.nombre} recibe ${pociones.vidaCurada} puntos de vida por una pocion.`)
        this.vida = this.vida + pociones.vidaCurada
        alert(`Quedan ${pociones.cantidad} pociones.`)
        pociones.cantidad = pociones.cantidad - 1

    }
        else{alert(`No quedan mas pociones...`)}
    }
    recibirAtaque = function(min,max) { //ataque normal (25 - 50) Ataque especial (40 - 100)
        let danoRecibido= randomInt(min,max)
        alert(`${this.nombre} recibe un ataque con un daño de ${danoRecibido}`)
        this.vida = this.vida - danoRecibido
    }
}
//numero random Debe dar un numero entre 40 y 90 para calcular daño
function randomInt(min, max)
{
    return Math.round(Math.random() * (max- min) + min )
}




//Objetos
const pociones = {cantidad:5 , vidaCurada:40}
const poke1 = new Pokemon (`Pikachu`, `Electrico`, 500, 200,)
const poke2 = new Pokemon (`Charmander`, `Fuego`, 600, 150,)
const poke3 = new Pokemon (`Bulbasaur`, `Planta`, 450, 300,)
const poke4 = new Pokemon (`Squirtle`,`Agua`, 550, 200,)
//Array de todos los pokemons
const todosLosPokemons = [poke1,poke2,poke3,poke4]
//Funcion para listar todos los pokemons
function listarPokemons(listadoDePokemons) {
    return listadoDePokemons.map((listadoDePokemons) => { return `\n ${listadoDePokemons.nombre}`; })
}

//Te deje elegir entre los pokemons disponibles


function elegirPokemonAliado() {
    let seleccion = prompt(`Elije que pokemon utilizaras para tus batallas: ${listarPokemons(todosLosPokemons)}`);
    
    //Encuentra el pokemon seleccionado y lo pushea dentro de mis pokemons
    const miPokemon = (todosLosPokemons.filter((todosLosPokemons) => { return todosLosPokemons.nombre == seleccion; }));
    if (miPokemon.length > 0){
        todosLosPokemons.indexOf(seleccion)
        elegido=todosLosPokemons.findIndex((todosLosPokemons)=> {return todosLosPokemons.nombre == seleccion})
        todosLosPokemons.splice(elegido,1)
        console.log(todosLosPokemons)
        return miPokemon}

    else{alert(`No se encontro el nombre de ese Pokemon, intentelo de nuevo por favor`)
        elegirPokemonAliado()
    }
}


console.log(todosLosPokemons)

//misma funcion para el enemigo


function elegirPokemonEnemigo() 
    {
        let seleccion = prompt(`Elije contra que pokemon batallaras: ${listarPokemons (todosLosPokemons)}`);
        //Encuentra el pokemon seleccionado y lo pushea dentro de mis pokemons
        const pokemonEnemigo = (todosLosPokemons.filter((todosLosPokemons) => { return todosLosPokemons.nombre == seleccion; }))

        if(pokemonEnemigo.length > 0)
            {
            return pokemonEnemigo
            }
        else
            {
            alert(`No se encontro un Pokemon con ese nombre, intentelo nuevamente`) 
            elegirPokemonEnemigo()
            }
    }

//Muestra los datos del pokemon elegido

function datosPokemon (arrayPokemons){
    arrayPokemons.forEach(arrayPokemons => {
        alert(`Estadisticas del Pokemon: \n\n\nNombre: ${arrayPokemons.nombre} \nVida: ${arrayPokemons.vida} \nTipo: ${arrayPokemons.tipo} \nEnergia: ${arrayPokemons.energia}`)
    });}
    

///Menu principal, te deja salir del programa e ingresar al combate, debe repetirse las veces que el usuario lo desee.
let dadoCastigo = 0
function menuPrincipal() {
    
    alert(`¡Bienvenido al simulador de combate!`)
    menu = parseInt(prompt(`Elija una opcion: \n 1- Elegir Pokemon y luchar \n 2- Salir `))
    switch (menu) {
        case 1:
            miPokemon = elegirPokemonAliado()
            pokemonEnemigo = elegirPokemonEnemigo()
            alert(`Avanzaremos al menu de combate`)
            menuCombate()
            // menuCombate()
            break
        case 2:
            alert(`¡Saliendo del simulador! para volver a participar reinicie la pagina.`)
            break
        default:
            alert(`La opcion seleccionada no es valida.`)
            menuPrincipal()
    }
}


function menuCombate() { ///Te debe dejar tomar acciones en el combate, 
    do {
        acciones = parseInt(prompt(`Elije una accion: \n1- Atacar \n2-Usar una pocion \n3-Ver stats \n4-Escapar`))

        switch (acciones) {
            case 1:
                combate()
                break
            case 2:
                miPokemon[0].curarse()
                datosPokemon(miPokemon)
                break
            case 3:
                let decision = parseInt(prompt(`Para ver a su pokemon ingrese 1 \nPara ver el pokemon enemigo ingrese 2 \nPara volver ingrese cualquier otro valor`))
                    switch(decision){
                    case 1:
                        datosPokemon(miPokemon)
                        menuCombate()
                        break
                    case 2:
                        datosPokemon(pokemonEnemigo)
                        menuCombate()
                        break
                    default:
                        menuCombate()
                }
            case 4:
                    alert("¡Haz escapado exitosamente! ")
                    miPokemon[0].vida= miPokemon[0].vida -99999
                    alert("Terminando la simulacion.")
                break
            default:
                alert(`Te quedaste mirando el techo, el oponente logra golpearte`)
                miPokemon[0].recibirAtaque(75,75)
                datosPokemon(miPokemon)
        }
    } while (miPokemon[0].vida > 0 && pokemonEnemigo[0].vida > 0)
    
}

function combate() { ///Te debe dejar tomar acciones en el combate, agregr RNG cuando enseñen math.random

    ataque = parseInt(prompt("¿Que ataque vas a usar? \n1- Ataque FISICO  \n2- Ataque ESPECIAL (Cuesta Energia) \n3- Atras"))///agregar probabilidad de fallar cuando sepa como
    switch (ataque) {// hit chance para jugador sera de 10 (90% de probabilidad), hitchance para el bot sera de 30 (70% de probabilidad)
        case 1:
            miPokemon[0].ataqueNormal(10,pokemonEnemigo)
            alert(`¡Cuidado! El enemigo esta intentando atacarte.`)
            dadoCastigo= randomInt(0,100)
            if(dadoCastigo > 60)
                {
                    alert(`¡El enemigo logro devolverte un ataque!`)
                    pokemonEnemigo[0].ataqueNormal(30,miPokemon)
                }
            else if(dadoCastigo > 80){
                alert(`¡El enemigo logro devolverte un ataque ESPECIAL!`)
                pokemonEnemigo[0].ataqueEspecial(30,miPokemon)
            }
            else{ alert(`Logras interceptar y cancelar su ataque. ¡Aprovecha!`)}
            datosPokemon(miPokemon)
            datosPokemon(pokemonEnemigo)
            break
        case 2: //hacer numero random que entregue este valor// hit chance para jugador sera del 30 (70% de probabilidad), hitchance para el bot sera de 60(40% de probabilidad)
            miPokemon[0].ataqueEspecial(30,pokemonEnemigo)
            alert(`¡Cuidado! El enemigo esta intentando atacarte.`)
            dadoCastigo = randomInt(0,100)
            if(dadoCastigo > 60)
                {
                    alert(`¡El enemigo logro devolverte un ataque!`)
                    pokemonEnemigo[0].ataqueNormal(30,miPokemon)
                }
            else if(dadoCastigo > 80){
                alert(`¡El enemigo logro devolverte un ataque ESPECIAL!`)
                pokemonEnemigo[0].ataqueEspecial(30,miPokemon)
            }
            else{ alert(`Logras interceptar y cancelar su ataque. ¡Aprovecha!`)}
            datosPokemon(miPokemon)
            datosPokemon(pokemonEnemigo)
            break
        case 3:
            menuCombate()
            break
        default:
            alert(`Te quedaste mirando el techo, el oponente logra golpearte `)
            miPokemon[0].recibirAtaque(75,75)
            datosPokemon(miPokemon)
    }
    menuCombate()
}
///Ejecuta el simulador
menuPrincipal()




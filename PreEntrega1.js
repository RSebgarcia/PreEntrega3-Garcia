let vidaOponente = 100
let vidaJugador = 100 
let ataque
let menu
let RNG


///Menu principal, te deja salir del programa e ingresar al combate, debe repetirse las veces que el usuario lo desee.
function menuPrincipal() {
    alert("¡Bienvenido al simulador de combate!")
    menu = parseInt(prompt("Elija una opcion: \n 1- Elegir Pokemon y luchar \n 2- Salir "))
    switch (menu) {
        case 1:
            misPokemons = elegirPokemonAliado()
            pokemonEnemigo = elegirPokemonEnemigo()
            menuCombate()
            break
        case 2:
            alert("¡Saliendo del simulador! para volver a participar reinicie la pagina.")
            break
        default:
            alert("La opcion seleccionada no es valida.")
            menuPrincipal()
    }
}

///contador de vida
// function showStats() {
//     show = "Oponente: \n" + vidaOponente + " puntos de vida \n \n \n Tu: \n" + vidaJugador + " puntos de vida"
//     alert(show)
// }
// FUNCIONES VIEJAS DE COMBATE
// ///para hacer daño al enemigo
// function doDamage(vida, danio) {
//     vidaOponente = vida - danio
//     return vidaOponente
// }
// /// para recibir daño
// function takeDamage(vida, danio) {
//     vidaJugador = vida - danio
//     return vidaJugador
// } 
// ///para curar
// function Heal(vida, curacion) {
//     if(vida < 81){
//     alert("Haz utilizado una pocion magica, recuperas 20 puntos de vida")
//     vidaJugador = vida + curacion
//     return vidaJugador
// }
// else{alert("No puedes curarte mas")}
// }   
// giveRandom()

// function giveRandom(max) {
//     let random
//     random = Math.floor(Math.random() * max)
//     return random
// }

function menuCombate() { ///Te debe dejar tomar acciones en el combate, agregr RNG cuando enseñen math.random
    do {
        acciones = parseInt(prompt("Elije una accion: \n 1- Atacar \n 2- Bloquear \n 3- Usar una pocion \n4-Salir"))

        switch (acciones) {
            case 1:
                combate()
                break
            case 2:
                    doDamage(vidaOponente,10)
                    alert("¡Haz bloqueado exitosamente el ataque! El daño del enemigo fue negado y recibe 10 puntos de daño.")
                    showStats()
            case 3:
                
                Heal(vidaJugador, 20)
                showStats()
                break
            case 4:
                menuPrincipal()
                break
            default:
                alert("Haz perdido tu oportunidad, el oponente logra golpearte y pierdes 30 puntos de vida")
                vidaJugador = vidaJugador - 30
                showStats()
        }
    } while (vidaJugador > 0 && vidaOponente > 0)
    menuPrincipal()
}

function combate() { ///Te debe dejar tomar acciones en el combate, agregr RNG cuando enseñen math.random

    ataque = prompt("¿Que ataque vas a usar? \n 1- Ataque pesado (30 puntos de daño) \n 2- Ataque ligero (10 puntos de daño) \n 3- Atras")///agregar probabilidad de fallar cuando sepa como
    switch (ataque) {
        case "1":
            alert("Ataque pesado efectivo, haz hecho 30 puntos de daño a tu rival.")
            doDamage(vidaOponente, 30)
            console.log(vidaOponente)
            if (vidaOponente >= 0) {
                alert("El oponente devuelve un ataque ligero recibes 20 puntos de daño ")
                takeDamage(vidaJugador, 20)
            }
            else { console.log(vidaJugador + " " + vidaOponente) }
            console.log(vidaJugador)
            showStats()
            break
        case "2":
            doDamage(vidaOponente, 50)
            alert("Ataque ligero es muy efectivo, haz hecho 10 puntos de daño a tu rival. Encuentras una apertura y golpeas nuevamente, logrando 40 otros puntos de daño critico.")
            console.log(vidaOponente)
            if (vidaOponente >= 0) {
                takeDamage(vidaJugador, 25)
                alert("El oponente devuelve un ataque pesado recibes 30 puntos de daño.")
                console.log(vidaJugador)
            }
            else {
                console.log(vidaJugador + " " + vidaOponente)
            }
            showStats()
            break
        case "3":
            menuCombate()
        default:
            alert("Pierdes tu oportunidad, recibes 40 puntos de daño por no prestar atencion.")
            takeDamage(vidaJugador, 40)
            console.log(vidaJugador)
            showStats()
            console.log(vidaJugador)
    }
    /// cierra la partida si alguno de los dos mueren
    if (vidaOponente <= 0) { 
        alert("¡Felicidades! haz ganado la batalla, volviendo al menu principal")
        vidaOponente = 100
        vidaJugador = 100
        menuPrincipal()
    } else { console.log(console.log(vidaJugador + " " + vidaOponente)) }
    if (vidaJugador <= 0) {
        alert(":( haz perdido la batalla, volviendo al menu principal")
        vidaOponente = 100
        vidaJugador = 100
        menuPrincipal()
    } else { console.log(console.log(vidaJugador + " " + vidaOponente)) }
}
///Ejecuta el simulador
menuPrincipal()
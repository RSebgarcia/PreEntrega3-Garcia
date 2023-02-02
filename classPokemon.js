//Defino la clase
class Pokemon {
    nombre;
    tipo;
    vida;
    energia;
    urlFotoAliado;
    urlFotoEnemigo;
//contructora
    constructor(nombre, tipo, vida, energia,urlFotoAliado, urlFotoEnemigo ) {
        this.nombre = nombre;
        this.tipo = tipo;
        this.vida = vida;
        this.energia = energia;
        this.urlFotoAliado = urlFotoAliado
        this.urlFotoEnemigo = urlFotoEnemigo
    }
}
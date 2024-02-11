//CLASSE QUE VAI CONTER A LOGICA DE DADOS

//COMO OS DADOS SERÃO ESTRUTURADOS

export class Favorites{
    constructor(RecebendoEstrutura){
        this.estrutura =  document.querySelector(RecebendoEstrutura)

    }
}

export class FavoritesView extends Favorites{
    constructor(manipulandoEstrutura){
        super(manipulandoEstrutura)

        this.removeoffFavorites()
    }

    removeoffFavorites(){
        const teste = this.estrutura.querySelector('#wrapper-input')
        console.log(teste)
    }
}


//CLASSE QUE VAI CRIAR A VISUALIZAÇÃO E EVENTO HTML
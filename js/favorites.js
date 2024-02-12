//CLASSE QUE VAI CONTER A LOGICA DE DADOS

//COMO OS DADOS SERÃO ESTRUTURADOS

export class Favorites{
    constructor(RecebendoEstruturaDoFavoritesView){
        this.estrutura =  document.querySelector(RecebendoEstruturaDoFavoritesView)

    }
}

export class FavoritesView extends Favorites{
    constructor(RecebendoEstruturaPorAqui){
        super(RecebendoEstruturaPorAqui)
        console.log(this.estrutura)
    }

    removeoffFavorites(){
        const span = this.estrutura.querySelector('main span')
        const estrela = this.estrutura.querySelector('main table')

        span.textContent = ""
        estrela.classList.remove('off-favorites')
    }

    createRow(){
        const tr = document.createElement('tr')
        
        const content = 
        `<td class="user">
            <img src="https://github.com/alexandrercs.png" alt="">
            <a href="https://github.com/alexandrercs" target="_blank" rel="noopener noreferrer">
                <p>Alexandre</p>
                <span>alexandrercs</span>
            </a>
        </td>
        <td class="repositories">37</td>
        <td class="followes">137</td>
        <td><button id="remover">Remover</button></td>`
    }

}


//CLASSE QUE VAI CRIAR A VISUALIZAÇÃO E EVENTO HTML
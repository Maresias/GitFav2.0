//CLASSE QUE VAI CONTER A LOGICA DE DADOS
export class githubUser{
    static search(nomePesquisado){
        const recebendoDadosApi = `https:/api.github.com/users/${nomePesquisado}`
    }
}

//COMO OS DADOS SERÃO ESTRUTURADOS

export class Favorites{
    constructor(RecebendoEstruturaDoFavoritesView){
        this.estrutura =  document.querySelector(RecebendoEstruturaDoFavoritesView)

    }
}

export class FavoritesView extends Favorites{
    constructor(RecebendoEstruturaPorAqui){
        super(RecebendoEstruturaPorAqui)

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
            <img src="" alt="">
            <a href="" target="_blank" rel="noopener noreferrer">
                <p></p>
                <span></span>
            </a>
        </td>
        <td class="repositories"></td>
        <td class="followes"></td>
        <td><button id="remover">Remover</button></td>`

        tr.innerHTML = content

        return tr
    }

}


//CLASSE QUE VAI CRIAR A VISUALIZAÇÃO E EVENTO HTML
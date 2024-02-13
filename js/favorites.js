//CLASSE QUE VAI CONTER A LOGICA DE DADOS
export class githubUser{
    static search(nomePesquisado){
        const recebendoDadosApi = `https:/api.github.com/users/${nomePesquisado}`

        return fetch(recebendoDadosApi)
        .then(dadosDaApi => dadosDaApi.json())
        .then(
            ({login, name,  public_repos, followers}) => ({
                login,
                name,
                public_repos,
                followers
            })
        )
    }
}

//COMO OS DADOS SERÃO ESTRUTURADOS

export class Favorites{
    constructor(RecebendoEstruturaDoFavoritesView){
        this.estrutura =  document.querySelector(RecebendoEstruturaDoFavoritesView)

    }

    async add(username){
        
        const usuarioFavorito = await githubUser.search(username)

        this.dados = [usuarioFavorito, ...this.dados]

        this.update()
    }
}




export class FavoritesView extends Favorites{
    constructor(RecebendoEstruturaPorAqui){
        super(RecebendoEstruturaPorAqui)

        this.manipulandoTbody = this.estrutura.querySelector('table tbody')

        this.buttonAdd()


    }

    buttonAdd(){
        const clickButton = this.estrutura.querySelector('#wrapper-input button')
        clickButton.onclick = () =>{

            const {value} = this.estrutura.querySelector('#wrapper-input input')
            this.add(value)
        }
    }

    update(){
        this.dados.forEach(usuario => {
            
        });
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
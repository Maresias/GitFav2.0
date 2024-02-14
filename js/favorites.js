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

        this.inicioDoDados()

    }

    inicioDoDados(){
        
        this.dados = JSON.parse(localStorage.getItem('@Nome-que-voce-quiser:')) || []
    }

    save(){
        localStorage.setItem('@Nome-que-vc-quiser', JSON.stringify(this.dados))
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
        this.removeAllTr()
        this.removeoffFavorites()

        this.dados.forEach(usuario => {
            const adicionadoDadosNaTr = this.criandoTr()
            adicionadoDadosNaTr.querySelector('.user img').src = `https://github.com/${usuario.login}.png`
            adicionadoDadosNaTr.querySelector('.user a').href = `https://github.com/${usuario.login}`
            adicionadoDadosNaTr.querySelector('.user p').textContent = usuario.name
            adicionadoDadosNaTr.querySelector('.user span').textContent = usuario.login
            adicionadoDadosNaTr.querySelector('.repositories').textContent = usuario.public_repos
            adicionadoDadosNaTr.querySelector('.followes').textContent = usuario.followers


            this.manipulandoTbody.append(adicionadoDadosNaTr)
        });

        console.log(this.manipulandoTbody)
    }

    removeoffFavorites(){
        const span = this.estrutura.querySelector('main span')
        const estrela = this.estrutura.querySelector('main table')

        span.textContent = ""
        estrela.classList.remove('off-favorites')
    }

    criandoTr(){
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

    removeAllTr(){
        console.log(this.manipulandoTbody)
        this.manipulandoTbody.querySelectorAll('tr')
        .forEach((tr) => {
            tr.remove()
        }

        )
    }

}


//CLASSE QUE VAI CRIAR A VISUALIZAÇÃO E EVENTO HTML
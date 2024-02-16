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

    deleteTr(user){
        const novaListaTr = this.dados.filter(
            atualListaTr => atualListaTr.login !== user.login
        )

        this.dados = novaListaTr
        this.update()
    }

}




export class FavoritesView extends Favorites{
    constructor(RecebendoEstruturaPorAqui){
        super(RecebendoEstruturaPorAqui)

        this.manipulandoTbody = this.estrutura.querySelector('table tbody')

        this.span = this.estrutura.querySelector('main span')
        this.estrela = this.estrutura.querySelector('main table')

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
        this.removeoffFavorites()
        this.removeAllTr()

        this.dados.forEach(usuario => {
            const adicionadoDadosNaTr = this.criandoTr()
            adicionadoDadosNaTr.querySelector('.user img').src = `https://github.com/${usuario.login}.png`
            adicionadoDadosNaTr.querySelector('.user a').href = `https://github.com/${usuario.login}`
            adicionadoDadosNaTr.querySelector('.user p').textContent = usuario.name
            adicionadoDadosNaTr.querySelector('.user span').textContent = usuario.login
            adicionadoDadosNaTr.querySelector('.repositories').textContent = usuario.public_repos
            adicionadoDadosNaTr.querySelector('.followes').textContent = usuario.followers

            adicionadoDadosNaTr.querySelector('#remover').onclick = () =>{
                this.deleteTr(usuario)
                this.verificandoSeTemTr()
            }


            this.manipulandoTbody.append(adicionadoDadosNaTr)
        });

    }

    removeoffFavorites(){
        this.span.textContent = ""
        this.estrela.classList.remove('off-favorites')
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
        this.manipulandoTbody.querySelectorAll('tr')
        .forEach((tr) => {
            tr.remove()
        }

        )
    }

    verificandoSeTemTr(){
       const temTr = this.manipulandoTbody.querySelectorAll('tr')

       
       if(temTr.length == 0){
            this.span.textContent = "Nenhum favorito ainda"
            this.estrela.classList.add('off-favorites')

       }else{
        return
       }

    }
}

//
//CLASSE QUE VAI CRIAR A VISUALIZAÇÃO E EVENTO HTML//
// Type: create | edit
const urlSearchParams = new URLSearchParams(this.window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
const screenType = params.id ? 'edit' : 'create';

window.onload = function () {
    setScreenType();
}

function setScreenType() {
    if (screenType == 'create') {
        this.document.querySelector('#main-title').innerText = "Vamos cadastrar o seu novo projeto!";
        this.document.querySelector('#action-button').innerText = "Cadastrar";
    }

    if (screenType == 'edit') {
        this.document.querySelector('#main-title').innerText = "Editar projeto";
        this.document.querySelector('#action-button').innerText = "Salvar";
    }
}

function registerOrEdit() {
    //dados do form
    let payload = {
        id: params.id,
        title: document.querySelector("#title").value,
        totalCost: document.querySelector("#totalCost").value,
        description: document.querySelector("#description").value,
        idClient: 1
    }

    //calling api
    

    fetch(`https://localhost:7282/api/projects${screenType === 'edit' ? ('/' + params.id) : '' }`, {
        method: screenType === 'edit' ? 'PUT' : 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json',
            'accept': '*/*',
            'Access-Control-Allow-Origin': '*'
        }
    })
        .then(response => response.json())
        .then(response => {
            if (screenType === 'edit') {
                alert('Atualizado com sucesso!');
            } else{
                alert('Cadastrado com sucesso!');
            }
        })
        .catch(error => {

        })

} 
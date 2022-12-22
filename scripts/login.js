function checkIfAnyRoleIsChecked(){
    let list = document.getElementsByName("role");
    let counter = 0;

    for (let radioButton of list) {
        if (radioButton.checked === false) {
            counter++;
        }
    }
    return counter !== list.length;
}

function register(){
    //dados do form
    if(checkIfAnyRoleIsChecked() === false){
        alert('Selecione uma opção de role');
        return;
    }

    let payload = {
        role: document.getElementsByName("role")[0].checked == true ? 'freelancer' : 'client',
        fullName: document.querySelector("#fullName").value,
        birthDate: document.querySelector("#birthDate").value,
        email: document.querySelector("#email").value,
        password: document.querySelector("#password").value
    }
    console.log(payload)

    //calling api

    fetch("https://localhost:7282/api/users", {
        method: 'POST',
        body: JSON.stringify(payload),
        headers:{
            'Content-Type': 'application/json',
            'accept': '*/*',
            'Access-Control-Allow-Origin': '*'
        }
    })
    .then(response => response.json())
    .then(response => {
        alert('Cadastrado com sucesso!');
    })
    .catch(error => {

    })

}   
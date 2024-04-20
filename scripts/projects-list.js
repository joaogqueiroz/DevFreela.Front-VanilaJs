list = [];
window.onload = function () {
    document.querySelector("#name").innerText = localStorage.getItem("userName");
    document.querySelector("#role").innerText = localStorage.getItem("role");
    getProjects();
}

function getProjects() {
    fetch("https://localhost:7282/api/projects")
        .then(response => response.json())
        .then(response => {
            list = response;
            buildTable();
        })
}

function editProject(id){
    window.location.href = `project-create-edit.html?id=${id}`;
}
function deleteProject(id){
    fetch(`https://localhost:7282/api/projects/${id}`,{
        method: 'DELETE'
    })
        .then(response => response.json())
        .then(response => {
            list = list.filter(project => project.id !== id);
        })
}

function buildTable(){
    document.querySelector("#table-body").innerHTML = '';
    const idClient = localStorage.getItem("idClient");
    list = list.filter(x => x.idClient === idClient); 
    list.forEach(element => {
        let tamplete =`<div class="row">
        <div class="title-discription">
        <h6 class="title">${element.title}</h6>
        <p class="description">${element.description}</p>
        </div>
        <div class="price">R$ ${element.totalCoast}</div>
        <div class="actions">
        <span class="edit material-icons" onclick="editProject(${element.id})">
        edit
        </span>
        <span class="delete material-icons">
        delete_outline
        </span>
        </div>
        </div>`
        
        document.querySelector("#table-body").insertAdjacentHTML("beforeend", tamplete)
        
    });
}
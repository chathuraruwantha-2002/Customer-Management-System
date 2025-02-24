const searchInput = document.getElementById("txtSearch");
let customerObj;

searchInput.addEventListener('input', function (event) {
    const inputText = event.target.value;
    console.log(inputText);

    if (inputText !== "") {
        SearchById(inputText);
    } else {
        console.log("No input");
        customerObj = null;
        clearForm();
    }
});


function SearchById(customerId) {
    const requestOptions = {
        method: "GET",
        redirect: "follow"  
    };

    fetch(`http://localhost:8080/customer/search-by-id/${customerId}`, requestOptions)
        .then((response) => response.json())
        .then(result => {
            customerObj = result || null;
            console.log(customerObj);
            showData();
        })
        .catch((error) => {
            console.error(error);
            customerObj = null;
            clearForm();
        });
}


function showData() {
    const name = document.getElementById("txtName");
    const address = document.getElementById("txtAddress");
    const salary = document.getElementById("txtSalary");

    if (customerObj) {
        name.value = customerObj.name || '';
        address.value = customerObj.address || '';
        salary.value = customerObj.salary || '';
    } else {
        clearForm();
    }

}

function updateCustomer() {

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "id": customerObj.id,
        "name": document.getElementById("txtName").value,
        "address": document.getElementById("txtAddress").value,
        "salary": document.getElementById("txtSalary").value
    });

    const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    fetch("http://localhost:8080/customer/update-customer", requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
}


function clearForm(){
    document.getElementById("txtName").value = '';
    document.getElementById("txtAddress").value = '';
    document.getElementById("txtSalary").value = '';
}







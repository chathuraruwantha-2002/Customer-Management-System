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

function deleteCustomer() {

    if (!customerObj || !customerObj.id) {
        console.error("No customer selected for deletion.");
        return;
    }

    const raw = "";

    const requestOptions = {
        method: "DELETE",
        body: raw,
        redirect: "follow"
    };

    fetch(`http://localhost:8080/customer/delete/${customerObj.id}`, requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.error(error));

    clearForm();
}


function clearForm() {
    document.getElementById("txtSearch").value = '';
    document.getElementById("txtName").value = '';
    document.getElementById("txtAddress").value = '';
    document.getElementById("txtSalary").value = '';
}

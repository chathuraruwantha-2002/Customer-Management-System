loadCustomer();
function loadCustomer() {
    fetch("http://localhost:8080/customer/get-all")
        .then(res => res.json())
        .then(data => {
            console.log(data)

            let tableRow = `
                
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Salary</th>
                </tr>
        `;

            let customerTable = document.getElementById("tblCustomers");

            data.forEach(customer => {
                tableRow += `    
                <tr>
                    <td>${customer.id}</td>
                    <td>${customer.name}</td>
                    <td>${customer.address}</td>
                    <td>${customer.salary}</td>
                </tr>
            `;
            });

            customerTable.innerHTML = tableRow;
        })
}


function searchCustomersByName() {
    let input = document.getElementById("search").value;
    console.log(input);

    if (input === "") {
        loadCustomer();
        return;
    }

    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

    fetch(`http://localhost:8080/customer/search-by-name/${input}`)
        .then((response) => response.json())
        .then(data => {
            console.log(data);

            if (data.length === 0) {
                document.getElementById("tblCustomers").innerHTML = "<tr><td colspan='4'>No customers found.</td></tr>";
                return;
            }

            let tableRow = `
                
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Salary</th>
                </tr>
            `;

            let customerTable = document.getElementById("tblCustomers");

            data.forEach(customer => {
                tableRow += `    
                <tr>
                    <td>${customer.id}</td>
                    <td>${customer.name}</td>
                    <td>${customer.address}</td>
                    <td>${customer.salary}</td>
                </tr>
            `;
            });

            customerTable.innerHTML = tableRow;
        })


}




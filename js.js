//sends ajax on load 
$(document).ready(function () {
    getPeople()
});

let people = []

//makes ajax call
const getPeople = () => {
    var queryURL = "https://randomuser.me/api/?results=150";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(res => {
        let people = res.results
        //generates the table
        generateTable(people)

        //reads the table
        $('#table_id').DataTable();
    }).catch(err => {
        console.log(err)
    })
}

const generateTable = (people) => {
    people.map(person => {
        console.log(person)
        let tr = $("<tr>")

        let tdNameTitle = $("<td>")
        tdNameTitle.text(person.name.title)

        let tdNameFirst = $("<td>")
        tdNameFirst.text(person.name.first)

        let tdNameLast = $("<td>")
        tdNameLast.text(person.name.last)

        let tdAge = $("<td>")
        tdAge.text(person.dob.age)

        let tdEmail = $("<td>")
        tdEmail.text(person.email)

        let tdPhone = $("<td>")
        tdPhone.text(person.phone)

        let tdStreetAddress = $("<td>")
        tdStreetAddress.text(person.location.street.number + " " + person.location.street.name)

        let tdCity = $("<td>")
        tdCity.text(person.location.city)

        let tdState = $("<td>")
        tdState.text(person.location.state)
        let tdCountry = $("<td>")
        tdCountry.text(person.location.country)

        let tdZipCode = $("<td>")
        tdZipCode.text(person.location.postcode)

        tr.append(tdNameTitle, tdNameFirst, tdNameLast, tdAge, tdEmail, tdPhone, tdStreetAddress, tdCity, tdState, tdCountry, tdZipCode)

        //appends to table body
        $("#peopleTableBody").append(tr)
    })
}
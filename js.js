//sends ajax on load 
$(document).ready(function () {
    getPeople()
});

//makes ajax call
const getPeople = () => {
    var queryURL = "https://randomuser.me/api/?results=150";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(res => {
        //reads the table
        generateTable(res.results)
        console.log(res)
        let info = res.results
        console.log("getPeople -> info", info)

        //generates the table
        var table = $("#peopleTable").DataTable({
            stateSave: true,
            pagingType: "full_numbers"
        })

        //expand or hide extra row 
        $('#peopleTableBody').on('click', '.toggleButtonDiv', function () {
            console.log("hello")
            var tr = $(this).closest('tr');
            var row = table.row(tr);
            console.log("getPeople -> row", row)
            var button =$(this).closest('button')
            console.log("getPeople -> button", button)

            if (row.child.isShown()) {
                // This row is already open - close it
                row.child.hide();
                tr.removeClass('shown');
            } else {
                // Open this row
                row.child(format(row.data())).show();
                tr.addClass('shown');
                button.removeClass("toggleBtnOpen")
            }
        });

        // onclick event on a row 
        // $('#peopleTableBody').on('click', 'tr', function (e) {
        //     console.log(e)
        //     if (e.target != "button") {
        //         var data = table.row(this).data();
        //         // console.log(data)
        //         alert('You clicked on ' + data[2] + " " + data[3] + '\'s row');
        //         var tr = $(this).closest("tr")
        //         // var row = table.row(tr);
        //         // console.log("getPeople -> row", row)
        //     }


        // });

    }).catch(err => {
        console.log(err)
    })
}


const generateTable = (people) => {
    people.map(person => {
        //console.log(person)
        let tr = $("<tr>")

        let toggleButtonD = $("<td>").addClass("toggleButtonDiv")
        let toggleBtn = $("<button>").addClass("toggleBtnOpen")
        toggleBtn.text("+")
        toggleButtonD.append(toggleBtn)

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

        let tdStreetAddress = $("<td>").addClass("none")
        tdStreetAddress.text(person.location.street.number + " " + person.location.street.name)

        let tdCity = $("<td>").addClass("none")
        tdCity.text(person.location.city)

        let tdState = $("<td>").addClass("none")
        tdState.text(person.location.state)
        let tdCountry = $("<td>")
        tdCountry.text(person.location.country)

        let tdZipCode = $("<td>")
        tdZipCode.text(person.location.postcode)

        let tdImage = $("<td>").addClass("none")
        let image = $("<img>")
        image.attr("src", person.picture.large).addClass('subInfoPicture')
        tdImage.append(image)

        tr.append(toggleButtonD, tdNameTitle, tdNameFirst, tdNameLast, tdAge, tdEmail, tdPhone, tdStreetAddress, tdCity, tdState, tdCountry, tdZipCode, tdImage)
        // tr.attr("userData", JSON.stringify(person))
        $("#peopleTableBody").append(tr)
    })
}





function format(d) {
    console.log(d)
    // `d` is the original data object for the row
    return '<div class="subDiv">' +
         '<table class="subInfoPicture" cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">' +
            '<tr>' +
            '<td class="imageTd">' + d[12] + '</td>' +
            '</tr>' +
            '</table>'+


        '<table class="subInfo" cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">' +
        '<tr>' +
        '<td>Street:</td>' +
        '<td>' + d[7] + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>City:</td>' +
        '<td>' + d[8] + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>State</td>' +
        '<td>' + d[9] + '</td>' +
        '</tr>' +
        '</table>' +

        '</div>'

        ;
}
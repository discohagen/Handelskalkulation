var calculations = [
    { sign: '', label: 'Listeneinkaufspreis (netto)' },
    { sign: '-', label: 'Lieferrabatt' },
    { sign: '=', label: 'Zieleinkaufspreis' },
    { sign: '-', label: 'Lieferskonto' },
    { sign: '=', label: 'Bareinkaufspreis' },
    { sign: '+', label: 'Bezugskosten' },
    { sign: '=', label: 'Bezugspreis' },
    { sign: '+', label: 'Handlungskostenzuschlag' },
    { sign: '=', label: 'Selbstkosten' },
    { sign: '+', label: 'Gewinnzuschlag' },
    { sign: '=', label: 'Barverkaufspreis' },
    { sign: '+', label: 'Kundenskonto' },
    { sign: '=', label: 'Zielverkaufspreis' },
    { sign: '+', label: 'Kundenrabatt' },
    { sign: '=', label: 'Listenverkaufspreis (netto)' },
    { sign: '+', label: 'Mehrwertsteuer' },
    { sign: '=', label: 'Listenverkaufspreis (brutto)' },
];

var table = document.getElementById(
    'vorwaertskalkulationstabelle'
);

calculations.forEach((calculation) => {
    var row = table.insertRow();
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    cell1.innerHTML = calculation.sign;
    cell2.innerHTML = calculation.label;
    cell3.innerHTML = ''; // Leave empty as per your original structure
    cell4.innerHTML = ''; // Leave empty as per your original structure
});

let calculations = [
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

let table = document.getElementById(
    'vorwaertskalkulationstabelle'
);

for (let i = 0; i < calculations.length; i++) {
    let row = table.insertRow();
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);

    cell1.innerHTML = calculations[i].sign;
    cell2.innerHTML = calculations[i].label;

    let input1 = document.createElement('input');
    input1.type = 'number';
    input1.min = 0;
    input1.max = 100;
    input1.id = `row${i}col2`;
    cell3.appendChild(input1);

    let input2 = document.createElement('input');
    input2.type = 'number';
    input2.min = 0;
    input2.id = `row${i}col3`;
    cell4.appendChild(input2);
}

setInterval(() => {
    document.getElementById('row0col2').disabled = true;

    lieferrabattBetrag =
        document.getElementById('row1col3');
    lieferrabattBetrag.value =
        Math.round(
            (100 *
                (document.getElementById('row1col2').value *
                    document.getElementById('row0col3')
                        .value)) /
                100
        ) / 100;
    lieferrabattBetrag.disabled = true;

    document.getElementById('row2col2').disabled = true;

    zieleinkaufspreis = document.getElementById('row2col3');
    zieleinkaufspreis.value =
        Math.round(
            100 *
                (document.getElementById('row0col3').value -
                    document.getElementById('row1col3')
                        .value)
        ) / 100;
    zieleinkaufspreis.disabled = true;

    lieferskontoBetrag =
        document.getElementById('row3col3');
    lieferskontoBetrag.value =
        Math.round(
            (100 *
                (document.getElementById('row3col2').value *
                    document.getElementById('row2col3')
                        .value)) /
                100
        ) / 100;
    lieferskontoBetrag.disabled = true;

    document.getElementById('row4col2').disabled = true;

    bareinkaufspreis = document.getElementById('row4col3');
    bareinkaufspreis.value =
        Math.round(
            100 *
                (document.getElementById('row2col3').value -
                    document.getElementById('row3col3')
                        .value)
        ) / 100;
    bareinkaufspreis.disabled = true;

    document.getElementById('row5col2').disabled = true;

    document.getElementById('row6col2').disabled = true;

    bezugspreis = document.getElementById('row6col3');
    bezugspreis.value =
        Math.round(
            100 *
                (Number(
                    document.getElementById('row4col3')
                        .value
                ) +
                    Number(
                        document.getElementById('row5col3')
                            .value
                    ))
        ) / 100;
    bezugspreis.disabled = true;

    handlungskostenzuschlagBetrag =
        document.getElementById('row7col3');
    handlungskostenzuschlagBetrag.value =
        Math.round(
            (100 *
                (document.getElementById('row7col2').value *
                    document.getElementById('row6col3')
                        .value)) /
                100
        ) / 100;
    handlungskostenzuschlagBetrag.disabled = true;

    document.getElementById('row8col2').disabled = true;

    selbstkosten = document.getElementById('row8col3');
    selbstkosten.value =
        Math.round(
            100 *
                (Number(
                    document.getElementById('row6col3')
                        .value
                ) +
                    Number(
                        document.getElementById('row7col3')
                            .value
                    ))
        ) / 100;
    selbstkosten.disabled = true;

    gewinnzuschlagBetrag =
        document.getElementById('row9col3');
    gewinnzuschlagBetrag.value =
        Math.round(
            (100 *
                (document.getElementById('row9col2').value *
                    document.getElementById('row8col3')
                        .value)) /
                100
        ) / 100;
    gewinnzuschlagBetrag.disabled = true;

    document.getElementById('row10col2').disabled = true;

    barverkaufspreis = document.getElementById('row10col3');
    barverkaufspreis.value =
        Math.round(
            100 *
                (Number(
                    document.getElementById('row8col3')
                        .value
                ) +
                    Number(
                        document.getElementById('row9col3')
                            .value
                    ))
        ) / 100;
    barverkaufspreis.disabled = true;

    kundenskonto = document.getElementById('row11col2');

    kundenskontoBetrag =
        document.getElementById('row11col3');
    kundenskontoBetrag.value =
        Math.round(
            (100 *
                (kundenskonto.value *
                    barverkaufspreis.value)) /
                (100 - kundenskonto.value)
        ) / 100;
    kundenskontoBetrag.disabled = true;

    document.getElementById('row12col2').disabled = true;

    zielverkaufspreis =
        document.getElementById('row12col3');
    zielverkaufspreis.value =
        Math.round(
            (100 * (100 * barverkaufspreis.value)) /
                (100 - kundenskonto.value)
        ) / 100;
    zielverkaufspreis.disabled = true;

    kundenrabatt = document.getElementById('row13col2');

    kundenrabattBetrag =
        document.getElementById('row13col3');
    kundenrabattBetrag.value =
        Math.round(
            (100 *
                (kundenrabatt.value *
                    zielverkaufspreis.value)) /
                (100 - kundenrabatt.value)
        ) / 100;
    kundenrabattBetrag.disabled = true;

    document.getElementById('row14col2').disabled = true;

    listenverkaufspreisNetto =
        document.getElementById('row14col3');
    listenverkaufspreisNetto.value =
        Math.round(
            (100 * (100 * zielverkaufspreis.value)) /
                (100 - kundenrabatt.value)
        ) / 100;
    listenverkaufspreisNetto.disabled = true;

    mehrwertsteuerBetrag =
        document.getElementById('row15col3');
    mehrwertsteuerBetrag.value =
        Math.round(
            (100 *
                (document.getElementById('row15col2')
                    .value *
                    listenverkaufspreisNetto.value)) /
                100
        ) / 100;
    mehrwertsteuerBetrag.disabled = true;

    document.getElementById('row16col2').disabled = true;

    listenverkaufspreisBrutto =
        document.getElementById('row16col3');
    listenverkaufspreisBrutto.value =
        Math.round(
            100 *
                (Number(listenverkaufspreisNetto.value) +
                    Number(mehrwertsteuerBetrag.value))
        ) / 100;
    listenverkaufspreisBrutto.disabled = true;
}, 100);

// Global Constants

const signsForward = [
    '',
    '-',
    '=',
    '-',
    '=',
    '+',
    '=',
    '+',
    '=',
    '+',
    '=',
    '+',
    '=',
    '+',
    '=',
    '+',
    '=',
];

const signsBackward = [];

const calculationSteps = [
    'Listeneinkaufspreis (netto)',
    'Lieferrabatt',
    'Zieleinkaufspreis',
    'Lieferskonto',
    'Bareinkaufspreis',
    'Bezugskosten',
    'Bezugspreis',
    'Handlungskostenzuschlag',
    'Selbstkosten',
    'Gewinnzuschlag',
    'Barverkaufspreis',
    'Kundenskonto',
    'Zielverkaufspreis',
    'Kundenrabatt',
    'Listenverkaufspreis (netto)',
    'Mehrwertsteuer',
    'Listenverkaufspreis (brutto)',
];

// Event Listeners

document
    .getElementById('vorwaertskalkulationOption')
    .addEventListener(
        'change',
        toggleCalculationDirectionChange
    );

document
    .getElementById('rueckwaertskalkulationOption')
    .addEventListener(
        'change',
        toggleCalculationDirectionChange
    );

// Loading HTML Elements

loadForwardCalculation();
loadBackwardCalculation();

setInterval(() => {
    forwardCalculation();
    backwardCalculation();
}, 100);

// Functions

function toggleCalculationDirectionChange() {
    document.getElementById('vorwaertskalkulation').hidden =
        !document.getElementById('vorwaertskalkulation')
            .hidden;
    document.getElementById(
        'rueckwaertskalkulation'
    ).hidden = !document.getElementById(
        'rueckwaertskalkulation'
    ).hidden;
}

function loadForwardCalculation() {
    const forwardCalculationTable = document.getElementById(
        'vorwaertskalkulationstabelle'
    );

    for (let i = 0; i < calculationSteps.length; i++) {
        let row = forwardCalculationTable.insertRow();
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);

        cell1.innerHTML = signsForward[i];
        cell2.innerHTML = calculationSteps[i];

        let input1 = document.createElement('input');
        input1.type = 'number';
        input1.min = 0;
        input1.max = 100;
        input1.id = `${calculationSteps[i].replace(
            /\s/g,
            ''
        )}Percentage`;
        cell3.appendChild(input1);

        let input2 = document.createElement('input');
        input2.type = 'number';
        input2.min = 0;
        input2.id = `${calculationSteps[i].replace(
            /\s/g,
            ''
        )}Amount`;
        cell4.appendChild(input2);
    }

    disableElements([
        'Listeneinkaufspreis(netto)Percentage',
        'LieferrabattAmount',
        'ZieleinkaufspreisPercentage',
        'ZieleinkaufspreisAmount',
        'LieferskontoAmount',
        'BareinkaufspreisPercentage',
        'BareinkaufspreisAmount',
        'BezugskostenPercentage',
        'BezugspreisPercentage',
        'BezugspreisAmount',
        'HandlungskostenzuschlagAmount',
        'SelbstkostenPercentage',
        'SelbstkostenAmount',
        'GewinnzuschlagAmount',
        'BarverkaufspreisPercentage',
        'BarverkaufspreisAmount',
        'KundenskontoAmount',
        'ZielverkaufspreisPercentage',
        'ZielverkaufspreisAmount',
        'KundenrabattAmount',
        'Listenverkaufspreis(netto)Percentage',
        'Listenverkaufspreis(netto)Amount',
        'MehrwertsteuerAmount',
        'Listenverkaufspreis(brutto)Percentage',
        'Listenverkaufspreis(brutto)Amount',
    ]);
}

// ToDo
function loadBackwardCalculation() {}

function forwardCalculation() {
    document.getElementById('LieferrabattAmount').value =
        calculatePercentageOfAmount(
            'Listeneinkaufspreis(netto)Amount',
            'LieferrabattPercentage'
        );

    document.getElementById(
        'ZieleinkaufspreisAmount'
    ).value = subtractValues(
        'Listeneinkaufspreis(netto)Amount',
        'LieferrabattAmount'
    );

    document.getElementById('LieferskontoAmount').value =
        calculatePercentageOfAmount(
            'ZieleinkaufspreisAmount',
            'LieferskontoPercentage'
        );

    document.getElementById(
        'BareinkaufspreisAmount'
    ).value = subtractValues(
        'ZieleinkaufspreisAmount',
        'LieferskontoAmount'
    );

    document.getElementById('BezugspreisAmount').value =
        addValues(
            'BareinkaufspreisAmount',
            'BezugskostenAmount'
        );

    document.getElementById(
        'HandlungskostenzuschlagAmount'
    ).value = calculatePercentageOfAmount(
        'BezugspreisAmount',
        'HandlungskostenzuschlagPercentage'
    );

    document.getElementById('SelbstkostenAmount').value =
        addValues(
            'BezugspreisAmount',
            'HandlungskostenzuschlagAmount'
        );

    document.getElementById('GewinnzuschlagAmount').value =
        calculatePercentageOfAmount(
            'SelbstkostenAmount',
            'GewinnzuschlagPercentage'
        );

    document.getElementById(
        'BarverkaufspreisAmount'
    ).value = addValues(
        'SelbstkostenAmount',
        'GewinnzuschlagAmount'
    );

    document.getElementById('KundenskontoAmount').value =
        calculatePercentageOfAmountCustomerPerspective(
            'BarverkaufspreisAmount',
            'KundenskontoPercentage'
        );

    document.getElementById(
        'ZielverkaufspreisAmount'
    ).value = addValues(
        'BarverkaufspreisAmount',
        'KundenskontoAmount'
    );

    document.getElementById('KundenrabattAmount').value =
        calculatePercentageOfAmountCustomerPerspective(
            'ZielverkaufspreisAmount',
            'KundenrabattPercentage'
        );

    document.getElementById(
        'Listenverkaufspreis(netto)Amount'
    ).value = addValues(
        'ZielverkaufspreisAmount',
        'KundenrabattAmount'
    );

    document.getElementById('MehrwertsteuerAmount').value =
        calculatePercentageOfAmount(
            'Listenverkaufspreis(netto)Amount',
            'MehrwertsteuerPercentage'
        );

    document.getElementById(
        'Listenverkaufspreis(brutto)Amount'
    ).value = addValues(
        'Listenverkaufspreis(netto)Amount',
        'MehrwertsteuerAmount'
    );
}

// ToDo
function backwardCalculation() {}

function disableElements(elementIds) {
    elementIds.forEach((elementId) => {
        element = document.getElementById(elementId);
        element.disabled = true;
    });
}

function calculatePercentageOfAmount(
    amountElementId,
    percentageElementId
) {
    return (
        Math.round(
            document.getElementById(amountElementId).value *
                document.getElementById(percentageElementId)
                    .value
        ) / 100
    );
}

function subtractValues(
    amountElementId1,
    amountElementId2
) {
    return (
        Math.round(
            100 *
                (document.getElementById(amountElementId1)
                    .value -
                    document.getElementById(
                        amountElementId2
                    ).value)
        ) / 100
    );
}

function addValues(amountElementId1, amountElementId2) {
    return (
        Math.round(
            100 *
                (Number(
                    document.getElementById(
                        amountElementId1
                    ).value
                ) +
                    Number(
                        document.getElementById(
                            amountElementId2
                        ).value
                    ))
        ) / 100
    );
}

function calculatePercentageOfAmountCustomerPerspective(
    amountElementId,
    percentageElementId
) {
    return (
        Math.round(
            (100 *
                document.getElementById(percentageElementId)
                    .value *
                document.getElementById(amountElementId)
                    .value) /
                (100 -
                    document.getElementById(
                        percentageElementId
                    ).value)
        ) / 100
    );
}

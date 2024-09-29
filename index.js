document.querySelectorAll('.form-alert').forEach(elem => {
    elem.style.display = 'none';
});
document.getElementById('completed-calc').style.display = 'none';

const allInput=document.querySelectorAll('input');
const clearAll=document.querySelector('button');
clearAll.addEventListener('click', function() {
    allInput.forEach(input => input.value="");
    allInput.forEach(input => input.checked = false);
    document.querySelector('#amount-alert').style.display = 'none';
    document.querySelector('#term-alert').style.display = 'none';
    document.querySelector('#rate-alert').style.display = 'none';
    document.querySelector('#radio-alert').style.display = 'none';
    document.getElementById('completed-calc').style.display = 'none';
    document.querySelector('.default-stuff').style.display = 'block';    
})

document.getElementById('calculator').addEventListener('click', () => {
    const amount = parseFloat(document.getElementById('mortgage-amount').value);
    const term = parseFloat(document.getElementById('mortgage-term').value);
    const rate = parseFloat(document.getElementById('interest-rate').value);
    const type = document.querySelector('input[name="one-group"]:checked');

    let isValid = true;

    if(isNaN(amount) || amount<=0){
        document.querySelector('#amount-alert').style.display = 'block';
        isValid = false;
    } else {
        document.querySelector('#amount-alert').style.display = 'none';
    }

    if(isNaN(term) || term<=0){
        document.querySelector('#term-alert').style.display = 'block';
        isValid = false;
    } else {
        document.querySelector('#term-alert').style.display = 'none';
    }

    if(isNaN(rate) || rate<=0){
        document.querySelector('#rate-alert').style.display = 'block';
        isValid = false;
    } else {
        document.querySelector('#rate-alert').style.display = 'none';
    }
    console.log(type);
    if(type===null){
        document.querySelector('#radio-alert').style.display = 'block';
        isValid = false;
    } else {
        document.querySelector('#radio-alert').style.display = 'none';
    }

    if (isValid) {
        let monthlyPayment = 0;
        let totalRepayment = 0;

        document.getElementById('completed-calc').style.display = 'block';
        document.querySelector('.default-stuff').style.display = 'none';

        if(type.id ==='repayment'){
            const monthlyRate = rate / 12;
            const n = term * 12;
            monthlyPayment = (amount * monthlyRate) / (1 - Math.pow((1 + monthlyRate), -n));
            totalRepayment = monthlyPayment * n;
        }

        if(type.id === 'interest-only'){
            monthlyPayment = (amount * rate) / 12;
            totalRepayment = monthlyPayment * term;
        }

        document.getElementById('repayments').innerHTML = `£${monthlyPayment.toFixed(2)}`;
        console.log(`${totalRepayment}`);
        document.getElementById('total').innerHTML = `£${totalRepayment.toFixed(2)}`
    } else {
        document.getElementById('completed-calc').style.display = 'none';
        document.querySelector('.default-stuff').style.display = 'block';
    }
})

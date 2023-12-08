import axios from 'axios';
// console.log('hello from axios');

export const postMessage = async (fullName, companyName, email, sample) => {
    try {

        console.log('sending postMessage');

        const res = await axios({
            method: 'POST',
            url: '/',
            data: {
                fullName,
                companyName,
                email,
                sample
            }
        });

        if (res.data.status === 'success') console.log('Message has been posted');


    } catch (error) {
        console.log(error.response.data)
    }
}

export const postQuote = async (quoteNumber, validStart, validEnd, productName, quantity, container, weightTon, incoterms,
    portDischarge, country, paymentMethod, kurs, fobRp, fobUsd, fobTon, fullName, companyName, email) => {
    try {
        console.log('sending postQuote');

        const res = await axios({
            method: 'POST',
            url: '/api/v1/quote',
            data: {
                quoteNumber,
                validStart,
                validEnd,
                productName,
                quantity,
                container,
                weightTon,
                incoterms,
                portDischarge,
                country,
                paymentMethod,
                kurs,
                fobRp,
                fobUsd,
                fobTon,
                fullName,
                companyName,
                email
            }
        });

        if (res.data.status === 'success') console.log('Quote has been posted');

    } catch (error) {
        console.log(error.response.data)
    }
}


exports.viewHome = (req, res) => {
    // console.log('masuk view');
    res.status(200).render('home', {
        title: 'Celexport | Spices Trading Company',
        // script: `(defer src='/js/scriptHome.js')`
    });
};

exports.viewQuote = (req, res) => {
    res.status(200).render('quote', {
        title: 'Celexport | Quotation',
        // script: `(defer src='/js/scriptQuote.js')`
    })
}
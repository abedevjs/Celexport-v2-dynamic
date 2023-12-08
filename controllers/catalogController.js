exports.downloadCatalogs = (req, res, next) => {
    // console.log('8888888888888888888888888888888888888888888888888888888888888888888');
    const fileName = req.params.name;
    // console.log(fileName);
    // const directorypath = `${__dirname}/../../dev-data/download/${fileName}.pdf`;
    const directorypath = `${__dirname}/../dev-data/download/`;

    res.download(`${directorypath}/${fileName}`, fileName, (err) => {
        if (err) {
            // console.log(err);
            return next(new AppError('We are apologize, the file that you requested, is not available right now 😞. Please try again later!', 404));
        }
    })
};
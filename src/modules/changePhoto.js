const changePhoto = () => {

    const commandPhotos = document.querySelectorAll('.command__photo');

    const shifter = (event) => {

        let src = event.target.src;

        if (event.type === 'mouseover') {
            event.target.src = event.target.dataset.img;
        }

        if (event.type === 'mouseout') {
            let src2 = src.replace(/a\.jpg/, '.jpg');
            event.target.src = src2;

        }
    };

    commandPhotos.forEach((elem) => {
        elem.addEventListener('mouseover', shifter);
        elem.addEventListener('mouseout', shifter);
    });

};

module.exports = changePhoto;

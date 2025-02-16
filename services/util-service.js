export const utilService = {
    makeId,
    makeLorem,
    getRandomInt,
    convertRatingToStars,
    getRandomValue,
    getRandomYear,
    generateRandomText
}

function makeId(length = 25) {
    var genId = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        genId += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return genId;
}

function makeLorem(size = 100) {
    var genLorem = '';
    var possible = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn'];
    while (size > 0) {
        size--;
        genLorem += possible[Math.floor(Math.random() * possible.length)] + ' ';
    }
    return genLorem;
}

// Define getRandomInt() - (max is exclusive, min is inclusive)
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}


function convertRatingToStars(rating, maxRating = 5) {
    const stars = []
    for (let i = 0; i < rating; i++) {
        stars.push(<img key={`filled-star-${i}`} className="rating-img" src="./assets/img/star-icon.png" alt="star-icon" />)
    }
    for (let i = rating; i < maxRating; i++) {
        stars.push(<img key={`empty-star-${i}`} className="rating-img" src="./assets/img/star-line-yellow-icon.png" alt="star-line-yellow-icon" />)
    }
    return stars
}

function getRandomValue(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomYear(startYear, endYear) {
    return Math.floor(Math.random() * (endYear - startYear + 1)) + startYear;
}

function generateRandomText(length = 100) {
    const words = ['the', 'cat', 'runs', 'to', 'eat', 'the', 'mouse', 'in', 'the', 'garden', 'they', 'are', 'playing', 'they', 'are', 'going', 'to', 'watch', 'a', 'movie'];
    let sentence = '';
    for (let i = 0; i < length; i++) {
      sentence += words[Math.floor(Math.random() * words.length)] + ' ';
    }
    return sentence.trim() + '.';
  }
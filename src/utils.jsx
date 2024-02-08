import archiveDates from '../public/puzzle-sources/standard/archive.json';

const circleCoordinates = [
  // top
  [175, 100],
  [300, 100],
  [425, 100],

  // left
  [100, 175],
  [100, 300],
  [100, 425],

  // right
  [500, 175],
  [500, 300],
  [500, 425],

  // bottom
  [175, 500],
  [300, 500],
  [425, 500],
];

// Delimiter should be a callback, so that each one can be an element with a
// unique ID.
export function joinIntoArray(elements, delimiterCallback) {
  let index = 1;
  const array = [elements[0]];
  while (index < elements.length) {
    array.push(delimiterCallback());
    array.push(elements[index]);
    index++;
  }
  return array;
}

export function checkForWin(existingWords) {
  const letterSet = new Set();

  for (const word of existingWords) {
    for (const letter of word) {
      letterSet.add(letter);
    }
  }

  return letterSet.size === 12;
}

// this is not actual, real uuid, mostly to get around the react key warning
export function uuid() {
  return Math.random().toString(36).substring(2, 15);
}

// Empty 1x1 SVG.
const blankImage = "data:image/svg+xml;charset=utf-8;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMSAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIC8+";

const blankPuzzleState = {
  letters: [],
  letterMap: {},
  dictionary: new Set(),
  title: "",
  author: "",
  authorImage: blankImage,
};

function gameDataFailed(message) {
  return {
    hardError: message,
    puzzle: blankPuzzleState,
    yesterdayPuzzle: blankPuzzleState,
  };
}

export function generateLetterMap(letterList) {
  const map = {};
  letterList.forEach((row, i) => {
    row.forEach((letter, j) => {
      // store the coordinates and group in which the letter is located
      map[letter] = [...circleCoordinates[i * 3 +  j], i];
    });
  });
  return map;
}

function NYTSidesToLetters(sides) {
  // Reorder the NYT "sides" metadata into the order and format expected here.
  return [
    sides[0].split(''),
    sides[3].split(''),
    sides[1].split(''),
    sides[2].split(''),
  ];
}

export async function loadStandardGameData(date) {
  // Default to the most recent date.
  date = date || archiveDates[archiveDates.length - 1];

  // Normalize to a Date object so we know we're not being fed nonsense.
  date = new Date(date);

  const isoDate = date.toISOString().split('T')[0];
  const response = await fetch(`puzzle-sources/standard/${isoDate}.json`);
  if (!response.ok) {
    console.error('Request for game data failed!',
                  response.status, response.statusText);

    return gameDataFailed(`Failed to load game data for ${date}!`);
  }

  let gameData;
  try {
    gameData = await response.json();
  } catch (error) {
    console.error(error);
    return gameDataFailed(`Failed to parse game data for ${date}!`);
  }

  const letters = NYTSidesToLetters(gameData.sides);
  const yesterdaysLetters = NYTSidesToLetters(gameData.yesterdaysSides);

  return {
    hardError: '',  // Clear any previous errors.
    puzzle: {
      letters,
      letterMap: generateLetterMap(letters),
      dictionary: new Set(gameData.dictionary),
      title: gameData.date,
      titleClass: "standard",
      author: gameData.editor,
      authorImage: gameData.editorImage,
    },
    yesterdayPuzzle: {
      ourSolution: gameData.yesterdaysSolution,
      letters: yesterdaysLetters,
      letterMap: generateLetterMap(yesterdaysLetters),
    },
  };
}

export async function loadPoetryGameData() {
  const gameResponse = await fetch('puzzle-sources/poetry.json');
  if (!gameResponse.ok) {
    console.error('Request for poetry game data failed!',
                  gameResponse.status, gameResponse.statusText);

    return gameDataFailed('Failed to load poetry game data!');
  }

  let gameData;
  try {
    gameData = await gameResponse.json();
  } catch (error) {
    console.error(error);
    return gameDataFailed('Failed to parse poetry game data!');
  }

  const dictionaryResponse = await fetch(
      'puzzle-sources/filtered-scrabble-dictionary.json');
  if (!dictionaryResponse.ok) {
    console.error('Request for poetry game data failed!',
                  dictionaryResponse.status, dictionaryResponse.statusText);

    return gameDataFailed('Failed to load dictionary!');
  }

  let dictionary;
  try {
    dictionary = await dictionaryResponse.json();
  } catch (error) {
    console.error(error);
    return gameDataFailed('Failed to parse dictionary!');
  }

  // Seconds since January 1 1970, midnight UTC.
  const s = (new Date()).getTime() / 1000;
  // Seconds since January 1 1970, midnight **PST**.
  const s2 = s - (8 * 3600);
  // Seconds since January 1 1970, **4am** PST.  (New puzzles release at 4am.)
  const s3 = s2 - (4 * 3600);
  // **Days** since January 1 1970, 4am PST.
  const dateIndex = Math.floor(s3 / 86400);
  // Which puzzle to load?
  const puzzleIndex = dateIndex % gameData.puzzles.length;
  const puzzle = gameData.puzzles[puzzleIndex];

  const letters = puzzle.sides.map((side) => side.split(''));
  return {
    hardError: '',  // Clear any previous errors.
    puzzle: {
      letters,
      letterMap: generateLetterMap(letters),
      dictionary: new Set(dictionary),
      title: puzzle.source,
      titleClass: "poetry",
      author: gameData.editor,
      authorImage: gameData.editorImage,
    },
  };
}

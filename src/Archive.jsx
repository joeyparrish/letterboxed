import archiveDates from '../public/puzzle-sources/standard/archive.json';

function PuzzleList() {
  const list = [];
  for (const date of archiveDates) {
    const dateLink = `#standard/${date}`;
    list.push(
        <li key={date}><a href={dateLink}>{date}</a></li>
    );
  }
  return list;
}

export default function Archive() {
  return (
    <div>
      <h1>Puzzle Archive</h1>
      <ul>
        <PuzzleList />
      </ul>
    </div>
  );
}

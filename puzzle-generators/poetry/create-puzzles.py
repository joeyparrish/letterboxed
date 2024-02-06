#!/usr/bin/env python3

# Generate letterboxed puzzles from poetry:
#  - The complete works of William Shakespeare
#    https://www.gutenberg.org/ebooks/100
#  - The Gutenberg Poetry Corpus by Allison Parrish (no relation)
#    https://github.com/aparrish/gutenberg-poetry-corpus

import gzip
import json
import os
import random
import re
import sys


# Count the total number of unique letters in two words.
def count_unique_letters(w1, w2):
  return len(set(w1 + w2))


# Generate a regex that matches only words you could create with the given
# sides.  Each side is an array of three letters.
def make_regex(sides):
  no_same_side_combos = []

  for side in sides:
    for letter in side:
      no_same_side_combos.append(letter + '[' + side + ']')

  lookahead_no_same_side_combo = '(?!.*(' + '|'.join(no_same_side_combos) + '))'
  return lookahead_no_same_side_combo


# Generate the sides from a particular order of 12 letters.
def make_sides(order):
  return [
    order[0:3],
    order[3:6],
    order[6:9],
    order[9:12],
  ]


orders_checked = 0


# Check if the partial order of letters makes it possible to use the two words
# w1 and w2.  If not, return False.  If so, return the full order.  Runs
# recursively with backtracking.
def valid_order(order, w1, w2, leftovers):
  global orders_checked
  orders_checked += 1

  if order:
    regex = make_regex(make_sides(order))
    if not (re.match(regex, w1) and re.match(regex, w2)):
      return False

  if not leftovers:
    return order

  for letter in leftovers:
    new_order = order + letter
    new_leftovers = leftovers.copy()
    new_leftovers.remove(letter)
    full_order = valid_order(new_order, w1, w2, new_leftovers)
    if full_order:
      return full_order

  return False


# Get all unique letters from these two words in a deterministic pseudo-random
# order.
def all_letters(prng, w1, w2):
  output = []
  # All unique letters in order by first appearance.
  for letter in w1+w2:
    if letter not in output:
      output.append(letter)

  # Mix up the letters so that it is less obvious from the sides what the
  # words are.
  prng.shuffle(output)

  return output


# Construct paths relative to this file.
def path_to(filename):
  return os.path.join(os.path.dirname(__file__), filename)


def main():
  global orders_checked

  # A PRNG that is completely deterministic.  If we run this tool twice, we
  # should have the same output.
  prng = random.Random(0)

  # This is a Scrabble dictionary, pre-filtered to remove words smaller than 3
  # letters or with side-by-side repeating letters.  Only legal letterboxed words
  # remain.  The official puzzles from NYT may use a different list of words.
  with open(
      path_to("../../public/puzzle-sources/filtered-scrabble-dictionary.json"),
      "r") as f:
    dictionary = set([ word.upper() for word in json.loads(f.read()) ])

  print("size of dictionary:", len(dictionary), file=sys.stderr)

  works = []

  # Load all of the works of Shakespeare.
  with gzip.open(path_to("complete-shakespeare.txt.gz"), "rt") as f:
    # Trim off the Project Gutenberg header.  We leave it in the source file
    # because it states that the copyright information must be preserved in
    # copies.  But we don't want to mine solutions from the legal text.
    shakespeare = f.read()[10455:]

    # Split this into sections to identify the work we're pulling from.
    # Between each work or act, there is a header inside "<< ... >>".
    sections = re.split(r"<<.*?>>", shakespeare, flags=re.DOTALL)
    for section in sections:
      section = section.strip()
      words = [ word.upper() for word in re.split(r"[^a-zA-Z]+", section) ]

      # If a section starts with a year on its own line, it's a new work.
      lines = re.split(r"\n+", section)
      if re.match(r"\d+", lines[0]):
        title = lines[1]
        author = lines[2].replace("by ", "")

        works.append({
          "title": title.title(),  # The input data was all caps...
          "author": author,
          "words": words,
        })
        print("\rworks parsed so far:", len(works),
              end="", file=sys.stderr)
      else:
        works[-1]["words"].extend(words)

  # Load metadata for the Gutenberg Poetry Corpus.  This is a filtered and
  # pre-parsed subset of the metadata from "Gutenberg, Dammit" by Allison
  # Parrish.  It only contains metadata of the sources of the Poetry Corpus,
  # and only the fields we care about.
  with gzip.open(path_to("gutenberg-poetry-metadata.json.gz"), "rt") as f:
    poetry_metadata = json.load(f)

  # Load the Gutenberg Poetry Corpus.
  with gzip.open(path_to("gutenberg-poetry-v001.ndjson.gz"), "rt") as f:

    current_gid = None

    # Examine each line.
    for line in f:
      line_data = json.loads(line)
      text = line_data["s"]
      gid = line_data["gid"]
      words = [ word.upper() for word in re.split(r"[^a-zA-Z]+", text) ]

      if gid != current_gid:
        works.append({
          "title": poetry_metadata[gid]["title"],
          "author": poetry_metadata[gid]["author"],
          "words": words,
        })
        current_gid = gid
        print("\rworks parsed so far:", len(works),
              end="", file=sys.stderr)
      else:
        # Assuming all lines are grouped by gid, which seems to be true.
        works[-1]["words"].extend(words)

  print("\n", file=sys.stderr)

  corpora_size = sum([ len(work["words"]) for work in works ])
  print("size of corpora:", corpora_size, file=sys.stderr)

  # Generate a list of valid, unique Letterboxed puzzles from our corpora.
  seen_solution = set()
  puzzles = []

  for work in works:
    words = work["words"]
    for i in range(len(words) - 1):
      w1, w2 = words[i:i+2]
      sol = (w1, w2)

      if (sol not in seen_solution and w1 in dictionary and w2 in dictionary and
          w1[-1] == w2[0] and count_unique_letters(w1, w2) == 12):
        seen_solution.add(sol)
        order = valid_order("", w1, w2, all_letters(prng, w1, w2))

        if not order:
          print("Impossible solution: " + w1 + ", " + w2, file=sys.stderr)
          continue

        puzzles.append({
          "sides": make_sides(order),
          "ourSolution": [w1, w2],
          "source": "from " + work["title"] + " by " + work["author"],
        })

        print("\rpuzzles so far:", len(puzzles),
              " orders checked:", orders_checked,
              end="", file=sys.stderr)

  print("\n", file=sys.stderr)

  # Mix up the puzzles in a deterministic, pseudo-random order.
  prng.shuffle(puzzles)

  print(json.dumps({
    "puzzles": puzzles,
    "isFree": True,
    "editor": "Joey Parrish",
    "editorImage": "https://joeyparrish.github.io/joeyparrish/Joey-circle.png",
  }, indent=2))


if __name__ == "__main__":
  main()

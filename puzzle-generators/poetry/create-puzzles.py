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


# Check if the partial order of letters makes it possible to use the two words
# w1 and w2.  If not, return False.  If so, return the full order.  Runs
# recursively with backtracking.
def valid_order(order, w1, w2, leftovers):
  if order:
    regex = make_regex(make_sides(order))
    if not re.match(regex, w1) and re.match(regex, w2):
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


def main():
  # A PRNG that is completely deterministic.  If we run this tool twice, we
  # should have the same output.
  prng = random.Random(0)

  # This is a Scrabble dictionary, pre-filtered to remove words smaller than 3
  # letters or with side-by-side repeating letters.  Only legal letterboxed words
  # remain.  The official puzzles from NYT may use a different list of words.
  dict_path = os.path.join(
      os.path.dirname(__file__),
      "../../public/puzzle-sources/filtered-scrabble-dictionary.json")
  with open(dict_path, "r") as f:
    dictionary = set([ word.upper() for word in json.loads(f.read()) ])

  print("size of dictionary:", len(dictionary), file=sys.stderr)

  words_in_order = []

  # Load all of the works of Shakespeare.
  with gzip.open(os.path.join(
      os.path.dirname(__file__), "complete-shakespeare.txt.gz"), "rt") as f:
    # Trim off the Project Gutenberg header.  We leave it in the source file
    # because it states that the copyright information must be preserved in
    # copies.  But we don't want to mine solutions from the legal text.
    shakespeare = f.read()[10455:]

    # Parse the text into words and normalize them.
    words_in_order.extend([
      word.upper() for word in re.split(r"[^a-zA-Z]+", shakespeare)
    ])

  # Load the Gutenberg Poetry Corpus.
  with gzip.open(os.path.join(
      os.path.dirname(__file__), "gutenberg-poetry-v001.ndjson.gz"), "rt") as f:
    # Examine each line.
    for line in f:
      data = json.loads(line)["s"]

      # Parse the text into words and normalize them.
      words_in_order.extend([
        word.upper() for word in re.split(r"[^a-zA-Z]+", data)
      ])

  # Create a set of all unique words in these corpora.
  words = set(words_in_order)

  print("size of corpora:", len(words_in_order), file=sys.stderr)
  print("unique words in corpora:", len(words), file=sys.stderr)

  # Generate a list of valid, unique Letterboxed solutions from our corpora of
  # text.
  solutions = []
  solutions_set = set()
  for i in range(len(words_in_order) - 1):
    w1, w2 = words_in_order[i:i+2]
    sol = (w1, w2)
    if (sol not in solutions_set and w1 in dictionary and w2 in dictionary and
        w1[-1] == w2[0] and count_unique_letters(w1, w2) == 12):
      solutions.append(sol)
      solutions_set.add(sol)

  print("number of generated solutions:", len(solutions), file=sys.stderr)

  # Mix up the solutions.  Remember that this PRNG is deterministic.
  prng.shuffle(solutions)

  puzzles = []

  # Generate a valid ordering of the letters in each solution.
  for w1, w2 in solutions:
    all_letters = []
    # All unique letters in order by first appearance.
    for letter in w1+w2:
      if letter not in all_letters:
        all_letters.append(letter)

    # Mix up the letters so that it is less obvious from the sides what the
    # words are.
    prng.shuffle(all_letters)
    order = valid_order("", w1, w2, all_letters)
    if not order:
      raise RuntimeError("Impossible solution: " + w1 + ", " + w2)

    puzzles.append({
      "sides": make_sides(order),
      "ourSolution": [w1, w2],
    })

  print(json.dumps({
    "puzzles": puzzles,
    "isFree": True,
    "editor": "Joey Parrish",
    "editorImage": "https://joeyparrish.github.io/joeyparrish/Joey-circle.png",
  }, indent=2))


if __name__ == "__main__":
  main()

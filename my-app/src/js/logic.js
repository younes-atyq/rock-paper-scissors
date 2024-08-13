function logic(card1, card2) {
  if (card1 === card2) {
    return 0;
  }
  if (card1 === "rock" && (card2 === "scissors" || card2 === "lizard")) {
    return 1;
  }
  if (card1 === "paper" && (card2 === "rock" || card2 === "spock")) {
    return 1;
  }
  if (card1 === "scissors" && (card2 === "paper" || card2 === "lizard")) {
    return 1;
  }
  if (card1 === "lizard" && (card2 === "spock" || card2 === "paper")) {
    return 1;
  }
  if (card1 === "spock" && (card2 === "scissors" || card2 === "rock")) {
    return 1;
  }
  return -1;
}

export default logic;

import Wrapper from '../../_components/Wrapper';
const contests = {
  "1": {
    id: 1,
    title: "IPL Mega Tournament",
    entryFee: "₹500",
    prizePool: "₹10,00,000",
    participants: { current: 890, total: 2000 },
    questions: 25,
    difficulty: "Expert",
    duration: "30 mins",
    prizes: [
      { rank: "1st", amount: "₹5,00,000" },
      { rank: "2nd", amount: "₹2,00,000" },
      { rank: "3rd", amount: "₹1,00,000" },
      { rank: "4-10", amount: "₹20,000" },
    ],
  },
  "2": {
    id: 2,
    title: "IPL Super Quiz 2026",
    entryFee: "₹100",
    prizePool: "₹5,00,000",
    participants: { current: 456, total: 1000 },
    questions: 20,
    difficulty: "Hard",
    duration: "25 mins",
    prizes: [
      { rank: "1st", amount: "₹2,50,000" },
      { rank: "2nd", amount: "₹1,00,000" },
      { rank: "3rd", amount: "₹50,000" },
      { rank: "4-10", amount: "₹10,000" },
    ],
  },
};

const difficultyColors = {
  Easy: "#A5F3A0",
  Medium: "#FFDB58",
  Hard: "#A78BFA",
  Expert: "#F97316",
};

export default function page() {
  return (
    <Wrapper title="Join contest">

    </Wrapper>
  )
}

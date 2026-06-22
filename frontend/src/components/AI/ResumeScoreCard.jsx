export default function ResumeScoreCard({ score = 0 }) {
  return (
    <div className="p-4 border rounded-lg shadow">
      <h2>Resume Score</h2>
      <p>{score}/100</p>
    </div>
  )
}
import useQuery from "../api/useQuery";
export default function ActivitiesPage() {
  const {
    data: activities,
    loading,
    error,
  } = useQuery("/Activities", "activities");
  if (loading) return <p>Loading...</p>;
  if (error || !activities) return <p>{error || "No activities found."}</p>;
  return (
    <>
      <h1>Activities</h1>
      <ul className="activities">
        {activities.map((activity) => (
          <li key={activity.id}>{activity.name}</li>
        ))}
      </ul>
    </>
  );
}

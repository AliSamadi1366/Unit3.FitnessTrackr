import useMutation from "../api/useMutation";
import useQuery from "../api/useQuery";
import { useAuth } from "../auth/AuthContext";

export default function ActivitiesList() {
  const {
    data: activities,
    loading,
    error,
  } = useQuery("/activities", "activities");
  if (loading) return <p>Loading...</p>;
  if (error || !activities) return <p>{error || "No activities found."}</p>;

  return (
    <ul>
      {activities.map((activity) => (
        <ActivityListItem key={activity.id} activity={activity} />
      ))}
    </ul>
  );
}
function ActivityListItem({ activity }) {
  const { token } = useAuth;
  const {
    mutate: deleteActivity,
    loading,
    error,
  } = useMutation("DELETE", "/activities" + activity.id, ["activities"]);
  return (
    <li>
      <p>{activity.name}</p>
      {token && (
        <button onClick={() => deleteActivity()}>
          {loading ? "Deleting" : error ? error : "Delete"}
        </button>
      )}
    </li>
  );
}

import useMutation from "../api/useMutation";
import useQuery from "../api/useQuery";
import { useAuth } from "../auth/AuthContext";

export default function ActivitiesPage() {
  const {
    data: activities,
    loading,
    error,
  } = useQuery("/Activities", "activities");
  const { mutate: deleteActivity } = useMutation("DELETE", "/Activities", [
    "activities",
  ]);
  const { token } = useAuth();
  if (loading) return <p>Loading...</p>;
  if (error || !activities) return <p>{error || "No activities found."}</p>;
  return (
    <>
      <h1>Activities</h1>
      <ul className="activities">
        {activities.map((activity) => (
          <li key={activity.id}>
            {activity.name}{" "}
            {token ? (
              <button onClick={() => deleteActivity(activity.id)}>
                Delete
              </button>
            ) : (
              ""
            )}
          </li>
        ))}
      </ul>
    </>
  );
}

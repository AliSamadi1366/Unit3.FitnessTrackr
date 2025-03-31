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
    "id",
  ]);

  const { mutate: addActivity } = useMutation("POST", "/Activities", [
    "activities",
  ]);

  const { token } = useAuth();
  if (loading) return <p>Loading...</p>;
  if (error || !activities) return <p>{error || "No activities found."}</p>;

  const addnewActivity = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newActivity = {
      name: formData.get("name"),
      description: formData.get("description"),
    };
    addActivity(newActivity);
  };

  return (
    <>
      <h1>Activities</h1>
      <ul className="activities">
        {activities.map((activity) => (
          <li key={activity.id}>
            {activity.name}{" "}
            {token ? (
              <button
                onClick={() => {
                  deleteActivity(activity);
                }}
              >
                Delete
              </button>
            ) : (
              ""
            )}
          </li>
        ))}
      </ul>
      {token ? (
        <form onSubmit={addnewActivity}>
          <label>
            Name:
            <input name="name" type="text" />
          </label>
          <hr />
          <label>
            Description:
            <input name="description" type="text" />
          </label>
          <hr />
          <button type="submit">Add Activity</button>
        </form>
      ) : (
        console.error("error")
      )}
    </>
  );
}

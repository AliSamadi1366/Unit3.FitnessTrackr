import useMutation from "../api/useMutation";

export default function Form() {
  const {
    mutate: addActivity,
    error,
    loading,
  } = useMutation("POST", "/activities", ["activities"]);
  const addnewActivity = (formData) => {
    const name = formData.get("name");
    const description = formData.get("description");
    addActivity({ name, description });
  };

  return (
    <>
      <h2>Add a new activity</h2>
      <form action={addnewActivity}>
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
        <button>{loading ? "Adding Activity" : "Add activity"}</button>
        {error ? <p>{error}</p> : null}
      </form>
    </>
  );
}

import { useAuth } from "../auth/AuthContext";
import ActivitiesList from "./ActivitiesList";
import Form from "./Form";

export default function ActivitiesPage() {
  const { token } = useAuth;

  return (
    <>
      <h1>Activities</h1>
      <ActivitiesList />
       {token ? <Form /> : ""}
    </>
  );
}

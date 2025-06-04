import { useQuery } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router-dom";
import { getUserByUsername } from "../api/DevTreeAPI";
import { UserData } from "../components/UserData";

const UserView = () => {
  const { username } = useParams();
  if (!username) {
    throw new Error("username param is required");
  }

  const { data, error, isLoading } = useQuery({
    queryFn: () => getUserByUsername(username),
    queryKey: ["username", username],
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <Navigate to={"/404"} />;

  if (data) return <UserData data={data.user} />;
};

export default UserView;

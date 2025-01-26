import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import UserInfo, { UserSession } from "./components/UserInfo";

const UserProfilePage = async () => {
  const session = await getServerSession();

  if (!session || !session.user) {
    redirect("/");
  }

  const userSession: UserSession = {
    id: session.user.id,
    email: session.user.email || null,
    name: session.user.name || "",
    image: session.user.image || null,
  };

  return <UserInfo session={userSession} />;
};

export default UserProfilePage;

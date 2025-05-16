import { redirect } from "next/navigation";

const PresentationPage = () => {
  redirect("/dashboard");

  return <div>PresentationPage</div>;
};

export default PresentationPage;

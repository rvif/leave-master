import AuthComponent from "@/components/Other/AuthComponent";
import supabase from "../../lib/supabaseClient";

const LoginPage = () => {
  console.log(supabase);
  return <AuthComponent />;
};

export default LoginPage;

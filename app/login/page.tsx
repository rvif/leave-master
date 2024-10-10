import AuthComponent from "@/components/Other/AuthComponent";
import supabase from "../../src/config/supabaseClient";

const LoginPage = () => {
  console.log(supabase);
  return <AuthComponent />;
};

export default LoginPage;

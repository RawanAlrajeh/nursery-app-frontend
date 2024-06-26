import { useAuthStore } from "@/src/store/useAuthStore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);
    const authToken = useAuthStore((state) => state.authToken);

    useEffect(() => {
      setIsClient(true); // Ensure this runs only on the client side
      if (!authToken && router.pathname !== '/') {
        router.replace("/auth/login"); // Redirect to login if no authToken
      }
    }, [authToken, router]);

    if (!isClient || (!authToken && router.pathname !== '/')) {
      return null; // Render nothing or a loading indicator until client-side check is done
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;

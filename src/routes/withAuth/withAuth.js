// import { useAuthStore } from "@/src/store/useAuthStore";
// import { useRouter } from "next/router";
// import { useEffect, useState } from "react";

// const withAuth = (WrappedComponent) => {
//   return (props) => {
//     const router = useRouter();
//     const [isClient, setIsClient] = useState(false);
//     const authToken = useAuthStore((state) => state.authToken);
//     const role = useAuthStore((state) => state.role);

//     useEffect(() => {
//       setIsClient(true); // Ensure this runs only on the client side
//       if (!authToken && router.pathname !== '/') {
//         router.replace("/auth/login"); // Redirect to login if no authToken
//       }
//       if (authToken && role !== 'admin' && router.pathname.startsWith('/dashboard')) {
//         router.replace("/auth/login"); // Redirect non-admin users away from the dashboard
//       }
//     }, [authToken, router]);

//     if (!isClient || (!authToken && router.pathname !== '/')) {
//       return null; // Render nothing or a loading indicator until client-side check is done
//     }

//     return <WrappedComponent {...props} />;
//   };
// };

// export default withAuth;
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuthStore } from "@/src/store/useAuthStore";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
    const role = useAuthStore((state) => state.role);
    // const [isClient, setIsClient] = useState(false);

    useEffect(() => {
      // setIsClient(true);
      if (role === "admin" && router.pathname.startsWith("/nursery")) {
        router.replace("/dashboard");
      } else if (
        role === "nursery" &&
        !router.pathname.startsWith("/nursery") &&
        !router.pathname.startsWith("/auth")
      ) {
        router.replace("/nursery");
      } else if (!role) {
        router.replace("/auth/login");
      }
      // if (!isClient || (!authToken && router.pathname !== "/")) {
      //   return null; // Render nothing or a loading indicator until client-side check is done
      // }
    }, [role, router]);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;

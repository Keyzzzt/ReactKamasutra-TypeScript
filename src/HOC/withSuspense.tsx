import React from "react";
import Loader from "../Components/common/Loader";

export function WithSuspense <P>(Component: React.ComponentType<P>) {
    return (props: P) => {
        return <React.Suspense fallback={<Loader/>}>
            <Component {...props} />
        </React.Suspense>
    }
}
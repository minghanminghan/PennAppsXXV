import { withAuthInfo, useLogoutFunction, useRedirectFunctions } from "@propelauth/react";

export default withAuthInfo(function Home({ isLoggedIn, user }) {
    const { redirectToLoginPage, redirectToAccountPage } = useRedirectFunctions();
    const logoutFn = useLogoutFunction();

    console.log("isLoggedIn:", isLoggedIn);
    console.log("user:", user);

    if (isLoggedIn) {
        return (
            <>
                <div>Logged in as {user.email}</div>
                <div>
                    <button onClick={() => redirectToAccountPage()}>Account</button>
                    <button onClick={() => logoutFn(false)}>Logout</button>
                </div>
            </>
        );
    } else {
        return (
            <>
                <div>Not logged in</div>
                <button onClick={() => redirectToLoginPage()}>Login</button>
            </>
        );
    }
});
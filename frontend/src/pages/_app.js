import { AuthProvider } from "@propelauth/react";
import '../style.css';

export default function App({ Component, pageProps }) {
    return (
        <AuthProvider authUrl="https://5085896.propelauthtest.com">
            <Component {...pageProps} />
        </AuthProvider>
    );
}
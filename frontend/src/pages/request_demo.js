import {useEffect, useState} from "react";
import {withAuthInfo} from "@propelauth/react";

const fetchFromApi = async (accessToken) => {
    const response = await fetch("/api/whoami", {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        }
    });
    if (response.ok) {
        return response.json();
    } else {
        return {status: response.status};
    }
}

export default withAuthInfo(function RequestDemo({accessToken}) {
    const [response, setResponse] = useState(null);

    useEffect(() => {
        fetchFromApi(accessToken).then((data) => setResponse(data));
    }, [])

    if (response) {
        return <pre>{JSON.stringify(response, null, 2)}</pre>
    } else {
        return <div>Loading...</div>
    }
})

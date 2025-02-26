const API_URL = "https://api-zingmp3-vercel.vercel.app/api/home";

export const getData = async () => {
    const response = await fetch(`${API_URL}`);
    if (!response) {
        throw new Error("Network response was not ok");
    }
    return response.json();
};

// export const postData = async (data: any) => {
//     const response = await fetch(`${API_URL}`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//     });
//     if (!response.ok) {
//         throw new Error("Network response was not ok");
//     }
//     return response.json();
// };

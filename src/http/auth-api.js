import api from "./api";

export const csrfCookie = () => api.get("/sanctum/csrf-cookie", {
    headers: {
        "Cookie": `X-XSRF-TOKEN=${document.querySelector('meta[name="csrf-token"]').getAttribute("content")}`
    }
});

// export const login = (credentials) => api.post("/auth/login", {
//     headers: { "Content-Type": "multipart/form-data" },

// } );

export const login = (credentials) => {
    var bodyFormData = new FormData();

    bodyFormData.append('email', credentials.email);
    bodyFormData.append('password', credentials.password);

    return api.post("/api/login", bodyFormData, {
        headers: { "Content-Type": "multipart/form-data" }
    });

}
export const register = (user) => api.post("/auth/register", user);

export const logout = () => api.post("/auth/logout");

export const getUser = () => api.get("/api/user", {
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "X-Requested-With": "XMLHttpRequest",
        "X-XSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').getAttribute("content"),
    },
});
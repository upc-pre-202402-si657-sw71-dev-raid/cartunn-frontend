import environment from "@/environments/enviroment";

const getOrderById = async (id: number) => {
    const token = localStorage.getItem("token");

    const requestOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const response = await fetch(`${environment.serverBasePath}/orders/${id}`, requestOptions);

        if (!response.ok) throw new Error("Error deleting item");

        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
    }
};

export default getOrderById;
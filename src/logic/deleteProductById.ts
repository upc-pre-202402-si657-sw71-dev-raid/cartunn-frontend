import environment from "@/environments/enviroment";

const deleteProductById = async (id: number) => {
    const token = localStorage.getItem("token");

    const requestOptions = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };

    try {

        const response2 = await fetch(`${environment.serverBasePath}/favorites/product/${id}`, requestOptions);

        const response = await fetch(`${environment.serverBasePath}/products/${id}`, requestOptions);

        if (!response.ok) {
            throw new Error("Error deleting item");
        }

        if (!response2.ok) {
            throw new Error("Error deleting item");
        }

        return "Item deleting successfully";
    } catch (error) {
        console.error(error);
        throw new Error("Network error or server error");
    }
};

export default deleteProductById;
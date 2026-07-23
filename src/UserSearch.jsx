import React, { useState, useEffect } from "react";
import useDebounce from "./hooks/useDebounce";

function UserSearch() {
    const [search, setSearch] = useState("");
    const [products, setProducts] = useState([]);

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const debouncedSearch = useDebounce(search, 500);

    useEffect(() => {
        if (!debouncedSearch) return;

        const fetchProducts = async () => {
            try {
                const response = await fetch(
                    `https://dummyjson.com/products/search?q=${debouncedSearch}`
                );

                const result = await response.json();

                setProducts(result.products);
            } catch (error) {
                console.log(error);
            }
        };

        fetchProducts();

    }, [debouncedSearch]);

    return (
        <>
            <input
                type="text"
                value={search}
                onChange={handleSearch}
            />

            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        {product.title}
                    </li>
                ))}
            </ul>
        </>
    );
}

export default UserSearch;
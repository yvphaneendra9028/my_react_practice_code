import { useState } from "react";

function usePagination(data, itemPerPage = 5) {
    const [page, setPage] = useState(0);

    const totalItems = data.length;
    const totalPages = Math.ceil(totalItems / itemPerPage);

    const start = page * itemPerPage;
    const end = start + itemPerPage;

    const paginatedData = data.slice(start, end);

    const nextPage = () => {
        if (page < totalPages - 1) {
            setPage((prev) => prev + 1);
        }
    };

    const prevPage = () => {
        if (page > 0) {
            setPage((prev) => prev - 1);
        }
    };

    const goToPage = (pageNumber) => {
        if (pageNumber >= 0 && pageNumber < totalPages) {
            setPage(pageNumber);
        }
    };

    return {
        paginatedData,
        page,
        totalPages,
        nextPage,
        prevPage,
        goToPage,
    };
}

export default usePagination;
import React from "react";
import usePagination from "./hooks/usePagination";
function Data_pagination(){
const users = [
    { id: 1, name: "John" },
        { id: 2, name: "David" },
        { id: 3, name: "Alex" },
        { id: 4, name: "James" },
        { id: 5, name: "Sam" },
        { id: 6, name: "Tom" },
        { id: 7, name: "Harry" },
        { id: 8, name: "Peter" }
]
const {paginatedData,page,totalPages,nextPage,prevPage,gotopage} = usePagination(users,3)

return (
    <>
        {paginatedData.map((user)=> (<h3 key={user.id}>{user.name}</h3>))}
         <button
                onClick={prevPage}
                disabled={page === 0}
            >
                Previous
            </button>

            <span>
                {page + 1} / {totalPages}
            </span>

            <button
                onClick={nextPage}
                disabled={page === totalPages - 1}
            >
                Next
            </button>
    </>
)
}
export default Data_pagination;
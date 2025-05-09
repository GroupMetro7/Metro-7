import React from 'react'
import '../../assets/css/components/pagination.sass'
import { Button } from '../../exporter/component_exporter'

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            onPageChange(page);
        }
    };

    return (
        <div className="pagination">
            <Button
                Title="<"
                Onclick={() => handlePageChange(currentPage - 1)}
                Disabled={currentPage === 1}
            />
            {[...Array(totalPages)].map((_, index) => (
                <Button
                    key={index}
                    Title={index + 1}
                    Onclick={() => handlePageChange(index + 1)}
                    Disabled={currentPage === index + 1}
                />
            ))}
            <Button
                Title=">"
                Onclick={() => handlePageChange(currentPage + 1)}
                Disabled={currentPage === totalPages}
            />
        </div>
    )
}

export default Pagination;

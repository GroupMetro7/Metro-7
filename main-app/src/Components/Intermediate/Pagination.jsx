//pagination



import React from 'react'
import '../../assets/css/components/pagination.sass'
import { Button } from '../../exporter/component_exporter'

export default function Pagination ({ currentPage, totalPages, onPageChange }) {
    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            onPageChange(page);
        }
    };

    const renderPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;

        if (totalPages <= maxVisiblePages) {
            // Show all pages if total is 5 or less
            for (let i = 1; i <= totalPages; i++) {
                pages.push(
                    <Button
                        key={i}
                        Title={i}
                        Onclick={() => handlePageChange(i)}
                        Disabled={currentPage === i}
                    />
                );
            }
        } else {
            // Show smart pagination with ellipsis
            let startPage = Math.max(1, currentPage - 2);
            let endPage = Math.min(totalPages, currentPage + 2);

            // Adjust if we're near the beginning
            if (currentPage <= 3) {
                startPage = 1;
                endPage = 5;
            }

            // Adjust if we're near the end
            if (currentPage >= totalPages - 2) {
                startPage = totalPages - 4;
                endPage = totalPages;
            }

            // Always show first page
            if (startPage > 1) {
                pages.push(
                    <Button
                        key={1}
                        Title={1}
                        Onclick={() => handlePageChange(1)}
                        Disabled={currentPage === 1}
                    />
                );
                if (startPage > 2) {
                    pages.push(<span key="ellipsis1" className="pagination-ellipsis">...</span>);
                }
            }

            // Show pages in range
            for (let i = startPage; i <= endPage; i++) {
                pages.push(
                    <Button
                        key={i}
                        Title={i}
                        Onclick={() => handlePageChange(i)}
                        Disabled={currentPage === i}
                    />
                );
            }

            // Always show last page
            if (endPage < totalPages) {
                if (endPage < totalPages - 1) {
                    pages.push(<span key="ellipsis2" className="pagination-ellipsis">...</span>);
                }
                pages.push(
                    <Button
                        key={totalPages}
                        Title={totalPages}
                        Onclick={() => handlePageChange(totalPages)}
                        Disabled={currentPage === totalPages}
                    />
                );
            }
        }

        return pages;
    };

    return (
        <div className="pagination">
            <Button
                Title="<"
                Onclick={() => handlePageChange(currentPage - 1)}
                Disabled={currentPage === 1}
            />
            {renderPageNumbers()}
            <Button
                Title=">"
                Onclick={() => handlePageChange(currentPage + 1)}
                Disabled={currentPage === totalPages}
            />
        </div>
    )
}

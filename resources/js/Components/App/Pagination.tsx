import React from "react";
import { router } from "@inertiajs/react";

interface PaginationProps {
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
    currentPage: number;
    lastPage: number;
}

const Pagination: React.FC<PaginationProps> = ({
    links,
    currentPage,
    lastPage,
}) => {
    const displayLinks = [];

    for (let i = 0; i < links.length; i++) {
        const link = links[i];
        const label = link.label;

        const pageNumber = Number(label);

        // Always show first, last, prev, next
        if (
            label.includes("Previous") ||
            label.includes("Next") ||
            label === "1" ||
            label === String(lastPage)
        ) {
            displayLinks.push(renderButton(link, i));
        }
        // Show current page ±2
        else if (
            !isNaN(pageNumber) &&
            Math.abs(pageNumber - currentPage) <= 2 &&
            pageNumber > 1 &&
            pageNumber < lastPage
        ) {
            displayLinks.push(renderButton(link, i));
        }
        // Show dots before
        else if (
            !isNaN(pageNumber) &&
            pageNumber === currentPage - 3 &&
            pageNumber > 2
        ) {
            displayLinks.push(
                <button
                    key={`dots-start-${i}`}
                    className="join-item btn btn-disabled"
                >
                    ...
                </button>
            );
        }
        // Show dots after
        else if (
            !isNaN(pageNumber) &&
            pageNumber === currentPage + 3 &&
            pageNumber < lastPage - 1
        ) {
            displayLinks.push(
                <button
                    key={`dots-end-${i}`}
                    className="join-item btn btn-disabled"
                >
                    ...
                </button>
            );
        }
    }

    function renderButton(link: any, index: number) {
        return (
            <button
                key={index}
                disabled={!link.url}
                onClick={() => link.url && router.visit(link.url)}
                className={`join-item btn ${link.active ? "btn-primary" : ""} ${
                    !link.url ? "btn-disabled" : ""
                }`}
                dangerouslySetInnerHTML={{ __html: link.label }}
            />
        );
    }

    return (
        <div className="join mt-4 flex flex-wrap justify-center">
            {displayLinks}
        </div>
    );
};

export default Pagination;

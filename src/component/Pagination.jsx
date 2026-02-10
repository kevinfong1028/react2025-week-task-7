const Pagination = ({ pagination, apiProduct }) => {
    // console.log('@Pagination', pagination)
    return (
        <ul className="pagination justify-content-center">
            {pagination.has_pre && (
                <li className="page-item">
                    <button
                        className="page-link btn"
                        aria-label="Previous"
                        onClick={() =>
                            apiProduct.get(pagination.current_page - 1)
                        }
                    >
                        <span aria-hidden="true">&lt;</span>
                    </button>
                </li>
            )}
            {Array.from({ length: pagination.total_pages }, (_, index) => (
                <li
                    className={`page-item ${pagination.current_page === index + 1 && "active"}`}
                    key={index + "-page"}
                >
                    <button
                        type="button"
                        className="page-link btn"
                        onClick={
                            (e) => apiProduct.get(index + 1)
                            // getProductByPage(e, index)
                        }
                    >
                        {index + 1}
                    </button>
                </li>
            ))}
            {pagination.has_next && (
                <li className="page-item">
                    <button
                        className="page-link btn"
                        aria-label="Next"
                        onClick={() =>
                            apiProduct.get(pagination.current_page + 1)
                        }
                    >
                        <span aria-hidden="true">&gt;</span>
                    </button>
                </li>
            )}
        </ul>
    );
};

export default Pagination;

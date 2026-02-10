const TableList = ({products, openModal}) => {
    // console.log('@TAbleList', products)
    return (
        <table className="table table-responsive table-striped">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Item</th>
                    <th>Category</th>
                    <th>O.Price</th>
                    <th>Sale</th>
                    <th>Active</th>
                    <th>Detail</th>
                </tr>
            </thead>
            <tbody>
                {products.map((p, index) => (
                    <tr key={p.id}>
                        <td>{index + 1}</td>
                        <td>{p.title}</td>
                        <td>{p.category}</td>
                        <td>{p.origin_price}</td>
                        <td>{p.price}</td>
                        <td>
                            <span
                                className={`${p.is_enabled && "text-success"}`}
                            >
                                {p.is_enabled === 1 ? "yes" : "no"}
                            </span>
                        </td>
                        <td>
                            <div
                                className="btn-group"
                                role="group"
                                aria-label="Basic example"
                            >
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() => openModal(p, "edit")}
                                >
                                    Edit
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={() => openModal(p, "delete")}
                                >
                                    Del
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TableList;

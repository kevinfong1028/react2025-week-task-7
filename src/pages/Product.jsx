import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios, { Axios } from "axios";

const api_baseUrl = import.meta.env.VITE_BASEURL;
const api_path = import.meta.env.VITE_PATH;

function Product() {
    const [productInfo, setProductInfo] = useState({});
    const [isFreezed, setIsFreezed] = useState(false);
    const [count, setCount] = useState(1);
    const { id } = useParams();

    if (!id) return;

    useEffect(() => {
        (async () => {
            const url = `${api_baseUrl}/api/${api_path}/product/${id}`;
            try {
                const resp = await axios.get(url);

                if (resp.data.success) {
                    setProductInfo(resp.data.product);
                }
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    const addCart = async (id) => {
        setIsFreezed(true);
        const url = `${api_baseUrl}/api/${api_path}/cart/`;
        const req = {
            data: {
                product_id: id,
                qty: count,
            },
        };
        try {
            const resp = await axios.post(url, req);

            if (resp.data.success) {
                // setProductInfo(resp.data.product);
                alert(
                    `${resp.data.message},總共已有 ${resp.data.data.qty}個${resp.data.data.product.title}`,
                );
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsFreezed(false);
        }
    };

    return (
        <>
            <h1>Product inside</h1>
            <div
                className="col-12 h-100 border border-2 rounded-3"
                key={productInfo.id}
            >
                <div className="car d-flex justify-content-center w-100 h-100">
                    <img
                        src={productInfo.imageUrl}
                        className="card-img-top w-25"
                        alt={productInfo.title}
                    />
                    <div className="card-body p-3 d-flex flex-column justify-content-start align-items-start">
                        <h5 className="card-title fs-3 mb-2 fw-bold">
                            {productInfo.title}
                        </h5>
                        <p className="card-text badge px-4 py-2 rounded-pill bg-info text-dark">
                            {productInfo.category}
                        </p>
                        <p className="card-text">{productInfo.description}</p>
                        <p className="card-text">
                            原價：<del>{productInfo.origin_price}</del>
                        </p>
                        <p className="card-text d-inline me-2 fs-4">
                            特價：{productInfo.price}{" "}
                            <sub>/ {productInfo.unit}</sub>
                        </p>
                        <p className="card-text">
                            <label htmlFor="buyNum">購買數量</label>
                            <input
                                type="number"
                                id="buyNum"
                                step="1"
                                value={count}
                                min="1"
                                max="10"
                                disabled
                            />
                            <button
                                className="btn btn-sm btn-outline-secondary ms-1"
                                onClick={() => setCount(count + 1)}
                            >
                                +
                            </button>
                            <button
                                className="btn btn-sm btn-outline-secondary ms-1"
                                onClick={() =>
                                    setCount(count - 1 < 1 ? 1 : count - 1)
                                }
                            >
                                -
                            </button>
                        </p>
                        <button
                            className="btn btn-primary d-block mt-auto"
                            onClick={() => addCart(productInfo.id)}
                            disabled={isFreezed}
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Product;

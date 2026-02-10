import { useState, useRef, useEffect } from "react";
import axios from "axios";
import * as bootstrap from "bootstrap";
const apiBase = import.meta.env.VITE_API_BASE;
const apiPath = "kevin-react";

const Modal = ({
    modalType,
    modalMap,
    closeModal,
    productForm,
    apiProduct,
    toasting,
    // modalInputChange,
    // addImage,
    // removeImage,
    // doImageChange,
    // submitModal,
    // uploadFile,
}) => {
    const [tempData, setTempData] = useState(productForm); // 接收父層的 productForm 作為初始值，也避免set到父層原始物件
    const [uploadDisabled, setUploadDisabled] = useState(false);
    const lastInputRef = useRef(null);

    useEffect(
        (r) => {
            setTempData(productForm);
        },
        [productForm],
    );

    const modalInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setTempData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
        }));
    };

    const addImage = (e) => {
        console.log("addImage", e);
        setTempData((prev) => ({
            ...prev,
            imagesUrl: [...prev.imagesUrl, ""],
        }));
    };

    const removeImage = (e) => {
        console.log("removeImage", e);
        setTempData((prev) => {
            const newImages = [...prev.imagesUrl];
            newImages.pop();
            return { ...prev, imagesUrl: newImages };
        });
    };

    const doImageChange = (index, url) => {
        // console.log("doImageChange", index, url);
        setTempData((prev) => {
            const newImages = [...prev.imagesUrl];
            newImages[index] = url;
            // 未滿五張就加新的input
            if (
                url !== "" &&
                index === newImages.length - 1 &&
                newImages.length < 5
            ) {
                newImages.push("");
            }
            // 2張以上，若有空白的則清除
            if (
                newImages.length > 1 &&
                newImages[newImages.length - 1] === ""
            ) {
                newImages.pop();
            }
            return { ...prev, imagesUrl: newImages };
        });
    };

    const uploadFile = async (e) => {
        e.preventDefault();
        const file = e.target.files?.[0];
        const formData = new FormData();
        formData.append("file-to-upload", file);
        console.log("uploadFile", file, formData);

        try {
            const resp = await axios.post(
                `${apiBase}/api/${apiPath}/admin/upload`,
                formData,
            );
            console.log("resp", resp);
            if (resp.data.success) {
                setTempData((prev) => ({
                    ...prev,
                    imageUrl: resp.data.imageUrl,
                }));
                toasting("圖片上傳成功");
            }
        } catch (error) {
            console.log("error", error);
        } finally {
            e.target.value = null;
        }
    };

    useEffect(() => {
        // 加圖片後自動幫input取得焦點
        if (lastInputRef.current) {
            lastInputRef.current.focus();
        }
        // 上傳圖片也不得超過總數五張
        if (tempData.imagesUrl.length === 5) {
            setUploadDisabled(true);
        } else {
            setUploadDisabled(false);
        }
    }, [tempData.imagesUrl.length]);

    const productModalRef = useRef(null);

    const submitModal = async () => {
        const modalElement = document.getElementById("productModal");

        productModalRef.current = new bootstrap.Modal(modalElement);

        if (modalType === "create") {
            // create
            const req = {
                data: {
                    ...tempData,
                    origin_price: Number(tempData.origin_price),
                    price: Number(tempData.price),
                },
            };
            console.log(modalType, req);
            const resp = await apiProduct.post(req);
            console.log("apiProduct.post", resp);
            if (resp.data.success) {
                productModalRef.current.hide();
                toasting("建立成功");
                await apiProduct.get();
            } else {
                console.log(resp.data.message);
                toasting("建立失敗");
            }
        } else if (modalType === "edit") {
            // edit
            const req = {
                data: {
                    ...tempData,
                    origin_price: Number(tempData.origin_price),
                    price: Number(tempData.price),
                },
            };
            console.log(modalType, req);
            const resp = await apiProduct.put(req, req.data.id);
            if (resp.data.success) {
                productModalRef.current.hide();
                toasting("編輯成功");

                await apiProduct.get();
            } else {
                console.log(resp.data.message);
                toasting("編輯失敗");
            }
        } else if (modalType === "delete") {
            // del
            const req = {
                ...tempData,
            };
            console.log(modalType);
            const resp = await apiProduct.delete(req.id);
            if (resp.data.success) {
                toasting("刪除成功");
                productModalRef.current.hide();
                await apiProduct.get();
            } else {
                console.log(resp.data.message);
                toasting("刪除失敗");
            }
        }
        closeModal();
    };

    return (
        <div
            id="productModal"
            className="modal fade"
            tabIndex="-1"
            aria-labelledby="productModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-xl">
                <div className="modal-content border-0">
                    <div className="modal-header bg-dark text-white">
                        <h5 id="productModalLabel" className="modal-title">
                            <span>{`${modalMap[modalType]}產品`}</span>
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">
                        {modalType === "delete" ? (
                            <div className="row">
                                <div className="col">
                                    刪除產品編號{" "}
                                    <span className="text-danger">
                                        {tempData.title
                                            ? tempData.title
                                            : "沒選到"}
                                    </span>
                                    嗎?
                                </div>
                            </div>
                        ) : (
                            <div className="row">
                                <div className="col-sm-4">
                                    <div className="mb-3">
                                        <label htmlFor="file-to-upload">
                                            上傳主圖
                                        </label>
                                        <div className="input-group">
                                            <input
                                                type="file"
                                                id="file-to-upload"
                                                name="file-to-upload"
                                                accept=".jpg,.jpeg,.png"
                                                className="form-control"
                                                disabled={uploadDisabled}
                                                onChange={uploadFile}
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label
                                            htmlFor="imageUrl"
                                            className="form-label"
                                        >
                                            輸入圖片網址
                                        </label>
                                        <input
                                            name="imageUrl"
                                            type="text"
                                            className="form-control"
                                            placeholder="請輸入圖片連結"
                                            value={tempData.imageUrl}
                                            onChange={modalInputChange}
                                        />
                                    </div>
                                    {tempData.imageUrl && (
                                        <img
                                            className="img-fluid"
                                            src={tempData.imageUrl}
                                            alt="主圖"
                                        />
                                    )}
                                    <div>
                                        {tempData.imagesUrl.length}
                                        張圖
                                        <ul>
                                            {tempData.imagesUrl.map(
                                                (url, index) => (
                                                    <li
                                                        key={index}
                                                        className="img-thumbnail"
                                                    >
                                                        <input
                                                            type="text"
                                                            className="form-control mb-1"
                                                            placeholder={`圖片網址 ${
                                                                index + 1
                                                            }`}
                                                            value={url}
                                                            onChange={(e) =>
                                                                doImageChange(
                                                                    index,
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            ref={
                                                                index ===
                                                                    tempData
                                                                        .imagesUrl
                                                                        .length -
                                                                        1 &&
                                                                tempData
                                                                    .imagesUrl[
                                                                    tempData
                                                                        .imagesUrl
                                                                        .length -
                                                                        1
                                                                ] === ""
                                                                    ? lastInputRef
                                                                    : null
                                                            }
                                                        />
                                                        {url && (
                                                            <img
                                                                src={url}
                                                                alt="副圖"
                                                            />
                                                        )}
                                                    </li>
                                                ),
                                            )}
                                            <div className="d-flex.justify-content-between">
                                                {tempData.imagesUrl.length <
                                                    5 &&
                                                    tempData.imagesUrl[
                                                        tempData.imagesUrl
                                                            .length - 1
                                                    ] !== "" && (
                                                        <button
                                                            className="btn btn-outline-primary btn-sm w-100 mx-1"
                                                            onClick={addImage}
                                                        >
                                                            加一張圖片
                                                        </button>
                                                    )}
                                                {tempData.imagesUrl.length >=
                                                    1 && (
                                                    <button
                                                        className="btn btn-outline-danger btn-sm w-100 mx-1"
                                                        onClick={removeImage}
                                                    >
                                                        取消圖片
                                                    </button>
                                                )}
                                            </div>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-sm-8">
                                    <div className="mb-3">
                                        <label
                                            htmlFor="title"
                                            className="form-label"
                                        >
                                            標題
                                        </label>
                                        <input
                                            id="title"
                                            name="title"
                                            type="text"
                                            className="form-control"
                                            placeholder="請輸入標題"
                                            value={tempData.title}
                                            onChange={modalInputChange}
                                        />
                                        {tempData.title}
                                    </div>

                                    <div className="row">
                                        <div className="mb-3 col-md-6">
                                            <label
                                                htmlFor="category"
                                                className="form-label"
                                            >
                                                分類
                                            </label>
                                            <input
                                                id="category"
                                                name="category"
                                                type="text"
                                                className="form-control"
                                                placeholder="請輸入分類"
                                                value={tempData.category}
                                                onChange={modalInputChange}
                                            />
                                        </div>
                                        <div className="mb-3 col-md-6">
                                            <label
                                                htmlFor="unit"
                                                className="form-label"
                                            >
                                                單位
                                            </label>
                                            <input
                                                id="unit"
                                                name="unit"
                                                type="text"
                                                className="form-control"
                                                placeholder="請輸入單位"
                                                value={tempData.unit}
                                                onChange={modalInputChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="mb-3 col-md-6">
                                            <label
                                                htmlFor="origin_price"
                                                className="form-label"
                                            >
                                                原價
                                            </label>
                                            <input
                                                id="origin_price"
                                                name="origin_price"
                                                type="number"
                                                min="0"
                                                className="form-control"
                                                placeholder="請輸入原價"
                                                value={tempData.origin_price}
                                                onChange={modalInputChange}
                                            />
                                        </div>
                                        <div className="mb-3 col-md-6">
                                            <label
                                                htmlFor="price"
                                                className="form-label"
                                            >
                                                售價
                                            </label>
                                            <input
                                                id="price"
                                                name="price"
                                                type="number"
                                                min="0"
                                                className="form-control"
                                                placeholder="請輸入售價"
                                                value={tempData.price}
                                                onChange={modalInputChange}
                                            />
                                        </div>
                                    </div>
                                    <hr />

                                    <div className="mb-3">
                                        <label
                                            htmlFor="description"
                                            className="form-label d-block text-start"
                                        >
                                            產品描述
                                        </label>
                                        <textarea
                                            id="description"
                                            name="description"
                                            className="form-control"
                                            placeholder="請輸入產品描述"
                                            value={tempData.description}
                                            onChange={modalInputChange}
                                        ></textarea>
                                    </div>
                                    <div className="mb-3">
                                        <label
                                            htmlFor="content"
                                            className="form-label d-block text-start"
                                        >
                                            說明內容
                                        </label>
                                        <textarea
                                            id="content"
                                            name="content"
                                            className="form-control"
                                            placeholder="請輸入說明內容"
                                            value={tempData.content}
                                            onChange={modalInputChange}
                                        ></textarea>
                                    </div>
                                    <div className="mb-3">
                                        <div
                                            className="form-check d-flex
                                                        "
                                        >
                                            <input
                                                id="is_enabled"
                                                name="is_enabled"
                                                className="form-check-input"
                                                type="checkbox"
                                                checked={
                                                    tempData.is_enabled === 1
                                                }
                                                onChange={modalInputChange}
                                            />
                                            <label
                                                className="form-check-label ms-3"
                                                htmlFor="is_enabled"
                                            >
                                                是否啟用
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="modal-footer d-flex justify-content-center">
                        <button
                            type="button"
                            className="btn btn-outline-secondary px-5"
                            onClick={closeModal}
                        >
                            取消
                        </button>
                        <button
                            type="button"
                            className={`btn ${
                                modalType === "delete"
                                    ? "btn-danger"
                                    : "btn-primary"
                            } px-5`}
                            onClick={submitModal}
                        >
                            確認
                            {modalType === "delete" ? "刪除" : ""}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Modal;

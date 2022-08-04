import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import Layout from "../../components/Layout";
import { useForm } from "../../lib/hooks/useForm";
import useUser from "../../lib/hooks/useUser";
import { CREATE_PRODUCT_MUTATION } from "../../resolvers/product/mutation";

const createProduct = () => {
  const user = useUser();
  const [productImg, setProductImg] = useState([]);
  const { clearForm, handleChange, inputs, resetForm } = useForm({
    productName: "",
    brand: "",
    description: "",
    countInStock: "",
    price: "",
    category: "",
  });

  const [createProduct] = useMutation(CREATE_PRODUCT_MUTATION);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { productName, brand, description, countInStock, price, category } =
      inputs;

    const variables = {
      name: productName,
      description,
      countInStock: 15,
      price: 2500,
      brand,
      category,
      userId: user?.id,
      productImg,
    };

    const data = await createProduct({ variables });
    console.log(data);
  };

  return (
    <Layout title="Create Product">
      <div className="flex items-center py-5">
        <div className="container max-w-md mx-auto transition duration-300 shadow-md hover:shadow-lg">
          <form
            className="p-10 py-12 bg-white rounded-xl"
            onSubmit={handleSubmit}
          >
            <h1 className="pb-5 text-lg font-bold text-center">
              Create A New Product
            </h1>

            <div className="mb-6">
              <label
                className="inline-block mb-2 mr-4 font-bold text-gray-700"
                htmlFor="Product Name"
              >
                Product Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 bg-gray-100 border rounded outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Product Name"
                name="productName"
                onChange={handleChange}
                value={inputs.productName}
              />
            </div>
            <div className="mb-6">
              <label
                className="inline-block mb-2 mr-4 font-bold text-gray-700"
                htmlFor="Brand"
              >
                Brand
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 bg-gray-100 border rounded outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Brand"
                name="brand"
                onChange={handleChange}
                value={inputs.brand}
              />
            </div>
            <div className="mb-6">
              <label
                className="inline-block mb-2 mr-4 font-bold text-gray-700"
                htmlFor="Description"
              >
                Description
              </label>
              <textarea
                className="w-full px-4 py-2 bg-gray-100 border rounded outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Description"
                name="description"
                onChange={handleChange}
                value={inputs.description}
              />
            </div>
            <div className="mb-6">
              <label
                className="inline-block mb-2 mr-4 font-bold text-gray-700"
                htmlFor="Category"
              >
                Category
              </label>
              <select
                name="category"
                className="w-full px-4 py-2 bg-gray-100 border rounded outline-none focus:ring-2 focus:ring-indigo-400"
                value={inputs.category}
                onChange={handleChange}
              >
                <option value="campaign">Campaign</option>
                <option value="unstitchedDress">Unstitched Dress</option>
                <option value="Lehenga">lehenga</option>
                <option value="panjabi">Panjabi</option>
                <option value="tShirt">T-Shirt</option>
                <option value="womensFashion">Womens Fashion</option>
              </select>
            </div>
            <div className="mb-6">
              <label
                className="inline-block mb-2 mr-4 font-bold text-gray-700"
                htmlFor="Stock"
              >
                Stock
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 bg-gray-100 border rounded outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Stock"
                name="countInStock"
                onChange={handleChange}
                value={inputs.countInStock}
              />
            </div>
            <div className="mb-6">
              <label
                className="inline-block mb-2 mr-4 font-bold text-gray-700"
                htmlFor="Price"
              >
                Price
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 bg-gray-100 border rounded outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Price"
                name="price"
                onChange={handleChange}
                value={inputs.price}
              />
            </div>
            <div className="w-full mb-3">
              <label
                htmlFor="formFileMultiple"
                className="inline-block mb-2 text-gray-700 form-label"
              >
                Multiple files input example
              </label>
              <input
                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                type="file"
                id="formFileMultiple"
                onChange={(e) => {
                  const arr = e.target.files;
                  setProductImg(arr);
                }}
                multiple
              />
            </div>

            <button
              className="w-full mt-6 transition duration-300 primary-button"
              type="submit"
            >
              Create Product
            </button>
          </form>
        </div>
      </div>{" "}
    </Layout>
  );
};

export default createProduct;

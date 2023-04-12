import React from "react";
import axios from "axios";

function ProductAnalysis() {
  const [productName, setProductName] = React.useState("");
  const [productDescription, setProductDescription] = React.useState("");
  const [productPrice, setProductPrice] = React.useState("");
  const [analysisResults, setAnalysisResults] = React.useState(null);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await axios.post("/api/analyze-product", {
      name: productName,
      description: productDescription,
      price: productPrice,
    });
    setAnalysisResults(response.data);
  };

  return (
    <div>
      <h1>Product Analysis</h1>
      <form onSubmit={handleFormSubmit}>
        <label>
          Product Name:
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </label>
        <label>
          Product Description:
          <textarea
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
          />
        </label>
        <label>
          Product Price:
          <input
            type="number"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
          />
        </label>
        <button type="submit">Analyze Product</button>
      </form>
      {analysisResults && (
        <div>
          <h2>Analysis Results</h2>
          <p>{analysisResults}</p>
        </div>
      )}
    </div>
  );
}

export default ProductAnalysis;

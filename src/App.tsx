interface ProductData {
  name: string;
  description: string;
  price?: number;
  rating: number;
  reviews: number;
  images: string[];
}

function ProductAnalysis() {
  const [productUrl, setProductUrl] = React.useState("");
  const [analysisResults, setAnalysisResults] =
    React.useState<ProductData | null>(null);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await axios.post("/api/analyze-product", {
      url: productUrl,
    });
    setAnalysisResults(response.data);
  };

  return (
    <div>
      <h1>Product Analysis</h1>
      <form onSubmit={handleFormSubmit}>
        <label>
          Product URL:
          <input
            type="text"
            value={productUrl}
            onChange={(e) => setProductUrl(e.target.value)}
          />
        </label>
        <button type="submit">Analyze Product</button>
      </form>
      {analysisResults && (
        <div>
          <h2>Analysis Results</h2>
          <ul>
            <li>Product Name: {analysisResults.name}</li>
            <li>Product Description: {analysisResults.description}</li>
            {analysisResults.price && (
              <li>Product Price: {analysisResults.price}</li>
            )}
            <li>Product Rating: {analysisResults.rating}</li>
            <li>Product Reviews: {analysisResults.reviews}</li>
            <li>Product Images:</li>
            {analysisResults.images.map((image: string) => (
              <img src={image} alt="Product Image" />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

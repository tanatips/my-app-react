const Products = () => (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Products List</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-bold">Product 1</h3>
          <p className="text-gray-600">$99.99</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-bold">Product 2</h3>
          <p className="text-gray-600">$149.99</p>
        </div>
      </div>
    </div>
  );
  
  export default Products;
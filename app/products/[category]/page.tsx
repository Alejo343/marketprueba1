import { products } from "@/lib/products";

interface Props {
  params: {
    category: string;
  };
}

export default function CategoryPage({ params }: Props) {
  const { category } = params;

  const filteredProducts = products.filter(
    (product) => product.category === category,
  );

  return (
    <div>
      {/* Breadcrumb */}
      <p className="text-sm text-gray-500">Homepage &gt; {category}</p>

      {/* Title */}
      <h1 className="text-4xl font-bold mt-4 capitalize">
        {category} Products
      </h1>

      {/* Count */}
      <p className="mt-3 text-gray-500">
        Showing {filteredProducts.length} products
      </p>

      {/* Grid */}
      <div className="grid grid-cols-3 gap-8 mt-10">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white p-6 shadow-sm border border-gray-200"
          >
            <h3 className="font-semibold">{product.name}</h3>
            <p className="mt-2 text-gray-500">${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

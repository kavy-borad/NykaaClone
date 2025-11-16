const mongoose = require('mongoose');

// Production database connection
const PROD_DB = "mongodb+srv://kavypatel0101_db_user:Kavy123@cluster0.iljqiqt.mongodb.net/ecommerce?retryWrites=true&w=majority";

// Product Schema
const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    rating: Number,
    images: [{ image: String }],
    category: String,
    stock: Number,
    numOfReviews: Number,
    reviews: Array,
    createdAt: { type: Date, default: Date.now }
});

const Product = mongoose.model('products', productSchema);

async function importProductsFromProduction() {
    try {
        console.log('Connecting to production database...');
        await mongoose.connect(PROD_DB);
        console.log('Connected to production database!');

        // Fetch all products from production
        const products = await Product.find({});
        console.log(`Found ${products.length} products in production database`);

        if (products.length === 0) {
            console.log('No products found in production database');
            await mongoose.connection.close();
            return;
        }

        // Display products
        products.forEach((product, index) => {
            console.log(`${index + 1}. ${product.name} - ₹${product.price} (${product.category})`);
        });

        console.log('\n✅ Products fetched successfully!');
        console.log('Total products:', products.length);

        // Save to a JSON file for reference
        const fs = require('fs');
        fs.writeFileSync(
            'd:/Ecomm/mern_ecomm/backend/production_products.json',
            JSON.stringify(products, null, 2)
        );
        console.log('✅ Products saved to production_products.json');

        await mongoose.connection.close();
        console.log('Database connection closed');

    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
}

importProductsFromProduction();

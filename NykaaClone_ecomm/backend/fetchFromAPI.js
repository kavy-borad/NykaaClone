const https = require('https');
const mongoose = require('mongoose');

// Local database connection
const LOCAL_DB = "mongodb+srv://kavypatel0101_db_user:Kavy123@cluster0.iljqiqt.mongodb.net/ecommerce?retryWrites=true&w=majority";

// Product Schema
const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    rating: Number,
    images: String,
    category: String,
    stock: Number,
    numOfReviews: Number,
    reviews: Array,
    createdAt: { type: Date, default: Date.now }
});

const Product = mongoose.model('products', productSchema);

// Fetch from production API
function fetchProductsFromAPI() {
    return new Promise((resolve, reject) => {
        const url = 'https://nykkabackend-cgkg.onrender.com/products?search=&category=All&sort=desc';
        
        https.get(url, (res) => {
            let data = '';
            
            res.on('data', (chunk) => {
                data += chunk;
            });
            
            res.on('end', () => {
                try {
                    const jsonData = JSON.parse(data);
                    resolve(jsonData);
                } catch (error) {
                    reject(error);
                }
            });
        }).on('error', (error) => {
            reject(error);
        });
    });
}

async function importToLocalDB() {
    try {
        console.log('Fetching products from production API...');
        const response = await fetchProductsFromAPI();
        
        console.log('API Response:', JSON.stringify(response, null, 2));
        
        const products = response.products || response;
        
        if (!products || products.length === 0) {
            console.log('No products found in API response');
            return;
        }

        console.log(`\nFound ${products.length} products from production API:`);
        products.forEach((product, index) => {
            console.log(`${index + 1}. ${product.name} - ₹${product.price} (${product.category})`);
        });

        // Connect to local database
        console.log('\nConnecting to local database...');
        await mongoose.connect(LOCAL_DB);
        console.log('Connected to local database!');

        // Clear existing products (optional)
        // await Product.deleteMany({});
        // console.log('Cleared existing products');

        // Insert products
        const inserted = await Product.insertMany(products);
        console.log(`\n✅ Successfully imported ${inserted.length} products to local database!`);

        await mongoose.connection.close();
        console.log('Database connection closed');

    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
}

importToLocalDB();

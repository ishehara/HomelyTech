const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const inventorySchema = new Schema({
    itemName: {
        type: String,
        required: true //validate
    },
    itemBrand: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true  //validate
    },
    quantity: {
        type: Number,
        required: true,  //validate
        min: 0 // Assuming quantity cannot be negative
    },
    productCost: {
        type: Number,
        required: true,  //validate
        min: 0 // Assuming cost cannot be negative
    },
    supplierName: {
        type: String,
        required: true
    },
    supplierEmail: {
        type: String,
        required: true,  //validate
        // Adding validation for email format
        match: /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/
    },
    date: {
        type: Date,
        default: Date.now // Default to current date if not provided
    }
});

module.exports = mongoose.model(
    "InventoryModel",  //filename
    inventorySchema
)
import express from 'express';
import { addProduct, getAllProducts , updateProduct , deleteProduct, getSingleProduct} from '../controllers/product.controller.js';


const productRouter = express.Router();

productRouter.post('/add-product', addProduct);
productRouter.get('/get-all', getAllProducts);
productRouter.get('/single/:productId', getSingleProduct);
productRouter.put('/update/:productId', updateProduct);
productRouter.delete('/delete/:productId', deleteProduct);

export default productRouter;

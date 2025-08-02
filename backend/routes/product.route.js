import express from 'express';
import { addProduct, getAllProducts, updateProduct, deleteProduct, getSingleProduct } from '../controllers/product.controller.js';
import { isUserAuthenticated, roleBasedAccess } from '../middlewares/isAuth.middleware.js';


const productRouter = express.Router();

productRouter.post('/add-product', isUserAuthenticated, roleBasedAccess('admin'), addProduct);
productRouter.get('/get-all', isUserAuthenticated, getAllProducts);
productRouter.get('/single/:productId', isUserAuthenticated, getSingleProduct);
productRouter.put('/update/:productId', isUserAuthenticated, roleBasedAccess('admin'), updateProduct);
productRouter.delete('/delete/:productId', isUserAuthenticated, roleBasedAccess('admin'), deleteProduct);

export default productRouter;

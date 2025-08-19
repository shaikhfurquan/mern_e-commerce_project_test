import express from 'express';
import { addProduct, getAllProducts, updateProduct, deleteProduct, getSingleProduct, getAdminProduct, createAndUpdateReviewForProduct, getProductReviews } from '../controllers/product.controller.js';
import { isUserAuthenticated, roleBasedAccess } from '../middlewares/isAuth.middleware.js';


const productRouter = express.Router();

productRouter.post('/admin/product/add', isUserAuthenticated, roleBasedAccess('admin'), addProduct);
productRouter.get('/get-all', getAllProducts);
productRouter.get('/single/:productId', getSingleProduct);
productRouter.put('/admin/update/:productId', isUserAuthenticated, roleBasedAccess('admin'), updateProduct);
productRouter.delete('/admin/delete/:productId', isUserAuthenticated, roleBasedAccess('admin'), deleteProduct);
productRouter.get('/admin/get-all', isUserAuthenticated, roleBasedAccess('admin'), getAdminProduct);
productRouter.put('/review', isUserAuthenticated, createAndUpdateReviewForProduct);
productRouter.get('/get-review', getProductReviews);


export default productRouter;
